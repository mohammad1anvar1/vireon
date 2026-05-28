"use client";

import { useState } from "react";

export default function PropertyAnalyzer() {
  const [form, setForm] = useState({
    address: "",
    propertyType: "",
    bedrooms: "",
    epcRating: "",
    floorArea: "",
    heatingType: "",
    annualEnergyBill: "",
  });

  const [result, setResult] = useState(null);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function analyzeProperty(e) {
    e.preventDefault();

    const bill = Number(form.annualEnergyBill || 0);
    const estimatedSaving = Math.round(bill * 0.28);
    const retrofitBudget = form.epcRating === "E" || form.epcRating === "F" ? 18000 : 9500;
    const payback = estimatedSaving > 0 ? Math.round(retrofitBudget / estimatedSaving) : "N/A";

    setResult({
      score: form.epcRating === "A" || form.epcRating === "B" ? "Strong" : "Improvement Needed",
      estimatedSaving,
      retrofitBudget,
      payback,
      recommendations: [
        "Improve loft and wall insulation",
        "Upgrade heating controls",
        "Review solar PV feasibility",
        "Check EPC improvement pathway",
      ],
    });
  }

  return (
    <main style={{ padding: 40, maxWidth: 900 }}>
      <h1>VIREON AI Property Analyzer</h1>
      <p>Enter property details to generate an early-stage energy and retrofit assessment.</p>

      <form onSubmit={analyzeProperty} style={{ display: "grid", gap: 16, marginTop: 30 }}>
        <input name="address" placeholder="Property Address" onChange={updateField} required />
        <input name="propertyType" placeholder="Property Type e.g. Detached House" onChange={updateField} required />
        <input name="bedrooms" placeholder="Bedrooms" onChange={updateField} required />
        <input name="epcRating" placeholder="Current EPC Rating e.g. C, D, E" onChange={updateField} required />
        <input name="floorArea" placeholder="Floor Area sqm" onChange={updateField} required />
        <input name="heatingType" placeholder="Heating Type e.g. Gas boiler" onChange={updateField} required />
        <input name="annualEnergyBill" placeholder="Annual Energy Bill £" onChange={updateField} required />

        <button type="submit">Analyze Property</button>
      </form>

      {result && (
        <section style={{ marginTop: 40, border: "1px solid #ddd", padding: 24 }}>
          <h2>AI Assessment Result</h2>
          <p><strong>Status:</strong> {result.score}</p>
          <p><strong>Estimated Annual Saving:</strong> £{result.estimatedSaving}</p>
          <p><strong>Estimated Retrofit Budget:</strong> £{result.retrofitBudget}</p>
          <p><strong>Estimated Payback:</strong> {result.payback} years</p>

          <h3>Recommendations</h3>
          <ul>
            {result.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
