import React from 'react';
import { 
  BookOpen, 
  Search, 
  Layers, 
  Library, 
  UploadCloud, 
  Bookmark
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf';
  setActiveTab: (tab: 'home' | 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf') => void;
  savedCount: number;
  onQuickSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onQuickSearch
}) => {
  const [navSearch, setNavSearch] = React.useState('');

  const handleNavSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim() && onQuickSearch) {
      onQuickSearch(navSearch.trim());
      setActiveTab('catalog');
    }
  };

  interface NavItem {
    id: 'home' | 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf';
    label: string;
    shortLabel?: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | undefined;
  }

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', shortLabel: 'Home', icon: BookOpen },
    { id: 'catalog', label: 'Catalog Search', shortLabel: 'Catalog', icon: Search },
    { id: 'collections', label: 'Specialty Collections', shortLabel: 'Collections', icon: Layers },
    { id: 'circulation', label: 'Physical Library', shortLabel: 'Physical Lib', icon: Library },
    { id: 'submit', label: 'Submit Work', shortLabel: 'Submit', icon: UploadCloud },
    { 
      id: 'shelf', 
      label: 'My Citations & Shelf', 
      shortLabel: 'My Shelf', 
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined 
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-amber-500/30 text-white shadow-xl w-full overflow-visible">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-1.5 sm:gap-3 overflow-visible">
          {/* Logo / Brand */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 text-left group transition-transform focus:outline-none min-w-0 shrink"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-blue-950/90 backdrop-blur-xs rounded-[10px] flex items-center justify-center text-amber-400">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5 stroke-[2.2]" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors truncate">
                  TUA Nursing Repository
                </h1>
                <span className="hidden 2xl:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-xs shrink-0">
                  SCHOLARLY ARCHIVE
                </span>
              </div>
              <p className="hidden md:block text-[11px] lg:text-xs text-slate-300 font-medium truncate">
                Student Case Presentations • Research • Community Projects
              </p>
            </div>
          </button>

          {/* Quick Search in Header (visible on wide screens) */}
          {activeTab !== 'catalog' && (
            <form 
              onSubmit={handleNavSearchSubmit}
              className="hidden 2xl:flex items-center relative max-w-[200px] w-full shrink-0"
            >
              <Search className="w-3.5 h-3.5 absolute left-3 text-slate-300" />
              <input
                type="text"
                placeholder="Search repository..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white placeholder-slate-300 focus:outline-none focus:border-amber-400 focus:bg-white/15 focus:ring-1 focus:ring-amber-400 transition-all"
              />
            </form>
          )}

          {/* Side Bar Navigation - Logos Only with Equal Spacing & Tooltips */}
          <nav 
            id="main-navigation-bar"
            aria-label="Repository Navigation"
            className="flex items-center justify-end gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 shrink-0"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <div key={item.id} className="relative group">
                  <button
                    id={`nav-btn-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    aria-label={item.label}
                    title={item.label}
                    className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-9.5 md:h-9.5 lg:w-10 lg:h-10 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-blue-950 font-bold shadow-md shadow-amber-400/30 ring-1 ring-amber-300 scale-105'
                        : 'text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 hover:border-amber-400/40 backdrop-blur-xs'
                    }`}
                  >
                    <Icon 
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 transition-transform duration-200 ${
                        isActive ? 'text-blue-950 scale-110 stroke-[2.4]' : 'text-amber-400 group-hover:scale-110 stroke-[2]'
                      }`} 
                    />

                    {/* Badge for Saved items */}
                    {item.badge !== undefined && (
                      <span
                        className={`absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full text-[9px] font-extrabold flex items-center justify-center ring-2 ring-slate-950 shadow-md ${
                          isActive
                            ? 'bg-blue-950 text-amber-300'
                            : 'bg-amber-400 text-blue-950'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Clean Hover Tooltip */}
                  <div 
                    className={`hidden group-hover:flex group-focus-within:flex pointer-events-none absolute top-full mt-2.5 ${
                      item.id === 'shelf' ? 'right-0' : 'left-1/2 -translate-x-1/2'
                    } px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-lg shadow-2xl border border-white/20 whitespace-nowrap z-50 items-center gap-1.5`}
                  >
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-400 text-blue-950 font-bold">
                        {item.badge}
                      </span>
                    )}
                    {/* Tooltip caret */}
                    <div 
                      className={`absolute -top-1 ${
                        item.id === 'shelf' ? 'right-3' : 'left-1/2 -translate-x-1/2'
                      } w-2 h-2 bg-slate-900 rotate-45 border-t border-l border-white/20`}
                    ></div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
