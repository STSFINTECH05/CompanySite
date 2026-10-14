import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Search, 
  Bell, 
  ArrowRight, 
  ChevronDown, 
  Briefcase,
  ReceiptText
} from 'lucide-react';

export default function Header({
  activeTab = 'home',
  onNavigate,
  onSearch,
  onSignIn,
  onGetStarted
}) {
  const [careersOpen, setCareersOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCareersOpen, setMobileCareersOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const careersRef = useRef(null);
  const productRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click or Escape key
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

  const CAREER_ROLES = [
    { title: 'Full Stack Developer', dept: 'Engineering', type: 'Full-time' },
    { title: 'Backend Developer', dept: 'Core Banking & APIs', type: 'Full-time' },
    { title: 'Package Analyst', dept: 'Fintech Operations', type: 'Full-time' },
    { title: 'HR', dept: 'People & Culture', type: 'Full-time' },
  ];

  const notificationsList = [
    { id: 1, title: 'UPI Split Settled', desc: 'Rahul sent ₹1,450 for Dinner split.', time: '5m ago' },
    { id: 2, title: 'Budget Milestone', desc: 'Saved 18% more on groceries this month.', time: '1h ago' },
    { id: 3, title: 'Portfolio Dividend', desc: '₹320 dividend credited to wallet.', time: '3h ago' },
  ];

  return (
    <header className="relative z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Edge-to-Edge Container: Zero corner gaps, w-full, no max-w, no mx-auto */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* ================= FAR LEFT: Logo & Brand Text ================= */}
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
          role="button"
          tabIndex={0}
          aria-label="Go to STS-FINTECH home"
        >
          {/* Logo icon: Green rounded shield outline with accent glow */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl border-2 border-emerald-500 bg-emerald-50/90 shadow-[0_0_16px_rgba(16,185,129,0.35)] group transition-transform hover:scale-105">
            <Shield className="w-5 h-5 text-emerald-600 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute inset-0 rounded-xl bg-emerald-400/20 blur-sm pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          {/* Brand text: Bold "STS-FINTECH" with subtitle "FINANCIAL ECOSYSTEM" */}
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
              STS-FINTECH
            </span>
            <span className="text-[9px] font-bold tracking-[0.22em] text-emerald-600 uppercase font-mono -mt-0.5">
              FINANCIAL ECOSYSTEM
            </span>
          </div>
        </div>

        {/* ================= CENTER NAVIGATION: Careers, Product, About, Contact ================= */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          
          {/* 1. Careers: Positioned directly to the left of "Product" with "We're hiring!" badge */}
          <div className="relative" ref={careersRef}>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('careers');
                }}
                className={`group flex items-center gap-1.5 text-sm font-semibold transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500 after:transition-all after:duration-200 ${
                  activeTab === 'careers' ? 'text-emerald-600 after:w-full font-bold' : 'text-slate-600 hover:text-emerald-600 after:w-0 hover:after:w-full'
                }`}
                aria-label="Navigate to Careers"
              >
                <span>Careers</span>
                {/* Hiring Badge: "We're hiring!" + green pulse dot */}
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  We're hiring!
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCareersOpen(!careersOpen);
                  setProductOpen(false);
                }}
                className="p-1 ml-0.5 text-slate-400 hover:text-emerald-600 transition-colors"
                aria-label="Toggle careers menu"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    careersOpen ? 'rotate-180 text-emerald-600' : 'group-hover:text-emerald-600'
                  }`}
                />
              </button>
            </div>

            {/* Careers Dropdown Menu */}
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
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (onNavigate) onNavigate('careers', role);
                        setCareersOpen(false);
                      }}
                      className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-50/80 transition-colors group cursor-pointer"
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
                    </button>
                  ))}
                </div>

                <div className="p-1.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigate) onNavigate('careers');
                      setCareersOpen(false);
                    }}
                    className="flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>View All Openings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Product: Interactive Dropdown Menu featuring "ExpenseTrack" */}
          <div className="relative" ref={productRef}>
            <button
              type="button"
              onClick={() => {
                setProductOpen(!productOpen);
                setCareersOpen(false);
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
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    Featured Product
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Flagship
                  </span>
                </div>

                {/* ExpenseTrack Card */}
                <div className="p-1.5">
                  <a
                    href="https://expense-track-seven-smoky.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProductOpen(false)}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-50/70 transition-colors duration-200 cursor-pointer group block"
                  >
                    {/* Unique Custom Logo/Icon: Emerald wallet/receipt badge with accent pulse */}
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
                      {/* Short Tagline */}
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

                {/* Quick Feature Highlights Bar */}
                <div className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live UPI Sync
                  </span>
                  <span>•</span>
                  <span>AI Analytics</span>
                  <span>•</span>
                  <span>Real-Time Splits</span>
                </div>
              </div>
            )}
          </div>

          {/* 3. About */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('about')}
            className={`text-sm font-semibold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500 after:transition-all after:duration-200 cursor-pointer ${
              activeTab === 'about' ? 'text-emerald-600 after:w-full font-bold' : 'text-slate-600 hover:text-emerald-600 after:w-0 hover:after:w-full'
            }`}
          >
            About
          </button>

          {/* 4. Contact */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('contact')}
            className={`text-sm font-semibold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-emerald-500 after:transition-all after:duration-200 cursor-pointer ${
              activeTab === 'contact' ? 'text-emerald-600 after:w-full font-bold' : 'text-slate-600 hover:text-emerald-600 after:w-0 hover:after:w-full'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* ================= FAR RIGHT: Search, Notifications, Auth ================= */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Pill-shaped dark input with search icon, placeholder & ⌘K badge */}
          <div className="relative hidden sm:flex items-center bg-[#0d1512] text-slate-200 rounded-full pl-3.5 pr-2 py-1.5 border border-emerald-950/60 shadow-inner w-52 md:w-60 lg:w-64 focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
            <Search className="w-4 h-4 text-emerald-400 shrink-0 mr-2" />
            <input
              id="sts-header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search features, tools..."
              className="bg-transparent text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none w-full tracking-normal"
            />
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800/90 rounded border border-slate-700/60 shrink-0 select-none">
              ⌘K
            </kbd>
          </div>

          {/* Notification button: Bell icon with badge showing "3" */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-full transition-all duration-200 ${
                showNotifications
                  ? 'bg-emerald-50 text-emerald-600 ring-2 ring-emerald-500/30'
                  : 'text-slate-700 hover:text-emerald-600 hover:bg-slate-100'
              }`}
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-emerald-500 rounded-full shadow-sm ring-2 ring-white">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                      {notificationCount} new
                    </span>
                  </div>
                  {notificationCount > 0 && (
                    <button
                      onClick={() => setNotificationCount(0)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-slate-100 mt-2 max-h-64 overflow-y-auto">
                  {notificationsList.map((item) => (
                    <div key={item.id} className="py-2.5 px-1 hover:bg-slate-50/80 rounded-lg transition-colors">
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

          {/* Auth controls: "Sign In" link and rounded emerald button "Get Started →" */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="#signin"
              onClick={onSignIn}
              className="text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors px-2 sm:px-3 py-1.5 rounded-lg"
            >
              Sign In
            </a>

            <a
              href="#get-started"
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3">
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
              <div className="flex items-center justify-between w-full py-1">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('careers');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === 'careers' ? 'text-emerald-600 font-bold' : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  <span>Careers</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    We're hiring!
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileCareersOpen(!mobileCareersOpen)}
                  className="p-1 text-slate-400 hover:text-emerald-600"
                  aria-label="Toggle mobile careers"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileCareersOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileCareersOpen && (
                <div className="pl-3 py-2 space-y-2 border-l-2 border-emerald-200 ml-1 mt-1">
                  {CAREER_ROLES.map((role, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (onNavigate) onNavigate('careers', role);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left text-xs font-semibold text-slate-600 hover:text-emerald-600 py-1 cursor-pointer"
                    >
                      {role.title} <span className="text-[10px] text-slate-400 font-normal">({role.dept})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Product Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileProductOpen(!mobileProductOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 hover:text-emerald-600 py-1 cursor-pointer"
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

            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-semibold py-1 transition-colors cursor-pointer ${
                activeTab === 'about' ? 'text-emerald-600 font-bold' : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigate) onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-semibold py-1 transition-colors cursor-pointer ${
                activeTab === 'contact' ? 'text-emerald-600 font-bold' : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
