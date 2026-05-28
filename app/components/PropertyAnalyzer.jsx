
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

  const [report, setReport] = useState(null);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function analyzeProperty(e) {
    e.preventDefault();

    const bill = Number(form.annualEnergyBill || 0);
    const savingLow = Math.round(bill * 0.18);
    const savingHigh = Math.round(bill * 0.32);

    setReport({
      status: "Moderate Improvement Potential",
      potentialEpc: ["E", "F", "G"].includes(form.epcRating.toUpperCase()) ? "C/B" : "B",
      propertyValueUplift: "£12,000 – £28,000",
      carbonReduction: "2.1 – 4.6 tonnes CO₂e/year",
      energyReduction: "22% – 38%",
      annualSaving: `£${savingLow} – £${savingHigh}`,
      recommendations: [
        {
          title: "Loft Insulation",
          cost: "£800 – £1,400",
          saving: "£250 – £420/year",
          payback: "3–5 years",
          priority: "High",
        },
        {
          title: "Smart Heating Controls",
          cost: "£300 – £900",
          saving: "£120 – £260/year",
          payback: "2–4 years",
          priority: "High",
        },
        {
          title: "Solar PV System",
          cost: "£5,000 – £8,500",
          saving: "£450 – £750/year",
          payback: "8–12 years",
          priority: "Medium",
        },
      ],
    });
  }

  return (
    <main style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
      <h1>VIREON AI Property Intelligence Report</h1>
      <p>Generate a preliminary retrofit, EPC and energy efficiency assessment.</p>

      <form onSubmit={analyzeProperty} style={{ display: "grid", gap: 14, marginTop: 30 }}>
        <input name="address" placeholder="Property Address" onChange={updateField} required />
        <input name="propertyType" placeholder="Property Type e.g. Detached House" onChange={updateField} required />
        <input name="bedrooms" placeholder="Bedrooms" onChange={updateField} required />
        <input name="epcRating" placeholder="Current EPC Rating e.g. C, D, E" onChange={updateField} required />
        <input name="floorArea" placeholder="Floor Area sqm" onChange={updateField} required />
        <input name="heatingType" placeholder="Heating Type e.g. Gas boiler" onChange={updateField} required />
        <input name="annualEnergyBill" placeholder="Annual Energy Bill £" onChange={updateField} required />

        <button type="submit">Generate AI Report</button>
      </form>

      {report && (
        <section style={{ marginTop: 50, border: "1px solid #8fa083", padding: 30 }}>
          <h2>Property Summary</h2>
          <p><strong>Address:</strong> {form.address}</p>
          <p><strong>Property Type:</strong> {form.propertyType}</p>
          <p><strong>Bedrooms:</strong> {form.bedrooms}</p>
          <p><strong>Current EPC:</strong> {form.epcRating.toUpperCase()}</p>
          <p><strong>Floor Area:</strong> {form.floorArea} sqm</p>
          <p><strong>Heating System:</strong> {form.heatingType}</p>

          <hr />

          <h2>AI Property Assessment</h2>
          <p><strong>Overall Status:</strong> {report.status}</p>
          <p><strong>Estimated Annual Saving:</strong> {report.annualSaving}</p>
          <p><strong>Potential EPC After Improvements:</strong> {report.potentialEpc}</p>
          <p><strong>Estimated Property Value Uplift:</strong> {report.propertyValueUplift}</p>
          <p><strong>Carbon Reduction:</strong> {report.carbonReduction}</p>
          <p><strong>Energy Reduction:</strong> {report.energyReduction}</p>

          <hr />

          <h2>Recommended Improvements</h2>

          {report.recommendations.map((item) => (
            <div key={item.title} style={{ border: "1px solid #444", padding: 20, marginTop: 18 }}>
              <h3>{item.title}</h3>
              <p><strong>Estimated Cost:</strong> {item.cost}</p>
              <p><strong>Estimated Annual Saving:</strong> {item.saving}</p>
              <p><strong>Estimated Payback:</strong> {item.payback}</p>
              <p><strong>AI Priority Score:</strong> {item.priority}</p>
            </div>
          ))}

          <hr />

          <h2>AI Summary</h2>
          <p>
            Based on the submitted property details, VIREON AI identifies insulation,
            heating optimization and renewable energy integration as the most relevant
            retrofit opportunities. The highest-return actions should be completed first,
            followed by solar PV or deeper retrofit upgrades where budget allows.
          </p>

          <h2>Disclaimer</h2>
          <p>
            This report is an AI-generated preliminary assessment for informational purposes only.
            Actual costs, savings and performance depend on site survey conditions, installer quotations,
            energy usage, property condition, regulations and local market pricing.
          </p>
        </section>
      )}
    </main>
  );
}
EOF
