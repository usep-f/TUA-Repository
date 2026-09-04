import React, { useState } from 'react';
import { ScholarlyWork } from '../types';
import { 
  FileText, 
  BookOpen, 
  Quote, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Calendar, 
  User, 
  Sparkles,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface ResourceCardProps {
  work: ScholarlyWork;
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  isSaved: boolean;
  onToggleSave: (workId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  work,
  onOpenDetails,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  isSaved,
  onToggleSave
}) => {
  const [abstractExpanded, setAbstractExpanded] = useState(false);

  const getOutputBadgeStyle = (type: string) => {
    switch (type) {
      case 'Grand Case Presentation':
        return 'bg-blue-900 text-amber-300 border-amber-400/40';
      case 'Nursing Research':
        return 'bg-indigo-900 text-blue-200 border-blue-400/40';
      case 'Community Project':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
      case 'Evidence-Based Clinical Guideline':
        return 'bg-amber-950 text-amber-300 border-amber-400/40';
      default:
        return 'bg-slate-900 text-slate-200 border-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Shelf Available
        </span>;
      case 'On Reserve (2-Hour Loan)':
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
          2-Hr Reserve Loan
        </span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
          Digital Archive
        </span>;
    }
  };

  return (
    <div 
      className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-200"
      id={`work-card-${work.id}`}
    >
      {/* Top Header Card Strip */}
      <div className="bg-slate-950/90 backdrop-blur-md px-6 py-3.5 text-white flex items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className={`px-3 py-1 rounded-md text-xs font-bold border flex items-center gap-1.5 shadow-xs ${getOutputBadgeStyle(work.outputType)}`}>
            <Stethoscope className="w-3.5 h-3.5" />
            {work.outputType}
          </span>
          <span className="text-xs text-amber-300 font-bold bg-amber-400/15 px-2.5 py-1 rounded border border-amber-400/30 backdrop-blur-xs">
            {work.batch}
          </span>
          <span className="text-xs text-slate-300 hidden sm:inline">
            • {work.academicYear}
          </span>
        </div>

        <button
          onClick={() => onToggleSave(work.id)}
          className={`p-2 rounded-lg transition-colors ${
            isSaved 
              ? 'text-amber-300 bg-amber-400/20 border border-amber-400/40' 
              : 'text-slate-300 hover:text-amber-300 hover:bg-white/10'
          }`}
          title={isSaved ? 'Remove from Saved Citations' : 'Save to My Citations'}
          aria-label="Save Citation"
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-300" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div>
          {/* Title */}
          <h3 
            onClick={() => onOpenDetails(work)}
            className="text-base sm:text-lg lg:text-xl font-bold text-blue-950 hover:text-blue-700 cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {work.title}
          </h3>

          {/* Authors & Core Meta (Matching PDF page 3) */}
          <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <p className="flex items-center gap-2 font-medium text-slate-800">
              <User className="w-4 h-4 text-blue-900 shrink-0" />
              <span>
                <strong>Authors:</strong> {work.authors.join(', ')}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-500 pt-0.5">
              <span><strong>Course:</strong> {work.course}</span>
              <span>•</span>
              <span><strong>Specialty:</strong> {work.specialty}</span>
              <span>•</span>
              <span><strong>Year:</strong> {work.year}</span>
            </div>
          </div>

          {/* Condition / Clinical Area Highlight */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-blue-950 bg-blue-50/90 backdrop-blur-xs px-3 py-1 rounded-md border border-blue-200/80">
              Condition: {work.condition}
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100/90 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200/60">
              {work.clinicalArea}
            </span>
            {work.methodology && (
              <span className="text-xs font-medium text-slate-600 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-md border border-slate-200">
                {work.methodology}
              </span>
            )}
          </div>

          {/* Keywords tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {work.keywords.slice(0, 5).map((kw, i) => (
              <span key={i} className="text-[11px] text-slate-600 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded border border-slate-200/80">
                #{kw}
              </span>
            ))}
            {work.keywords.length > 5 && (
              <span className="text-[11px] text-slate-500 px-1 py-0.5">
                +{work.keywords.length - 5} more
              </span>
            )}
          </div>

          {/* Collapsible Abstract Preview */}
          {abstractExpanded && (
            <div className="mt-4 p-4 sm:p-5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5 animate-fadeIn shadow-xs">
              <p className="font-semibold text-blue-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Structured Abstract:
              </p>
              <p>{work.abstract}</p>
              {work.clinicalSummary.nursingDiagnoses.length > 0 && (
                <div className="pt-2.5 border-t border-slate-200">
                  <p className="font-semibold text-slate-800 mb-1">Key Nursing Diagnosis:</p>
                  <p className="italic text-slate-600 line-clamp-2">
                    "{work.clinicalSummary.nursingDiagnoses[0]}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Physical Library Shelf Info */}
        <div className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-xs text-slate-700 font-semibold">
              {work.physicalLibrary.callNumber}
            </span>
          </div>
          <div>
            {getStatusBadge(work.physicalLibrary.status)}
          </div>
        </div>

        {/* Action Buttons Toolbar: [View] [Read] [Download] [Cite] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1.5">
          <button
            onClick={() => setAbstractExpanded(!abstractExpanded)}
            id={`btn-abstract-${work.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all shadow-xs"
            title={abstractExpanded ? 'Hide Abstract' : 'View Abstract'}
          >
            <span>{abstractExpanded ? 'Hide' : 'View'}</span>
            {abstractExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => onOpenReader(work)}
            id={`btn-read-${work.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-900/95 hover:bg-blue-900 text-amber-300 text-xs font-semibold transition-all shadow-xs border border-blue-800/80"
            title="Read Online"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Read</span>
          </button>

          <button
            onClick={() => onDownloadPDF(work)}
            id={`btn-download-${work.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200/90 text-slate-700 text-xs font-semibold transition-all"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5 text-blue-900" />
            <span>Download</span>
          </button>

          <button
            onClick={() => onOpenCite(work)}
            id={`btn-cite-${work.id}`}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 text-xs font-bold transition-all shadow-xs border border-amber-300/60"
            title="Cite Work"
          >
            <Quote className="w-3.5 h-3.5 text-blue-950 fill-blue-950/20" />
            <span>Cite</span>
          </button>
        </div>
      </div>
    </div>
  );
};
