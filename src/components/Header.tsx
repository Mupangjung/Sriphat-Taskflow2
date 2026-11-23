import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const Header: React.FC = () => {
  const { favorites } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap shrink-0 text-[15px] font-medium py-1 transition-colors duration-150 border-b-2 ${
      isActive
        ? 'text-[#4338CA] border-[#4338CA]'
        : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
    }`;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 rounded-md focus-visible:outline-2"
        >
          <span
            aria-hidden="true"
            className="w-8 h-8 rounded-lg bg-[#7C3AED] text-white flex items-center justify-center shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M12 11v6" />
              <path d="M9 14h6" />
            </svg>
          </span>
          <span>NurseFocus</span>
        </Link>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav aria-label="เมนูหลัก" className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={navLinkClass}>
            ค้นหาโรค
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            รายการโปรด{favorites.length > 0 ? ` (${favorites.length})` : ''}
          </NavLink>
          <NavLink to="/compare" className={navLinkClass}>
            เปรียบเทียบปัญหา
          </NavLink>
          <NavLink to="/analytics" className={navLinkClass}>
            สถิติต้นแบบ
          </NavLink>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Drawer Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/?focusSearch=1');
            }}
            className="hidden sm:inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>ค้นหาด่วน</span>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'ปิดเมนูนำทาง' : 'เปิดเมนูนำทาง'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="เมนูนำทางมือถือ"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium ${
                isActive ? 'bg-[#4338CA]/10 text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            ค้นหาโรค
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between min-h-[44px] px-3 rounded-lg text-base font-medium ${
                isActive ? 'bg-[#4338CA]/10 text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <span>รายการโปรด</span>
            <span className="tabular-nums text-sm text-slate-500">{favorites.length}</span>
          </NavLink>
          <NavLink
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium ${
                isActive ? 'bg-[#4338CA]/10 text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            เปรียบเทียบปัญหา
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium ${
                isActive ? 'bg-[#4338CA]/10 text-[#4338CA]' : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            สถิติต้นแบบ
          </NavLink>
        </nav>
      )}
    </header>
  );
};
