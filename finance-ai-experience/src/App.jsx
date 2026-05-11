import React, { useEffect, useMemo, useState } from "react";

const milestones = [
  ["Aug 2024", "Enterprise AI Architecture", "Released the foundation for secure, scalable AI adoption."],
  ["Aug 2024", "Hybrid AI Whitelist", "Published guardrails for responsible experimentation."],
  ["Jan 2025", "AI Innovation Campaign", "Mobilized awareness and participation across the enterprise."],
  ["Mar 2025", "Adopter Play", "AI adoption became a corporate strategic KPI."],
  ["Mar 2025", "MyAI Launched", "Enabled employees to experience AI in daily work."],
  ["May 2025", "LeXiang Launched", "Scaled AI knowledge and learning into the organization."],
  ["Sep 2025", "EKM Initiative Kickoff", "Moved from isolated tools to enterprise knowledge mobilization."],
  ["Nov 2025", "AI Roadshow", "Brought AI demos, use cases and adoption energy to teams on the ground."],
];

const financeCases = [
  {
    icon: "▦",
    title: "Strategic planning and control",
    value: "Smarter decisions",
    headline: "From reporting the past to shaping the next move.",
    impact: [
      "6.2 General Ledger Accounting (RTR)",
      "6.9 Consolidation (Group Reporting)",
      "6.10 Enterprise Performance Mgmt.",
    ],
    caseStudy: [
      "30% ↓ analyst time on budget variance analysis",
      "Faster scenario-based decision-making",
    ],
  },
  {
    icon: "$",
    title: "Cash and working capital management",
    value: "Stronger cash flow",
    headline: "From reactive collection to forward-looking cash visibility.",
    impact: [
      "6.4 Accounts Payable (PTP)",
      "6.5 Accounts Receivable (OTC)",
      "6.12 Treasury Management",
    ],
    caseStudy: [
      "8–15 days ↓ in DSO",
      "30% ↑ in cash flow forecast accuracy",
    ],
  },
  {
    icon: "⌁",
    title: "Cost optimization",
    value: "Lower cost",
    headline: "From manual leakage checks to always-on spend intelligence.",
    impact: [
      "6.4 Accounts Payable (PTP)",
      "6.8 Product Costing",
      "6.11 Tax Management",
    ],
    caseStudy: [
      "~$40M recovered via contract leakage",
      "10% ↓ indirect spend across procurement",
    ],
  },
];

const strategyStages = [
  {
    icon: "⟡",
    label: "01",
    year: "FY24/25",
    title: "AI Assistant",
    role: "Tool layer",
    body: "Provides analysis and Q&A, assists in decision-making.",
    signal: "Human asks. AI responds.",
  },
  {
    icon: "◇",
    label: "02",
    year: "FY25/26 → FY27/28",
    title: "AI Teammate",
    role: "Workflow layer",
    body: "Embeds in business processes, replacing selected manual work.",
    signal: "Human directs. AI collaborates.",
  },
  {
    icon: "◎",
    label: "03",
    year: "FY26/27 →",
    title: "AI Twin",
    role: "Operating layer",
    body: "Plans and executes tasks within boundaries; humans intervene in exceptions.",
    signal: "AI executes. Human governs.",
  },
];

const demoCards = [
  ["AI Knowledge Assistant", "Ask enterprise policy, strategy and process questions", "gif", "ai-knowledge-demo.gif"],
  ["Finance Insight Generator", "Upload data → get variance narrative and risks", "video", "finance-insight-demo.mp4"],
  ["Second Brain Agent", "Search final materials and generate CDTO-ready insight", "video", "second-brain-demo.mp4"],
];

function Style() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: #050816; }
      .page {
        min-height: 100svh;
        height: 100svh;
        background: #050816;
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-snap-type: y mandatory;
      }
      .section {
        position: relative;
        height: 100svh;
        padding: 7vh 7vw;
        display: flex;
        align-items: center;
        overflow: hidden;
        scroll-snap-align: start;
      }
      .stack { position: relative; z-index: 2; width: 100%; max-width: 1240px; margin: 0 auto; }
      .center { text-align: center; }
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 15px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 999px;
        background: rgba(255,255,255,.055);
        color: rgba(191, 240, 255, .82);
        font-size: 12px;
        letter-spacing: .22em;
        text-transform: uppercase;
        font-weight: 700;
        backdrop-filter: blur(18px);
      }
      h1, h2, h3, p { margin: 0; }
      h1 {
        margin-top: 28px;
        font-size: clamp(72px, 13vw, 170px);
        line-height: .88;
        letter-spacing: -.075em;
        font-weight: 760;
      }
      h2 {
        margin-top: 28px;
        font-size: clamp(48px, 7vw, 94px);
        line-height: .95;
        letter-spacing: -.065em;
        font-weight: 760;
      }
      h3 { font-size: 28px; line-height: 1.04; letter-spacing: -.035em; }
      .lead {
        margin-top: 28px;
        max-width: 780px;
        font-size: clamp(21px, 2.2vw, 30px);
        line-height: 1.35;
        color: rgba(255,255,255,.66);
      }
      .center .lead { margin-left: auto; margin-right: auto; }
      .muted { color: rgba(255,255,255,.46); }
      .hero:before {
        content: "";
        position: absolute;
        inset: -20%;
        background:
          radial-gradient(circle at 50% 0%, rgba(126, 87, 255, .28), transparent 36%),
          radial-gradient(circle at 85% 75%, rgba(0, 132, 255, .16), transparent 34%),
          radial-gradient(circle at 20% 80%, rgba(0, 245, 255, .10), transparent 26%);
        animation: breathe 9s ease-in-out infinite;
      }
      .hero:after, .gridbg:after {
        content: "";
        position: absolute;
        inset: 0;
        background-image: linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px);
        background-size: 64px 64px;
        opacity: .12;
        mask-image: radial-gradient(circle, black 0%, transparent 72%);
      }
      @keyframes breathe { 0%,100%{ transform: scale(1); opacity:.88 } 50%{ transform: scale(1.08); opacity:1 } }
      @keyframes rise { from { opacity:0; transform: translateY(28px); filter: blur(12px); } to { opacity:1; transform: translateY(0); filter: blur(0); } }
      .rise { opacity: 0; animation: rise .9s cubic-bezier(.2,.8,.2,1) forwards; }
      .d1 { animation-delay: .12s; } .d2 { animation-delay: .24s; } .d3 { animation-delay: .36s; } .d4 { animation-delay: .48s; }
      .buttons { margin-top: 52px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
      .button {
        appearance: none;
        border: 0;
        cursor: pointer;
        font: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 54px;
        padding: 0 26px;
        border-radius: 999px;
        font-weight: 750;
        text-decoration: none;
        transition: transform .2s ease, background .2s ease;
      }
      .button:hover { transform: translateY(-2px); }
      .primary { background: #fff; color: #08101f; box-shadow: 0 22px 80px rgba(255,255,255,.12); }
      .secondary { color: rgba(255,255,255,.86); background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); }
      .split { display: grid; grid-template-columns: .94fr 1.06fr; gap: 70px; align-items: center; }
      .cards2 { margin-top: 42px; display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
      .card, .stage, .metric, .demo, .case, .moment {
        border: 1px solid rgba(255,255,255,.11);
        background: rgba(255,255,255,.06);
        border-radius: 32px;
        backdrop-filter: blur(18px);
        box-shadow: 0 22px 70px rgba(0,0,0,.26);
      }
      .card { padding: 24px; }
      .smalltitle { color: rgb(177, 240, 255); font-size: 14px; font-weight: 800; margin-bottom: 8px; }
      .smallbody { color: rgba(255,255,255,.56); line-height: 1.55; font-size: 15px; }
      .portrait {
        position: relative;
        aspect-ratio: 4/5;
        border-radius: 46px;
        border: 1px solid rgba(255,255,255,.12);
        background: linear-gradient(145deg, rgba(255,255,255,.12), rgba(255,255,255,.035));
        overflow: hidden;
        box-shadow: 0 30px 110px rgba(42, 65, 255, .18);
      }
      .portraitImage { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 46px; }
      .portraitPhoto { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 46px; opacity: 0; transition: opacity 1.6s ease; }
      .portraitPhoto.fadeIn { opacity: 1; }
      .portraitPhoto.fadeOut { opacity: 0; }
      .photoText { position: absolute; inset: 0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding: 48px; color: rgba(255,255,255,.58); }
      .avatar { width: 120px; height:120px; border-radius: 50%; border: 1px solid rgba(255,255,255,.16); display:flex; align-items:center; justify-content:center; font-size: 50px; background: rgba(255,255,255,.07); margin-bottom: 26px; }
      .caption { position:absolute; left:0; right:0; bottom:0; padding:32px; background: linear-gradient(to top, rgba(5,8,22,.95), rgba(5,8,22,.58), transparent); }
      .stages { margin-top: 70px; display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; }
      .stage { position: relative; min-height: 380px; padding: 34px; overflow:hidden; }
      .stage:before { content:""; position:absolute; right:-70px; top:-90px; width:220px; height:220px; border-radius:50%; background: rgba(116,76,255,.22); filter: blur(34px); }
      .stage:after { content:""; position:absolute; left:34px; right:34px; bottom:88px; height:1px; background:linear-gradient(90deg, rgba(177,240,255,.45), transparent); }
      .icon { position: relative; width: 58px; height: 58px; border-radius: 20px; display:flex; align-items:center; justify-content:center; background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); font-size: 28px; font-weight: 800; color: #b1f0ff; }
      .stageTop { position: relative; display:flex; align-items:center; justify-content:space-between; }
      .stageNo { color:rgba(255,255,255,.24); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size:13px; letter-spacing:.2em; }
      .year { position:relative; margin-top: 34px; color: rgba(255,255,255,.43); font-size: 12px; letter-spacing:.24em; text-transform: uppercase; font-weight:800; }
      .role { position:relative; margin-top: 14px; color:#b1f0ff; font-size:13px; letter-spacing:.16em; text-transform:uppercase; font-weight:800; }
      .stage h3 { position:relative; margin-top: 10px; color:white; }
      .stage p { position:relative; margin-top: 18px; color: rgba(255,255,255,.58); font-size: 18px; line-height:1.48; }
      .signal { position:absolute; left:34px; right:34px; bottom:30px; color:rgba(255,255,255,.72); font-size:15px; font-weight:700; }
      .timeline { margin-top: 66px; display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 18px; }
      .mile { min-height: 216px; padding: 25px; border-radius: 28px; border: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.055); position:relative; }
      .mile:after { content:""; position:absolute; right:22px; top:22px; width:8px; height:8px; border-radius:50%; background:#83efff; box-shadow: 0 0 26px #83efff; }
      .mileDate { color: rgba(177,240,255,.72); font-size: 13px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing:.18em; text-transform:uppercase; }
      .mile h3 { margin-top: 36px; font-size: 24px; }
      .mile p { margin-top: 14px; color: rgba(255,255,255,.52); font-size: 14px; line-height:1.5; }
      .light { background: #fff; color:#08101f; }
      .light:before { content:""; position:absolute; inset:0; background: radial-gradient(circle at 10% 20%, rgba(0,105,255,.14), transparent 30%), radial-gradient(circle at 90% 80%, rgba(120,54,255,.13), transparent 34%); }
      .light .eyebrow { color: rgba(15,23,42,.62); border-color: rgba(15,23,42,.1); background: rgba(15,23,42,.045); }
      .metrics { margin-top: 66px; display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 18px; }
      .metric { background: rgba(255,255,255,.75); border-color: rgba(15,23,42,.1); color:#08101f; padding: 34px; box-shadow: 0 28px 80px rgba(15,23,42,.10); }
      .metricIcon { color: rgba(15,23,42,.5); font-size: 26px; }
      .metricValue { margin-top: 44px; font-size: 58px; line-height:.9; letter-spacing:-.065em; font-weight: 800; }
      .metricLabel { margin-top: 18px; color: rgba(15,23,42,.62); font-size: 18px; line-height:1.24; }
      .demos, .cases { margin-top: 58px; display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; }
      .demo { overflow:hidden; }
      .demoMedia { width: 100%; height: 100%; object-fit: cover; border-radius: 32px; }
      .video:before { content:""; position:absolute; inset:0; background-image: linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px); background-size:32px 32px; opacity:.25; }
      .play { position:relative; width:70px; height:70px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,.2); background:rgba(0,0,0,.28); font-size:28px; }
      .tag { position:relative; margin-top:18px; padding:8px 13px; border:1px solid rgba(255,255,255,.13); border-radius:999px; background:rgba(0,0,0,.3); color:rgba(255,255,255,.65); font-size:11px; letter-spacing:.17em; font-weight:800; }
      .demoBody, .case { padding: 28px; }
      .demoBody p, .case p { margin-top:12px; color:rgba(255,255,255,.55); line-height:1.52; }
      .case { min-height: 235px; }
      .caseIcon { font-size: 28px; color:#adf4ff; }
      .case h3 { margin-top:34px; font-size:26px; }
      .financeTakeaway {
        margin-top: 28px;
        padding: 22px 26px;
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 28px;
        background: linear-gradient(90deg, rgba(239,68,68,.18), rgba(59,130,246,.09), rgba(255,255,255,.055));
        color: rgba(255,255,255,.78);
        font-size: 18px;
        line-height: 1.5;
      }
      .financeGrid { margin-top: 34px; display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 22px; }
      .financeCard { min-height: auto; padding: 30px; position: relative; overflow: hidden; }
      .financeCard:before { content:""; position:absolute; right:-60px; top:-60px; width:170px; height:170px; border-radius:50%; background:rgba(59,130,246,.14); filter:blur(24px); }
      .financeCard:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, rgba(255,255,255,.035), transparent 45%); pointer-events:none; }
      .financeIcon { position:relative; width:60px; height:60px; border-radius:22px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,.13); background:rgba(255,255,255,.07); color:#b1f0ff; font-size:28px; font-weight:850; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      .financeValue { position:relative; margin-top:18px; color:#b1f0ff; font-size:13px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
      .financeHeadline { position:relative; margin-top:14px; color:rgba(255,255,255,.72); font-size:15px; line-height:1.45; }
      .financeLabel { position:relative; margin-top:22px; color:white; font-weight:800; font-size:14px; }
      .financeList { position:relative; margin:10px 0 0; padding-left:18px; color:rgba(255,255,255,.58); line-height:1.55; font-size:14px; }
      .financeList li { margin-bottom: 5px; }
      .bridgeGrid { margin-top: 46px; display:grid; grid-template-columns: .8fr 1.2fr; gap: 22px; align-items:stretch; }
      .bridgePanel { border:1px solid rgba(255,255,255,.11); background:rgba(255,255,255,.06); border-radius:32px; padding:30px; backdrop-filter: blur(18px); }
      .bridgeLabel { color:#b1f0ff; font-size:12px; letter-spacing:.18em; text-transform:uppercase; font-weight:800; }
      .bridgeText { margin-top:18px; color:rgba(255,255,255,.72); font-size:24px; line-height:1.25; letter-spacing:-.03em; font-weight:720; }
      .bridgeBullets { display:grid; gap:14px; }
      .bridgeItem { border:1px solid rgba(255,255,255,.1); background:rgba(0,0,0,.16); border-radius:22px; padding:18px 20px; color:rgba(255,255,255,.67); line-height:1.45; }
      .bridgeItem strong { color:white; }
      .moments { display:flex; flex-direction:column; gap:16px; }
      .moment { display:flex; gap:22px; padding:24px; }
      .timeIcon { width:58px; height:58px; border-radius:20px; background:rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .time { color:rgba(255,255,255,.42); font-size:13px; letter-spacing:.2em; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      .momentText { margin-top:8px; color:rgba(255,255,255,.78); font-size:21px; line-height:1.25; }
      .status {
        position:fixed; right:24px; bottom:24px; z-index:10;
        display:flex; align-items:center; gap:12px;
        border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.07);
        backdrop-filter: blur(18px);
        border-radius:999px;
        padding:13px 17px;
        color:rgba(255,255,255,.76);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size:13px;
        box-shadow: 0 18px 60px rgba(0,0,0,.35);
      }
      .dot { width:9px; height:9px; border-radius:50%; background:#86f2ff; box-shadow: 0 0 22px #86f2ff; animation: pulse 1.3s ease-in-out infinite; }
      @keyframes pulse { 0%,100% { opacity:.55; transform:scale(.8);} 50% { opacity:1; transform:scale(1.15);} }
      .progress { position:fixed; left:0; top:0; height:4px; background:linear-gradient(90deg,#60a5fa,#a78bfa,#67e8f9); z-index:20; width: var(--scroll, 0%); }
      .finalIcon { margin: 0 auto 40px; width:86px; height:86px; border-radius:30px; display:flex; align-items:center; justify-content:center; background:#08101f; color:white; font-size:36px; box-shadow: 0 26px 70px rgba(15,23,42,.16); }
      @media (max-width: 980px) {
        .section { padding: 74px 24px; }
        .split, .stages, .timeline, .metrics, .demos, .cases, .financeGrid, .bridgeGrid { grid-template-columns: 1fr; }
        .cards2 { grid-template-columns: 1fr; }
        .status { display:none; }
        h1 { font-size: clamp(68px, 18vw, 110px); }
      }
    `}</style>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function AIStatus() {
  const [idx, setIdx] = useState(0);
  const lines = useMemo(() => ["FinanceAI // listening", "Enterprise roadmap loaded", "215 use cases detected", "Demo environment ready"], []);
  useEffect(() => {
    const timer = setInterval(() => setIdx((v) => (v + 1) % lines.length), 2400);
    return () => clearInterval(timer);
  }, [lines.length]);
  return <div className="status"><span className="dot" />{lines[idx]}</div>;
}

function MediaBlock({ type, src, alt = "", className = "", ...props }) {
  const basePath = "/finance-ai-experience/assets";
  const fullSrc = `${basePath}/${type}s/${src}`;

  if (type === "image" || type === "gif" || type === "map") {
    return <img src={fullSrc} alt={alt} className={className} {...props} />;
  } else if (type === "video") {
    return (
      <video
        src={fullSrc}
        className={className}
        muted
        loop
        autoPlay
        playsInline
        {...props}
      />
    );
  }
  return null;
}

function Section({ children, className = "", id }) {
  return <section id={id} className={`section ${className}`}>{children}</section>;
}

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function Eyebrow({ children }) {
  return <div className="eyebrow">✦ {children}</div>;
}

export default function FinanceAIExperience() {
  const progress = useScrollProgress();
  const [showAltPhoto, setShowAltPhoto] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowAltPhoto((value) => !value), 5200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main.page > section'));

    const getCurrentIndex = () => {
      const position = window.scrollY;
      return sections.findIndex((section, index) => {
        const top = section.offsetTop;
        const nextTop = sections[index + 1]?.offsetTop ?? Number.POSITIVE_INFINITY;
        return position >= top - 10 && position < nextTop - 10;
      });
    };

    const scrollToSection = (index) => {
      const target = sections[Math.max(0, Math.min(index, sections.length - 1))];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const onKeyDown = (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      } else {
        return;
      }

      const currentIndex = getCurrentIndex();

      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        scrollToSection(currentIndex + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        scrollToSection(currentIndex - 1);
      } else if (event.key === 'Home') {
        scrollToSection(0);
      } else if (event.key === 'End') {
        scrollToSection(sections.length - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className="page" style={{ "--scroll": `${progress}%` }}>
      <Style />
      <div className="progress" />
      <AIStatus />

      <Section className="hero center">
        <div className="stack center">
          <div className="rise d1" style={{ color: "rgba(255,255,255,.45)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: ".34em", textTransform: "uppercase", fontSize: 13 }}>
            Initializing Finance AI Experience
          </div>
          <h1 className="rise d2">Finance,<br />meet AI.</h1>
          <p className="lead rise d3">A 60-minute launch experience introducing Robert Li, Lenovo’s Enterprise AI journey, and the next operating model for Finance.</p>
          <div className="buttons rise d4">
            <button className="button primary" type="button" onClick={() => scrollToSection("robert")}>Start Experience</button>
            <button className="button secondary" type="button" onClick={() => scrollToSection("demo")}>View Demo Flow</button>
          </div>
        </div>
      </Section>

      <Section id="robert" className="gridbg">
        <div className="stack split">
          <div>
            <Eyebrow>Meet the human</Eyebrow>
            <h2>Robert Li</h2>
            <p className="lead">25+ years across Sales, Operations and Digital Transformation.</p>
            <p style={{ marginTop: 30, maxWidth: 700, color: "rgba(255,255,255,.58)", fontSize: 18, lineHeight: 1.7 }}>
              Chief Digital Transformation Officer at Lenovo — driving Enterprise AI adoption and unlocking value across the organization.
            </p>
            <div className="cards2">
              {["Sales|Built market presence and customer relationships", "Operations|Led efficiency and process optimization", "Malaysia|Head of Group Operations", "China|Head of Sales & Operations"].map((item) => {
                const [title, body] = item.split("|");
                return <div className="card" key={title}><div className="smalltitle">{title}</div><div className="smallbody">{body}</div></div>;
              })}
            </div>
          </div>
          <div className="portrait">
            <MediaBlock type="image" src="Robert_Li_Avatar.jpg" className={`portraitPhoto ${showAltPhoto ? "fadeOut" : "fadeIn"}`} alt="Robert Li avatar" />
            <MediaBlock type="image" src="Robert_Li_Profile.jpg" className={`portraitPhoto ${showAltPhoto ? "fadeIn" : "fadeOut"}`} alt="Robert Li profile" />
            <div className="caption"><div style={{ fontSize: 12, letterSpacing: ".24em", color: "#b1f0ff", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>CDTO · LENOVO</div><div style={{ marginTop: 10, fontSize: 25, fontWeight: 760, letterSpacing: "-.03em" }}>Building the enterprise AI operating layer</div></div>
          </div>
        </div>
      </Section>

      <Section className="gridbg" style={{ background: "#060617" }}>
        <div className="stack">
          <Eyebrow>Act II · Enterprise AI Strategy</Eyebrow>
          <h2>AI is moving from tool to workflow to operating layer.</h2>
          <p className="lead">The vision: drive AI-native transformation, enable industry-leading ROI, and leverage Lenovo’s practice to support LPL.</p>
          <div className="stages">
            {strategyStages.map((stage) => (
              <div className="stage" key={stage.title}>
                <div className="stageTop"><div className="icon">{stage.icon}</div><div className="stageNo">{stage.label}</div></div>
                <div className="year">{stage.year}</div>
                <div className="role">{stage.role}</div>
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                <div className="signal">{stage.signal}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="gridbg">
        <div className="stack">
          <Eyebrow>Enterprise AI Journey</Eyebrow>
          <h2>Enterprise AI didn’t arrive overnight.<br /><span className="muted">It accelerated.</span></h2>
          <div className="timeline">
            {milestones.map(([date, title, desc]) => <div className="mile" key={`${date}-${title}`}><div className="mileDate">{date}</div><h3>{title}</h3><p>{desc}</p></div>)}
          </div>
        </div>
      </Section>

      <Section className="light">
        <div className="stack">
          <Eyebrow>Acceleration</Eyebrow>
          <h2>From AI awareness to enterprise adoption.</h2>
          <div className="metrics">
            {[["100K+", "Training participations", "👥"], ["200+", "AI promotion sessions", "📡"], ["215", "Use cases in production YTD", "✅"], ["~21K", "Weekly active users YTD", "📈"]].map(([value, label, icon]) => <div className="metric" key={label}><div className="metricIcon">{icon}</div><div className="metricValue">{value}</div><div className="metricLabel">{label}</div></div>)}
          </div>
        </div>
      </Section>

      <Section className="gridbg" style={{ background: "#060617" }}>
        <div className="stack">
          <Eyebrow>Why this matters to Finance</Eyebrow>
          <h2>Finance does not need more dashboards. It needs faster judgment.</h2>
          <p className="lead">The opportunity is not only automation. It is moving from manual preparation to AI-augmented analysis, control and decision support.</p>
          <div className="bridgeGrid">
            <div className="bridgePanel">
              <div className="bridgeLabel">Core shift</div>
              <div className="bridgeText">From time spent preparing numbers to time spent explaining what should happen next.</div>
            </div>
            <div className="bridgeBullets">
              <div className="bridgeItem"><strong>Speed:</strong> shorten cycle time for commentary, reconciliation and scenario analysis.</div>
              <div className="bridgeItem"><strong>Control:</strong> surface exceptions, policy gaps and evidence earlier.</div>
              <div className="bridgeItem"><strong>Business impact:</strong> improve planning quality, cash visibility and cost discipline.</div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="demo" className="gridbg">
        <div className="stack">
          <Eyebrow>Live showcase</Eyebrow>
          <h2>Don’t explain AI.<br /><span className="muted">Let people watch it work.</span></h2>
          <div className="demos">
            {demoCards.map(([title, subtitle, type, src]) => <div className="demo" key={title}><MediaBlock type={type} src={src} className="demoMedia" /><div className="demoBody"><h3>{title}</h3><p>{subtitle}</p></div></div>)}
          </div>
        </div>
      </Section>

      <Section className="gridbg" style={{ background: "#070713" }}>
        <div className="stack">
          <Eyebrow>Act III · AI in Finance</Eyebrow>
          <h2>AI in Finance: driving value in planning, cash and cost management.</h2>
          <p className="lead">Across the industry, the strongest use cases are not abstract. They attack Finance’s highest-friction work: planning cycles, working capital visibility and cost leakage.</p>

          <div className="financeTakeaway">
            <strong style={{ color: "white" }}>Takeaway:</strong> Use AI where Finance already has clear business value pools — smarter decisions, stronger cash flow and lower cost.
          </div>

          <div className="financeGrid">
            {financeCases.map((item) => (
              <div className="case financeCard" key={item.title}>
                <div className="financeIcon">{item.icon}</div>
                <div className="financeValue">{item.value}</div>
                <h3>{item.title}</h3>
                <div className="financeHeadline">{item.headline}</div>

                <div className="financeLabel">Impact to Lenovo (BCPF L2)</div>
                <ul className="financeList">
                  {item.impact.map((line) => <li key={line}>{line}</li>)}
                </ul>

                <div className="financeLabel">Case study</div>
                <ul className="financeList">
                  {item.caseStudy.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="gridbg">
        <div className="stack split">
          <div>
            <Eyebrow>Future operating model</Eyebrow>
            <h2>A day in the life of AI-augmented Finance.</h2>
            <p className="lead">AI removes friction from repeatable work, so Finance judgment becomes more visible, timely and strategic.</p>
          </div>
          <div className="moments">
            {[["08:30", "AI briefs Finance on overnight movements, risks and decisions needed."], ["10:00", "Controller asks for exception analysis; AI prepares evidence pack."], ["13:30", "FP&A runs three forecast scenarios in minutes, not days."], ["16:00", "Business partner gets AI-generated talking points before leadership review."]].map(([time, text]) => <div className="moment" key={time}><div className="timeIcon">⏱</div><div><div className="time">{time}</div><div className="momentText">{text}</div></div></div>)}
          </div>
        </div>
      </Section>

      <Section className="light center">
        <div className="stack center">
          <div className="finalIcon">◉</div>
          <h2>The future of Finance is not human versus AI.</h2>
          <p className="lead" style={{ color: "rgba(15,23,42,.62)" }}>It is Finance teams that learn to work with AI — versus those that do not.</p>
          <div style={{ marginTop: 54, color: "rgba(15,23,42,.42)", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", letterSpacing: ".28em", textTransform: "uppercase", fontSize: 13 }}>Welcome to the next operating model</div>
        </div>
      </Section>
    </main>
  );
}
