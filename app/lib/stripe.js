import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export async function verifyCheckoutSession(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer'],
    });
    if (session.payment_status !== 'paid') return null;
    return session;
  } catch (err) {
    console.error('Stripe session error:', err.message);
    return null;
  }
}

export function extractOrderDetails(session) {
  const lineItem = session.line_items?.data?.[0];
  const product = lineItem?.price?.product;
  return {
    sessionId: session.id,
    customerEmail: session.customer_details?.email || '',
    customerName: session.customer_details?.name || '',
    productName: product?.name || 'VIREON Report',
    productId: product?.id || '',
    amountTotal: session.amount_total,
    currency: session.currency,
    orderNumber: 'VIR-' + session.id.slice(-8).toUpperCase(),
  };
}
