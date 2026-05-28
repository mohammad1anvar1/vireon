"use client";

const plans = [
  { name: "Basic Property Report", price: 49 },
  { name: "Professional Retrofit Report", price: 149 },
  { name: "Enterprise / Partner Plan", price: 499 },
];

export default function PricingPage() {
  async function checkout(plan, price) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, price }),
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
        <div key={plan.name} style={{ border: "1px solid #ddd", padding: 24, marginTop: 20 }}>
          <h2>{plan.name}</h2>
          <p>£{plan.price}</p>
          <button onClick={() => checkout(plan.name, plan.price)}>
            Pay with Stripe
          </button>
        </div>
      ))}
    </main>
  );
}
