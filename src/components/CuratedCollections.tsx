import React, { useState } from 'react';
import { ScholarlyWork } from '../types';
import { REPOSITORY_CURATED_COLLECTIONS } from '../data/mockWorks';
import { ResourceCard } from './ResourceCard';
import { 
  Layers, 
  Stethoscope, 
  HeartPulse, 
  Baby, 
  Brain, 
  Flame, 
  ArrowRight, 
  BookOpen, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';

interface CuratedCollectionsProps {
  works: ScholarlyWork[];
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  isSaved: (workId: string) => boolean;
  onToggleSave: (workId: string) => void;
  onNavigateToCatalogWithFilter: (specialty: string, subSpecialty?: string) => void;
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({
  works,
  onOpenDetails,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  isSaved,
  onToggleSave,
  onNavigateToCatalogWithFilter
}) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('med-surg');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const activeCollection = REPOSITORY_CURATED_COLLECTIONS.find((c) => c.id === selectedCollectionId) || REPOSITORY_CURATED_COLLECTIONS[0];

  const filteredCollectionWorks = works.filter((w) => {
    // Check specialty match
    const specialtyMatch = 
      (selectedCollectionId === 'med-surg' && (w.course.includes('Medical-Surgical') || w.specialty.includes('Adult Health'))) ||
      (selectedCollectionId === 'maternal-child' && (w.course.includes('Maternal') || w.specialty.includes('Maternal'))) ||
      (selectedCollectionId === 'psychiatric' && (w.course.includes('Psychiatric') || w.specialty.includes('Psychiatric'))) ||
      (selectedCollectionId === 'emergency-disaster' && (w.course.includes('Emergency') || w.specialty.includes('Emergency')));

    if (!specialtyMatch) return false;

    if (selectedSubCategory) {
      return w.subSpecialty.toLowerCase() === selectedSubCategory.toLowerCase() || 
             w.condition.toLowerCase().includes(selectedSubCategory.toLowerCase()) ||
             w.keywords.some((k) => k.toLowerCase().includes(selectedSubCategory.toLowerCase()));
    }

    return true;
  });

  const getCollectionIcon = (id: string) => {
    switch (id) {
      case 'med-surg':
        return <HeartPulse className="w-5 h-5" />;
      case 'maternal-child':
        return <Baby className="w-5 h-5" />;
      case 'psychiatric':
        return <Brain className="w-5 h-5" />;
      case 'emergency-disaster':
        return <Flame className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Frosted Glass Dark Canvas */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 text-white border border-white/15 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-md">
          <Layers className="w-4 h-4 text-amber-400" />
          Recommended Curated Lists
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Curated Nursing Specialty Hubs
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Explore structured clinical archives systematically arranged by course syllabus, organ system, and clinical diagnostic categories matching the St. Luke's College of Nursing curriculum.
        </p>
      </div>

      {/* Main Specialty Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REPOSITORY_CURATED_COLLECTIONS.map((col) => {
          const isSelected = col.id === selectedCollectionId;
          const Icon = getCollectionIcon(col.id);
          return (
            <button
              key={col.id}
              onClick={() => {
                setSelectedCollectionId(col.id);
                setSelectedSubCategory(null);
              }}
              className={`p-5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'glass-dark text-white border-amber-400 shadow-xl ring-2 ring-amber-400/40'
                  : 'glass-panel text-slate-900 hover:border-amber-400/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-amber-400 text-blue-950 shadow-sm' : 'bg-blue-100/80 text-blue-900'
                  }`}>
                    {Icon}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/10 text-amber-300 border border-white/20' : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}>
                    {col.subcategories.length} Categories
                  </span>
                </div>
                <h3 className="text-base font-bold leading-tight">
                  {col.name}
                </h3>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  {col.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/40 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-amber-300 font-bold' : 'text-blue-900'}>
                  {isSelected ? 'Viewing Hub' : 'Select Hub'}
                </span>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-Specialty Breakdown Strip (Matching PDF Pages 4-5) */}
      <div className="glass-panel rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
              {activeCollection.name} Sub-Disciplines
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Click any subcategory to filter repository works
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubCategory(null)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSubCategory === null
                ? 'bg-blue-950 text-amber-300 shadow-xs'
                : 'bg-white/70 backdrop-blur-xs text-slate-700 hover:bg-white border border-slate-200/70'
            }`}
          >
            All {activeCollection.name} ({filteredCollectionWorks.length})
          </button>
          {activeCollection.subcategories.map((sub, idx) => {
            const isSubSelected = selectedSubCategory === sub.name;
            return (
              <button
                key={idx}
                onClick={() => setSelectedSubCategory(sub.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSubSelected
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-bold shadow-xs border border-amber-400'
                    : 'bg-white/70 backdrop-blur-xs hover:bg-white text-slate-800 border border-slate-200/70'
                }`}
              >
                <span>{sub.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ({works.filter((w) => w.subSpecialty.toLowerCase() === sub.name.toLowerCase() || w.condition.toLowerCase().includes(sub.name.toLowerCase())).length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Collection Works Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-blue-950">
              {selectedSubCategory ? `${selectedSubCategory} Works` : `All ${activeCollection.name} Archives`}
            </span>
            <span className="text-xs text-slate-500">
              ({filteredCollectionWorks.length} documents)
            </span>
          </div>
          <button
            onClick={() => onNavigateToCatalogWithFilter(activeCollection.name, selectedSubCategory || undefined)}
            className="text-xs font-bold text-blue-900 hover:text-amber-600 flex items-center gap-1"
          >
            <span>Open in Full Catalog Search</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredCollectionWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollectionWorks.map((work) => (
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
        ) : (
          <div className="p-12 text-center glass-panel rounded-2xl space-y-2">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No works cataloged under this exact subcategory yet</h3>
            <p className="text-xs text-slate-500">
              Senior BSN students may submit relevant case presentations via the submission portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
