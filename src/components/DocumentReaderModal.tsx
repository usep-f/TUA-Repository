import React, { useState } from 'react';
import { ScholarlyWork } from '../types';
import { generateCitation } from '../utils/citation';
import { 
  X, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  BookOpen, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  FileText, 
  ListTree, 
  ShieldCheck, 
  Info,
  Layers,
  GraduationCap
} from 'lucide-react';

interface DocumentReaderModalProps {
  work: ScholarlyWork | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCite: (work: ScholarlyWork) => void;
  onDownloadPDF: (work: ScholarlyWork) => void;
}

export const DocumentReaderModal: React.FC<DocumentReaderModalProps> = ({
  work,
  isOpen,
  onClose,
  onOpenCite,
  onDownloadPDF
}) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isOpen || !work) return null;

  const totalSimulatedPages = work.fullDocument.pagesCount || 36;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md text-slate-100 animate-fadeIn">
      {/* Top Toolbar with Frosted Glass Dark Canvas */}
      <div className="h-16 glass-dark border-b border-white/10 px-4 flex items-center justify-between gap-4 shrink-0 shadow-xl">
        {/* Left: Document Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-amber-300 transition-colors border border-white/10"
            title="Toggle Table of Contents"
          >
            <ListTree className="w-5 h-5" />
          </button>
          <div className="overflow-hidden">
            <h2 className="text-sm font-bold text-white truncate max-w-md">
              {work.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-amber-400 font-semibold">{work.batch}</span>
              <span>•</span>
              <span>{work.outputType}</span>
              <span>•</span>
              <span className="font-mono text-slate-400">Call No: {work.physicalLibrary.callNumber}</span>
            </div>
          </div>
        </div>

        {/* Center: Pagination & Zoom */}
        <div className="hidden md:flex items-center gap-3 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-lg text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-amber-300 font-bold">
            Page {currentPage} of {totalSimulatedPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalSimulatedPages, p + 1))}
            disabled={currentPage === totalSimulatedPages}
            className="p-1 rounded-lg text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/20 mx-1" />

          <button
            onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
            className="p-1 rounded-lg text-slate-300 hover:text-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono text-slate-300 w-10 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
            className="p-1 rounded-lg text-slate-300 hover:text-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenCite(work)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 text-xs font-bold transition-all shadow-xs"
          >
            <Quote className="w-4 h-4" />
            <span>Cite Work</span>
          </button>
          <button
            onClick={() => onDownloadPDF(work)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-colors border border-white/10"
            title="Download Document"
          >
            <Download className="w-5 h-5 text-amber-400" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 text-slate-300 hover:text-white transition-colors ml-2 border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reader Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar TOC */}
        {sidebarOpen && (
          <aside className="w-72 glass-dark border-r border-white/10 flex flex-col shrink-0 animate-fadeIn">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ListTree className="w-4 h-4" /> Table of Contents
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                {work.fullDocument.tableOfContents.length} Sections
              </span>
            </div>
            <div className="p-3 overflow-y-auto space-y-1 flex-1 text-xs">
              {work.fullDocument.tableOfContents.map((toc, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all leading-snug flex items-start gap-2 ${
                    currentPage === idx + 1
                      ? 'bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/40 shadow-xs'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-[10px] text-amber-400/80 font-mono mt-0.5">{idx + 1}.</span>
                  <span>{toc}</span>
                </button>
              ))}
            </div>
            <div className="p-4 bg-black/40 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Repository Verification:</p>
              <p>St. Luke's College of Nursing Official Student Scholarly Repository</p>
              <p className="text-amber-400/80 font-mono text-[10px]">DOI: {work.doi || 'tua.edu.ph/nur/archive'}</p>
            </div>
          </aside>
        )}

        {/* Central PDF Page Canvas Container */}
        <main className="flex-1 bg-slate-950/60 overflow-y-auto p-4 sm:p-8 flex justify-center">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl glass-panel bg-white/95 text-slate-900 rounded-3xl shadow-2xl p-8 sm:p-12 transition-transform duration-150 relative min-h-[900px] border border-white/80"
            id="scholarly-document-canvas"
          >
            {/* Document Institutional Header */}
            <div className="border-b-2 border-blue-950 pb-6 mb-8 text-center relative">
              <div className="inline-block px-3.5 py-1 rounded-full bg-blue-950 text-amber-300 text-[10px] font-bold tracking-widest uppercase mb-2 shadow-xs">
                TRINITY UNIVERSITY OF ASIA • COLLEGE OF NURSING
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif text-blue-950 leading-tight">
                {work.title}
              </h1>
              <p className="text-xs text-slate-600 mt-2 font-medium">
                Submitted in Partial Fulfillment of the Requirements for <span className="text-blue-900 font-semibold">{work.course}</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700">
                <span><strong>Authors:</strong> {work.authors.join(', ')}</span>
                <span>•</span>
                <span><strong>Batch:</strong> {work.batch}</span>
                <span>•</span>
                <span><strong>Academic Year:</strong> {work.academicYear}</span>
              </div>
              {work.advisor && (
                <p className="text-xs text-slate-500 mt-1 italic">
                  Faculty Adviser: {work.advisor}
                </p>
              )}
            </div>

            {/* Structured Abstract Box */}
            <div className="mb-8 p-5 bg-blue-50/70 backdrop-blur-xs rounded-2xl border border-blue-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-950 mb-2">
                Abstract
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-serif">
                {work.abstract}
              </p>
              <div className="mt-3 pt-3 border-t border-blue-100 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-700">Keywords:</span>
                {work.keywords.map((kw, i) => (
                  <span key={i} className="text-slate-600 bg-white/90 px-2 py-0.5 rounded-md border border-slate-200 text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Document Content Sections */}
            <div className="space-y-8 font-serif text-slate-800">
              {work.fullDocument.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold font-serif text-blue-950 pb-1 border-b border-slate-200">
                    {sec.heading}
                  </h2>
                  {sec.subheading && (
                    <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-amber-700">
                      {sec.subheading}
                    </h3>
                  )}
                  <p className="text-sm leading-relaxed text-justify">
                    {sec.body}
                  </p>

                  {sec.callout && (
                    <div className={`p-4 rounded-2xl text-xs font-serif my-3 ${
                      sec.callout.type === 'alert'
                        ? 'bg-rose-50 border-l-4 border-rose-600 text-rose-950'
                        : 'bg-amber-50 border-l-4 border-amber-500 text-amber-950'
                    }`}>
                      <strong>Clinical Practice Alert:</strong> {sec.callout.text}
                    </div>
                  )}

                  {sec.tables && sec.tables.map((table, tIdx) => (
                    <div key={tIdx} className="my-4 font-serif">
                      <p className="text-xs font-bold text-slate-700 mb-1.5">{table.title}</p>
                      <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-xs">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-blue-950 text-white font-semibold">
                            <tr>
                              {table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-2.5 border-r border-blue-900 last:border-0">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {table.rows.map((r, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                {r.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2.5 border-r border-slate-200 last:border-0 font-mono text-[11px]">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Standard APA Citation Reference Footer inside Document */}
            <div className="mt-12 pt-6 border-t-2 border-slate-200 text-xs font-serif text-slate-500 space-y-1">
              <p className="font-bold text-slate-700">How to Cite This Document:</p>
              <p className="font-serif text-slate-700 select-all bg-slate-50/90 p-3 rounded-xl border border-slate-200">
                {generateCitation(work, 'APA_7')}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
