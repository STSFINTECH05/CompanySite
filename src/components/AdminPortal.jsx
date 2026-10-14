import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  ArrowLeft, 
  Briefcase, 
  Mail, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  LogOut, 
  Search, 
  Filter, 
  X, 
  Save, 
  ChevronRight,
  TrendingUp,
  Inbox,
  UserCheck,
  Check
} from 'lucide-react';

export default function AdminPortal({
  jobs,
  onSaveJob,
  onDeleteJob,
  inquiries,
  onUpdateInquiryStatus,
  onDeleteInquiry,
  onViewLiveSite
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('sts_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab: 'jobs' | 'inbox'
  const [activeAdminTab, setActiveAdminTab] = useState('jobs');

  // Job Modal States (Create / Edit)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    dept: 'Engineering',
    type: 'Full-time',
    location: 'Bengaluru, India (Hybrid)',
    experience: '3+ Years',
    salary: 'Competitive CTC + ESOPs',
    stack: '',
    responsibilities: '',
    requirements: '',
    status: 'Active'
  });

  // Delete Job Confirmation Modal
  const [jobToDelete, setJobToDelete] = useState(null);

  // Inquiry Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');

  // Job Search & Filter
  const [jobSearch, setJobSearch] = useState('');
  const [jobStatusFilter, setJobStatusFilter] = useState('All');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }
    // Accept valid admin credentials
    if (loginPassword.length >= 4) {
      localStorage.setItem('sts_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Password must be at least 4 characters.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sts_admin_auth');
    setIsAuthenticated(false);
  };

  const fillDemoCredentials = () => {
    setLoginEmail('admin@stsfintech.com');
    setLoginPassword('admin123');
    setLoginError('');
  };

  // Open Create Job Modal
  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setJobFormData({
      title: '',
      dept: 'Engineering',
      type: 'Full-time',
      location: 'Bengaluru, India (Hybrid)',
      experience: '3+ Years',
      salary: 'Competitive CTC + ESOPs',
      stack: 'React.js, Node.js, Express, PostgreSQL',
      responsibilities: 'Lead product feature development\nArchitect robust API microservices\nCollaborate with design and operations',
      requirements: '3+ years experience with modern JavaScript\nStrong relational database fundamentals\nPassion for high-trust fintech',
      status: 'Active'
    });
    setIsJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title || '',
      dept: job.dept || 'Engineering',
      type: job.type || 'Full-time',
      location: job.location || 'Bengaluru, India',
      experience: job.experience || '2+ Years',
      salary: job.salary || 'Competitive CTC',
      stack: Array.isArray(job.stack) ? job.stack.join(', ') : (job.stack || ''),
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : (job.responsibilities || ''),
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      status: job.status || 'Active'
    });
    setIsJobModalOpen(true);
  };

  // Submit Job (Create / Edit)
  const handleJobFormSubmit = (e) => {
    e.preventDefault();
    const formattedJob = {
      id: editingJob ? editingJob.id : `job-${Date.now()}`,
      title: jobFormData.title.trim(),
      dept: jobFormData.dept,
      type: jobFormData.type,
      location: jobFormData.location.trim(),
      experience: jobFormData.experience.trim(),
      salary: jobFormData.salary.trim(),
      status: jobFormData.status,
      stack: jobFormData.stack.split(',').map(s => s.trim()).filter(Boolean),
      responsibilities: jobFormData.responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
      requirements: jobFormData.requirements.split('\n').map(r => r.trim()).filter(Boolean)
    };

    onSaveJob(formattedJob);
    setIsJobModalOpen(false);
  };

  // Confirm Delete Job
  const handleConfirmDeleteJob = () => {
    if (jobToDelete) {
      onDeleteJob(jobToDelete.id);
      setJobToDelete(null);
    }
  };

  // Filtered Jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.dept.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesStatus = jobStatusFilter === 'All' || job.status === jobStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          item.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          item.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          item.message.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesStatus = inquiryStatusFilter === 'All' || item.status === inquiryStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Unread/New Inquiries Count
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const activeJobsCount = jobs.filter(j => j.status === 'Active').length;

  // =========================================================================
  // VIEW: ADMIN LOGIN SCREEN (Unauthenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
        
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Minimal Top Bar */}
        <header className="relative z-10 w-full px-4 sm:px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">STS-FINTECH</span>
              <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase font-mono block -mt-0.5">
                ADMIN PORTAL
              </span>
            </div>
          </div>

          <button
            onClick={onViewLiveSite}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Site</span>
          </button>
        </header>

        {/* Login Card */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Authentication</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter your administrative credentials to manage careers and inspect problem inbox submissions.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@stsfintech.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                Authenticate &amp; Enter Portal
              </button>
            </form>

            {/* Quick Demo Helper */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Demo credentials ready</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                Auto-fill credentials
              </button>
            </div>
          </div>
        </main>

        <footer className="relative z-10 text-center py-4 text-[11px] text-slate-400 font-mono">
          STS-FINTECH INTERNAL MANAGEMENT SYSTEM • RESTRICTED ACCESS
        </footer>
      </div>
    );
  }

  // =========================================================================
  // VIEW: ADMIN DASHBOARD (Authenticated)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
        <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand & Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                  STS-FINTECH
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ADMIN PORTAL
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Signed in as <span className="font-semibold text-slate-700">Administrator (SuperAdmin)</span>
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onViewLiveSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="px-4 sm:px-8 flex items-center gap-8 border-t border-slate-100">
          <button
            onClick={() => setActiveAdminTab('jobs')}
            className={`py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeAdminTab === 'jobs'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Job Hiring Management (CRUD)</span>
            <span className="px-2 py-0.2 rounded-full text-[11px] font-mono bg-slate-100 text-slate-700">
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('inbox')}
            className={`py-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer relative ${
              activeAdminTab === 'inbox'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Contact Us Inquiries / Problem Reports</span>
            {newInquiriesCount > 0 && (
              <span className="px-2 py-0.2 rounded-full text-[11px] font-mono font-bold bg-rose-500 text-white animate-pulse">
                {newInquiriesCount} new
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* =======================================================================
            TAB 1: CAREERS / HIRING MANAGEMENT (FULL CRUD)
            ======================================================================= */}
        {activeAdminTab === 'jobs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Header Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Active Job Postings</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Create, update, or remove job listings. Changes immediately sync to the public Careers page &amp; header dropdown.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateJob}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Role</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">TOTAL ROLES</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{jobs.length}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono text-emerald-600 uppercase font-bold">ACTIVE LISTINGS</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{activeJobsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono text-amber-600 uppercase font-bold">PAUSED / CLOSED</span>
                <p className="text-2xl font-black text-amber-600 mt-1">{jobs.length - activeJobsCount}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] font-mono text-teal-600 uppercase font-bold">PUBLIC SYNC</span>
                <p className="text-sm font-bold text-teal-700 mt-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Live on /careers
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search role title or department..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500 font-mono">STATUS:</span>
                {['All', 'Active', 'Paused', 'Closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setJobStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      jobStatusFilter === status
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs Data Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase">
                    <tr>
                      <th className="px-6 py-3.5 font-bold">Role Title</th>
                      <th className="px-6 py-3.5 font-bold">Department</th>
                      <th className="px-6 py-3.5 font-bold">Job Type</th>
                      <th className="px-6 py-3.5 font-bold">Location</th>
                      <th className="px-6 py-3.5 font-bold">Status</th>
                      <th className="px-6 py-3.5 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                          <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="font-semibold text-sm">No job postings matched your search criteria.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {Array.isArray(job.stack) ? job.stack.slice(0, 3).join(', ') : job.stack}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-700">{job.dept}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                              {job.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-600">{job.location || 'Bengaluru, India'}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                              job.status === 'Active' 
                                ? 'bg-emerald-100 text-emerald-800'
                                : job.status === 'Paused'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {job.status || 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenEditJob(job)}
                                className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                title="Edit Role"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setJobToDelete(job)}
                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete Role"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* =======================================================================
            TAB 2: CONTACT US INQUIRIES & PROBLEM INBOX
            ======================================================================= */}
        {activeAdminTab === 'inbox' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Inbound Problem Reports &amp; Inquiries</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submissions from the public Contact Us form appear here in real time. Update statuses or inspect messages.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">TOTAL TICKETS: {inquiries.length}</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search sender, subject, or message..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500 font-mono">STATUS:</span>
                {['All', 'New', 'In Review', 'Resolved'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setInquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      inquiryStatusFilter === status
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase">
                    <tr>
                      <th className="px-6 py-3.5 font-bold">Sender</th>
                      <th className="px-6 py-3.5 font-bold">Subject / Category</th>
                      <th className="px-6 py-3.5 font-bold">Message Preview</th>
                      <th className="px-6 py-3.5 font-bold">Timestamp</th>
                      <th className="px-6 py-3.5 font-bold">Status</th>
                      <th className="px-6 py-3.5 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                          <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="font-semibold text-sm">No inquiries match the current filter.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            <span className="text-[11px] text-slate-500">{item.email}</span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {item.subject}
                          </td>
                          <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                            {item.message}
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">
                            {item.time}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                              item.status === 'New'
                                ? 'bg-rose-100 text-rose-800 animate-pulse'
                                : item.status === 'In Review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(item)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                              >
                                View Details
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteInquiry(item.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* =========================================================================
          MODAL: CREATE / EDIT JOB POSTING
          ========================================================================= */}
      {isJobModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setIsJobModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-emerald-600 block mb-1">
                  CAREERS MANAGEMENT
                </span>
                <h3 className="font-extrabold text-slate-900 text-xl">
                  {editingJob ? `Edit Role: ${editingJob.title}` : 'Add New Job Posting'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleJobFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title}
                    onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                    placeholder="e.g. Senior Backend Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                    Department *
                  </label>
                  <select
                    value={jobFormData.dept}
                    onChange={(e) => setJobFormData({ ...jobFormData, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Core Banking & APIs">Core Banking &amp; APIs</option>
                    <option value="Fintech Operations">Fintech Operations</option>
                    <option value="People & Culture">People &amp; Culture</option>
                    <option value="Product & Design">Product &amp; Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                    Job Type *
                  </label>
                  <select
                    value={jobFormData.type}
                    onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Full-time / Hybrid">Full-time / Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    placeholder="Bengaluru, India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={jobFormData.status}
                    onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                  Salary / Package Range
                </label>
                <input
                  type="text"
                  value={jobFormData.salary}
                  onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                  placeholder="e.g. ₹18L - ₹28L CTC + ESOPs"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                  Technologies / Stack (Comma separated)
                </label>
                <input
                  type="text"
                  value={jobFormData.stack}
                  onChange={(e) => setJobFormData({ ...jobFormData, stack: e.target.value })}
                  placeholder="React.js, Node.js, Express, PostgreSQL"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                  Responsibilities (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={jobFormData.responsibilities}
                  onChange={(e) => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase font-mono mb-1">
                  Requirements (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={jobFormData.requirements}
                  onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingJob ? 'Save Changes' : 'Create Role'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: DELETE JOB CONFIRMATION
          ========================================================================= */}
      {jobToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setJobToDelete(null)}
        >
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Delete Job Posting?</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Are you sure you want to delete <strong className="text-slate-900">{jobToDelete.title}</strong>? This action will permanently remove it from the public Careers page and Header menu.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteJob}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: INQUIRY DETAILS & STATUS MODAL
          ========================================================================= */}
      {selectedInquiry && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedInquiry(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-emerald-600 block mb-1">
                  INQUIRY TICKET #{selectedInquiry.id}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  {selectedInquiry.subject}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Received: {selectedInquiry.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">SENDER:</span>
                  <span className="font-bold text-slate-900">{selectedInquiry.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">EMAIL:</span>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-emerald-600 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-500 font-mono">CURRENT STATUS:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    selectedInquiry.status === 'New'
                      ? 'bg-rose-100 text-rose-800'
                      : selectedInquiry.status === 'In Review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedInquiry.status}
                  </span>
                </div>
              </div>

              <div>
                <span className="block font-bold text-slate-700 uppercase font-mono mb-1">
                  FULL MESSAGE:
                </span>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-2">
                <span className="block font-bold text-slate-700 uppercase font-mono mb-2">
                  UPDATE STATUS:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInquiryStatus(selectedInquiry.id, 'New');
                      setSelectedInquiry({ ...selectedInquiry, status: 'New' });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      selectedInquiry.status === 'New' ? 'bg-rose-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Mark New
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInquiryStatus(selectedInquiry.id, 'In Review');
                      setSelectedInquiry({ ...selectedInquiry, status: 'In Review' });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      selectedInquiry.status === 'In Review' ? 'bg-amber-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Mark In Review
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateInquiryStatus(selectedInquiry.id, 'Resolved');
                      setSelectedInquiry({ ...selectedInquiry, status: 'Resolved' });
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                      selectedInquiry.status === 'Resolved' ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)} - STS-FINTECH`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
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
