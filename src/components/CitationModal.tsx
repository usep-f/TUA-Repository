import React, { useState } from 'react';
import { ScholarlyWork, CitationStyle } from '../types';
import { generateCitation, generateBibTeX, generateRIS } from '../utils/citation';
import { 
  Quote, 
  Copy, 
  Check, 
  Download, 
  X, 
  FileText, 
  BookOpen, 
  Sparkles,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CitationModalProps {
  work: ScholarlyWork | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ work, isOpen, onClose }) => {
  const [style, setStyle] = useState<CitationStyle>('APA_7');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !work) return null;

  const citationText = generateCitation(work, style);

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    
    // Subtle festive gold confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#1E40AF', '#FEF3C7', '#3B82F6']
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadBibTeX = () => {
    const bibtex = generateBibTeX(work);
    const blob = new Blob([bibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${work.id}-citation.bib`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadRIS = () => {
    const ris = generateRIS(work);
    const blob = new Blob([ris], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${work.id}-citation.ris`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="glass-panel bg-white/95 rounded-3xl max-w-2xl w-full shadow-2xl border border-white/80 overflow-hidden transform transition-all"
        id="citation-modal-box"
      >
        {/* Header with Frosted Glass Dark Canvas */}
        <div className="glass-dark px-6 py-5 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Cite This Work
                <span className="text-xs bg-amber-400 text-blue-950 font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  APA 7th Ready
                </span>
              </h2>
              <p className="text-xs text-slate-200">
                Official repository reference generator for student bibliographies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Work Summary Preview */}
          <div className="bg-blue-50/80 backdrop-blur-xs border border-blue-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-950 text-amber-300">
                {work.outputType}
              </span>
              <span className="text-xs text-blue-900 font-semibold">• {work.batch}</span>
              <span className="text-xs text-slate-500">• {work.course}</span>
            </div>
            <h3 className="text-sm font-semibold text-blue-950 leading-snug line-clamp-2">
              {work.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              By {work.authors.join(', ')} ({work.year})
            </p>
          </div>

          {/* Citation Format Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Citation Standard Style
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'APA_7', label: 'APA 7th Edition (Default)' },
                  { id: 'VANCOUVER', label: 'Vancouver (Medical)' },
                  { id: 'HARVARD', label: 'Harvard' },
                  { id: 'MLA_9', label: 'MLA 9th' },
                  { id: 'CHICAGO', label: 'Chicago' }
                ] as const
              ).map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setStyle(fmt.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    style === fmt.id
                      ? 'bg-blue-950 text-amber-300 border border-amber-400 shadow-sm font-bold'
                      : 'bg-white/80 backdrop-blur-xs text-slate-700 hover:bg-white border border-slate-200'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Formatted Citation Block */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Formatted Reference Text</span>
              <span className="text-[11px] font-normal text-slate-500">
                Standard academic indentation ready
              </span>
            </label>
            <div className="p-4 rounded-2xl glass-dark text-slate-100 border border-white/10 font-serif text-sm leading-relaxed tracking-wide select-all break-words shadow-inner">
              {citationText}
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopy}
              id="copy-citation-btn"
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold shadow-amber-500/20 active:scale-[0.98]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Citation Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>

            {/* Reference Manager Exports */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownloadBibTeX}
                title="Download BibTeX (.bib) for LaTeX/Overleaf"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/80 border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-blue-900" />
                <span>BibTeX</span>
              </button>
              <button
                onClick={handleDownloadRIS}
                title="Download RIS (.ris) for Zotero / Mendeley / EndNote"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white/80 border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-blue-900" />
                <span>RIS (Zotero)</span>
              </button>
            </div>
          </div>

          {/* Academic Purpose Callout directly from PDF */}
          <div className="p-4 rounded-2xl bg-amber-50/90 backdrop-blur-xs border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Succeeding Batch Continuity:</strong> Properly citing previous student case studies acknowledges peer academic rigor and builds longitudinal nursing evidence for Trinity College of Nursing defenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
