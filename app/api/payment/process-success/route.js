import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const { sessionId } = await req.json();
    if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Not paid' }, { status: 400 });
    }

    const lineItem = session.line_items?.data?.[0];
    const product = lineItem?.price?.product;
    const orderNumber = 'VIR-' + sessionId.slice(-8).toUpperCase();
    const customerEmail = session.customer_details?.email || '';
    const productName = product?.name || 'VIREON Report';
    const amountTotal = session.amount_total || 0;

    await supabase.from('purchases').upsert({
      order_number: orderNumber,
      customer_name: session.customer_details?.name || '',
      customer_email: customerEmail,
      product_name: productName,
      stripe_session_id: sessionId,
      amount_total: amountTotal,
      currency: session.currency || 'gbp',
      purchased_at: new Date().toISOString(),
    }, { onConflict: 'stripe_session_id' });

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: customerEmail,
        subject: `Your VIREON Report is Ready — ${orderNumber}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;">
            <div style="background:#0a0a0f;padding:28px 36px;">
              <span style="font-size:22px;font-weight:bold;color:#e8ff3c;">VIREON</span>
              <span style="font-size:22px;color:#fff;"> AI Intelligence</span>
            </div>
            <div style="padding:36px;">
              <p style="font-size:22px;font-weight:bold;color:#0a0a0f;margin:0 0 6px;">Your report is ready.</p>
              <p style="color:#666;margin:0 0 28px;">Order ${orderNumber}</p>
              <p style="color:#333;line-height:1.7;">
                Thank you for your purchase of <strong>${productName}</strong>.
                Your intelligence report is being prepared and will be
                delivered shortly.
              </p>
              <div style="margin:32px 0;padding:20px;background:#f9f9f6;border-radius:4px;">
                <p style="margin:4px 0;font-size:13px;color:#666;">Order: <strong>${orderNumber}</strong></p>
                <p style="margin:4px 0;font-size:13px;color:#666;">Amount: <strong>£${(amountTotal/100).toFixed(2)}</strong></p>
                <p style="margin:4px 0;font-size:13px;color:#666;">Date: <strong>${new Date().toLocaleDateString('en-GB')}</strong></p>
              </div>
              <p style="font-size:12px;color:#999;">
                Questions? Reply to this email or contact hello@vireonai.uk
              </p>
            </div>
          </div>
        `
      });

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL,
        subject: `[VIREON] New Purchase — ${orderNumber} — £${(amountTotal/100).toFixed(2)}`,
        html: `<p>New purchase: <strong>${productName}</strong> by ${customerEmail} — Order ${orderNumber}</p>`
      });
    } catch (emailErr) {
      console.error('process-success email error:', emailErr);
    }

    return NextResponse.json({
      order: {
        orderNumber,
        customerEmail,
        productName,
        amountTotal,
        currency: session.currency,
        sessionId,
      }
    });

  } catch (err) {
    console.error('process-success error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
