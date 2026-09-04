import React, { useState } from 'react';
import { ScholarlyWork, LibraryAnnouncement } from '../types';
import { ResourceCard } from './ResourceCard';
import { REPOSITORY_CURATED_COLLECTIONS } from '../data/mockWorks';
import { 
  Search, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  GraduationCap, 
  Award, 
  Bell, 
  CheckCircle2, 
  TrendingUp, 
  Stethoscope, 
  Building, 
  ExternalLink,
  ShieldCheck,
  FileCheck2,
  Users,
  Compass
} from 'lucide-react';

interface HomeDashboardProps {
  works: ScholarlyWork[];
  announcements: LibraryAnnouncement[];
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  isSaved: (workId: string) => boolean;
  onToggleSave: (workId: string) => void;
  onSearchKeyword: (keyword: string) => void;
  onSelectCategory: (specialty: string, subSpecialty?: string) => void;
  onNavigateToTab: (tab: 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf') => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  works,
  announcements,
  onOpenDetails,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  isSaved,
  onToggleSave,
  onSearchKeyword,
  onSelectCategory,
  onNavigateToTab
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchKeyword(searchInput.trim());
      onNavigateToTab('catalog');
    }
  };

  const sampleKeywords = [
    'Heart failure',
    'Schizophrenia',
    'Pediatric pneumonia',
    'Disaster nursing',
    'Diabetes',
    'Hypertensive emergency',
    'Preeclampsia',
    'BLS'
  ];

  const featuredWorks = works.filter((w) => w.featured).slice(0, 3);
  const recentGrandCases = works.filter((w) => w.outputType === 'Grand Case Presentation').slice(0, 4);

  return (
    <div className="w-full pb-16 space-y-12 flex-1 relative">
      {/* Full-width Screen-Encompassing Hero Section */}
      <section className="relative w-full overflow-hidden glass-dark !bg-[#01050d] text-white pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-12 border-b border-white/10 shadow-2xl">
        {/* Subtle Decorative Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl lg:max-w-6xl mx-auto text-center space-y-8">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            Trinity University of Asia • College of Nursing
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Repository and <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Case Reference List</span>
          </h1>

          {/* Core Philosophy Banner from PDF */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
            A comprehensive, searchable repository connecting student grand case presentations, clinical research, and community health projects to empower succeeding batches.
          </p>

          {/* Central Hero Search Bar with Frosted Glass input container */}
          <form onSubmit={handleSearchSubmit} className="max-w-3xl lg:max-w-4xl mx-auto relative pt-2">
            <div className="relative flex items-center shadow-2xl rounded-2xl">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search condition, diagnosis, keyword (e.g. Heart failure, Schizophrenia, BSN 2026)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-400/50 shadow-xl border border-white/80"
              />
              <button
                type="submit"
                className="absolute right-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-blue-950 font-bold text-sm transition-all shadow-md active:scale-95"
              >
                Search
              </button>
            </div>

            {/* Quick Keyword Pills directly from PDF prompt */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Try searching:
              </span>
              {sampleKeywords.map((kw, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    onSearchKeyword(kw);
                    onNavigateToTab('catalog');
                  }}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-amber-400 hover:text-blue-950 text-amber-300 border border-white/20 backdrop-blur-xs transition-all"
                >
                  {kw}
                </button>
              ))}
            </div>
          </form>

          {/* Stats Badges with Frosted Glass look */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-5 lg:gap-6 max-w-5xl mx-auto border-t border-white/10 text-center">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">BSN Peer Reviewed</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{works.length}+</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Archived Works</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">APA 7th</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">1-Click Citation</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">2nd Flr</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Physical Reserve Desk</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections with Standard Responsive Container Padding */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-12">
        {/* Library Announcements & Defense Notices */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-amber-500" />
            Library Notices & Academic Announcements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-6 sm:p-7 rounded-2xl glass-panel hover:border-amber-400/80 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${ann.badgeColor}`}>
                    {ann.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
                </div>
                <h3 className="text-base font-bold text-blue-950 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ann.content}
                </p>
              </div>

              {ann.linkText && (
                <div className="mt-4 pt-3.5 border-t border-slate-200/60">
                  <button
                    onClick={() => onNavigateToTab(ann.category === 'Submission Call' ? 'submit' : 'circulation')}
                    className="text-xs sm:text-sm font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{ann.linkText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Curated Specialty Collections Gateways (From PDF page 4-5) */}
      <section className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-900/5 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-amber-500" />
              Recommended Specialty Collections
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Organized by major nursing courses, clinical specialties, and sub-disciplines
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('collections')}
            className="text-xs sm:text-sm font-bold text-blue-950 hover:text-amber-700 flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 hover:border-amber-400/70 transition-colors shadow-xs"
          >
            <span>View All Curated Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {REPOSITORY_CURATED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className="bg-white/95 rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all"
            >
              <div className={`p-5 sm:p-6 bg-gradient-to-r ${col.color} text-white space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                    {col.badgeText}
                  </span>
                  <Stethoscope className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {col.name}
                </h3>
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {col.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200/60">
                  <span className="text-xs font-bold text-slate-700 block">Sub-specialties:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {col.subcategories.map((sub, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          onSelectCategory(col.name, sub.name);
                          onNavigateToTab('catalog');
                        }}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-950 hover:text-amber-300 text-slate-700 font-medium border border-slate-200/80 transition-colors"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory(col.name);
                    onNavigateToTab('catalog');
                  }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-slate-50 group-hover:bg-amber-400 text-blue-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200 group-hover:border-amber-400 shadow-xs"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Scholarly Highlights (Cards matching PDF specifications) */}
      <section className="rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-slate-900/5 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-500" />
              Featured Scholarly Works (High Clinical Relevance)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Top cited case presentations and research by graduating BSN batches
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('catalog')}
            className="text-xs sm:text-sm font-bold text-blue-950 hover:text-amber-700 flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 hover:border-amber-400/70 transition-colors shadow-xs"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {featuredWorks.map((work) => (
            <ResourceCard
              key={work.id}
              work={work}
              onOpenDetails={onOpenDetails}
              onOpenReader={onOpenReader}
              onOpenCite={onOpenCite}
              onDownloadPDF={onDownloadPDF}
              isSaved={isSaved(work.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* Grand Case Presentations Shelf Showcase */}
      <section className="glass-dark rounded-none p-6 sm:p-10 lg:p-12 text-white border border-white/15 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Clinical Defense Matrices & Nursing Care Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Access complete Gordon's Functional Patterns assessments, NANDA diagnoses, and drug matrices.
            </p>
          </div>
          <button
            onClick={() => {
              onSearchKeyword('Grand Case Presentation');
              onNavigateToTab('catalog');
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold text-xs sm:text-sm transition-colors shrink-0 flex items-center justify-center gap-2 shadow-md"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {recentGrandCases.map((work) => (
            <div
              key={work.id}
              onClick={() => onOpenDetails(work)}
              className="p-5 sm:p-6 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group space-y-4"
            >
              <div>
                <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded border border-amber-400/30">
                  {work.batch} • {work.condition}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-2.5 line-clamp-2">
                  {work.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5">
                  By {work.authors[0]} et al.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400/90 font-medium">{work.physicalLibrary.callNumber}</span>
                <span className="text-amber-300 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};
