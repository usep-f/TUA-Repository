import React, { useState } from 'react';
import { ScholarlyWork, CitationStyle } from '../types';
import { generateCitation, generateBibTeX, generateRIS } from '../utils/citation';
import { ResourceCard } from './ResourceCard';
import { 
  Bookmark, 
  Quote, 
  Download, 
  Copy, 
  Check, 
  Trash2, 
  BookOpen, 
  Sparkles, 
  FileText, 
  GraduationCap,
  ExternalLink,
  ListFilter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MyShelfProps {
  savedWorks: ScholarlyWork[];
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
  onToggleSave: (workId: string) => void;
  onClearAllSaved: () => void;
  onNavigateToCatalog: () => void;
}

export const MyShelf: React.FC<MyShelfProps> = ({
  savedWorks,
  onOpenDetails,
  onOpenReader,
  onOpenCite,
  onDownloadPDF,
  onToggleSave,
  onClearAllSaved,
  onNavigateToCatalog
}) => {
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('APA_7');
  const [allCopied, setAllCopied] = useState(false);

  // Generate full composite bibliography text
  const fullBibliographyText = savedWorks
    .map((w, idx) => `${idx + 1}. ${generateCitation(w, citationStyle)}`)
    .join('\n\n');

  const handleCopyAllBibliography = () => {
    if (savedWorks.length === 0) return;
    navigator.clipboard.writeText(fullBibliographyText);
    setAllCopied(true);

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#1E40AF', '#FEF3C7', '#10B981']
    });

    setTimeout(() => setAllCopied(false), 3000);
  };

  const handleDownloadBibliographyDoc = () => {
    if (savedWorks.length === 0) return;
    const content = `TRINITY UNIVERSITY OF ASIA — COLLEGE OF NURSING\nSTUDENT SCHOLARLY REPOSITORY BIBLIOGRAPHY\nGenerated on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}\nCitation Style: ${citationStyle}\n\n========================================================\n\n${fullBibliographyText}\n\n========================================================\nVerified by TUA Nursing Scholarly Archive Portal`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TUA-Nursing-Bibliography-${citationStyle}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Frosted Glass Dark Canvas */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 text-white border border-white/15 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-md">
          <Bookmark className="w-4 h-4 text-amber-400" />
          Personal Scholarly Shelf & Bibliography Builder
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          My Saved Citations & Case Reference List
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Compile reference literature from previous BSN batches. Generate formatted APA 7th reference pages, export citations for Zotero/Mendeley, or compile your Grand Case Presentation literature review.
        </p>
      </div>

      {savedWorks.length > 0 ? (
        <div className="space-y-6">
          {/* Bibliography Export Matrix */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
              <div>
                <h2 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <Quote className="w-5 h-5 text-amber-500" />
                  Consolidated Reference List ({savedWorks.length} Items)
                </h2>
                <p className="text-xs text-slate-500">
                  Ready to copy directly into your BSN thesis or case study reference page
                </p>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Style:</span>
                <select
                  value={citationStyle}
                  onChange={(e) => setCitationStyle(e.target.value as CitationStyle)}
                  className="p-2 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs font-bold text-blue-950 focus:outline-none focus:border-amber-400"
                >
                  <option value="APA_7">APA 7th Edition (Standard)</option>
                  <option value="VANCOUVER">Vancouver (Medical)</option>
                  <option value="HARVARD">Harvard Format</option>
                  <option value="MLA_9">MLA 9th Edition</option>
                </select>
              </div>
            </div>

            {/* Formatted Text Box */}
            <div className="p-4 rounded-2xl glass-dark text-slate-100 font-serif text-xs leading-relaxed max-h-60 overflow-y-auto space-y-3 border border-white/10 select-all shadow-inner">
              {savedWorks.map((work, idx) => (
                <div key={work.id} className="pb-2 border-b border-white/10 last:border-0">
                  <span className="text-amber-400 font-mono font-bold mr-2">[{idx + 1}]</span>
                  <span>{generateCitation(work, citationStyle)}</span>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyAllBibliography}
                  id="copy-all-bibliography-btn"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                    allCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 shadow-xs'
                  }`}
                >
                  {allCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{allCopied ? 'All Citations Copied!' : 'Copy Complete Bibliography'}</span>
                </button>

                <button
                  onClick={handleDownloadBibliographyDoc}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 border border-slate-200 hover:bg-white text-slate-700 font-semibold text-xs transition-colors"
                >
                  <Download className="w-4 h-4 text-blue-900" />
                  <span>Download Reference File (.txt)</span>
                </button>
              </div>

              <button
                onClick={onClearAllSaved}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-rose-50/80 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Shelf</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider">
              Saved Scholarly Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedWorks.map((work) => (
                <ResourceCard
                  key={work.id}
                  work={work}
                  onOpenDetails={onOpenDetails}
                  onOpenReader={onOpenReader}
                  onOpenCite={onOpenCite}
                  onDownloadPDF={onDownloadPDF}
                  isSaved={true}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100/80 text-amber-600 flex items-center justify-center mx-auto border border-amber-200/50">
            <Bookmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-blue-950">Your Reference Shelf is Currently Empty</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Save previous BSN case studies and research papers to build your bibliography, copy APA 7th citations, and export literature review matrices.
            </p>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-2.5 rounded-xl bg-blue-950 text-amber-300 font-bold text-xs hover:bg-blue-900 transition-colors shadow-sm"
          >
            Explore Catalog Search
          </button>
        </div>
      )}
    </div>
  );
};
