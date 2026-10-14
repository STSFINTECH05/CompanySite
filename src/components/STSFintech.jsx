import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Play, 
  ArrowRight, 
  Shield, 
  ChevronDown, 
  Briefcase,
  ReceiptText 
} from 'lucide-react';
import Header from './Header';

export default function STSFintech() {
  const [activeLetterId, setActiveLetterId] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Letters configuration for curved upward arch & interactive zoom
  const STS_CHARS = [
    { char: 'S', dy: 8, rot: -3 },
    { char: 'T', dy: 0, rot: 0 },
    { char: 'S', dy: 8, rot: 3 },
  ];

  const FINTECH_CHARS = [
    { char: 'F', dy: 14, rot: -4.5 },
    { char: 'I', dy: 8, rot: -3.0 },
    { char: 'N', dy: 3, rot: -1.5 },
    { char: 'T', dy: 0, rot: 0 },
    { char: 'E', dy: 3, rot: 1.5 },
    { char: 'C', dy: 8, rot: 3.0 },
    { char: 'H', dy: 14, rot: 4.5 },
  ];

  /**
   * Helper to render letters along a natural upward curve
   * with per-letter interactive hover/touch expansion
   */
  const renderCurvedLetters = (charList, prefix) => {
    return charList.map(({ char, dy, rot }, idx) => {
      const letterId = `${prefix}-${idx}`;
      const isHovered = activeLetterId === letterId;

      return (
        <span
          key={letterId}
          style={{
            display: 'inline-block',
            transform: `translateY(${dy}px) rotate(${rot}deg)`,
          }}
          className="relative"
        >
          {/* Individual Interactive Container/Span with Hover & Touch Zoom */}
          <span
            onMouseEnter={() => setActiveLetterId(letterId)}
            onMouseLeave={() => setActiveLetterId(null)}
            onTouchStart={() => setActiveLetterId(letterId)}
            onTouchEnd={() => {
              setTimeout(() => setActiveLetterId(null), 300);
            }}
            style={{
              color: '#0d1612',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              textShadow: isHovered
                ? '1px 1px 0 #34d399, 2px 2px 0 #10b981, 3px 3px 0 #059669, 4px 4px 0 #047857, 5px 5px 0 #065f46, 6px 6px 0 #064e3b, 8px 12px 22px rgba(0, 0, 0, 0.35), 0 0 25px rgba(52, 211, 153, 0.65)'
                : '1px 1px 0 #059669, 2px 2px 0 #047857, 3px 3px 0 #065f46, 4px 4px 0 #064e3b, 6px 8px 14px rgba(0, 0, 0, 0.3)',
            }}
            className={`inline-block select-none cursor-pointer text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none px-0.5 sm:px-1 py-1 transition-transform duration-200 ease-out will-change-transform ${
              isHovered
                ? 'scale-130 -translate-y-3 z-30 relative'
                : 'hover:scale-130 hover:-translate-y-3 hover:z-30 relative'
            }`}
          >
            {char}
          </span>
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* =========================================================================
          1. OVERALL BACKGROUND & LAYOUT:
          - Background: Clean pure white (bg-white)
          - Overlay: Subtle, faded Indian Rupee symbols (₹), financial candlestick charts,
            grid lines, and a smooth upward-curving trendline behind typography
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle Architectural Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 40%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, black 40%, transparent 95%)',
          }}
        />

        {/* Ambient Faint Emerald Radial Tint */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[680px] h-[460px] bg-emerald-100/35 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-44 left-[12%] w-[380px] h-[380px] bg-teal-100/25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-48 right-[12%] w-[400px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full pointer-events-none" />

        {/* Subtle, Faded Indian Rupee Symbols (₹) */}
        <div className="absolute top-24 left-[7%] text-8xl sm:text-9xl font-black text-emerald-600/[0.045] rotate-[-12deg] tracking-tighter">
          ₹
        </div>
        <div className="absolute top-[44%] left-[4%] text-7xl sm:text-8xl font-black text-teal-600/[0.035] rotate-[8deg]">
          ₹
        </div>
        <div className="absolute top-28 right-[8%] text-8xl sm:text-9xl font-black text-emerald-600/[0.05] rotate-[15deg]">
          ₹
        </div>
        <div className="absolute top-[52%] right-[5%] text-7xl sm:text-8xl font-black text-emerald-700/[0.035] rotate-[-10deg]">
          ₹
        </div>

        {/* Financial Candlestick Charts - Left Flank */}
        <svg
          className="absolute top-20 left-[6%] sm:left-[11%] w-56 sm:w-64 h-72 opacity-[0.09] pointer-events-none"
          viewBox="0 0 200 240"
          fill="none"
        >
          <line x1="30" y1="35" x2="30" y2="185" stroke="#10b981" strokeWidth="2.5" />
          <rect x="21" y="65" width="18" height="85" rx="3" fill="#10b981" />
          <line x1="75" y1="20" x2="75" y2="190" stroke="#059669" strokeWidth="2.5" />
          <rect x="66" y="50" width="18" height="65" rx="3" fill="#047857" />
          <line x1="120" y1="55" x2="120" y2="215" stroke="#34d399" strokeWidth="2.5" />
          <rect x="111" y="85" width="18" height="100" rx="3" fill="#10b981" />
          <line x1="165" y1="15" x2="165" y2="165" stroke="#10b981" strokeWidth="2.5" />
          <rect x="156" y="35" width="18" height="75" rx="3" fill="#10b981" />
        </svg>

        {/* Financial Candlestick Charts - Right Flank */}
        <svg
          className="absolute top-28 right-[6%] sm:right-[11%] w-60 sm:w-72 h-80 opacity-[0.09] pointer-events-none"
          viewBox="0 0 220 260"
          fill="none"
        >
          <line x1="40" y1="30" x2="40" y2="175" stroke="#10b981" strokeWidth="2.5" />
          <rect x="31" y="60" width="18" height="75" rx="3" fill="#10b981" />
          <line x1="90" y1="75" x2="90" y2="235" stroke="#059669" strokeWidth="2.5" />
          <rect x="81" y="105" width="18" height="90" rx="3" fill="#059669" />
          <line x1="140" y1="35" x2="140" y2="195" stroke="#34d399" strokeWidth="2.5" />
          <rect x="131" y="55" width="18" height="95" rx="3" fill="#10b981" />
          <line x1="190" y1="15" x2="190" y2="145" stroke="#10b981" strokeWidth="2.5" />
          <rect x="181" y="35" width="18" height="60" rx="3" fill="#10b981" />
        </svg>

        {/* Smooth Upward-Curving Trendline Behind Typography */}
        <svg
          className="absolute top-12 left-0 w-full h-[520px] pointer-events-none opacity-[0.22] overflow-visible"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="stsSmoothCurveGradSTS" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="stsSmoothCurveAreaSTS" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="stsCurveGlowSTS" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 0,390 
               C 220,400 340,340 500,280 
               C 660,220 780,260 960,180 
               C 1120,100 1280,130 1440,55 
               L 1440,520 L 0,520 Z"
            fill="url(#stsSmoothCurveAreaSTS)"
          />

          <path
            d="M 0,390 
               C 220,400 340,340 500,280 
               C 660,220 780,260 960,180 
               C 1120,100 1280,130 1440,55"
            stroke="url(#stsSmoothCurveGradSTS)"
            strokeWidth="3.5"
            filter="url(#stsCurveGlowSTS)"
          />

          <circle cx="500" cy="280" r="4.5" fill="#34d399" className="animate-pulse" />
          <circle cx="960" cy="180" r="5" fill="#10b981" className="animate-pulse" />
          <circle cx="1320" cy="90" r="5" fill="#00ff88" className="animate-pulse" />
        </svg>
      </div>

      {/* =========================================================================
          2. EDGE-TO-EDGE HEADER (Zero Corner Gaps):
          - Spans edge-to-edge (w-full) touching screen edges without margin capping
          - Careers dropdown with hiring badge and open roles
          - Product dropdown with ExpenseTrack, custom receipt/wallet badge & tagline
          - About & Contact navigation links
          - Pill-shaped search with ⌘K, bell with 3 badge, Sign In, Get Started →
          ========================================================================= */}
      <Header />

      {/* =========================================================================
          3. CURVED 3D TYPOGRAPHY WITH INTERACTIVE LETTER HOVER EXPANSION:
          - Curved Path / Arch Alignment: letters arranged along upward curve
          - Per-Letter Interactive Zoom: individual containers expanding scale-125..135, -translate-y-3
          - 3D Extruded Styling: text-shadow emerald multi-layer extrusion
          ========================================================================= */}
      <main className="relative z-10 pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Curved 3D Hero Heading Container */}
          <div className="flex flex-col items-center justify-center text-center select-none pt-4">
            <h1 className="flex flex-col items-center gap-1 sm:gap-2">
              {/* Line 1: Curved "STS" */}
              <span className="flex items-center justify-center" aria-label="STS">
                {renderCurvedLetters(STS_CHARS, 'sts')}
              </span>

              {/* Line 2: Curved "FINTECH" */}
              <span className="flex items-center justify-center mt-1 sm:mt-2" aria-label="FINTECH">
                {renderCurvedLetters(FINTECH_CHARS, 'fintech')}
              </span>
            </h1>
          </div>

          {/* =====================================================================
              4. TAGLINE & VIDEO SHOWCASE:
              - Tagline: Centered below interactive text
              - Showcase Player Frame: Centered dark media frame, top-left pill badge,
                centered glowing circular play button (▶)
              ===================================================================== */}
          <p className="mt-7 sm:mt-9 text-center text-slate-600 text-base sm:text-lg md:text-xl font-medium tracking-normal max-w-2xl px-2">
            Smart tracking. Collaborative splits. Effortless wealth.
          </p>

          {/* Showcase Player Frame */}
          <div className="w-full max-w-4xl mt-10 sm:mt-12 md:mt-14">
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-full rounded-2xl sm:rounded-3xl bg-[#09110e] border border-emerald-900/50 shadow-2xl shadow-emerald-950/25 overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] flex items-center justify-center group cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-950/35"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-black/70 pointer-events-none" />
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(52, 211, 153, 0.15) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(52, 211, 153, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '28px 28px',
                }}
              />

              <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/25 transition-all duration-500" />

              {/* Top-Left Pill Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#121c17]/90 backdrop-blur-md border border-emerald-800/60 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-100 tracking-wide truncate max-w-[210px] sm:max-w-none">
                  How Everyday Expense Tracking Empowers the Common Man
                </span>
              </div>

              {/* Center Glowing Circular Play Button (▶) */}
              <div className="relative z-20 flex items-center justify-center">
                <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/20 animate-ping pointer-events-none opacity-40 group-hover:opacity-75" />
                <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-emerald-500/35 pointer-events-none transition-transform duration-500 group-hover:scale-125" />

                <button
                  type="button"
                  aria-label="Play video showcase"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-[0_0_35px_rgba(16,185,129,0.55)] group-hover:shadow-[0_0_55px_rgba(16,185,129,0.85)] group-hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white text-white translate-x-0.5" />
                </button>
              </div>

              {/* Bottom Explainer Tag */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between text-[11px] sm:text-xs text-slate-400 font-mono pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  4K ULTRA HD • 03:45
                </span>
                <span className="text-emerald-400/90 font-semibold tracking-wider uppercase">
                  STS FINANCIAL OVERVIEW
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0a120e] rounded-3xl border border-emerald-700/50 shadow-2xl overflow-hidden p-6 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-900/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold text-sm sm:text-base text-slate-100">
                  How Everyday Expense Tracking Empowers the Common Man
                </span>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="my-6 aspect-video rounded-2xl bg-[#060c09] border border-emerald-900/40 flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
                <ReceiptText className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">
                Smart Financial Freedom for Every Indian Citizen
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                Automatic expense segregation, instantaneous UPI group settling, and automated wealth compounding engineered for everyday life.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs font-mono text-emerald-400">
                <span className="px-3 py-1 bg-emerald-950/60 rounded-full border border-emerald-800/50">✓ 100% RBI Compliant</span>
                <span className="px-3 py-1 bg-emerald-950/60 rounded-full border border-emerald-800/50">✓ Bank Grade 256-Bit</span>
                <span className="px-3 py-1 bg-emerald-950/60 rounded-full border border-emerald-800/50">✓ Zero Hidden Fees</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
