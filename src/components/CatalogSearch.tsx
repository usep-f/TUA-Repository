import React, { useState, useMemo, useEffect } from 'react';
import { ScholarlyWork, SearchFilters, PowerSearchParams, OutputType, MethodologyType } from '../types';
import { ResourceCard } from './ResourceCard';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  Filter, 
  Layers, 
  Grid, 
  List, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Calendar, 
  X,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react';

interface CatalogSearchProps {
  works: ScholarlyWork[];
  initialQuery?: string;
  initialSpecialty?: string;
  initialSubSpecialty?: string;
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  isSaved: (workId: string) => boolean;
  onToggleSave: (workId: string) => void;
}

const ALL_OUTPUT_TYPES: OutputType[] = [
  'Grand Case Presentation',
  'Nursing Research',
  'Community Project',
  'Evidence-Based Clinical Guideline',
  'Clinical Case Study'
];

const ALL_SPECIALTIES = [
  'Adult Health Nursing',
  'Maternal & Child Health',
  'Psychiatric-Mental Health',
  'Emergency & Disaster Nursing',
  'Community Health'
];

const ALL_BATCHES = ['BSN 2026', 'BSN 2025', 'BSN 2024'];

const ALL_METHODOLOGIES: MethodologyType[] = [
  'Quantitative',
  'Qualitative',
  'Mixed Methods',
  'Clinical Case Protocol',
  'Action Research',
  'Evidence Synthesis'
];

const SAMPLE_CONDITIONS = [
  'Heart Failure',
  'Schizophrenia',
  'Pediatric Pneumonia',
  'Disaster Nursing',
  'Diabetes',
  'Hypertensive Emergency',
  'Preeclampsia',
  'Shock',
  'BLS',
  'Renal'
];

export const CatalogSearch: React.FC<CatalogSearchProps> = ({
  works,
  initialQuery = '',
  initialSpecialty = '',
  initialSubSpecialty = '',
  onOpenDetails,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  isSaved,
  onToggleSave
}) => {
  // Mode: 'basic' vs 'power' (Advanced Power Search)
  const [searchMode, setSearchMode] = useState<'basic' | 'power'>('basic');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Basic Search State
  const [basicQuery, setBasicQuery] = useState(initialQuery);
  const [selectedOutputTypes, setSelectedOutputTypes] = useState<OutputType[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    initialSpecialty ? [initialSpecialty] : []
  );
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    initialSubSpecialty ? [initialSubSpecialty] : []
  );
  const [selectedShelfStatus, setSelectedShelfStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'relevance' | 'year-desc' | 'citations-desc' | 'title-asc'>('relevance');

  // Pagination State (5 cards per page)
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Power Search State (Matching PDF page 2)
  const [powerParams, setPowerParams] = useState<PowerSearchParams>({
    keyword: '',
    title: '',
    author: '',
    condition: '',
    specialty: '',
    researchTopic: '',
    year: '',
    batch: '',
    methodology: '',
    course: ''
  });

  const handleResetFilters = () => {
    setBasicQuery('');
    setSelectedOutputTypes([]);
    setSelectedSpecialties([]);
    setSelectedBatches([]);
    setSelectedConditions([]);
    setSelectedShelfStatus('ALL');
    setSortBy('relevance');
    setPowerParams({
      keyword: '',
      title: '',
      author: '',
      condition: '',
      specialty: '',
      researchTopic: '',
      year: '',
      batch: '',
      methodology: '',
      course: ''
    });
  };

  // Filter and Search Algorithm
  const filteredWorks = useMemo(() => {
    if (searchMode === 'power') {
      return works.filter((w) => {
        if (powerParams.keyword && !`${w.title} ${w.abstract} ${w.keywords.join(' ')}`.toLowerCase().includes(powerParams.keyword.toLowerCase())) {
          return false;
        }
        if (powerParams.title && !w.title.toLowerCase().includes(powerParams.title.toLowerCase())) {
          return false;
        }
        if (powerParams.author && !w.authors.some((a) => a.toLowerCase().includes(powerParams.author.toLowerCase()))) {
          return false;
        }
        if (powerParams.condition && !w.condition.toLowerCase().includes(powerParams.condition.toLowerCase()) && !w.subSpecialty.toLowerCase().includes(powerParams.condition.toLowerCase())) {
          return false;
        }
        if (powerParams.specialty && !w.specialty.toLowerCase().includes(powerParams.specialty.toLowerCase())) {
          return false;
        }
        if (powerParams.researchTopic && (!w.researchTopic || !w.researchTopic.toLowerCase().includes(powerParams.researchTopic.toLowerCase()))) {
          return false;
        }
        if (powerParams.year && w.year.toString() !== powerParams.year.trim()) {
          return false;
        }
        if (powerParams.batch && !w.batch.toLowerCase().includes(powerParams.batch.toLowerCase())) {
          return false;
        }
        if (powerParams.methodology && w.methodology !== powerParams.methodology) {
          return false;
        }
        if (powerParams.course && !w.course.toLowerCase().includes(powerParams.course.toLowerCase())) {
          return false;
        }
        return true;
      });
    }

    // Basic Search Filter Pipeline
    return works.filter((w) => {
      // Keyword matching
      if (basicQuery.trim()) {
        const q = basicQuery.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(q);
        const matchesAuthors = w.authors.some((a) => a.toLowerCase().includes(q));
        const matchesKeywords = w.keywords.some((k) => k.toLowerCase().includes(q));
        const matchesCondition = w.condition.toLowerCase().includes(q);
        const matchesSubSpecialty = w.subSpecialty.toLowerCase().includes(q);
        const matchesAbstract = w.abstract.toLowerCase().includes(q);
        const matchesCourse = w.course.toLowerCase().includes(q);
        const matchesBatch = w.batch.toLowerCase().includes(q);

        if (!matchesTitle && !matchesAuthors && !matchesKeywords && !matchesCondition && !matchesSubSpecialty && !matchesAbstract && !matchesCourse && !matchesBatch) {
          return false;
        }
      }

      // Output Type
      if (selectedOutputTypes.length > 0 && !selectedOutputTypes.includes(w.outputType)) {
        return false;
      }

      // Specialty
      if (selectedSpecialties.length > 0 && !selectedSpecialties.includes(w.specialty)) {
        return false;
      }

      // Batch
      if (selectedBatches.length > 0 && !selectedBatches.includes(w.batch)) {
        return false;
      }

      // Conditions
      if (selectedConditions.length > 0 && !selectedConditions.some((c) => w.condition.toLowerCase().includes(c.toLowerCase()) || w.subSpecialty.toLowerCase().includes(c.toLowerCase()))) {
        return false;
      }

      // Shelf status
      if (selectedShelfStatus !== 'ALL' && w.physicalLibrary.status !== selectedShelfStatus) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'citations-desc') return b.metrics.citationsCount - a.metrics.citationsCount;
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      return 0; // relevance / default order
    });
  }, [works, searchMode, basicQuery, selectedOutputTypes, selectedSpecialties, selectedBatches, selectedConditions, selectedShelfStatus, sortBy, powerParams]);

  // Reset pagination to page 1 whenever filters or query change
  useEffect(() => {
    setCurrentPage(1);
  }, [basicQuery, searchMode, selectedOutputTypes, selectedSpecialties, selectedBatches, selectedConditions, selectedShelfStatus, sortBy, powerParams]);

  // Pagination Calculations (Dynamic page added for every 5 cards)
  const totalPages = Math.max(1, Math.ceil(filteredWorks.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredWorks.length);
  const paginatedWorks = filteredWorks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeFiltersCount = selectedOutputTypes.length + selectedSpecialties.length + selectedBatches.length + selectedConditions.length + (selectedShelfStatus !== 'ALL' ? 1 : 0);

  return (
    <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 pb-16 space-y-6 flex-1 relative">
      {/* Top Search Controls Bar with Frosted Glass Panel */}
      <div className="glass-panel !bg-[#ffffff] rounded-2xl p-4 sm:p-6 space-y-4">
        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2">
              <Search className="w-6 h-6 text-amber-500" />
              Repository Catalog & Discovery
            </h1>
            <p className="text-xs text-slate-600">
              Search digital scholarly records and physical shelf copies for St. Luke's College of Nursing
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-200/50 backdrop-blur-xs p-1 rounded-xl border border-white/60">
            <button
              onClick={() => setSearchMode('basic')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                searchMode === 'basic'
                  ? 'bg-blue-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              Basic Search
            </button>
            <button
              onClick={() => setSearchMode('power')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                searchMode === 'power'
                  ? 'bg-blue-950 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              ⚡ Power Search (Multi-Field)
            </button>
          </div>
        </div>

        {/* BASIC SEARCH INTERFACE */}
        {searchMode === 'basic' ? (
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by keywords (e.g. Heart failure, Schizophrenia, Pediatric pneumonia, Disaster nursing)..."
                value={basicQuery}
                onChange={(e) => setBasicQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20"
              />
              {basicQuery && (
                <button
                  onClick={() => setBasicQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick condition tags directly from PDF Page 1 */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Quick suggestions:</span>
              {SAMPLE_CONDITIONS.map((cond, i) => (
                <button
                  key={i}
                  onClick={() => setBasicQuery(cond)}
                  className={`px-2.5 py-0.5 rounded-full border transition-all ${
                    basicQuery.toLowerCase() === cond.toLowerCase()
                      ? 'bg-blue-900 text-amber-300 border-amber-400'
                      : 'bg-white/70 backdrop-blur-xs hover:bg-white text-slate-700 border-slate-200/80'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* POWER SEARCH INTERFACE (Matching PDF Page 2) */
          <div className="p-5 rounded-2xl glass-dark text-white border border-white/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Power Search Query Matrix (Specific Field Targeting)
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Fields</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">General Keyword</label>
                <input
                  type="text"
                  placeholder="e.g. fluid overload, triage"
                  value={powerParams.keyword}
                  onChange={(e) => setPowerParams({ ...powerParams, keyword: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Congestive Heart Failure"
                  value={powerParams.title}
                  onChange={(e) => setPowerParams({ ...powerParams, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Author</label>
                <input
                  type="text"
                  placeholder="e.g. Juan Dela Cruz"
                  value={powerParams.author}
                  onChange={(e) => setPowerParams({ ...powerParams, author: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Diagnosis / Condition</label>
                <input
                  type="text"
                  placeholder="e.g. Heart failure, Schizophrenia"
                  value={powerParams.condition}
                  onChange={(e) => setPowerParams({ ...powerParams, condition: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nursing Specialty</label>
                <select
                  value={powerParams.specialty}
                  onChange={(e) => setPowerParams({ ...powerParams, specialty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">All Specialties</option>
                  {ALL_SPECIALTIES.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Batch / Cohort</label>
                <select
                  value={powerParams.batch}
                  onChange={(e) => setPowerParams({ ...powerParams, batch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">All Batches</option>
                  {ALL_BATCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Methodology</label>
                <select
                  value={powerParams.methodology}
                  onChange={(e) => setPowerParams({ ...powerParams, methodology: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/20 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">All Methodologies</option>
                  {ALL_METHODOLOGIES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Year</label>
                <input
                  type="text"
                  placeholder="e.g. 2026"
                  value={powerParams.year}
                  onChange={(e) => setPowerParams({ ...powerParams, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Research Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Adherence, Triage"
                  value={powerParams.researchTopic}
                  onChange={(e) => setPowerParams({ ...powerParams, researchTopic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Results Layout: Sidebar Filters + Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between glass-panel p-3.5 rounded-xl">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-xs font-bold text-blue-950"
          >
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Filters ({activeFiltersCount})</span>
            {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <span className="text-xs text-slate-500">
            {filteredWorks.length} Results
          </span>
        </div>

        {/* Sidebar Filters with Frosted Glass Panel */}
        <aside className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} lg:col-span-3 space-y-6 glass-panel p-6 rounded-2xl`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              Filter Facets
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-900 hover:text-amber-600 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filter: Output Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Scholarly Output Type
            </label>
            <div className="space-y-1.5">
              {ALL_OUTPUT_TYPES.map((type) => {
                const count = works.filter((w) => w.outputType === type).length;
                const isChecked = selectedOutputTypes.includes(type);
                return (
                  <label
                    key={type}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-950 cursor-pointer p-1.5 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedOutputTypes(selectedOutputTypes.filter((t) => t !== type));
                          } else {
                            setSelectedOutputTypes([...selectedOutputTypes, type]);
                          }
                        }}
                        className="rounded text-blue-950 focus:ring-amber-400 border-slate-300"
                      />
                      <span>{type}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter: Nursing Specialty */}
          <div className="space-y-2 pt-3 border-t border-slate-200/60">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Nursing Specialty
            </label>
            <div className="space-y-1.5">
              {ALL_SPECIALTIES.map((spec) => {
                const count = works.filter((w) => w.specialty === spec).length;
                const isChecked = selectedSpecialties.includes(spec);
                return (
                  <label
                    key={spec}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-950 cursor-pointer p-1.5 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
                          } else {
                            setSelectedSpecialties([...selectedSpecialties, spec]);
                          }
                        }}
                        className="rounded text-blue-950 focus:ring-amber-400 border-slate-300"
                      />
                      <span>{spec}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter: Batch / Cohort */}
          <div className="space-y-2 pt-3 border-t border-slate-200/60">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              BSN Batch / Cohort
            </label>
            <div className="space-y-1.5">
              {ALL_BATCHES.map((batch) => {
                const count = works.filter((w) => w.batch === batch).length;
                const isChecked = selectedBatches.includes(batch);
                return (
                  <label
                    key={batch}
                    className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-950 cursor-pointer p-1.5 rounded-lg hover:bg-white/60 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedBatches(selectedBatches.filter((b) => b !== batch));
                          } else {
                            setSelectedBatches([...selectedBatches, batch]);
                          }
                        }}
                        className="rounded text-blue-950 focus:ring-amber-400 border-slate-300"
                      />
                      <span>{batch}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter: Physical Library Shelf Availability */}
          <div className="space-y-2 pt-3 border-t border-slate-200/60">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Physical Shelf Status
            </label>
            <select
              value={selectedShelfStatus}
              onChange={(e) => setSelectedShelfStatus(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-400"
            >
              <option value="ALL">All Statuses</option>
              <option value="Available">Available on Shelf</option>
              <option value="On Reserve (2-Hour Loan)">2-Hour Reserve Loan</option>
              <option value="Digitized Only">Digitized Archive</option>
            </select>
          </div>
        </aside>

        {/* Search Results Main Column */}
        <main className="lg:col-span-9 space-y-6">
          {/* Results Header Bar */}
          <div className="glass-panel rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-bold text-blue-950 text-base">
                {filteredWorks.length}
              </span>
              <span className="text-slate-600">
                scholarly works found
              </span>
              {totalPages > 1 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-blue-950 font-bold text-xs border border-amber-400/40">
                  Page {safeCurrentPage} of {totalPages}
                </span>
              )}
              {basicQuery && (
                <span className="px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 font-semibold border border-blue-200/60">
                  Keyword: "{basicQuery}"
                </span>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/80 backdrop-blur-xs border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-medium focus:outline-none focus:border-amber-400"
              >
                <option value="relevance">Relevance / Featured</option>
                <option value="year-desc">Newest Year First</option>
                <option value="citations-desc">Most Cited by Batches</option>
                <option value="title-asc">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Cards Listing */}
          {filteredWorks.length > 0 ? (
            <>
              <div className="space-y-6">
                {paginatedWorks.map((work) => (
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

              {/* Dynamic Pagination Bar (Adds new pages once cards exceed 5) */}
              {totalPages > 1 && (
                <nav
                  aria-label="Scholarly cards pagination"
                  className="glass-panel rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6"
                >
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">
                    Showing <span className="font-bold text-slate-900">{startIndex + 1}</span>–<span className="font-bold text-slate-900">{endIndex}</span> of <span className="font-bold text-slate-900">{filteredWorks.length}</span> cards (5 per page)
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 240, behavior: 'smooth' });
                      }}
                      disabled={safeCurrentPage === 1}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs font-semibold text-slate-700 hover:bg-white hover:text-blue-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all shadow-xs"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => {
                            setCurrentPage(pageNum);
                            window.scrollTo({ top: 240, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                            safeCurrentPage === pageNum
                              ? 'bg-blue-950 text-amber-300 shadow-sm ring-2 ring-amber-400/50'
                              : 'text-slate-600 hover:bg-white/80 hover:text-blue-950 border border-transparent hover:border-slate-200'
                          }`}
                          aria-label={`Page ${pageNum}`}
                          aria-current={safeCurrentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 240, behavior: 'smooth' });
                      }}
                      disabled={safeCurrentPage === totalPages}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-200/80 bg-white/70 text-xs font-semibold text-slate-700 hover:bg-white hover:text-blue-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all shadow-xs"
                      aria-label="Next page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="p-12 text-center glass-panel rounded-2xl space-y-3">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Scholarly Works Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No matching case presentations or research were found for your current filter query. Try searching broader keywords like "Heart failure" or "Diabetes".
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 text-xs font-bold hover:from-amber-300 hover:to-amber-400 transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
