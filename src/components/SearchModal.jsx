import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, TrendingUp, PieChart, Users, FileText, Sparkles, Shield, Wallet } from 'lucide-react';

const SEARCH_DATABASE = [
  {
    id: 1,
    title: 'Smart Expense Tracking',
    category: 'Features',
    desc: 'Automatic transaction classification, recurring expense alerts and monthly budget targets.',
    icon: PieChart,
    link: '#features',
    tag: 'Core'
  },
  {
    id: 2,
    title: 'Group & Split Payments',
    category: 'Features',
    desc: 'Instant peer-to-peer bill splitting with UPI integration and smart debt minimization.',
    icon: Users,
    link: '#features',
    tag: 'Social'
  },
  {
    id: 3,
    title: 'Portfolio Wealth Analytics',
    category: 'Features',
    desc: 'Real-time multi-asset net worth insights, inflation hedges, and compound return projections.',
    icon: TrendingUp,
    link: '#features',
    tag: 'Wealth'
  },
  {
    id: 4,
    title: 'Monthly Statement Reconciliation',
    category: 'Tools',
    desc: '12-month PDF / Excel bank statement parser with AI-driven category tagging.',
    icon: FileText,
    link: '#showcase',
    tag: 'Utility'
  },
  {
    id: 5,
    title: 'Bank Grade Security & 256-bit Encryption',
    category: 'Security',
    desc: 'End-to-end encrypted storage complying with RBI account aggregator guidelines.',
    icon: Shield,
    link: '#about',
    tag: 'Compliance'
  },
  {
    id: 6,
    title: 'Multi-Bank Wallet & Accounts Hub',
    category: 'Wallets',
    desc: 'Manage HDFC, SBI, ICICI, Axis and UPI balances in a single unified view.',
    icon: Wallet,
    link: '#features',
    tag: 'Integration'
  }
];

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Features', 'Tools', 'Security', 'Wallets'];

  const filteredItems = SEARCH_DATABASE.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase()) ||
                         item.desc.toLowerCase().includes(query.toLowerCase()) ||
                         item.tag.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1714] border border-emerald-500/25 rounded-2xl shadow-2xl shadow-emerald-950/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Input Field */}
        <div className="flex items-center px-4 py-3.5 border-b border-emerald-900/30 bg-[#131f1a]">
          <Search className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search features, tools, statements, security..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-slate-400 bg-[#0a0f0d] border border-emerald-900/40 rounded hover:border-emerald-500/40 hover:text-white transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-emerald-900/20 bg-[#0c1411] overflow-x-auto text-xs">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mr-1">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black font-semibold shadow-sm shadow-emerald-500/40'
                  : 'bg-[#16231e] text-slate-300 hover:text-white hover:bg-[#1f322b]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5 divide-y divide-emerald-900/10">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 text-emerald-500/40 mx-auto mb-2" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "expenses", "split", "portfolio" or "security"</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.link}
                  onClick={() => {
                    if (onSelectResult) onSelectResult(item);
                    onClose();
                  }}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#162620] group transition-all cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all self-center" />
                </a>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-[#0a0f0d] border-t border-emerald-900/30 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Search live modules & financial features</span>
          </div>
          <span className="font-mono">Press <strong>ESC</strong> to exit</span>
        </div>
      </div>
    </div>
  );
}
