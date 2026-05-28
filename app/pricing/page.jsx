"use client";

const plans = [
  { id: "residential", name: "Basic Property Report", price: 49 },
  { id: "commercial", name: "Professional Retrofit Report", price: 149 },
  { id: "partner_professional", name: "Enterprise / Partner Plan", price: 249 },
];

export default function PricingPage() {
  async function checkout(productId) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Payment error");
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>VIREON AI Pricing</h1>

      {plans.map((plan) => (
        <div key={plan.id} style={{ border: "1px solid #ddd", padding: 24, marginTop: 20 }}>
          <h2>{plan.name}</h2>
          <p>£{plan.price}</p>
          <button onClick={() => checkout(plan.id)}>Pay with Stripe</button>
        </div>
      ))}
    </main>
  );
}
