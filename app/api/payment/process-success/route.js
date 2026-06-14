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
