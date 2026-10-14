import React from 'react';

export default function BackgroundGraphic() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(52, 211, 153, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(52, 211, 153, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 40%, transparent 95%)'
        }}
      />

      {/* 2. Ambient Radial Glow Cones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-teal-500/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-400/5 blur-[120px] rounded-full pointer-events-none" />

      {/* 3. Watermarked Financial Currency Glyphs */}
      {/* Indian Rupee ₹ (Primary) */}
      <div className="absolute top-28 left-[8%] text-8xl md:text-9xl font-black text-emerald-400/[0.045] rotate-[-12deg] tracking-tighter">
        ₹
      </div>
      <div className="absolute top-[48%] left-[4%] text-7xl md:text-8xl font-black text-teal-400/[0.035] rotate-[8deg]">
        ₹
      </div>
      <div className="absolute top-36 right-[10%] text-8xl md:text-9xl font-black text-emerald-400/[0.05] rotate-[15deg]">
        ₹
      </div>
      <div className="absolute top-[58%] right-[6%] text-7xl md:text-8xl font-black text-emerald-400/[0.035] rotate-[-10deg]">
        ₹
      </div>
      {/* Supporting Global Currencies */}
      <div className="absolute top-[20%] left-[22%] text-5xl font-mono text-emerald-300/[0.025] rotate-[22deg]">
        $
      </div>
      <div className="absolute top-[38%] right-[24%] text-6xl font-mono text-teal-300/[0.03] rotate-[-18deg]">
        €
      </div>

      {/* 4. Watermarked Candlestick Bars & Stock Chart Elements */}
      <svg
        className="absolute top-16 left-[12%] w-64 h-72 opacity-[0.08] pointer-events-none"
        viewBox="0 0 200 240"
        fill="none"
      >
        {/* Bullish Bar 1 */}
        <line x1="30" y1="40" x2="30" y2="180" stroke="#10b981" strokeWidth="2" />
        <rect x="22" y="70" width="16" height="80" rx="2" fill="#10b981" />
        
        {/* Bearish Bar 2 */}
        <line x1="75" y1="20" x2="75" y2="190" stroke="#059669" strokeWidth="2" />
        <rect x="67" y="50" width="16" height="60" rx="2" fill="#047857" />

        {/* Bullish Bar 3 */}
        <line x1="120" y1="60" x2="120" y2="210" stroke="#34d399" strokeWidth="2" />
        <rect x="112" y="90" width="16" height="95" rx="2" fill="#10b981" />

        {/* Bullish Bar 4 */}
        <line x1="165" y1="10" x2="165" y2="160" stroke="#10b981" strokeWidth="2" />
        <rect x="157" y="30" width="16" height="70" rx="2" fill="#10b981" />
      </svg>

      <svg
        className="absolute top-24 right-[12%] w-72 h-80 opacity-[0.08] pointer-events-none"
        viewBox="0 0 220 260"
        fill="none"
      >
        <line x1="40" y1="30" x2="40" y2="170" stroke="#10b981" strokeWidth="2" />
        <rect x="32" y="60" width="16" height="70" rx="2" fill="#10b981" />

        <line x1="90" y1="80" x2="90" y2="230" stroke="#059669" strokeWidth="2" />
        <rect x="82" y="110" width="16" height="85" rx="2" fill="#059669" />

        <line x1="140" y1="40" x2="140" y2="190" stroke="#34d399" strokeWidth="2" />
        <rect x="132" y="60" width="16" height="90" rx="2" fill="#10b981" />

        <line x1="190" y1="15" x2="190" y2="140" stroke="#10b981" strokeWidth="2" />
        <rect x="182" y="35" width="16" height="55" rx="2" fill="#10b981" />
      </svg>

      {/* 5. Glowing Green Upward Trendline */}
      <svg
        className="absolute top-8 left-0 w-full h-[600px] pointer-events-none opacity-[0.22] overflow-visible"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#14b8a6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="trendArea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Shaded Area under Trendline */}
        <path
          d="M 0,420 
             C 200,430 320,380 480,310 
             C 640,240 760,280 920,200 
             C 1080,120 1260,150 1440,70 
             L 1440,600 L 0,600 Z"
          fill="url(#trendArea)"
        />

        {/* Glow Path */}
        <path
          d="M 0,420 
             C 200,430 320,380 480,310 
             C 640,240 760,280 920,200 
             C 1080,120 1260,150 1440,70"
          stroke="url(#trendGradient)"
          strokeWidth="3.5"
          filter="url(#glow)"
        />

        {/* Data points along trend */}
        <circle cx="480" cy="310" r="4.5" fill="#34d399" className="animate-pulse" />
        <circle cx="920" cy="200" r="5" fill="#10b981" className="animate-pulse" />
        <circle cx="1320" cy="110" r="5.5" fill="#00ff88" className="animate-pulse" />
      </svg>
    </div>
  );
}
