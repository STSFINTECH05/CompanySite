import React, { useState, useEffect } from 'react';
import { 
  Play, 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Briefcase, 
  Code2, 
  Server, 
  PackageCheck, 
  Users2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  X, 
  Send, 
  FileText, 
  ExternalLink, 
  Lock,
  Layers,
  Zap,
  TrendingUp,
  ReceiptText
} from 'lucide-react';
import Header from './components/Header';
import AdminPortal from './components/AdminPortal';

// Default 4 Roles
const DEFAULT_OPEN_ROLES = [
  {
    id: 'full-stack',
    title: 'Full Stack Developer',
    dept: 'Engineering',
    type: 'Full-time / Hybrid',
    location: 'Bengaluru, India (Hybrid)',
    experience: '3+ Years',
    salary: '₹18L - ₹28L CTC + ESOPs',
    status: 'Active',
    stack: ['React.js', 'Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Tailwind CSS'],
    responsibilities: [
      'Architect and implement responsive, high-performance web applications using React and Tailwind CSS.',
      'Design resilient RESTful APIs with Node.js and Express to drive daily ledger tracking and balance sync.',
      'Optimize PostgreSQL database schemas, indexing strategies, and multi-tenant security layers.',
      'Partner with product and UI/UX designers to translate complex financial concepts into frictionless workflows.'
    ],
    requirements: [
      '3+ years of professional full-stack web engineering experience with modern React and Node.js.',
      'Proficiency in relational database design (PostgreSQL/MySQL), transactions, and connection pooling.',
      'Strong knowledge of state management, client performance profiling, and accessible web standards.',
      'Passion for building high-trust financial systems with clean architecture and comprehensive unit tests.'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    dept: 'Core Banking & APIs',
    type: 'Full-time',
    location: 'Bengaluru, India (On-site / Hybrid)',
    experience: '3+ Years',
    salary: '₹20L - ₹32L CTC + ESOPs',
    status: 'Active',
    stack: ['Node.js', 'Express', 'Database Design', 'Scalable API Architecture', 'Redis', 'Webhooks'],
    responsibilities: [
      'Architect and maintain high-throughput, low-latency microservices powering instant UPI split transactions.',
      'Ensure sub-50ms API response times and 99.99% availability for payment webhooks and sync events.',
      'Implement robust double-entry ledger databases, idempotency keys, and automated reconciliation routines.',
      'Enforce bank-grade tokenization, automated rate limiting, and regulatory compliance standards.'
    ],
    requirements: [
      '3+ years of backend engineering expertise in Node.js, Express, and distributed API systems.',
      'Deep understanding of database isolation levels, Redis caching, and asynchronous message patterns.',
      'Hands-on experience integrating payment gateways, UPI webhooks, or financial core protocols.',
      'Commitment to writing zero-defect, self-healing services with strict telemetry and observability.'
    ]
  },
  {
    id: 'package-analyst',
    title: 'Package Analyst',
    dept: 'Fintech Operations & DevOps',
    type: 'Full-time',
    location: 'Bengaluru, India',
    experience: '2+ Years',
    salary: '₹14L - ₹22L CTC',
    status: 'Active',
    stack: ['Package Management', 'Release Dependencies', 'Vite & Rollup', 'CI/CD Pipelines', 'SBOM & Security'],
    responsibilities: [
      'Continually audit, curate, and optimize NPM package dependencies to eliminate bundle bloat and vulnerabilities.',
      'Supervise release dependencies, semver governance, and automated CI/CD deployment pipelines on Vercel and Docker.',
      'Identify tree-shaking opportunities, dead code elimination, and compression gains across production artifacts.',
      'Coordinate versioning rollouts, dependency drift monitoring, and zero-downtime release strategies.'
    ],
    requirements: [
      'In-depth mastery of modern JavaScript package ecosystems (npm, pnpm, yarn) and lockfile semantics.',
      'Practical experience with modern bundlers (Vite, Rollup, Webpack) and automated CI/CD (GitHub Actions).',
      'Strong awareness of software supply chain security standards (SBOM, CVE analysis, Dependabot).',
      'Analytical mindset with sharp attention to detail when benchmarking build times and runtime payloads.'
    ]
  },
  {
    id: 'hr',
    title: 'HR (Human Resources)',
    dept: 'People & Culture',
    type: 'Full-time',
    location: 'Bengaluru, India',
    experience: '2+ Years',
    salary: '₹10L - ₹16L CTC',
    status: 'Active',
    stack: ['Talent Acquisition', 'Technical Hiring Pipelines', 'Culture & Engagement', 'Employee Operations'],
    responsibilities: [
      'Drive end-to-end talent acquisition for elite engineering, product, and fintech operations roles.',
      'Curate world-class onboarding, career progression ladders, and employee retention programs.',
      'Foster an inclusive, transparent engineering culture emphasizing high ownership and intellectual curiosity.',
      'Manage statutory HR operations, payroll compliance, benefits, and regular team wellness initiatives.'
    ],
    requirements: [
      '2+ years of technical recruitment or HR business partner experience within high-growth tech startups.',
      'Proven track record of sourcing, engaging, and closing top-tier engineering talent.',
      'Exceptional empathetic communication, interpersonal intelligence, and negotiation skills.',
      'Familiarity with Indian labor compliance, startup compensation models, and modern ATS platforms.'
    ]
  }
];

// Initial Inquiries for Inbox
const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    name: 'Vikram Malhotra',
    email: 'vikram.m@paystream.in',
    subject: 'Issue linking expense account via UPI webhook',
    message: 'When connecting ICICI corporate salary account via UPI webhook, the transaction verification loop hangs with error code 504 Gateway Timeout. Need assistance from your core banking integrations team.',
    time: '12m ago',
    status: 'New'
  },
  {
    id: 'inq-102',
    name: 'Pooja Sundaram',
    email: 'pooja@growthcommerce.co',
    subject: 'API integration inquiry for B2B billing',
    message: 'We are an e-commerce platform processing over 45k daily splits and merchant settlements. We would love to evaluate your high-throughput double-entry ledger REST APIs and discuss enterprise SLA pricing.',
    time: '2h ago',
    status: 'In Review'
  },
  {
    id: 'inq-103',
    name: 'Arjun Nambiar',
    email: 'arjun.nambiar@gmail.com',
    subject: 'Discrepancy in shared dinner split calculation',
    message: 'When splitting ₹4,800 among 5 flatmates with an uneven tip calculation, ₹12 remained unallocated in the preview card before final ledger settlement. Log attached.',
    time: 'Yesterday',
    status: 'Resolved'
  }
];

export default function STSFintechApp() {
  // Client-Side Routing: '/stsadminlogin' vs public '/'
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  // Public Navigation State: 'home' | 'careers' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState('home');

  // Shared Jobs State (Persisted in localStorage)
  const [jobs, setJobs] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sts_fintech_jobs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved jobs', e);
        }
      }
    }
    return DEFAULT_OPEN_ROLES;
  });

  // Shared Contact Inquiries State (Persisted in localStorage)
  const [inquiries, setInquiries] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sts_fintech_inquiries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved inquiries', e);
        }
      }
    }
    return INITIAL_INQUIRIES;
  });

  // Modals & Active Role
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Application Form State
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    portfolioLink: '',
    coverNote: ''
  });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSuccessToast, setAppSuccessToast] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccessToast, setContactSuccessToast] = useState(false);

  // Curved 3D Typography Hover State
  const [activeLetterId, setActiveLetterId] = useState(null);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Client-Side Route Changer
  const navigateTo = (path) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Public tab navigator
  const handleNavigate = (tab, role = null) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (role && tab === 'careers') {
      setSelectedRole(role);
      setIsApplicationModalOpen(true);
    }
  };

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

  // Helper to determine role icon
  const getRoleIcon = (dept = '', title = '') => {
    const combined = `${dept} ${title}`.toLowerCase();
    if (combined.includes('full stack') || combined.includes('frontend') || combined.includes('dev')) return Code2;
    if (combined.includes('backend') || combined.includes('api') || combined.includes('core')) return Server;
    if (combined.includes('package') || combined.includes('devops') || combined.includes('operation')) return PackageCheck;
    if (combined.includes('hr') || combined.includes('people') || combined.includes('talent')) return Users2;
    return Briefcase;
  };

  // Handle Application Submit
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingApp(true);
    setTimeout(() => {
      setIsSubmittingApp(false);
      setAppSuccessToast(true);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        resumeLink: '',
        portfolioLink: '',
        coverNote: ''
      });
      setTimeout(() => {
        setIsApplicationModalOpen(false);
        setAppSuccessToast(false);
      }, 2500);
    }, 1000);
  };

  // Handle Contact Submit (Appends to Admin Inbox)
  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccessToast(true);

      const newInquiry = {
        id: `inq-${Date.now()}`,
        name: contactForm.name.trim(),
        email: contactForm.email.trim(),
        subject: contactForm.subject,
        message: contactForm.message.trim(),
        time: 'Just now',
        status: 'New'
      };

      const updatedInquiries = [newInquiry, ...inquiries];
      setInquiries(updatedInquiries);
      localStorage.setItem('sts_fintech_inquiries', JSON.stringify(updatedInquiries));

      setContactForm({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
      setTimeout(() => {
        setContactSuccessToast(false);
      }, 4000);
    }, 900);
  };

  // Save Job from Admin Portal
  const handleSaveJobFromAdmin = (savedJob) => {
    const exists = jobs.some(j => j.id === savedJob.id);
    const updated = exists 
      ? jobs.map(j => j.id === savedJob.id ? savedJob : j)
      : [savedJob, ...jobs];
    setJobs(updated);
    localStorage.setItem('sts_fintech_jobs', JSON.stringify(updated));
  };

  // Delete Job from Admin Portal
  const handleDeleteJobFromAdmin = (jobId) => {
    const updated = jobs.filter(j => j.id !== jobId);
    setJobs(updated);
    localStorage.setItem('sts_fintech_jobs', JSON.stringify(updated));
  };

  // Update Inquiry Status from Admin Portal
  const handleUpdateInquiryStatus = (inqId, newStatus) => {
    const updated = inquiries.map(inq => inq.id === inqId ? { ...inq, status: newStatus } : inq);
    setInquiries(updated);
    localStorage.setItem('sts_fintech_inquiries', JSON.stringify(updated));
  };

  // Delete Inquiry from Admin Portal
  const handleDeleteInquiry = (inqId) => {
    const updated = inquiries.filter(inq => inq.id !== inqId);
    setInquiries(updated);
    localStorage.setItem('sts_fintech_inquiries', JSON.stringify(updated));
  };

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

  // Active public roles (excluding Closed)
  const publicRoles = jobs.filter(j => j.status !== 'Closed');

  // =========================================================================
  // ROUTE: ADMIN PORTAL (/stsadminlogin)
  // =========================================================================
  if (currentPath === '/stsadminlogin') {
    return (
      <AdminPortal
        jobs={jobs}
        onSaveJob={handleSaveJobFromAdmin}
        onDeleteJob={handleDeleteJobFromAdmin}
        inquiries={inquiries}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onViewLiveSite={() => navigateTo('/')}
      />
    );
  }

  // =========================================================================
  // ROUTE: PUBLIC WEBSITE (/)
  // =========================================================================
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans relative overflow-x-hidden selection:bg-emerald-500 selection:text-white flex flex-col justify-between">
      
      {/* =========================================================================
          BACKGROUND VISUAL ELEMENTS (Pure white background with grid, rupees, charts)
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
            <linearGradient id="stsSmoothCurveGradApp" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#10b981" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#14b8a6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="stsSmoothCurveAreaApp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <filter id="stsCurveGlowApp" x="-20%" y="-20%" width="140%" height="140%">
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
            fill="url(#stsSmoothCurveAreaApp)"
          />

          <path
            d="M 0,390 
               C 220,400 340,340 500,280 
               C 660,220 780,260 960,180 
               C 1120,100 1280,130 1440,55"
            stroke="url(#stsSmoothCurveGradApp)"
            strokeWidth="3.5"
            filter="url(#stsCurveGlowApp)"
          />

          <circle cx="500" cy="280" r="4.5" fill="#34d399" className="animate-pulse" />
          <circle cx="960" cy="180" r="5" fill="#10b981" className="animate-pulse" />
          <circle cx="1320" cy="90" r="5" fill="#00ff88" className="animate-pulse" />
        </svg>
      </div>

      {/* =========================================================================
          EDGE-TO-EDGE HEADER WITH INTEGRATED ROUTE NAVIGATION & DYNAMIC ROLES
          ========================================================================= */}
      <Header 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onSignIn={() => setIsSignInModalOpen(true)}
        onGetStarted={() => setIsSignInModalOpen(true)}
        roles={jobs}
      />

      {/* =========================================================================
          DYNAMIC MAIN CONTENT VIEWS: HOME | CAREERS | ABOUT | CONTACT
          ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* =======================================================================
            VIEW 1: HOME LANDING VIEW (3D Curved Typography & Showcase Video)
            ======================================================================= */}
        {activeTab === 'home' && (
          <main className="pt-10 sm:pt-14 md:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 animate-in fade-in duration-200">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
              
              {/* Curved 3D Hero Heading Container */}
              <div className="flex flex-col items-center justify-center text-center select-none pt-4">
                <h1 className="flex flex-col items-center gap-1 sm:gap-2">
                  {/* Line 1: Curved "STS" with Per-Letter Zoom */}
                  <span className="flex items-center justify-center" aria-label="STS">
                    {renderCurvedLetters(STS_CHARS, 'sts')}
                  </span>

                  {/* Line 2: Curved "FINTECH" with Per-Letter Zoom */}
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

                  {/* Top-Left Pill Badge: Pulsating green status indicator + text */}
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
        )}

        {/* =======================================================================
            VIEW 2: DEDICATED CAREERS / HIRING PAGE (Dynamic from jobs state)
            ======================================================================= */}
        {activeTab === 'careers' && (
          <section className="pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Hero Banner */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                STS-FINTECH CAREERS • WE'RE HIRING
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Join STS-FINTECH – <span className="text-emerald-600">Build the Future</span> of Everyday Wealth
              </h1>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                We are building India's premier daily financial operating ecosystem with automated tracking, live UPI sync, and institutional-grade security. Join a high-autonomy team where your code impacts thousands of lives every single day.
              </p>

              {/* Quick Perks Bar */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {publicRoles.length} Open Role{publicRoles.length === 1 ? '' : 's'}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Full-time &amp; Hybrid
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bengaluru &amp; Remote Friendly
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Generous ESOPs &amp; Health Cover
                </span>
              </div>
            </div>

            {/* Open Roles Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {publicRoles.map((role) => {
                const IconComponent = getRoleIcon(role.dept, role.title);
                const stackList = Array.isArray(role.stack) ? role.stack : (role.stack ? role.stack.split(',') : []);
                const respList = Array.isArray(role.responsibilities) ? role.responsibilities : (role.responsibilities ? role.responsibilities.split('\n') : []);
                const reqList = Array.isArray(role.requirements) ? role.requirements : (role.requirements ? role.requirements.split('\n') : []);

                return (
                  <div
                    key={role.id}
                    className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-200 shadow-sm">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {role.title}
                            </h2>
                            <p className="text-xs font-semibold text-slate-500">{role.dept} • {role.type}</p>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                          {role.status || 'Active'}
                        </span>
                      </div>

                      {/* Location & Compensation Badge */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium mb-4">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {role.location || 'Bengaluru, India'}
                        </span>
                        {role.salary && (
                          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold font-mono">
                            • {role.salary}
                          </span>
                        )}
                      </div>

                      {/* Stack Pills */}
                      {stackList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {stackList.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Responsibilities */}
                      {respList.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-2">
                            Key Responsibilities:
                          </h3>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                            {respList.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Requirements */}
                      {reqList.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-2">
                            Requirements:
                          </h3>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                            {reqList.map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Apply Now Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole(role);
                        setIsApplicationModalOpen(true);
                      }}
                      className="w-full mt-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                );
              })}
            </div>

          </section>
        )}

        {/* =======================================================================
            VIEW 3: DEDICATED ABOUT US PAGE
            ======================================================================= */}
        {activeTab === 'about' && (
          <section className="pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase font-mono mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                ABOUT STS-FINTECH • REIMAGINING EVERYDAY WEALTH
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Engineering Financial Clarity for Every Common Man
              </h1>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                We believe financial discipline should not require an accounting degree. We combine deep banking technology with delightful human design so you can effortlessly take control of your financial destiny.
              </p>
            </div>

            {/* Mission Statement Callout */}
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-[#0a1410] to-[#060c09] text-white p-8 sm:p-12 shadow-2xl border border-emerald-800/40 mb-12 overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block mb-3">
                  Our Core Mission
                </span>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug tracking-tight text-slate-100">
                  “Empowering everyday individuals and businesses through intuitive, transparent financial engineering and expense management.”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    STS-FINTECH LEADERSHIP &amp; ARCHITECTURE TEAM
                  </span>
                </div>
              </div>
            </div>

            {/* Company Story & Origins */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-emerald-600" />
                Our Story: Why We Built STS-FINTECH
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                <p>
                  Every single day, hundreds of millions of transactions occur across India over UPI, net banking, and digital wallets. Yet, when the month ends, everyday professionals, students, and family households are left asking: <em>"Where did my money actually go?"</em>
                </p>
                <p>
                  Existing accounting software was built for corporate balance sheets, while generic budgeting apps demanded manual data entry that users abandon after four days. We saw the gap: everyday citizens deserved an automated, zero-friction financial co-pilot.
                </p>
                <p>
                  STS-FINTECH was engineered from the ground up to automate daily reconciliation, make group splits instant and stress-free, and empower the common man with institutional-grade compounding insights.
                </p>
              </div>
            </div>

            {/* Three Core Pillars */}
            <div className="mb-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Our Core Operating Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pillar 1 */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">1. Radical Transparency</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Zero hidden fees, zero dark patterns, zero selling of personal data. Every transaction is reconciled with 100% cryptographic clarity and instant audit trails.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-teal-100/80 text-teal-700 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">2. Uncompromised Scalability</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Built upon high-concurrency event-driven microservices engineered to comfortably handle millions of concurrent UPI splits with sub-50ms latency.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">3. Common Man Wealth</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Financial empowerment must not be a luxury. We build tools that make intelligent saving, group fairness, and budget milestones second nature to everyone.
                  </p>
                </div>

              </div>
            </div>

            {/* Architecture Stack Highlights */}
            <div className="bg-[#0b1411] rounded-3xl border border-emerald-900/60 p-8 sm:p-10 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-emerald-400" />
                <h2 className="text-xl sm:text-2xl font-bold">Architecture &amp; Engineering Foundation</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block mb-1">CLIENT LAYER</span>
                  <span className="text-slate-300">React 18 + Vite + Tailwind CSS with sub-50ms hydration.</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block mb-1">SECURITY</span>
                  <span className="text-slate-300">Bank-grade 256-bit AES encryption &amp; RBI compliance.</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block mb-1">REAL-TIME SYNC</span>
                  <span className="text-slate-300">Sub-second transaction webhooks with Redis pub/sub.</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block mb-1">INFRASTRUCTURE</span>
                  <span className="text-slate-300">Vercel Edge Network with 99.99% high-availability SLA.</span>
                </div>
              </div>
            </div>

          </section>
        )}

        {/* =======================================================================
            VIEW 4: DEDICATED CONTACT US PAGE
            ======================================================================= */}
        {activeTab === 'contact' && (
          <section className="pt-10 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase font-mono mb-4">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                CONTACT STS-FINTECH • GET IN TOUCH
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                We'd Love to Hear From You
              </h1>
              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                Have questions about our financial ecosystem, need enterprise assistance, or looking to partner with STS-FINTECH? Reach out and our team will get back to you promptly.
              </p>
            </div>

            {/* Success Toast */}
            {contactSuccessToast && (
              <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center gap-3 text-emerald-900 shadow-lg animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs sm:text-sm font-semibold">
                  Thank you! Your inquiry has been sent directly to our support inbox. We will respond within 24 hours.
                </div>
              </div>
            )}

            {/* 2-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Contact Details Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#0b1411] text-white rounded-3xl p-8 sm:p-10 border border-emerald-900/60 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <h2 className="text-2xl font-bold mb-2">Contact Details</h2>
                <p className="text-slate-400 text-xs sm:text-sm mb-8">
                  Direct communication channels with our support, operations, and leadership offices.
                </p>

                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[11px]">SUPPORT &amp; INQUIRIES</span>
                      <a href="mailto:support@stsfintech.com" className="text-white hover:text-emerald-400 font-semibold transition-colors">
                        support@stsfintech.com
                      </a>
                      <span className="text-slate-400 block text-[11px] mt-0.5">careers@stsfintech.com</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[11px]">CALL CENTER / HELPLINE</span>
                      <span className="text-white font-semibold">+91 (080) 4120-FINTECH</span>
                      <span className="text-slate-400 block text-[11px] mt-0.5">+91 98765 43210 (Toll Free)</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[11px]">REGISTERED OFFICE</span>
                      <address className="not-italic text-slate-200 leading-relaxed">
                        STS FINTECH Tower, Outer Ring Road,<br />
                        Bellandur Tech Corridor,<br />
                        Bengaluru, Karnataka 560103, India
                      </address>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[11px]">BUSINESS HOURS</span>
                      <span className="text-slate-200 block">Monday – Friday: 9:00 AM – 7:00 PM IST</span>
                      <span className="text-slate-400 block text-[11px]">Saturday: 10:00 AM – 4:00 PM IST</span>
                      <span className="text-emerald-400 font-semibold text-[11px] mt-1 block">
                        • 24/7 Priority Emergency Ledger Support
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Verified 256-Bit SSL Encrypted Communication</span>
                </div>
              </div>

              {/* Right Column: Clean Inquiry Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Direct Message</h2>
                <p className="text-slate-500 text-xs sm:text-sm mb-6">
                  Fill out the form below and an STS-FINTECH representative will respond to your registered email.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. aditi@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1.5">
                      Inquiry Subject *
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white transition-all"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="ExpenseTrack App Support">ExpenseTrack App Support</option>
                      <option value="Partnership & Banking APIs">Partnership &amp; Banking APIs</option>
                      <option value="Careers & Talent">Careers &amp; Talent</option>
                      <option value="Security & Compliance">Security &amp; Compliance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can our financial engineering and support team help you?"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmittingContact ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>

          </section>
        )}

      </div>

      {/* =========================================================================
          FOOTER CONSISTENCY ACROSS ALL VIEWS
          ========================================================================= */}
      <footer className="w-full bg-slate-50 border-t border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-800 text-sm font-sans tracking-tight">STS-FINTECH</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} STS Financial Ecosystem Inc.</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleNavigate('home')} 
              className={`hover:text-emerald-600 transition-colors cursor-pointer ${activeTab === 'home' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('careers')} 
              className={`hover:text-emerald-600 transition-colors cursor-pointer ${activeTab === 'careers' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Careers
            </button>
            <button 
              onClick={() => handleNavigate('about')} 
              className={`hover:text-emerald-600 transition-colors cursor-pointer ${activeTab === 'about' ? 'text-emerald-600 font-bold' : ''}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('contact')} 
              className={`hover:text-emerald-600 transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-emerald-600 font-bold' : ''}`}
            >
              Contact
            </button>
            <a 
              href="https://expense-track-seven-smoky.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1"
            >
              <span>ExpenseTrack</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => navigateTo('/stsadminlogin')}
              className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer font-bold"
              title="Admin Portal Login"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE APPLICATION MODAL (For Careers)
          ========================================================================= */}
      {isApplicationModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setIsApplicationModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-emerald-600 block mb-1">
                  JOB APPLICATION
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
                  {selectedRole ? selectedRole.title : 'General Application'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedRole ? `${selectedRole.dept} • ${selectedRole.type}` : 'Engineering & Operations'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApplicationModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close application modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Banner */}
            {appSuccessToast ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying to STS-FINTECH. Our talent acquisition team will review your credentials and contact you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="py-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                      Resume Link (Google Drive / PDF) *
                    </label>
                    <input
                      type="url"
                      required
                      value={applicationForm.resumeLink}
                      onChange={(e) => setApplicationForm({ ...applicationForm, resumeLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    GitHub / Portfolio / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={applicationForm.portfolioLink}
                    onChange={(e) => setApplicationForm({ ...applicationForm, portfolioLink: e.target.value })}
                    placeholder="https://github.com/yourhandle"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Brief Note / Why STS-FINTECH?
                  </label>
                  <textarea
                    rows={3}
                    value={applicationForm.coverNote}
                    onChange={(e) => setApplicationForm({ ...applicationForm, coverNote: e.target.value })}
                    placeholder="Tell us what excites you about building high-trust financial systems..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplicationModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingApp}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmittingApp ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-mono">
              STS-FINTECH is an equal opportunity employer. All applicant information is kept strictly confidential.
            </div>
          </div>
        </div>
      )}

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
                className="p-1.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
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
                className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
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
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close sign in modal"
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
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all cursor-pointer"
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

export { STSFintechApp as STSFintechLanding };
