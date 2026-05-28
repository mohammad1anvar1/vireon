import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
const PRODUCTS = {
  residential: { name: 'VIREON Residential Report', price: 14900, mode: 'payment' },
  landlord: { name: 'VIREON Landlord Portfolio Report', price: 39900, mode: 'payment' },
  commercial: { name: 'VIREON Commercial Analysis', price: 99900, mode: 'payment' },
  partner_starter: { name: 'VIREON Partner Starter', price: 9900, mode: 'subscription' },
  partner_professional: { name: 'VIREON Partner Professional', price: 24900, mode: 'subscription' },
}
export async function POST(request) {
  try {
    const { productId, customerEmail } = await request.json()
    const product = PRODUCTS[productId]
    if (!product) return NextResponse.json({ error: 'Unknown product' }, { status: 400 })
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.vireonai.uk'
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [{ price_data: { currency: 'gbp', product_data: { name: product.name }, unit_amount: product.price, ...(product.mode === 'subscription' && { recurring: { interval: 'month' } }) }, quantity: 1 }],
      mode: product.mode,
      success_url: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productId}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: { productId },
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
