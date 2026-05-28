
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
    <h2>Free AI Preview</h2>

    <p><strong>Overall Status:</strong> {report.status}</p>
    <p><strong>Estimated Annual Saving:</strong> {report.annualSaving}</p>
    <p><strong>Potential EPC After Improvements:</strong> {report.potentialEpc}</p>

    <div style={{ marginTop: 30, padding: 25, border: "1px dashed #999" }}>
      <h3>🔒 Full AI Intelligence Report Locked</h3>
      <p>Unlock the complete report including detailed costs, ROI, EPC strategy, carbon analysis, and downloadable PDF.</p>

      <a href="/pricing">Unlock Full AI Report</a>
    </div>
  </section>
      )}