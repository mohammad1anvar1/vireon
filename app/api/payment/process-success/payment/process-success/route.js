import { NextResponse } from 'next/server';
import { verifyCheckoutSession, extractOrderDetails } from '../../../../lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { generateReportPDF } from '../../../../lib/pdf';
import { sendReportToCustomer, sendAdminNotification } from '../../../../lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    // 1. Verify Stripe payment
    const session = await verifyCheckoutSession(sessionId);
    if (!session) return NextResponse.json({ error: 'Payment not verified' }, { status: 400 });

    const order = extractOrderDetails(session);

    // 2. Idempotency check
    const { data: existing } = await supabase
      .from('purchases')
      .select('id, order_number, download_url')
      .eq('stripe_session_id', order.sessionId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ order, downloadUrl: existing.download_url, alreadyProcessed: true });
    }

    // 3. Generate PDF
    const pdfBuffer = await generateReportPDF(order);

    // 4. Upload to Supabase Storage
    const fileName = `reports/${order.sessionId}/${order.orderNumber}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('vireon-reports')
      .upload(fileName, pdfBuffer, { contentType: 'application/pdf', upsert: false });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Failed to store report' }, { status: 500 });
    }

    // 5. Create signed download URL (72 hours)
    const { data: signedData } = await supabase.storage
      .from('vireon-reports')
      .createSignedUrl(fileName, 60 * 60 * 72);

    const downloadUrl = signedData?.signedUrl || '';

    // 6. Save purchase record
    await supabase.from('purchases').insert({
      order_number: order.orderNumber,
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      product_name: order.productName,
      product_id: order.productId,
      stripe_session_id: order.sessionId,
      amount_total: order.amountTotal,
      currency: order.currency,
      download_url: downloadUrl,
      report_storage_path: fileName,
      purchased_at: new Date().toISOString(),
    });

    // 7. Send emails (non-fatal)
    try {
      await Promise.all([
        sendReportToCustomer({ order, pdfBuffer, downloadUrl }),
        sendAdminNotification({ order }),
      ]);
    } catch (emailErr) {
      console.error('Email error:', emailErr);
    }

    return NextResponse.json({ order, downloadUrl });

  } catch (err) {
    console.error('Process success error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
