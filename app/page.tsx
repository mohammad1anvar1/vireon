"use client";

import { useState, useEffect, useRef } from "react";

function useCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function AnimatedStat({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCounter(value, 2200, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "3rem", fontWeight: 700, fontFamily: "'DM Serif Display', Georgia, serif", color: "#e8f5e2", lineHeight: 1 }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "0.78rem", color: "#6a8a6a", marginTop: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const GridOverlay = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
    backgroundImage: `linear-gradient(rgba(120,200,100,0.03) 1px, transparent 1px),linear-gradient(90deg, rgba(120,200,100,0.03) 1px, transparent 1px)`,
    backgroundSize: "60px 60px"
  }} />
);

const Orb = ({ x, y, size, color, opacity = 0.15 }: { x: string; y: string; size: string; color: string; opacity?: number }) => (
  <div style={{
    position: "absolute", left: x, top: y, width: size, height: size,
    borderRadius: "50%", background: color, opacity,
    filter: `blur(${parseInt(size) * 0.4}px)`,
    pointerEvents: "none", zIndex: 0
  }} />
);

function Section({ children, style = {}, id }: { children: React.ReactNode; style?: React.CSSProperties; id?: string }) {
  const [ref, inView] = useInView(0.1);
  return (
    <section id={id} ref={ref as React.RefObject<HTMLElement>} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      ...style
    }}>
      {children}
    </section>
  );
}

function DashboardMock() {
  const bars = [65, 82, 71, 94, 78, 88, 62, 97, 74, 85, 91, 79];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{
      background: "rgba(8,16,10,0.9)", border: "1px solid rgba(120,200,80,0.15)", borderRadius: "16px",
      padding: "0", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(120,200,80,0.08)",
      maxWidth: "900px", margin: "0 auto",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
    }}>
      <div style={{ background: "rgba(120,200,80,0.06)", borderBottom: "1px solid rgba(120,200,80,0.1)", padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 12, fontSize: "0.72rem", color: "#4a7a4a", letterSpacing: "0.15em", textTransform: "uppercase" }}>VIREON Intelligence Platform — Building Analytics</span>
      </div>
      <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px" }}>
        {[
          { label: "EPC Score", value: "A+", delta: "+2 grades", color: "#7bc95a" },
          { label: "Energy Cost Saving", value: "£42k", delta: "+34% vs baseline", color: "#5ab8c9" },
          { label: "Carbon Reduction", value: "67%", delta: "tCO₂e saved", color: "#c9a85a" },
          { label: "Property Uplift", value: "£180k", delta: "+12.4% value", color: "#b85ac9" },
        ].map((card, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "16px",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`
          }}>
            <div style={{ fontSize: "0.65rem", color: "#4a6a4a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{card.label}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: card.color, fontFamily: "'DM Serif Display', serif", lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: "0.7rem", color: "#5a7a5a", marginTop: 4 }}>{card.delta}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: "0.72rem", color: "#5a8a5a", letterSpacing: "0.1em", textTransform: "uppercase" }}>Energy Performance Score — 12 Month Trend</span>
            <span style={{ fontSize: "0.65rem", color: "#3a5a3a", background: "rgba(120,200,80,0.08)", border: "1px solid rgba(120,200,80,0.15)", borderRadius: 4, padding: "2px 8px" }}>AI Optimised</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", height: `${h}%`, background: `linear-gradient(180deg, rgba(120,200,80,0.8), rgba(60,140,40,0.3))`, borderRadius: "3px 3px 0 0", border: "1px solid rgba(120,200,80,0.2)", minHeight: 4 }} />
                <span style={{ fontSize: "0.5rem", color: "#3a5a3a" }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(120,200,80,0.08)", padding: "16px 24px", display: "flex", gap: 12 }}>
        {["Install heat pump — ROI 3.2 yrs", "Upgrade insulation — Save £8k/yr", "Solar PV 12kW — 72% self-sufficiency"].map((rec, i) => (
          <div key={i} style={{ flex: 1, background: "rgba(120,200,80,0.05)", border: "1px solid rgba(120,200,80,0.12)", borderRadius: 8, padding: "10px 12px", fontSize: "0.68rem", color: "#7abc5a" }}>
            <span style={{ color: "#4a7a3a", marginRight: 6 }}>▲</span>{rec}
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadArea() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    setFiles(Array.from(e.dataTransfer.files).slice(0, 5));
  };
  return (
    <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{ border: `2px dashed ${dragging ? "rgba(120,200,80,0.6)" : "rgba(120,200,80,0.2)"}`, borderRadius: 16, padding: "48px 32px", textAlign: "center", cursor: "pointer", background: dragging ? "rgba(120,200,80,0.05)" : "rgba(120,200,80,0.02)", transition: "all 0.3s ease" }}>
      <input ref={inputRef} type="file" multiple style={{ display: "none" }} accept="image/*,video/*,.pdf,.doc,.docx" onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 5))} />
      <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>⬆</div>
      <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#c8e8b8", marginBottom: 8 }}>Drop property files here or click to upload</div>
      <div style={{ fontSize: "0.8rem", color: "#4a7a4a" }}>Accepts: Photos · Videos · Floor Plans · EPC Certificates · Utility Bills</div>
      {files.length > 0 && (
        <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {files.map((f, i) => (
            <div key={i} style={{ background: "rgba(120,200,80,0.1)", border: "1px solid rgba(120,200,80,0.2)", borderRadius: 6, padding: "4px 12px", fontSize: "0.72rem", color: "#7abc5a" }}>✓ {f.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(4,10,6,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(120,200,80,0.1)" : "none", transition: "all 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="rgba(120,200,80,0.8)" strokeWidth="1.5" />
          <polygon points="14,7 21,10.5 21,17.5 14,21 7,17.5 7,10.5" fill="rgba(120,200,80,0.15)" stroke="rgba(120,200,80,0.5)" strokeWidth="1" />
          <circle cx="14" cy="14" r="2.5" fill="rgba(120,200,80,0.9)" />
        </svg>
        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.3rem", color: "#e8f8e0", letterSpacing: "0.05em" }}>VIREON</span>
      </div>
      <div style={{ display: "flex", gap: "32px" }}>
        {["Platform", "How It Works", "Technology", "Industries", "Roadmap"].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(/\s+/g,"-")}`} style={{ fontSize: "0.78rem", color: "#5a8a5a", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#a8d888"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#5a8a5a"}>{item}</a>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={{ background: "transparent", border: "1px solid rgba(120,200,80,0.3)", color: "#7abc5a", borderRadius: 8, padding: "8px 20px", fontSize: "0.78rem", cursor: "pointer" }}>Sign In</button>
        <button style={{ background: "rgba(120,200,80,0.15)", border: "1px solid rgba(120,200,80,0.4)", color: "#b8e898", borderRadius: 8, padding: "8px 20px", fontSize: "0.78rem", cursor: "pointer" }}>Get Access</button>
      </div>
    </nav>
  );
}

export default function VireonApp() {
  const [statsRef, statsInView] = useInView(0.3);

  const techPillars = [
    { icon: "◈", title: "Property Digital Twin", desc: "AI constructs a living 3D energy model of every building — tracking thermal performance, system efficiency, and occupancy patterns in real time." },
    { icon: "⬡", title: "AI Optimisation Engine", desc: "Proprietary ML models trained on millions of data points identify inefficiencies and generate ranked, costed recommendations with financial projections." },
    { icon: "⟁", title: "Retrofit Sequencing Intelligence", desc: "Determines the optimal order and timing of upgrades to maximise ROI, minimise disruption, and meet Net Zero compliance milestones." },
    { icon: "◉", title: "Market Intelligence Layer", desc: "Correlates energy improvements with local property market data to calculate precise valuation uplift — linking EPC grades to actual sale premiums." },
    { icon: "⬣", title: "Energy-to-Value Engine", desc: "Translates technical energy performance into financial language — IRR, NPV, payback periods, and asset value impact — for investors and decision-makers." },
  ];

  const steps = [
    { n: "01", title: "Upload Property Data", desc: "Photos, floor plans, EPC certificates, utility bills. The more data, the sharper the intelligence." },
    { n: "02", title: "AI Builds Digital Model", desc: "Our engine constructs a full energy simulation — thermal envelopes, systems, consumption patterns — within minutes." },
    { n: "03", title: "Inefficiency Analysis", desc: "AI identifies every energy leak, system underperformance, and compliance gap against UK building standards." },
    { n: "04", title: "Recommendations Generated", desc: "Prioritised, costed retrofit actions with ROI projections, carbon metrics, and value uplift estimates." },
    { n: "05", title: "Retrofit Roadmap Delivered", desc: "A sequenced execution plan with contractor integration, funding route guidance, and milestone tracking." },
    { n: "06", title: "Ongoing Monitoring", desc: "Live dashboards track performance vs projections. AI continuously refines recommendations as data grows." },
  ];

  const industries = [
    { icon: "⌂", label: "Homeowners", desc: "Reduce energy bills, improve comfort, and increase property value with a personalised AI energy plan." },
    { icon: "◈", label: "Property Investors", desc: "Portfolio-level analysis. Identify assets most at risk from EPC regulations and greatest uplift opportunity." },
    { icon: "⬣", label: "Developers", desc: "Design net zero from the start. AI integration at planning stage reduces retrofit risk and maximises green premium." },
    { icon: "⟁", label: "Estate Agencies", desc: "Differentiate listings with AI-verified energy intelligence. Turn EPC compliance into a sales advantage." },
    { icon: "◉", label: "Commercial Buildings", desc: "MEES compliance, ESOS reporting, and NABERS ratings — automated and optimised by AI." },
    { icon: "⬡", label: "Housing Associations", desc: "Prioritise stock upgrades, unlock ECO4 and Social Housing Decarbonisation Fund with data-driven applications." },
    { icon: "▲", label: "Government & Public", desc: "Whole-street and estate-level retrofit planning with GIS integration and policy compliance mapping." },
  ];

  const roadmapItems = [
    { phase: "Q1 2025", title: "MVP Launch", desc: "Core AI energy analysis engine. Single-property assessment. UK beta users." },
    { phase: "Q3 2025", title: "Platform Expansion", desc: "Multi-property portfolio. Digital twin v2. API integrations with EPC register." },
    { phase: "Q1 2026", title: "SaaS Scaling", desc: "Enterprise tier. White-label product. CRM integrations. Partner network." },
    { phase: "Q3 2026", title: "Market Intelligence", desc: "Live property-to-energy valuation data. Lender and surveyor integrations." },
    { phase: "2027", title: "European Expansion", desc: "EPBD compliance across EU markets. Localised AI models per jurisdiction." },
  ];

  return (
    <div style={{ fontFamily: "'Syne', 'DM Sans', sans-serif", background: "#040a06", color: "#d0e8c0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#040a06;}
        ::-webkit-scrollbar-thumb{background:rgba(120,200,80,0.3);border-radius:2px;}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-12px);}}
        @keyframes scan{0%{top:0%;opacity:0;}10%{opacity:1;}90%{opacity:1;}100%{top:100%;opacity:0;}}
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes pulse-glow{0%,100%{opacity:0.4;transform:scale(1);}50%{opacity:0.7;transform:scale(1.05);}}
        .hero-float{animation:float 7s ease-in-out infinite;}
        .pulse{animation:pulse-glow 3s ease-in-out infinite;}
        .scan-line{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(120,200,80,0.6),transparent);animation:scan 4s linear infinite;pointer-events:none;z-index:2;}
        .ticker-track{animation:ticker 30s linear infinite;display:flex;gap:64px;}
        .btn-primary{background:rgba(120,200,80,0.15);border:1px solid rgba(120,200,80,0.5);color:#b8e898;padding:14px 32px;border-radius:10px;font-size:0.88rem;font-family:'Syne',sans-serif;cursor:pointer;letter-spacing:0.05em;font-weight:600;transition:all 0.25s ease;}
        .btn-primary:hover{background:rgba(120,200,80,0.25);border-color:rgba(120,200,80,0.8);box-shadow:0 0 24px rgba(120,200,80,0.15);transform:translateY(-2px);}
        .btn-ghost{background:transparent;border:1px solid rgba(120,200,80,0.2);color:#6a9a5a;padding:14px 32px;border-radius:10px;font-size:0.88rem;font-family:'Syne',sans-serif;cursor:pointer;letter-spacing:0.05em;transition:all 0.25s ease;}
        .btn-ghost:hover{border-color:rgba(120,200,80,0.5);color:#a8d888;transform:translateY(-2px);}
        .card-glass{background:rgba(255,255,255,0.025);border:1px solid rgba(120,200,80,0.1);border-radius:16px;transition:all 0.3s ease;}
        .card-glass:hover{background:rgba(255,255,255,0.04);border-color:rgba(120,200,80,0.25);transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,0.4);}
        .tag-pill{background:rgba(120,200,80,0.08);border:1px solid rgba(120,200,80,0.2);color:#7abc5a;padding:4px 14px;border-radius:100px;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;display:inline-block;}
        input,textarea,select{background:rgba(255,255,255,0.03)!important;border:1px solid rgba(120,200,80,0.15)!important;color:#c0e0a8!important;border-radius:10px!important;padding:12px 16px!important;font-family:'Syne',sans-serif!important;font-size:0.88rem!important;width:100%!important;outline:none!important;transition:border-color 0.2s!important;}
        input:focus,textarea:focus,select:focus{border-color:rgba(120,200,80,0.4)!important;}
        input::placeholder,textarea::placeholder{color:#3a5a3a!important;}
      `}</style>

      <Nav />

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <GridOverlay />
        <Orb x="-10%" y="10%" size="600px" color="radial-gradient(circle, rgba(80,160,50,0.4), transparent)" opacity={1} />
        <Orb x="60%" y="-5%" size="500px" color="radial-gradient(circle, rgba(40,100,120,0.3), transparent)" opacity={1} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}><div className="scan-line" /></div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "120px 40px 80px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <div className="tag-pill" style={{ marginBottom: 24 }}>AI PropTech · CleanTech · SaaS</div>
              <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(2.8rem, 5vw, 4.2rem)", fontWeight: 400, lineHeight: 1.1, color: "#e8f8e0", marginBottom: 24 }}>
                Property Intelligence,<br /><em style={{ color: "#7abc5a", fontStyle: "italic" }}>Engineered by AI.</em>
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#5a8a5a", lineHeight: 1.8, marginBottom: 36, maxWidth: "480px" }}>
                VIREON is the AI-powered Property Energy Intelligence Platform that helps owners, investors, and organisations transform buildings through digital twin simulation, retrofit intelligence, and automated energy optimisation.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
                <button className="btn-primary" onClick={() => document.getElementById("upload")?.scrollIntoView({behavior:"smooth"})}>Upload Property</button>
                <button className="btn-primary" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({behavior:"smooth"})}>Get AI Assessment</button>
                <button className="btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Book Consultation →</button>
              </div>
              <div style={{ display: "flex", gap: "32px", paddingTop: 24, borderTop: "1px solid rgba(120,200,80,0.1)" }}>
                {[["12,000+","Properties Analysed"],["£340M+","Value Modelled"],["92%","Avg Carbon Reduction"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#b8e898", fontFamily: "'DM Serif Display',serif" }}>{val}</div>
                    <div style={{ fontSize: "0.68rem", color: "#3a5a3a", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-float" style={{ position: "relative" }}>
              <div style={{ position: "relative", width: "100%", paddingBottom: "100%", maxWidth: 460, margin: "0 auto" }}>
                <svg viewBox="0 0 460 460" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                  <circle cx="230" cy="230" r="200" fill="none" stroke="rgba(120,200,80,0.06)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="160" fill="none" stroke="rgba(120,200,80,0.08)" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="230" cy="230" r="120" fill="none" stroke="rgba(120,200,80,0.12)" strokeWidth="1" />
                  {[0,60,120,180,240,300].map((angle, i) => {
                    const r = 170; const x = 230 + r * Math.cos((angle * Math.PI) / 180); const y = 230 + r * Math.sin((angle * Math.PI) / 180);
                    return (<g key={i}><line x1="230" y1="230" x2={x} y2={y} stroke="rgba(120,200,80,0.1)" strokeWidth="1" /><circle cx={x} cy={y} r="6" fill="rgba(120,200,80,0.3)" /></g>);
                  })}
                  <rect x="170" y="140" width="40" height="120" rx="2" fill="rgba(120,200,80,0.08)" stroke="rgba(120,200,80,0.25)" strokeWidth="1" />
                  <rect x="215" y="110" width="60" height="150" rx="2" fill="rgba(120,200,80,0.1)" stroke="rgba(120,200,80,0.3)" strokeWidth="1" />
                  <rect x="280" y="150" width="35" height="110" rx="2" fill="rgba(120,200,80,0.07)" stroke="rgba(120,200,80,0.2)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="30" fill="rgba(120,200,80,0.08)" stroke="rgba(120,200,80,0.4)" strokeWidth="1.5" className="pulse" />
                  <circle cx="230" cy="230" r="12" fill="rgba(120,200,80,0.6)" />
                  {([[200,180,"£42k"],[270,200,"A+EPC"],[200,280,"67%CO₂"],[270,270,"ROI 3.2y"]] as [number,number,string][]).map(([x,y,label],i) => (
                    <g key={i}>
                      <line x1="230" y1="230" x2={x} y2={y} stroke="rgba(120,200,80,0.25)" strokeWidth="1" strokeDasharray="3 4" />
                      <rect x={x - 20} y={y - 10} width="50" height="20" rx="4" fill="rgba(8,20,10,0.9)" stroke="rgba(120,200,80,0.3)" strokeWidth="1" />
                      <text x={x + 5} y={y + 4} fill="#7abc5a" fontSize="7" textAnchor="middle" fontFamily="DM Mono">{label}</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div style={{ borderTop: "1px solid rgba(120,200,80,0.08)", borderBottom: "1px solid rgba(120,200,80,0.08)", padding: "14px 0", overflow: "hidden", background: "rgba(120,200,80,0.03)" }}>
        <div className="ticker-track">
          {[...Array(2)].flatMap((_, ai) => ["Digital Twin Simulation","AI Energy Optimisation","EPC Compliance Automation","Retrofit ROI Modelling","Carbon Reduction Intelligence","Property Value Uplift","Net Zero Planning","Building Performance Analytics","MEES Compliance","Whole-House Retrofits"].map((t, i) => (
            <span key={`${ai}-${i}`} style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t} <span style={{ color: "rgba(120,200,80,0.3)", margin: "0 8px" }}>◆</span></span>
          )))}
        </div>
      </div>

      {/* STATS */}
      <Section id="platform" style={{ padding: "100px 40px", position: "relative" }}>
        <GridOverlay />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Platform Metrics</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400 }}>Intelligence at Scale</h2>
          </div>
          <div ref={statsRef as React.RefObject<HTMLDivElement>} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
            <AnimatedStat value={12000} suffix="+" label="Properties Analysed" started={statsInView} />
            <AnimatedStat value={340} suffix="M+" label="Value Modelled (£)" started={statsInView} />
            <AnimatedStat value={92} suffix="%" label="Avg Carbon Reduction" started={statsInView} />
            <AnimatedStat value={4200} suffix="+" label="AI Recommendations" started={statsInView} />
          </div>
        </div>
      </Section>

      {/* DASHBOARD */}
      <Section style={{ padding: "60px 40px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Live Platform Preview</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>The Intelligence Dashboard</h2>
            <p style={{ color: "#4a7a4a", fontSize: "0.95rem", maxWidth: 500, margin: "0 auto" }}>Every building becomes a data asset. VIREON surfaces the intelligence your portfolio needs.</p>
          </div>
          <DashboardMock />
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section id="how-it-works" style={{ padding: "100px 40px", background: "rgba(120,200,80,0.02)", position: "relative" }}>
        <GridOverlay />
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Workflow</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>How VIREON Works</h2>
            <p style={{ color: "#4a7a4a", maxWidth: 500, margin: "0 auto" }}>From raw property data to actionable intelligence in minutes, not months.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {steps.map((step, i) => (
              <div key={i} className="card-glass" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -10, right: -10, fontSize: "4rem", fontFamily: "'DM Serif Display',serif", color: "rgba(120,200,80,0.05)", fontWeight: 400, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{step.n}</div>
                <div style={{ fontSize: "0.7rem", color: "#3a6a3a", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Step {step.n}</div>
                <h3 style={{ fontSize: "1.05rem", color: "#c8e8b0", fontWeight: 600, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#4a6a4a", lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TECHNOLOGY */}
      <Section id="technology" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <div className="tag-pill" style={{ marginBottom: 16 }}>Core Technology</div>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, lineHeight: 1.2, marginBottom: 24 }}>Five AI Systems.<br /><em style={{ color: "#7abc5a" }}>One Unified Platform.</em></h2>
              <p style={{ color: "#4a7a4a", lineHeight: 1.8, marginBottom: 32 }}>VIREON&apos;s proprietary technology stack integrates building physics, machine learning, financial modelling, and market intelligence into a single coherent intelligence layer.</p>
              <div style={{ borderLeft: "1px solid rgba(120,200,80,0.2)", paddingLeft: 20 }}>
                <p style={{ fontSize: "0.82rem", color: "#3a6a3a", lineHeight: 1.8 }}>&quot;We&apos;re not building energy software. We&apos;re building the intelligence layer that every building needs to perform, comply, and appreciate in value.&quot;</p>
                <p style={{ fontSize: "0.72rem", color: "#2a4a2a", marginTop: 8, letterSpacing: "0.08em" }}>— VIREON FOUNDING TEAM</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {techPillars.map((pillar, i) => (
                <div key={i} className="card-glass" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: "1.3rem", color: "rgba(120,200,80,0.6)", lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{pillar.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.88rem", color: "#c8e8b0", fontWeight: 600, marginBottom: 4 }}>{pillar.title}</div>
                    <div style={{ fontSize: "0.78rem", color: "#3a5a3a", lineHeight: 1.7 }}>{pillar.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* UPLOAD */}
      <Section id="upload" style={{ padding: "100px 40px", background: "rgba(120,200,80,0.02)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Upload Property</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>Start Your AI Assessment</h2>
            <p style={{ color: "#4a7a4a", maxWidth: 480, margin: "0 auto" }}>Upload your property files and our AI engine will build a full energy intelligence report within minutes.</p>
          </div>
          <div className="card-glass" style={{ padding: 40 }}>
            <UploadArea />
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Property Address</label><input type="text" placeholder="123 Example Street, London, E1 6RF" /></div>
              <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Property Type</label>
                <select><option value="">Select property type...</option><option>Residential — Detached</option><option>Residential — Semi-detached</option><option>Residential — Flat/Apartment</option><option>Commercial — Office</option><option>Commercial — Retail</option><option>Industrial</option></select>
              </div>
              <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your Name</label><input type="text" placeholder="Full name" /></div>
              <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label><input type="email" placeholder="you@example.com" /></div>
            </div>
            <button className="btn-primary" style={{ marginTop: 24, width: "100%", padding: "16px", fontSize: "0.95rem" }}>Run AI Energy Analysis →</button>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#2a4a2a", marginTop: 12 }}>Secure upload · GDPR compliant · Results within 24 hours</p>
          </div>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section id="industries" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Industries Served</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>Built for Every Property Stakeholder</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {industries.map((ind, i) => (
              <div key={i} className="card-glass" style={{ padding: 24 }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 12, color: "rgba(120,200,80,0.5)" }}>{ind.icon}</div>
                <div style={{ fontSize: "0.95rem", color: "#c8e8b0", fontWeight: 600, marginBottom: 8 }}>{ind.label}</div>
                <div style={{ fontSize: "0.78rem", color: "#3a5a3a", lineHeight: 1.7 }}>{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section style={{ padding: "100px 40px", background: "rgba(120,200,80,0.02)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Social Proof</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400 }}>What Our Users Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { quote: "VIREON identified £68,000 in energy savings we had completely missed. The ROI modelling alone justified the investment.", name: "James Thornton", role: "Portfolio Director, Apex Capital Properties" },
              { quote: "The AI retrofit sequencing is unlike anything in the market. It told us exactly which interventions to do first — and why. Transformed our development pipeline.", name: "Sarah Okonkwo", role: "Sustainability Lead, Meridian Developments" },
              { quote: "Finally a platform that speaks the language of investors, not just engineers. VIREON connects energy improvements directly to asset value.", name: "Mark Ellis MRICS", role: "Director, Green Asset Valuation" },
            ].map((t, i) => (
              <div key={i} className="card-glass" style={{ padding: 28 }}>
                <div style={{ fontSize: "1.5rem", color: "rgba(120,200,80,0.3)", marginBottom: 16, lineHeight: 1 }}>&quot;</div>
                <p style={{ fontSize: "0.85rem", color: "#5a8a5a", lineHeight: 1.8, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ borderTop: "1px solid rgba(120,200,80,0.1)", paddingTop: 16 }}>
                  <div style={{ fontSize: "0.85rem", color: "#a8d888", fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: "0.72rem", color: "#3a5a3a", marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ROADMAP */}
      <Section id="roadmap" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Company Roadmap</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>Building the Future</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, rgba(120,200,80,0.5), rgba(120,200,80,0.05))", transform: "translateX(-50%)" }} />
            {roadmapItems.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-end" : "flex-start", marginBottom: 48, position: "relative" }}>
                <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 12, height: 12, borderRadius: "50%", background: "#7abc5a", zIndex: 2, boxShadow: "0 0 16px rgba(120,200,80,0.5)" }} />
                <div className="card-glass" style={{ width: "44%", padding: 24, marginRight: i % 2 === 0 ? "6%" : 0, marginLeft: i % 2 !== 0 ? "6%" : 0 }}>
                  <div className="tag-pill" style={{ marginBottom: 12, fontSize: "0.65rem" }}>{item.phase}</div>
                  <div style={{ fontSize: "1rem", color: "#c8e8b0", fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: "0.8rem", color: "#3a5a3a", lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* INVESTOR */}
      <Section style={{ padding: "100px 40px", background: "rgba(120,200,80,0.02)", position: "relative", overflow: "hidden" }}>
        <GridOverlay />
        <Orb x="70%" y="20%" size="400px" color="radial-gradient(circle, rgba(80,160,50,0.2), transparent)" opacity={1} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="tag-pill" style={{ marginBottom: 16 }}>Investor Grade</div>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, lineHeight: 1.2, marginBottom: 24 }}>Built for Scale.<br /><em style={{ color: "#7abc5a" }}>Designed to Last.</em></h2>
              <p style={{ color: "#4a7a4a", lineHeight: 1.8, marginBottom: 32 }}>VIREON is architected as a global AI infrastructure company — not a services business. Our proprietary data flywheel, AI models, and API ecosystem create durable competitive moats as the platform scales.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["AI-first architecture with proprietary training data","SaaS model with enterprise, API, and white-label tiers","UK EPC regulation tailwinds (MEES deadline pressure)","£350B UK retrofit market opportunity","UK Innovator Founder Visa — endorsed sector"].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7abc5a", marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.85rem", color: "#5a8a5a" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "◈", title: "Defensible AI", desc: "Proprietary models trained on UK property data unavailable to competitors." },
                { icon: "⬡", title: "API Ecosystem", desc: "Developer-first architecture enables rapid partner integrations." },
                { icon: "⟁", title: "Regulation Driven", desc: "MEES 2025–2030 creates mandatory demand for every UK commercial landlord." },
                { icon: "◉", title: "Global Expansion", desc: "EU EPBD creates equivalent demand across 27 markets from 2026." },
              ].map((card, i) => (
                <div key={i} className="card-glass" style={{ padding: 20 }}>
                  <div style={{ fontSize: "1.2rem", color: "rgba(120,200,80,0.5)", marginBottom: 10 }}>{card.icon}</div>
                  <div style={{ fontSize: "0.88rem", color: "#c8e8b0", fontWeight: 600, marginBottom: 6 }}>{card.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#3a5a3a", lineHeight: 1.65 }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="tag-pill" style={{ marginBottom: 16 }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#e8f8e0", fontWeight: 400, marginBottom: 16 }}>Book a Consultation</h2>
            <p style={{ color: "#4a7a4a", maxWidth: 480, margin: "0 auto" }}>Speak with our team about your property portfolio, investment strategy, or partnership opportunities.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div className="card-glass" style={{ padding: 36 }}>
              <h3 style={{ fontSize: "1rem", color: "#c8e8b0", marginBottom: 24, fontWeight: 600 }}>Send a Message</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Full Name</label><input type="text" placeholder="Your full name" /></div>
                <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label><input type="email" placeholder="work@company.com" /></div>
                <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Organisation</label><input type="text" placeholder="Company or organisation" /></div>
                <div><label style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label><textarea rows={4} placeholder="Tell us about your property portfolio or requirements..." style={{ resize: "vertical" as const }} /></div>
                <button className="btn-primary" style={{ width: "100%" }}>Send Message →</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="card-glass" style={{ padding: 24 }}><div style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Email</div><div style={{ color: "#7abc5a", fontSize: "0.9rem" }}>hello@vireonai.uk</div></div>
              <div className="card-glass" style={{ padding: 24 }}><div style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>For Investors</div><div style={{ color: "#7abc5a", fontSize: "0.9rem" }}>investors@vireonai.uk</div></div>
              <div className="card-glass" style={{ padding: 24 }}><div style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Location</div><div style={{ color: "#5a8a5a", fontSize: "0.85rem" }}>London, United Kingdom</div></div>
              <div className="card-glass" style={{ padding: 24 }}>
                <div style={{ fontSize: "0.72rem", color: "#3a6a3a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Newsletter</div>
                <div style={{ display: "flex", gap: 8 }}><input type="email" placeholder="your@email.com" style={{ flex: 1 }} /><button className="btn-primary" style={{ padding: "12px 16px", fontSize: "0.75rem" }}>→</button></div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section style={{ padding: "80px 40px", position: "relative", overflow: "hidden" }}>
        <Orb x="10%" y="-20%" size="600px" color="radial-gradient(circle, rgba(80,160,50,0.3), transparent)" opacity={1} />
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#e8f8e0", fontWeight: 400, lineHeight: 1.2, marginBottom: 24 }}>Your Buildings Are Smarter<br /><em style={{ color: "#7abc5a" }}>Than You Think.</em></h2>
          <p style={{ color: "#4a7a4a", fontSize: "1.05rem", marginBottom: 40, lineHeight: 1.8 }}>Join thousands of property professionals using VIREON to unlock the intelligence hidden in their assets.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px" }} onClick={() => document.getElementById("upload")?.scrollIntoView({behavior:"smooth"})}>Start Free Assessment</button>
            <button className="btn-ghost" style={{ fontSize: "1rem", padding: "16px 40px" }} onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}>Talk to Our Team</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(120,200,80,0.1)", padding: "60px 40px 32px", background: "rgba(0,0,0,0.3)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none"><polygon points="14,2 26,8 26,20 14,26 2,20 2,8" fill="none" stroke="rgba(120,200,80,0.7)" strokeWidth="1.5" /><circle cx="14" cy="14" r="3" fill="rgba(120,200,80,0.8)" /></svg>
                <span style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.1rem", color: "#c8e8b0" }}>VIREON</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#3a5a3a", lineHeight: 1.8, maxWidth: 260 }}>AI-powered Property Energy Intelligence Platform. Helping property owners, investors, and organisations build smarter, more sustainable assets.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {["in", "𝕏", "gh"].map((s, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(120,200,80,0.08)", border: "1px solid rgba(120,200,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.7rem", color: "#4a7a4a" }}>{s}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["AI Assessment","Digital Twin","Retrofit Planner","Portfolio Analytics","API Access"] },
              { title: "Company", links: ["About VIREON","Technology","Careers","Press","Investors"] },
              { title: "Legal", links: ["Privacy Policy","Terms of Service","Cookie Policy","GDPR","Security"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: "0.7rem", color: "#3a6a3a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: "0.82rem", color: "#2a4a2a", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#7abc5a"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "#2a4a2a"}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(120,200,80,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.72rem", color: "#1a3a1a" }}>© 2025 VIREON AI Ltd. Registered in England & Wales. All rights reserved.</div>
            <div style={{ fontSize: "0.72rem", color: "#1a3a1a" }}>AI-Powered Property Energy Intelligence · London, UK</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
