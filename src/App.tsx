import React, { useState, useEffect } from 'react';
import { ScholarlyWork, LibraryAnnouncement } from './types';
import { INITIAL_SCHOLARLY_WORKS, INITIAL_ANNOUNCEMENTS } from './data/mockWorks';
import { generateCitation } from './utils/citation';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { CatalogSearch } from './components/CatalogSearch';
import { CuratedCollections } from './components/CuratedCollections';
import { PhysicalCirculation } from './components/PhysicalCirculation';
import { SubmissionPortal } from './components/SubmissionPortal';
import { MyShelf } from './components/MyShelf';
import { CitationModal } from './components/CitationModal';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { DocumentReaderModal } from './components/DocumentReaderModal';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf'>('home');

  // Repository Works State (with local persistence)
  const [works, setWorks] = useState<ScholarlyWork[]>(() => {
    try {
      const saved = localStorage.getItem('tua_nursing_repo_works');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SCHOLARLY_WORKS;
  });

  // Saved Citations / Shelf Bookmarks
  const [savedWorkIds, setSavedWorkIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tua_saved_citations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['tua-ncp-2026-001', 'tua-res-2025-001'];
  });

  // Catalog search filters passed from other sections
  const [catalogQuery, setCatalogQuery] = useState('');
  const [catalogSpecialty, setCatalogSpecialty] = useState('');
  const [catalogSubSpecialty, setCatalogSubSpecialty] = useState('');

  // Modals state
  const [detailWork, setDetailWork] = useState<ScholarlyWork | null>(null);
  const [readerWork, setReaderWork] = useState<ScholarlyWork | null>(null);
  const [citeWork, setCiteWork] = useState<ScholarlyWork | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tua_nursing_repo_works', JSON.stringify(works));
    } catch (e) {
      console.error(e);
    }
  }, [works]);

  useEffect(() => {
    try {
      localStorage.setItem('tua_saved_citations', JSON.stringify(savedWorkIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedWorkIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleSave = (workId: string) => {
    setSavedWorkIds((prev) => {
      const exists = prev.includes(workId);
      if (exists) {
        showToast('Removed from My Citations');
        return prev.filter((id) => id !== workId);
      } else {
        showToast('Saved to My Citations & Shelf');
        return [...prev, workId];
      }
    });
  };

  const handleClearAllSaved = () => {
    if (window.confirm('Are you sure you want to clear all saved citations from your shelf?')) {
      setSavedWorkIds([]);
      showToast('Saved citations cleared');
    }
  };

  const handleAddWork = (newWork: ScholarlyWork) => {
    setWorks((prev) => [newWork, ...prev]);
    showToast('Scholarly work successfully archived!');
  };

  const handleSearchKeywordFromAnywhere = (keyword: string) => {
    setCatalogQuery(keyword);
    setCatalogSpecialty('');
    setCatalogSubSpecialty('');
    setActiveTab('catalog');
  };

  const handleSelectCategoryFromAnywhere = (specialty: string, subSpecialty?: string) => {
    setCatalogQuery('');
    setCatalogSpecialty(specialty);
    setCatalogSubSpecialty(subSpecialty || '');
    setActiveTab('catalog');
  };

  const handleDownloadPDF = (work: ScholarlyWork) => {
    // Generate clean printable scholarly manuscript content
    const documentContent = `TRINITY UNIVERSITY OF ASIA — ST. LUKE'S COLLEGE OF NURSING
OFFICIAL SCHOLARLY REPOSITORY ARCHIVE RECORD
Accession Number: ${work.physicalLibrary.accessionNumber}
Call Number: ${work.physicalLibrary.callNumber}

================================================================================
TITLE: ${work.title}
OUTPUT TYPE: ${work.outputType}
AUTHORS: ${work.authors.join(', ')}
ACADEMIC YEAR: ${work.academicYear} | BATCH: ${work.batch}
COURSE: ${work.course} | SPECIALTY: ${work.specialty} (${work.subSpecialty})
CLINICAL AREA: ${work.clinicalArea}
ADVISOR: ${work.advisor || 'St. Luke\'s College of Nursing Clinical Faculty'}
================================================================================

I. ABSTRACT:
${work.abstract}

II. KEYWORDS:
${work.keywords.join(', ')}

III. PATIENT PROFILE & CHIEF COMPLAINT:
Profile: ${work.clinicalSummary.patientProfile || 'N/A'}
Chief Complaint: ${work.clinicalSummary.chiefComplaint || 'N/A'}

IV. FORMULATED NURSING DIAGNOSES (NANDA-I):
${work.clinicalSummary.nursingDiagnoses.map((nd, i) => `${i + 1}. ${nd}`).join('\n')}

V. KEY NURSING INTERVENTIONS & EVALUATION:
${work.clinicalSummary.keyInterventions.map((ni, i) => `• ${ni}`).join('\n')}
Clinical Outcome: ${work.clinicalSummary.clinicalOutcomes || 'Target NOC goals achieved.'}

VI. PHYSICAL SHELF RECORD:
Shelf Location: ${work.physicalLibrary.shelfLocation} (${work.physicalLibrary.shelfRow})
Availability Status: ${work.physicalLibrary.status}

VII. APA 7TH CITATION:
${generateCitation(work, 'APA_7')}
================================================================================
`;

    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${work.id}-manuscript.txt`;
    link.click();
    URL.revokeObjectURL(url);

    showToast(`Downloaded manuscript record for ${work.authors[0]} et al.`);
  };

  const savedWorksList = works.filter((w) => savedWorkIds.includes(w.id));

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-slate-100 font-serif selection:bg-amber-400 selection:text-blue-950 relative overflow-x-hidden w-full max-w-full">
      {/* Universal Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedWorkIds.length}
        onQuickSearch={handleSearchKeywordFromAnywhere}
      />

      {/* Main App Body */}
      <main 
        id="main-repository-content"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative"
      >
        {/* Subdued ambient lighting accents - slight blue & yellow hues on dominantly black canvas */}
        <div 
          aria-hidden="true" 
          className="absolute -top-12 left-1/4 -translate-x-1/2 w-[32rem] h-[32rem] bg-blue-900/10 rounded-full blur-3xl pointer-events-none -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-28 right-12 w-96 h-96 bg-amber-500/[0.05] rounded-full blur-3xl pointer-events-none -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-[45rem] left-10 w-80 h-80 bg-blue-950/20 rounded-full blur-3xl pointer-events-none -z-10" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-[65rem] right-1/4 w-80 h-80 bg-amber-400/[0.03] rounded-full blur-3xl pointer-events-none -z-10" 
        />
        {activeTab === 'home' && (
          <HomeDashboard
            works={works}
            announcements={INITIAL_ANNOUNCEMENTS}
            onOpenDetails={(w) => setDetailWork(w)}
            onOpenReader={(w) => setReaderWork(w)}
            onOpenCite={(w) => setCiteWork(w)}
            onDownloadPDF={handleDownloadPDF}
            isSaved={(id) => savedWorkIds.includes(id)}
            onToggleSave={handleToggleSave}
            onSearchKeyword={handleSearchKeywordFromAnywhere}
            onSelectCategory={handleSelectCategoryFromAnywhere}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogSearch
            works={works}
            initialQuery={catalogQuery}
            initialSpecialty={catalogSpecialty}
            initialSubSpecialty={catalogSubSpecialty}
            onOpenDetails={(w) => setDetailWork(w)}
            onOpenReader={(w) => setReaderWork(w)}
            onOpenCite={(w) => setCiteWork(w)}
            onDownloadPDF={handleDownloadPDF}
            isSaved={(id) => savedWorkIds.includes(id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {activeTab === 'collections' && (
          <CuratedCollections
            works={works}
            onOpenDetails={(w) => setDetailWork(w)}
            onOpenReader={(w) => setReaderWork(w)}
            onOpenCite={(w) => setCiteWork(w)}
            onDownloadPDF={handleDownloadPDF}
            isSaved={(id) => savedWorkIds.includes(id)}
            onToggleSave={handleToggleSave}
            onNavigateToCatalogWithFilter={handleSelectCategoryFromAnywhere}
          />
        )}

        {activeTab === 'circulation' && (
          <PhysicalCirculation
            works={works}
            onOpenDetails={(w) => setDetailWork(w)}
            onOpenReader={(w) => setReaderWork(w)}
          />
        )}

        {activeTab === 'submit' && (
          <SubmissionPortal
            onAddWork={handleAddWork}
            onOpenDetails={(w) => setDetailWork(w)}
          />
        )}

        {activeTab === 'shelf' && (
          <MyShelf
            savedWorks={savedWorksList}
            onOpenDetails={(w) => setDetailWork(w)}
            onOpenReader={(w) => setReaderWork(w)}
            onOpenCite={(w) => setCiteWork(w)}
            onDownloadPDF={handleDownloadPDF}
            onToggleSave={handleToggleSave}
            onClearAllSaved={handleClearAllSaved}
            onNavigateToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Global Modals */}
      <CitationModal
        work={citeWork}
        isOpen={Boolean(citeWork)}
        onClose={() => setCiteWork(null)}
      />

      <ResourceDetailModal
        work={detailWork}
        isOpen={Boolean(detailWork)}
        onClose={() => setDetailWork(null)}
        allWorks={works}
        onSelectWork={(w) => setDetailWork(w)}
        onOpenReader={(w) => {
          setDetailWork(null);
          setReaderWork(w);
        }}
        onOpenCite={(w) => setCiteWork(w)}
        onDownloadPDF={handleDownloadPDF}
        isSaved={detailWork ? savedWorkIds.includes(detailWork.id) : false}
        onToggleSave={handleToggleSave}
      />

      <DocumentReaderModal
        work={readerWork}
        isOpen={Boolean(readerWork)}
        onClose={() => setReaderWork(null)}
        onOpenCite={(w) => setCiteWork(w)}
        onDownloadPDF={handleDownloadPDF}
      />

      {/* Toast Notification with Frosted Glass styling */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/85 backdrop-blur-md text-white border border-amber-400/80 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigateToTab={setActiveTab} />
    </div>
  );
}
