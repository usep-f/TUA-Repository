import React, { useState } from 'react';
import { ScholarlyWork } from '../types';
import { generateCitation } from '../utils/citation';
import { 
  X, 
  BookOpen, 
  Quote, 
  Download, 
  Copy, 
  Check, 
  MapPin, 
  Share2, 
  Bookmark, 
  BookmarkCheck,
  Stethoscope, 
  Building2, 
  GraduationCap, 
  Calendar, 
  FileText, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  HeartPulse,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResourceDetailModalProps {
  work: ScholarlyWork | null;
  isOpen: boolean;
  onClose: () => void;
  allWorks: ScholarlyWork[];
  onSelectWork: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  isSaved: boolean;
  onToggleSave: (workId: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  work,
  isOpen,
  onClose,
  allWorks,
  onSelectWork,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  isSaved,
  onToggleSave
}) => {
  const [citationCopied, setCitationCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'record' | 'ncp' | 'circulation'>('record');

  if (!isOpen || !work) return null;

  const apaCitation = generateCitation(work, 'APA_7');

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(apaCitation);
    setCitationCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#1E40AF', '#FEF3C7']
    });
    setTimeout(() => setCitationCopied(false), 2500);
  };

  // Find related works (matching PDF page 5: related works based on specialty, condition, keywords, or course)
  const relatedWorks = allWorks
    .filter((w) => w.id !== work.id)
    .map((w) => {
      let score = 0;
      if (w.specialty === work.specialty) score += 3;
      if (w.condition === work.condition) score += 4;
      if (w.subSpecialty === work.subSpecialty) score += 3;
      if (w.course === work.course) score += 2;
      const sharedKw = w.keywords.filter((k) => work.keywords.includes(k)).length;
      score += sharedKw * 2;
      return { work: w, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.work);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="glass-panel bg-white/95 rounded-3xl max-w-4xl w-full shadow-2xl border border-white/80 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Banner with Frosted Glass Dark Canvas */}
        <div className="glass-dark px-6 py-4 text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-400 text-blue-950 border border-amber-300">
              {work.outputType}
            </span>
            <span className="text-xs text-amber-300 font-semibold">• {work.batch}</span>
            <span className="text-xs text-slate-300 hidden sm:inline">• Accession: {work.physicalLibrary.accessionNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(work.id)}
              className={`p-1.5 rounded-xl transition-colors ${
                isSaved ? 'bg-amber-400 text-blue-950 font-bold' : 'text-slate-300 hover:bg-white/10'
              }`}
              title={isSaved ? 'Saved to shelf' : 'Bookmark work'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Action Bar */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 leading-tight">
              {work.title}
            </h2>
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onOpenReader(work)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-amber-300 text-xs font-bold transition-all shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Read Full Document ({work.fullDocument.pagesCount} Pages)</span>
              </button>
              <button
                onClick={() => onDownloadPDF(work)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-blue-900" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => onOpenCite(work)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 text-xs font-bold transition-all shadow-xs"
              >
                <Quote className="w-4 h-4" />
                <span>Generate Citation</span>
              </button>
            </div>
          </div>

          {/* Structured Metadata Grid (Strictly structured from PDF page 4) */}
          <div className="glass-dark text-white rounded-2xl p-5 border border-white/10 shadow-inner">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Scholarly Metadata Record (TUA College of Nursing)
            </h3>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3.5 text-sm">
              <div>
                <dt className="text-xs font-medium text-slate-400">Authors</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.authors.join(', ')}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Academic Year & Batch</dt>
                <dd className="font-semibold text-amber-300 mt-0.5">{work.academicYear} • {work.batch}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Output Type</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.outputType}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Course</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.course}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Clinical Area / Setting</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.clinicalArea}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Condition / Pathology</dt>
                <dd className="font-semibold text-amber-300 mt-0.5">{work.condition}</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Nursing Specialty</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.specialty} ({work.subSpecialty})</dd>
              </div>

              <div>
                <dt className="text-xs font-medium text-slate-400">Hospital / Community Affiliation</dt>
                <dd className="font-semibold text-slate-100 mt-0.5">{work.hospitalAffiliation || 'TUA Nursing Clinical Partner Hospitals'}</dd>
              </div>

              <div className="md:col-span-2 pt-1">
                <dt className="text-xs font-medium text-slate-400">Keywords</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {work.keywords.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 border border-white/20">
                      {kw}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Abstract Section (Matching PDF page 4) */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-900" />
              Abstract
            </h3>
            <div className="p-4 rounded-2xl bg-blue-50/70 backdrop-blur-xs border border-blue-100 text-sm text-slate-800 leading-relaxed">
              <p>{work.abstract}</p>
            </div>
          </div>

          {/* Clinical Case Summary & Nursing Care Highlights */}
          {work.clinicalSummary && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                Clinical Case Breakdown & Nursing Process
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {work.clinicalSummary.patientProfile && (
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Patient Profile & History</span>
                    <p className="text-xs text-slate-600">{work.clinicalSummary.patientProfile}</p>
                  </div>
                )}
                {work.clinicalSummary.chiefComplaint && (
                  <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block mb-1">Chief Triage Signs</span>
                    <p className="text-xs text-slate-600">{work.clinicalSummary.chiefComplaint}</p>
                  </div>
                )}
              </div>

              {work.clinicalSummary.nursingDiagnoses.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/80 backdrop-blur-xs border border-amber-200">
                  <span className="text-xs font-bold text-amber-950 block mb-2">Formulated Nursing Diagnoses (NANDA-I Priority):</span>
                  <ul className="space-y-1.5">
                    {work.clinicalSummary.nursingDiagnoses.map((nd, idx) => (
                      <li key={idx} className="text-xs text-amber-900 flex items-start gap-2">
                        <span className="font-bold text-amber-700 shrink-0">{idx + 1}.</span>
                        <span>{nd}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {work.clinicalSummary.keyInterventions.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-50/80 backdrop-blur-xs border border-blue-200">
                  <span className="text-xs font-bold text-blue-950 block mb-2">Key Nursing Interventions (NIC):</span>
                  <ul className="space-y-1.5">
                    {work.clinicalSummary.keyInterventions.map((ni, idx) => (
                      <li key={idx} className="text-xs text-blue-900 flex items-start gap-2">
                        <span className="font-bold text-blue-700 shrink-0">•</span>
                        <span>{ni}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {work.clinicalSummary.clinicalOutcomes && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 backdrop-blur-xs border border-emerald-200 text-xs text-emerald-950">
                  <strong>Clinical Outcome (NOC):</strong> {work.clinicalSummary.clinicalOutcomes}
                </div>
              )}
            </div>
          )}

          {/* Physical Library Shelf Record & Reserve (Digital + Physical management) */}
          <div className="p-5 rounded-2xl glass-dark text-white border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Physical Library Location (Follett Destiny)</span>
              </div>
              <p className="font-mono text-sm font-bold text-white">
                Call No: {work.physicalLibrary.callNumber}
              </p>
              <p className="text-xs text-slate-300">
                {work.physicalLibrary.shelfLocation} ({work.physicalLibrary.shelfRow})
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400 text-blue-950 shadow-xs">
                {work.physicalLibrary.status}
              </span>
            </div>
          </div>

          {/* Cite This Work Box directly matching PDF page 5 */}
          <div className="p-5 rounded-2xl glass-dark text-white border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Quote className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Cite This Work (APA 7th Edition)
                </h4>
              </div>
              <button
                onClick={handleCopyCitation}
                id="modal-copy-citation-btn"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  citationCopied 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950'
                }`}
              >
                {citationCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{citationCopied ? 'Copied!' : 'Copy Citation'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 text-slate-200 font-serif text-xs leading-relaxed border border-white/10 select-all">
              {apaCitation}
            </div>
            <p className="text-[11px] text-slate-400">
              Directly referenced by succeeding batches for clinical defense matrices and literature reviews.
            </p>
          </div>

          {/* Related Works (Matching PDF page 5 specification) */}
          {relatedWorks.length > 0 && (
            <div className="pt-4 border-t border-slate-200/60 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 flex items-center justify-between">
                <span>Related Nursing Scholarly Works</span>
                <span className="text-xs font-normal text-slate-500">Based on specialty: {work.specialty}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedWorks.map((rw) => (
                  <div
                    key={rw.id}
                    onClick={() => onSelectWork(rw)}
                    className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-xs hover:bg-white border border-slate-200 hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-blue-900 font-semibold mb-1">
                        <span className="px-1.5 py-0.5 rounded-md bg-blue-100/80 text-blue-900 font-medium">{rw.outputType}</span>
                        <span>• {rw.batch}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 line-clamp-2">
                        {rw.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        By {rw.authors[0]} et al. ({rw.year})
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-amber-700 font-semibold">
                      <span>Condition: {rw.condition}</span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-amber-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
