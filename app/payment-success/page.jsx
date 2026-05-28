<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>VIREON — Pricing</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --navy:        #1B2A4A;
      --navy2:       #243660;
      --navy-faint:  #EEF0F8;
      --navy-muted:  #F4F5FA;
      --ink:         #1B2A4A;
      --ink-mid:     #4A5568;
      --ink-light:   #718096;
      --ink-faint:   #A0AEC0;
      --border:      #E4E8F0;
      --border-soft: #F0F3F8;
      --white:       #FFFFFF;
      --bg:          #F8F9FC;
      --green:       #38A169;
      --shadow-xs:   0 1px 4px rgba(27,42,74,.06);
      --shadow-sm:   0 2px 12px rgba(27,42,74,.08);
      --shadow-md:   0 8px 32px rgba(27,42,74,.11);
      --shadow-lg:   0 20px 60px rgba(27,42,74,.14);
      --shadow-hero: 0 32px 80px rgba(27,42,74,.16);
      --r-sm:        8px;
      --r-md:        12px;
      --r-lg:        18px;
      --r-xl:        24px;
      --r-2xl:       32px;
      --font:        'Inter', sans-serif;
      --serif:       'Instrument Serif', serif;
      --ease:        cubic-bezier(.4,0,.2,1);
    }

    html, body { background: #ffffff !important; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body {
      font-family: var(--font);
      background: #fff;
      color: var(--ink);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* ═══ PARTICLE CANVAS ═══ */
    #pc {
      position: fixed; inset: 0; z-index: 0;
      pointer-events: none; opacity: .4;
    }

    /* ═══ HEX OVERLAY ═══ */
    .hex-bg {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z' fill='none' stroke='%231B2A4A' stroke-width='.3' stroke-opacity='.05'/%3E%3C/svg%3E");
      background-size: 56px 100px;
    }

    /* ═══ NAV ═══ */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      height: 64px;
      background: rgba(255,255,255,.94);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center;
    }
    .nav-inner {
      max-width: 1280px; margin: 0 auto; padding: 0 32px; width: 100%;
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .logo-mark {
      width: 34px; height: 34px; background: var(--navy); border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
    }
    .logo-mark svg { width: 18px; height: 18px; }
    .logo-name { display: flex; flex-direction: column; }
    .logo-name strong { font-size: .9rem; font-weight: 700; color: var(--navy); letter-spacing: .06em; line-height: 1.1; }
    .logo-name span { font-size: .62rem; color: var(--ink-light); letter-spacing: .04em; }
    .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
    .nav-links a { font-size: .82rem; font-weight: 400; color: var(--ink-mid); text-decoration: none; transition: color .2s; }
    .nav-links a:hover { color: var(--navy); }
    .nav-links a.active { color: var(--navy); font-weight: 600; }
    .nav-cta { font-size: .78rem; font-weight: 600; color: var(--navy); text-decoration: none; transition: opacity .2s; }
    .nav-cta:hover { opacity: .6; }

    /* ═══ PAGE ═══ */
    .page { position: relative; z-index: 1; padding-top: 64px; }

    /* ═══ HERO ═══ */
    .pricing-hero {
      text-align: center;
      padding: 80px 32px 60px;
      max-width: 720px; margin: 0 auto;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 7px;
      border: 1px solid var(--border); border-radius: 100px;
      padding: 5px 14px; font-size: .68rem; font-weight: 600;
      letter-spacing: .1em; text-transform: uppercase;
      color: var(--ink-mid); margin-bottom: 24px;
      background: rgba(255,255,255,.8);
    }
    .hero-badge-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--green);
      animation: pulse-g 2s ease infinite;
    }
    @keyframes pulse-g { 0%,100%{box-shadow:0 0 0 0 rgba(56,161,105,.5)} 50%{box-shadow:0 0 0 5px rgba(56,161,105,0)} }
    .pricing-hero h1 {
      font-family: var(--serif); font-size: 3.2rem; font-weight: 400;
      color: var(--navy); line-height: 1.15; margin-bottom: 16px;
    }
    .pricing-hero h1 em { font-style: italic; }
    .pricing-hero p {
      font-size: 1.05rem; color: var(--ink-light); max-width: 520px;
      margin: 0 auto 32px; line-height: 1.65;
    }

    /* billing toggle */
    .billing-toggle {
      display: inline-flex; align-items: center; gap: 12px;
      background: var(--bg); border: 1px solid var(--border);
      border-radius: 100px; padding: 4px;
      margin-bottom: 16px;
    }
    .toggle-btn {
      font-size: .8rem; font-weight: 500; color: var(--ink-mid);
      padding: 7px 18px; border-radius: 100px; cursor: pointer;
      transition: all .2s var(--ease); border: none; background: none;
      font-family: var(--font);
    }
    .toggle-btn.active {
      background: var(--navy); color: #fff;
      box-shadow: 0 2px 8px rgba(27,42,74,.2);
    }
    .save-badge {
      font-size: .65rem; font-weight: 700; color: var(--green);
      background: #F0FFF4; border: 1px solid #C6F6D5;
      border-radius: 100px; padding: 3px 10px;
      letter-spacing: .04em;
    }

    /* ═══ PRICING CARDS ═══ */
    .pricing-grid {
      max-width: 1280px; margin: 0 auto;
      padding: 0 32px 80px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      align-items: start;
    }

    .plan-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: var(--r-2xl);
      padding: 36px 32px 32px;
      box-shadow: var(--shadow-sm);
      position: relative; overflow: hidden;
      transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s;
    }
    .plan-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-lg);
    }
    /* animated top bar */
    .plan-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: var(--border); transition: background .3s;
    }
    .plan-card:hover::before { background: var(--navy); }

    /* POPULAR card */
    .plan-card.popular {
      border-color: var(--navy);
      box-shadow: var(--shadow-hero);
      transform: translateY(-8px) scale(1.02);
      background: var(--white);
    }
    .plan-card.popular::before { background: var(--navy); }
    .plan-card.popular:hover { transform: translateY(-14px) scale(1.02); }

    /* popular badge */
    .popular-badge {
      position: absolute; top: -1px; right: 28px;
      background: var(--navy); color: #fff;
      font-size: .62rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      padding: 5px 14px 6px; border-radius: 0 0 10px 10px;
    }

    /* subtle bg glow on popular */
    .plan-card.popular::after {
      content: ''; position: absolute; top: -60px; right: -60px;
      width: 200px; height: 200px; border-radius: 50%;
      background: radial-gradient(circle, rgba(27,42,74,.04) 0%, transparent 70%);
      pointer-events: none;
    }

    .plan-icon {
      width: 44px; height: 44px; border-radius: var(--r-md);
      background: var(--navy-faint); color: var(--navy);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 20px;
    }
    .plan-card.popular .plan-icon { background: var(--navy); color: #fff; }

    .plan-name {
      font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      color: var(--ink-faint); margin-bottom: 8px;
    }
    .plan-card.popular .plan-name { color: var(--navy); }

    .plan-title {
      font-family: var(--serif); font-size: 1.45rem; color: var(--navy);
      margin-bottom: 16px; line-height: 1.2;
    }

    .plan-price {
      display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px;
    }
    .price-currency { font-size: 1.2rem; font-weight: 600; color: var(--ink-mid); }
    .price-amount {
      font-family: var(--serif); font-size: 3.2rem; color: var(--navy);
      line-height: 1; font-weight: 400;
    }
    .price-period { font-size: .82rem; color: var(--ink-faint); }
    .plan-desc { font-size: .8rem; color: var(--ink-light); margin-bottom: 28px; line-height: 1.55; }

    /* CTA button */
    .plan-btn {
      display: flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; padding: 14px 20px;
      font-family: var(--font); font-size: .875rem; font-weight: 600;
      border-radius: var(--r-md); border: none; cursor: pointer;
      transition: all .2s var(--ease); text-decoration: none;
      position: relative; overflow: hidden;
    }
    .plan-btn.outline {
      background: transparent; color: var(--navy);
      border: 1.5px solid var(--border);
    }
    .plan-btn.outline:hover {
      border-color: var(--navy); background: var(--navy-faint);
      transform: translateY(-1px);
    }
    .plan-btn.filled {
      background: var(--navy); color: #fff;
      box-shadow: 0 4px 16px rgba(27,42,74,.2);
    }
    .plan-btn.filled::after {
      content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
    }
    .plan-btn.filled:hover::after { animation: shimmer .5s ease forwards; }
    @keyframes shimmer { to { left: 140%; } }
    .plan-btn.filled:hover {
      background: var(--navy2); transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(27,42,74,.28);
    }
    .btn-arr { transition: transform .2s; }
    .plan-btn:hover .btn-arr { transform: translateX(3px); }

    /* divider */
    .plan-divider {
      height: 1px; background: var(--border-soft); margin: 24px 0;
    }

    /* features list */
    .features-label {
      font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      color: var(--ink-faint); margin-bottom: 14px;
    }
    .feature-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .feature-item {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: .82rem; color: var(--ink-mid); line-height: 1.45;
    }
    .feat-check {
      width: 18px; height: 18px; border-radius: 50%;
      background: var(--navy-faint); color: var(--navy);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .plan-card.popular .feat-check { background: #EBF4FF; color: var(--navy); }

    /* ═══ TRUST BADGES ═══ */
    .trust-section {
      max-width: 1280px; margin: 0 auto;
      padding: 0 32px 80px;
      display: grid; grid-template-columns: repeat(4,1fr); gap: 20px;
    }
    .trust-card {
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--r-lg); padding: 24px 20px;
      display: flex; align-items: flex-start; gap: 14px;
      box-shadow: var(--shadow-xs);
      transition: transform .2s, box-shadow .2s;
    }
    .trust-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }
    .trust-icon {
      width: 40px; height: 40px; border-radius: var(--r-sm); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .ti-navy   { background: var(--navy-faint); color: var(--navy); }
    .ti-green  { background: #F0FFF4; color: #276749; }
    .ti-purple { background: #EDE9FE; color: #6D28D9; }
    .ti-blue   { background: #EBF8FF; color: #2B6CB0; }
    .trust-card strong { display: block; font-size: .82rem; color: var(--navy); margin-bottom: 4px; font-weight: 600; }
    .trust-card p { font-size: .74rem; color: var(--ink-light); line-height: 1.5; }

    /* ═══ COMPARISON TABLE ═══ */
    .compare-section {
      max-width: 1000px; margin: 0 auto; padding: 0 32px 80px;
    }
    .section-eyebrow {
      font-size: .68rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
      color: var(--ink-faint); margin-bottom: 8px; text-align: center;
    }
    .section-title {
      font-family: var(--serif); font-size: 2rem; font-weight: 400;
      color: var(--navy); text-align: center; margin-bottom: 8px;
    }
    .section-sub {
      font-size: .875rem; color: var(--ink-light);
      text-align: center; margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto;
    }

    .compare-table {
      width: 100%; border-collapse: separate; border-spacing: 0;
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--r-xl); overflow: hidden;
      box-shadow: var(--shadow-sm);
    }
    .compare-table thead tr th {
      padding: 20px 18px;
      font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
      color: var(--ink-mid); background: var(--bg);
      border-bottom: 1px solid var(--border);
      text-align: left;
    }
    .compare-table thead tr th:first-child { border-radius: var(--r-xl) 0 0 0; }
    .compare-table thead tr th:last-child  { border-radius: 0 var(--r-xl) 0 0; }
    .compare-table thead tr th.col-popular {
      background: var(--navy); color: rgba(255,255,255,.85);
      border-bottom-color: rgba(255,255,255,.1);
    }
    .compare-table tbody tr td {
      padding: 14px 18px;
      font-size: .82rem; color: var(--ink-mid);
      border-bottom: 1px solid var(--border-soft);
      vertical-align: middle;
    }
    .compare-table tbody tr:last-child td { border-bottom: none; }
    .compare-table tbody tr td.col-popular { background: rgba(27,42,74,.02); }
    .compare-table tbody tr td:first-child { font-weight: 500; color: var(--ink); }
    .compare-table tbody tr:hover td { background: var(--bg); }
    .compare-table tbody tr:hover td.col-popular { background: rgba(27,42,74,.04); }

    .check-yes {
      width: 22px; height: 22px; border-radius: 50%; background: var(--navy-faint);
      display: inline-flex; align-items: center; justify-content: center; color: var(--navy);
    }
    .check-no {
      width: 22px; height: 22px; border-radius: 50%; background: var(--border-soft);
      display: inline-flex; align-items: center; justify-content: center; color: var(--ink-faint);
    }

    /* category row */
    .cat-row td {
      background: var(--bg) !important;
      font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
      color: var(--ink-faint) !important; padding: 10px 18px !important;
    }
    .cat-row td.col-popular { background: rgba(27,42,74,.04) !important; }

    /* ═══ FAQ ═══ */
    .faq-section {
      max-width: 720px; margin: 0 auto; padding: 0 32px 80px;
    }
    .faq-list { display: flex; flex-direction: column; gap: 2px; margin-top: 40px; }
    .faq-item {
      background: var(--white); border: 1px solid var(--border);
      border-radius: var(--r-lg); overflow: hidden;
      transition: box-shadow .2s;
    }
    .faq-item:hover { box-shadow: var(--shadow-xs); }
    .faq-q {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 22px; cursor: pointer;
      font-size: .9rem; font-weight: 500; color: var(--navy);
      user-select: none;
      transition: background .2s;
    }
    .faq-q:hover { background: var(--bg); }
    .faq-arrow {
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--navy-faint); color: var(--navy);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: transform .3s var(--ease), background .2s;
    }
    .faq-item.open .faq-arrow { transform: rotate(180deg); background: var(--navy); color: #fff; }
    .faq-a {
      max-height: 0; overflow: hidden;
      transition: max-height .35s var(--ease), padding .35s;
      font-size: .84rem; color: var(--ink-light); line-height: 1.65;
      padding: 0 22px;
    }
    .faq-item.open .faq-a { max-height: 200px; padding: 0 22px 18px; }

    /* ═══ BOTTOM CTA ═══ */
    .bottom-cta {
      margin: 0 32px 80px;
      max-width: calc(1280px - 64px); margin-left: auto; margin-right: auto;
      background: var(--navy); border-radius: var(--r-2xl);
      padding: 60px 48px;
      display: grid; grid-template-columns: 1fr auto;
      align-items: center; gap: 40px;
      position: relative; overflow: hidden;
    }
    /* shimmer sweep across CTA */
    .bottom-cta::before {
      content: ''; position: absolute; top: 0; left: -150%; width: 80%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.04), transparent);
      animation: cta-sweep 5s ease infinite;
    }
    @keyframes cta-sweep { 0%{left:-150%} 100%{left:150%} }
    /* hex pattern inside CTA */
    .bottom-cta::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z' fill='none' stroke='%23ffffff' stroke-width='.4' stroke-opacity='.04'/%3E%3C/svg%3E");
      background-size: 56px 100px;
    }
    .cta-text { position: relative; z-index: 1; }
    .cta-text h2 {
      font-family: var(--serif); font-size: 2rem; font-weight: 400;
      color: #fff; margin-bottom: 10px; line-height: 1.2;
    }
    .cta-text h2 em { font-style: italic; opacity: .8; }
    .cta-text p { font-size: .9rem; color: rgba(255,255,255,.6); line-height: 1.55; }
    .cta-actions { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
    .cta-btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: #fff; color: var(--navy);
      font-family: var(--font); font-size: .875rem; font-weight: 600;
      padding: 14px 28px; border-radius: var(--r-md);
      text-decoration: none; white-space: nowrap;
      transition: transform .2s, box-shadow .2s;
      box-shadow: 0 4px 16px rgba(0,0,0,.15);
    }
    .cta-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.2); }
    .cta-btn-secondary {
      font-size: .78rem; color: rgba(255,255,255,.55);
      text-decoration: none; transition: color .2s;
    }
    .cta-btn-secondary:hover { color: rgba(255,255,255,.85); }

    /* ═══ FOOTER ═══ */
    footer {
      border-top: 1px solid var(--border); padding: 24px 32px;
      max-width: 1280px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .foot-logo { display: flex; align-items: center; gap: 8px; }
    .foot-mark {
      width: 26px; height: 26px; background: var(--navy); border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
    }
    .foot-mark svg { width: 13px; height: 13px; }
    .foot-name { font-size: .78rem; font-weight: 700; color: var(--navy); letter-spacing: .06em; }
    .foot-copy { font-size: .7rem; color: var(--ink-faint); }

    /* ═══ FADE IN ═══ */
    .fade { opacity: 0; transform: translateY(22px); animation: fadeUp .65s var(--ease) forwards; }
    .fade:nth-child(1){animation-delay:.05s}.fade:nth-child(2){animation-delay:.14s}
    .fade:nth-child(3){animation-delay:.23s}.fade:nth-child(4){animation-delay:.32s}
    .fade:nth-child(5){animation-delay:.41s}.fade:nth-child(6){animation-delay:.5s}
    @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }

    /* ═══ RESPONSIVE ═══ */
    @media(max-width:960px){
      .pricing-grid{grid-template-columns:1fr;max-width:480px;margin-left:auto;margin-right:auto;}
      .plan-card.popular{transform:none;}
      .trust-section{grid-template-columns:repeat(2,1fr);}
      .bottom-cta{grid-template-columns:1fr;text-align:center;}
      .cta-actions{align-items:center;}
      .pricing-hero h1{font-size:2.4rem;}
    }
    @media(max-width:640px){
      .nav-links{display:none;}
      .compare-table thead tr th, .compare-table tbody tr td{padding:10px 12px; font-size:.75rem;}
      .trust-section{grid-template-columns:1fr;}
      .faq-section,.compare-section{padding-left:16px;padding-right:16px;}
      .pricing-grid{padding-left:16px;padding-right:16px;}
      .pricing-hero{padding-left:16px;padding-right:16px;}
      footer{flex-direction:column;gap:8px;text-align:center;}
      .bottom-cta{padding:36px 24px;margin:0 16px 60px;}
    }
  </style>
</head>
<body>

<!-- CANVAS -->
<canvas id="pc"></canvas>
<div class="hex-bg" aria-hidden="true"></div>

<!-- NAV -->
<nav>
  <div class="nav-inner">
    <a href="/" class="logo">
      <div class="logo-mark">
        <svg viewBox="0 0 20 20" fill="none"><path d="M3 5L10 15L17 5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="logo-name">
        <strong>VIREON</strong>
        <span>Property Intelligence</span>
      </div>
    </a>
    <ul class="nav-links">
      <li><a href="/platform">Platform</a></li>
      <li><a href="/ai-intelligence">AI Intelligence</a></li>
      <li><a href="/digital-twin">Digital Twin</a></li>
      <li><a href="/ai-systems">AI Systems</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/pricing" class="active">Pricing</a></li>
      <li><a href="/roadmap">Roadmap</a></li>
    </ul>
    <a href="/analyze" class="nav-cta">Free AI Analysis</a>
  </div>
</nav>

<div class="page">

  <!-- HERO -->
  <div class="pricing-hero">
    <div class="hero-badge"><span class="hero-badge-dot"></span>Transparent Pricing</div>
    <h1>Simple pricing,<br/><em>powerful intelligence</em></h1>
    <p>Choose the plan that fits your needs. Every report powered by VIREON's AI engine — no hidden fees, no subscriptions unless you need them.</p>
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">
      <div class="billing-toggle">
        <button class="toggle-btn active" id="toggleOne">One-time</button>
        <button class="toggle-btn" id="toggleMonthly">Monthly</button>
      </div>
      <span class="save-badge">Save 20% monthly</span>
    </div>
  </div>

  <!-- PRICING CARDS -->
  <div class="pricing-grid">

    <!-- BASIC -->
    <div class="plan-card fade">
      <div class="plan-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>
      <div class="plan-name">Starter</div>
      <div class="plan-title">Basic Property Report</div>
      <div class="plan-price">
        <span class="price-currency">£</span>
        <span class="price-amount" data-base="49" data-monthly="39">49</span>
        <span class="price-period">&nbsp;one-time</span>
      </div>
      <div class="plan-desc">Perfect for homeowners wanting a clear picture of their property's energy performance and quick wins.</div>
      <button class="plan-btn outline" onclick="handleCheckout('basic')">
        <span>Get Basic Report</span>
        <svg class="btn-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <div class="plan-divider"></div>
      <div class="features-label">What's included</div>
      <ul class="feature-list">
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          AI property assessment
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Energy efficiency analysis
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          EPC improvement recommendations
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Estimated annual savings
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Downloadable PDF report
        </li>
      </ul>
    </div>

    <!-- PROFESSIONAL (POPULAR) -->
    <div class="plan-card popular fade">
      <div class="popular-badge">Most Popular</div>
      <div class="plan-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <div class="plan-name">Professional</div>
      <div class="plan-title">Professional Retrofit Report</div>
      <div class="plan-price">
        <span class="price-currency">£</span>
        <span class="price-amount" data-base="149" data-monthly="119">149</span>
        <span class="price-period">&nbsp;one-time</span>
      </div>
      <div class="plan-desc">Comprehensive retrofit intelligence for landlords, buyers, and property professionals who need full detail.</div>
      <button class="plan-btn filled" onclick="handleCheckout('professional')">
        <span>Get Professional Report</span>
        <svg class="btn-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <div class="plan-divider"></div>
      <div class="features-label">Everything in Basic, plus</div>
      <ul class="feature-list">
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Detailed retrofit roadmap
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Carbon reduction analysis
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Renewable energy recommendations
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Full ROI calculations
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Priority upgrade ranking
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Downloadable professional PDF
        </li>
      </ul>
    </div>

    <!-- ENTERPRISE -->
    <div class="plan-card fade">
      <div class="plan-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      </div>
      <div class="plan-name">Enterprise</div>
      <div class="plan-title">Enterprise &amp; Partner Plan</div>
      <div class="plan-price">
        <span class="price-currency">£</span>
        <span class="price-amount" data-base="249" data-monthly="199">249</span>
        <span class="price-period">&nbsp;/ month</span>
      </div>
      <div class="plan-desc">Full platform access for contractors, consultants, and businesses who need unlimited scale and white-label capability.</div>
      <button class="plan-btn outline" onclick="handleCheckout('enterprise')">
        <span>Start Enterprise Plan</span>
        <svg class="btn-arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
      <div class="plan-divider"></div>
      <div class="features-label">Full platform access</div>
      <ul class="feature-list">
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Unlimited property analyses
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Contractor dashboard
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Lead management system
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          White-label reports
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Full API access
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Priority support
        </li>
        <li class="feature-item">
          <span class="feat-check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          Marketplace access
        </li>
      </ul>
    </div>
  </div>

  <!-- TRUST BADGES -->
  <div class="trust-section">
    <div class="trust-card fade">
      <div class="trust-icon ti-navy">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      </div>
      <div><strong>Secure Checkout</strong><p>256-bit SSL encryption on all transactions via Stripe.</p></div>
    </div>
    <div class="trust-card fade">
      <div class="trust-icon ti-green">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div><strong>GDPR Compliant</strong><p>Your data is processed under UK GDPR. Never sold or shared.</p></div>
    </div>
    <div class="trust-card fade">
      <div class="trust-icon ti-purple">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div><strong>Instant Delivery</strong><p>Reports generated and delivered in under 60 seconds.</p></div>
    </div>
    <div class="trust-card fade">
      <div class="trust-icon ti-blue">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      </div>
      <div><strong>UK Support</strong><p>Our UK-based team responds within one business day.</p></div>
    </div>
  </div>

  <!-- COMPARISON TABLE -->
  <div class="compare-section">
    <p class="section-eyebrow">Compare Plans</p>
    <h2 class="section-title">What's in each plan</h2>
    <p class="section-sub">A full breakdown of every feature across all three tiers.</p>

    <table class="compare-table">
      <thead>
        <tr>
          <th style="width:38%">Feature</th>
          <th style="text-align:center">Basic<br/><span style="font-size:.65rem;opacity:.6;font-weight:400;text-transform:none;letter-spacing:0">£49</span></th>
          <th class="col-popular" style="text-align:center">Professional<br/><span style="font-size:.65rem;opacity:.6;font-weight:400;text-transform:none;letter-spacing:0">£149</span></th>
          <th style="text-align:center">Enterprise<br/><span style="font-size:.65rem;opacity:.6;font-weight:400;text-transform:none;letter-spacing:0">£249/mo</span></th>
        </tr>
      </thead>
      <tbody>
        <tr class="cat-row"><td colspan="4">Core Analysis</td></tr>
        <tr>
          <td>AI property assessment</td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Energy efficiency analysis</td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>EPC improvement recommendations</td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Estimated savings</td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>PDF report</td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>

        <tr class="cat-row"><td colspan="4">Retrofit Intelligence</td></tr>
        <tr>
          <td>Detailed retrofit roadmap</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Carbon reduction analysis</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Renewable energy recommendations</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>ROI calculations</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Priority upgrade ranking</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>

        <tr class="cat-row"><td colspan="4">Enterprise Features</td></tr>
        <tr>
          <td>Unlimited analyses</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Contractor dashboard</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>White-label reports</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>API access</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Priority support</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
        <tr>
          <td>Marketplace access</td>
          <td style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td class="col-popular" style="text-align:center"><span class="check-no"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span></td>
          <td style="text-align:center"><span class="check-yes"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- FAQ -->
  <div class="faq-section">
    <p class="section-eyebrow">FAQ</p>
    <h2 class="section-title">Common questions</h2>
    <p class="section-sub">Everything you need to know before you buy.</p>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          How quickly will I receive my report?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">Reports are generated by our AI engine in under 60 seconds and delivered instantly to your email. You can also download directly from the results page.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          What data does VIREON use to generate reports?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">We combine the UK Government's EPC open data register, satellite imagery, BREEAM benchmarks, local energy tariff data, and our proprietary AI model trained on millions of UK property records.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Can I get a refund if I'm not satisfied?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">Yes — we offer a 7-day satisfaction guarantee on all one-time reports. If you're not happy with the quality of your report, contact our support team and we'll issue a full refund, no questions asked.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Is my payment and property data secure?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">All payments are processed by Stripe with 256-bit SSL encryption. Your property and personal data is stored securely under UK GDPR compliance and is never sold or shared with third parties.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          How is the Enterprise plan billed?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">The Enterprise plan is billed monthly via Stripe subscription at £249/month. You can cancel at any time — there are no long-term contracts. Volume discounts are available for large teams; contact us to discuss.</div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          Can I upgrade from Basic to Professional later?
          <span class="faq-arrow"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </div>
        <div class="faq-a">Yes. If you purchase a Basic report and later decide you need the full Professional analysis for the same property, we'll credit your Basic payment — you only pay the difference of £100.</div>
      </div>
    </div>
  </div>

  <!-- BOTTOM CTA -->
  <div class="bottom-cta">
    <div class="cta-text">
      <h2>Not sure which plan<br/><em>is right for you?</em></h2>
      <p>Start with our free AI preview to see what VIREON's engine produces for your property — no payment required.</p>
    </div>
    <div class="cta-actions">
      <a href="/analyze" class="cta-btn-primary">
        Try Free AI Preview
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
      <a href="/contact" class="cta-btn-secondary">Talk to our team →</a>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="foot-logo">
      <div class="foot-mark"><svg viewBox="0 0 20 20" fill="none"><path d="M3 5L10 15L17 5" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <span class="foot-name">VIREON</span>
    </div>
    <div class="foot-copy">© 2026 VIREON AI Ltd · Regulated data processing · GDPR compliant</div>
  </footer>
</div>

<script>
  /* ── Particle canvas ── */
  const cv = document.getElementById('pc');
  const cx = cv.getContext('2d');
  let W, H, pts = [];
  function resize(){ W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for(let i=0;i<70;i++) pts.push({ x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, r:Math.random()*1.6+.3, o:Math.random()*.3+.04 });
  function draw(){
    cx.clearRect(0,0,W,H);
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ cx.beginPath(); cx.strokeStyle=`rgba(27,42,74,${.07*(1-d/120)})`; cx.lineWidth=.6; cx.moveTo(pts[i].x,pts[i].y); cx.lineTo(pts[j].x,pts[j].y); cx.stroke(); }
      }
    }
    pts.forEach(p=>{ cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2); cx.fillStyle=`rgba(27,42,74,${p.o})`; cx.fill(); p.x+=p.vx; p.y+=p.vy; if(p.x<-10)p.x=W+10; if(p.x>W+10)p.x=-10; if(p.y<-10)p.y=H+10; if(p.y>H+10)p.y=-10; });
    requestAnimationFrame(draw);
  }
  draw();

  /* ── Billing toggle ── */
  const btnOne = document.getElementById('toggleOne');
  const btnMon = document.getElementById('toggleMonthly');
  const amounts = document.querySelectorAll('.price-amount');
  let isMonthly = false;
  function setMode(monthly){
    isMonthly = monthly;
    btnOne.classList.toggle('active', !monthly);
    btnMon.classList.toggle('active', monthly);
    amounts.forEach(el=>{
      const val = monthly ? el.dataset.monthly : el.dataset.base;
      el.textContent = val;
    });
    document.querySelectorAll('.price-period').forEach((el,i)=>{
      const periods = monthly ? ['/ month','/ month','/ month'] : ['one-time','one-time','/ month'];
      el.textContent = '\u00a0' + periods[i];
    });
  }
  btnOne.addEventListener('click', ()=>setMode(false));
  btnMon.addEventListener('click', ()=>setMode(true));

  /* ── FAQ ── */
  function toggleFaq(el){
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!wasOpen) item.classList.add('open');
  }

  /* ── Checkout ── */
  function handleCheckout(plan){
    // Replace with your real Stripe checkout URLs / session creation
    const urls = {
      basic:        '/checkout/basic',
      professional: '/checkout/professional',
      enterprise:   '/checkout/enterprise'
    };
    window.location.href = urls[plan] || '/checkout';
  }
</script>
</body>
</html>
