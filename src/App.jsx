import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Play, 
  ArrowRight, 
  Shield, 
  ChevronDown, 
  ReceiptText, 
  Sparkles, 
  X,
  Briefcase,
  CheckCheck
} from 'lucide-react';

/**
 * Complete, single-file, production-ready landing page component for STS-FINTECH.
 * Ready for deployment on Vercel with Vite, Tailwind CSS, and lucide-react.
 */
export default function STSFintechLanding() {
  // Navigation & Dropdown states
  const [careersOpen, setCareersOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  // Search & Modal states
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // Interactive Typography active letter state
  const [activeLetterId, setActiveLetterId] = useState(null);

  // Dropdown click-outside refs
  const careersRef = useRef(null);
  const productRef = useRef(null);
  const notifRef = useRef(null);

  // Sample Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'UPI Split Settled', desc: 'Rahul sent ₹1,450 for Dinner split.', time: '5m ago', read: false },
    { id: 2, title: 'Budget Milestone', desc: 'Saved 18% more on groceries this month.', time: '1h ago', read: false },
    { id: 3, title: 'Portfolio Dividend', desc: '₹320 dividend credited to wallet.', time: '3h ago', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // 4 Roles for Careers Dropdown
  const CAREER_ROLES = [
    { title: 'Full Stack Developer', dept: 'Engineering', type: 'Full-time' },
    { title: 'Backend Developer', dept: 'Core Banking & APIs', type: 'Full-time' },
    { title: 'Package Analyst', dept: 'Fintech Operations', type: 'Full-time' },
    { title: 'HR', dept: 'People & Culture', type: 'Full-time' },
  ];

  // Upward arch alignment data: vertical offset (dy in px) and subtle rotation (rot in deg)
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

  // Global keyboard shortcuts & click outside handling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (careersRef.current && !careersRef.current.contains(e.target)) {
        setCareersOpen(false);
      }
      if (productRef.current && !productRef.current.contains(e.target)) {
        setProductOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCareersOpen(false);
        setProductOpen(false);
        setShowNotifications(false);
        setMobileMenuOpen(false);
        setIsVideoModalOpen(false);
        setIsSignInModalOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('sts-header-search-input');
        if (searchInput) searchInput.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * Helper to render letters along a natural upward curve
   * with individual hover/touch zoom & dark 3D extruded styling
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
          {/* Individual Interactive Container/Span with Touch & Hover Zoom */}
          <span
            onMouseEnter={() => setActiveLetterId(letterId)}
            onMouseLeave={() => setActiveLetterId(null)}
            onTouchStart={() => setActiveLetterId(letterId)}
            onTouchEnd={() => {
              setTimeout(() => setActiveLetterId(null), 300);
            }}
            style={{
              color: '#0b1411', // Dark face fill
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
          1. OVERALL THEME & BACKGROUND:
          - Solid pure white page background (bg-white)
          - Subtle grid backdrop
          - Faint, stylized Indian Rupee symbols (₹)
          - Financial candlestick chart bars
          - Smooth ascending green trendline running across hero behind headline
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Subtle Architectural Grid Backdrop */}
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

        {/* Faint, Stylized Indian Rupee Symbols (₹) */}
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

        {/* Smooth Ascending Green Trendline Running Across Hero Behind Headline */}
        <svg
          className="absolute top-12 left-0 w-full h-[520px] pointer-events-none opacity-[0.22] overflow-visible"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="stsSmoothCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="stsSmoothCurveArea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="stsCurveGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint Shaded Area Below Upward Trendline */}
          <path
            d="M 0,390 
               C 220,400 340,340 500,280 
               C 660,220 780,260 960,180 
               C 1120,100 1280,130 1440,55 
               L 1440,520 L 0,520 Z"
            fill="url(#stsSmoothCurveArea)"
          />

          {/* Smooth Ascending Curving Trendline Path */}
          <path
            d="M 0,390 
               C 220,400 340,340 500,280 
               C 660,220 780,260 960,180 
               C 1120,100 1280,130 1440,55"
            stroke="url(#stsSmoothCurveGrad)"
            strokeWidth="3.5"
            filter="url(#stsCurveGlow)"
          />

          {/* Milestone Data Nodes */}
          <circle cx="500" cy="280" r="4.5" fill="#34d399" className="animate-pulse" />
          <circle cx="960" cy="180" r="5" fill="#10b981" className="animate-pulse" />
          <circle cx="1320" cy="90" r="5" fill="#00ff88" className="animate-pulse" />
        </svg>
      </div>

      {/* =========================================================================
          2. EDGE-TO-EDGE FULL-WIDTH HEADER (Zero Side Margins / Gaps):
          - Header container spans full screen width (w-full) without max-w-* or mx-auto
          ========================================================================= */}
      <header className="relative z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* ================= FAR LEFT: Shield Logo & Brand Text ================= */}
          <div className="flex items-center gap-3">
            {/* Rounded shield icon with emerald glowing border & dot accent */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl border-2 border-emerald-500 bg-emerald-50/90 shadow-[0_0_16px_rgba(16,185,129,0.35)] group transition-transform hover:scale-105">
              <Shield className="w-5 h-5 text-emerald-600 transition-transform duration-200 group-hover:scale-110" />
              <span className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-sm pointer-events-none" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-ping opacity-75" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                STS-FINTECH
              </span>
              <span className="text-[9px] font-bold tracking-[0.22em] text-emerald-600 uppercase font-mono -mt-0.5">
                FINANCIAL ECOSYSTEM
              </span>
            </div>
          </div>

          {/* ================= CENTER NAVIGATION: Careers, Product, About, Contact ================= */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            
            {/* 1. Careers: Positioned directly to the left of Product with "We're hiring!" pill badge */}
            <div className="relative" ref={careersRef}>
              <button
                type="button"
                onClick={() => {
                  setCareersOpen(!careersOpen);
                  setProductOpen(false);
                  setShowNotifications(false);
                }}
                className={`group flex items-center gap-1.5 text-sm font-semibold transition-colors py-1 ${
                  careersOpen ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'
                }`}
                aria-expanded={careersOpen}
                aria-haspopup="true"
              >
                <span>Careers</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  We're hiring!
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    careersOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}
                />
              </button>

              {/* Careers Dropdown Menu (4 roles) */}
              {careersOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                      Open Roles
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      4 Positions
                    </span>
                  </div>

                  <div className="py-1">
                    {CAREER_ROLES.map((role, idx) => (
                      <a
                        key={idx}
                        href="#careers"
                        onClick={() => setCareersOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-emerald-100/60 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                              {role.title}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {role.dept} • {role.type}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-emerald-600 transition-all" />
                      </a>
                    ))}
                  </div>

                  <div className="p-1.5 border-t border-slate-100">
                    <a
                      href="#careers"
                      onClick={() => setCareersOpen(false)}
                      className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                    >
                      <span>View All Openings</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Product: Interactive Dropdown Card featuring "ExpenseTrack" */}
            <div className="relative" ref={productRef}>
              <button
                type="button"
                onClick={() => {
                  setProductOpen(!productOpen);
                  setCareersOpen(false);
                  setShowNotifications(false);
                }}
                className={`group flex items-center gap-1.5 text-sm font-semibold transition-colors py-1 ${
                  productOpen ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'
                }`}
                aria-expanded={productOpen}
                aria-haspopup="true"
              >
                <span>Product</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    productOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
                  }`}
                />
              </button>

              {/* Product Dropdown Menu */}
              {productOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-emerald-950/10 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Top Bar: FEATURED PRODUCT & Flagship Badge */}
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                      Featured Product
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Flagship
                    </span>
                  </div>

                  {/* ExpenseTrack Application Card - Wrapped in Anchor Tag to open in new tab */}
                  <div className="p-1.5">
                    <a
                      href="https://expense-track-seven-smoky.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setProductOpen(false)}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-50/70 transition-colors duration-200 cursor-pointer group block"
                    >
                      {/* Custom green document/wallet badge icon with accent pulse */}
                      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
                        <ReceiptText className="w-6 h-6 text-white" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-white animate-pulse" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            ExpenseTrack
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            v2.4
                          </span>
                        </div>
                        {/* Description */}
                        <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                          Automated Daily Financial Tracking &amp; Insights
                        </p>
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                          <span>Explore ExpenseTrack</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Footer Pills: Live UPI Sync, AI Analytics, Real-Time Splits */}
                  <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live UPI Sync
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      AI Analytics
                    </span>
                    <span>•</span>
                    <span className="text-slate-600">Real-Time Splits</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. About Navigation Link */}
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 hover:after:w-full after:transition-all after:duration-200"
            >
              About
            </a>

            {/* 4. Contact Navigation Link */}
            <a
              href="#contact"
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-500 hover:after:w-full after:transition-all after:duration-200"
            >
              Contact
            </a>
          </nav>

          {/* ================= FAR RIGHT: Search, Notifications, Auth ================= */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Pill Search Bar with search icon, placeholder & ⌘K badge */}
            <div className="relative hidden sm:flex items-center bg-[#0d1512] text-slate-200 rounded-full pl-3.5 pr-2 py-1.5 border border-emerald-950/60 shadow-inner w-52 md:w-60 lg:w-64 focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
              <Search className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
              <input
                id="sts-header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search features, tools..."
                className="bg-transparent text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none w-full tracking-normal"
              />
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/90 rounded border border-slate-700/60 shrink-0 select-none">
                ⌘K
              </kbd>
            </div>

            {/* Notification Bell Button with unread badge ("3") & Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setCareersOpen(false);
                  setProductOpen(false);
                }}
                className={`relative p-2 rounded-full transition-all duration-200 ${
                  showNotifications
                    ? 'bg-emerald-50 text-emerald-600 ring-2 ring-emerald-500/30'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
                }`}
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-emerald-500 rounded-full shadow-sm ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown showing sample alerts */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>
                  <div className="divide-y divide-slate-100 mt-2 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`py-2.5 px-2 rounded-xl transition-colors ${
                          item.read ? 'opacity-60 hover:bg-slate-50' : 'bg-emerald-50/40 hover:bg-emerald-50/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Controls: "Sign In" text link & bright emerald CTA button "Get Started →" */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsSignInModalOpen(true)}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors px-2 sm:px-3 py-1.5 rounded-lg"
              >
                Sign In
              </button>

              <a
                href="#get-started"
                onClick={() => setIsSignInModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-slate-700 hover:text-emerald-600 rounded-lg hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 shadow-lg animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {/* Mobile Search */}
              <div className="relative flex items-center bg-[#0d1512] text-slate-200 rounded-full px-3.5 py-2 border border-emerald-950/60 mb-2">
                <Search className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search features, tools..."
                  className="bg-transparent text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none w-full"
                />
              </div>

              {/* Mobile Careers Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCareersOpen(!mobileCareersOpen)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1"
                >
                  <span className="flex items-center gap-2">
                    <span>Careers</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      We're hiring!
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCareersOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileCareersOpen && (
                  <div className="pl-3 py-2 space-y-2 border-l-2 border-emerald-200 ml-1 mt-1">
                    {CAREER_ROLES.map((role, idx) => (
                      <a
                        key={idx}
                        href="#careers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs font-semibold text-slate-600 hover:text-emerald-600 py-1"
                      >
                        {role.title} <span className="text-[10px] text-slate-400 font-normal">({role.dept})</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Product Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileProductOpen(!mobileProductOpen)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1"
                >
                  <span className="flex items-center gap-2">
                    <span>Product</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      ExpenseTrack
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileProductOpen && (
                  <div className="pl-3 py-2 space-y-2 border-l-2 border-emerald-200 ml-1 mt-1">
                    <a
                      href="https://expense-track-seven-smoky.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 rounded-lg bg-emerald-50/70 hover:bg-emerald-100/70 transition-colors duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ReceiptText className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-800">ExpenseTrack</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Automated Daily Financial Tracking &amp; Insights
                      </p>
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          3. HERO SECTION & CURVED 3D TYPOGRAPHY:
          - Curved typography: "STS" on top, "FINTECH" on bottom line
          - Vertical offsets (dy) form upward arch across line
          - Per-letter interactive zoom on hover/touch: scale-125 to scale-135, -translate-y-3
          - Dark 3D extruded lettering style: #0b1411 face fill + emerald extrusion shadow
          - Centered tagline below
          - Showcase player frame with glowing circular play button & pulsating top badge
          ========================================================================= */}
      <main className="relative z-10 pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Curved 3D Hero Heading Container */}
          <div className="flex flex-col items-center justify-center text-center select-none pt-4">
            <h1 className="flex flex-col items-center gap-1 sm:gap-2">
              {/* Line 1: Curved "STS" with Per-Letter Touch & Hover Zoom */}
              <span className="flex items-center justify-center" aria-label="STS">
                {renderCurvedLetters(STS_CHARS, 'sts')}
              </span>

              {/* Line 2: Curved "FINTECH" with Per-Letter Touch & Hover Zoom */}
              <span className="flex items-center justify-center mt-1 sm:mt-2" aria-label="FINTECH">
                {renderCurvedLetters(FINTECH_CHARS, 'fintech')}
              </span>
            </h1>
          </div>

          {/* Centered Tagline */}
          <p className="mt-7 sm:mt-9 text-center text-slate-600 text-base sm:text-lg md:text-xl font-medium tracking-normal max-w-2xl px-2">
            Smart tracking. Collaborative splits. Effortless wealth.
          </p>

          {/* Showcase Player Frame */}
          <div className="w-full max-w-4xl mt-10 sm:mt-12 md:mt-14">
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-full rounded-2xl sm:rounded-3xl bg-[#09110e] border border-emerald-900/50 shadow-2xl shadow-emerald-950/25 overflow-hidden aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] flex items-center justify-center group cursor-pointer transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-950/35"
            >
              {/* High-Tech FinTech Backdrop Pattern */}
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

              {/* Ambient Center Glow */}
              <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-400/25 transition-all duration-500" />

              {/* Top-Left Pill Badge: Pulsating green status dot with the text */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#121c17]/90 backdrop-blur-md border border-emerald-800/60 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-100 tracking-wide truncate max-w-[210px] sm:max-w-none">
                  How Everyday Expense Tracking Empowers the Common Man
                </span>
              </div>

              {/* Center Glowing Circular Play Button (▶) with Hover Scale Animation */}
              <div className="relative z-20 flex items-center justify-center">
                {/* Glowing Pulse Rings */}
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

      {/* =========================================================================
          INTERACTIVE SHOWCASE VIDEO MODAL
          ========================================================================= */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-[#0a120e] rounded-3xl border border-emerald-700/50 shadow-2xl overflow-hidden p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
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
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Showcase Screen */}
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

            <div className="flex justify-between items-center pt-2">
              <a
                href="https://expense-track-seven-smoky.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Launch ExpenseTrack Live App</span>
                <ArrowRight className="w-4 h-4" />
              </a>

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

      {/* =========================================================================
          INTERACTIVE SIGN IN / GET STARTED MODAL
          ========================================================================= */}
      {isSignInModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setIsSignInModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-emerald-500/40 bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">STS-FINTECH</h3>
                  <p className="text-[10px] text-slate-500 font-mono tracking-wider">FINANCIAL ECOSYSTEM</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignInModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email or Mobile Number</label>
                <input
                  type="text"
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <button
                type="button"
                onClick={() => setIsSignInModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all"
              >
                Continue to Dashboard
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              Secured with 256-Bit SSL Encryption • RBI Guidelines Compliant
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

// Named export for flexibility
export { STSFintechLanding };
