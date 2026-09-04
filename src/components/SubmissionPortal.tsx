import React, { useState } from 'react';
import { ScholarlyWork, OutputType, MethodologyType } from '../types';
import { 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Stethoscope, 
  Plus, 
  Trash2, 
  AlertCircle,
  BookOpen,
  Quote
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmissionPortalProps {
  onAddWork: (newWork: ScholarlyWork) => void;
  onOpenDetails: (work: ScholarlyWork) => void;
}

export const SubmissionPortal: React.FC<SubmissionPortalProps> = ({
  onAddWork,
  onOpenDetails
}) => {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState<string[]>(['Juan Dela Cruz', '']);
  const [academicYear, setAcademicYear] = useState('2025–2026');
  const [batch, setBatch] = useState('BSN 2026');
  const [outputType, setOutputType] = useState<OutputType>('Grand Case Presentation');
  const [course, setCourse] = useState('Medical-Surgical Nursing');
  const [clinicalArea, setClinicalArea] = useState('Medical Ward');
  const [condition, setCondition] = useState('');
  const [specialty, setSpecialty] = useState('Adult Health Nursing');
  const [subSpecialty, setSubSpecialty] = useState('Cardiovascular');
  const [keywordsString, setKeywordsString] = useState('');
  const [abstract, setAbstract] = useState('');
  const [patientProfile, setPatientProfile] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [diagnoses, setDiagnoses] = useState<string[]>(['']);
  const [interventions, setInterventions] = useState<string[]>(['']);
  const [advisor, setAdvisor] = useState('Prof. Remedios Cruz, RN, MAN, PhD');
  const [hospitalAffiliation, setHospitalAffiliation] = useState("St. Luke's Medical Center / TUA Affiliated Hospital");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdWork, setCreatedWork] = useState<ScholarlyWork | null>(null);

  const handleAuthorChange = (index: number, val: string) => {
    const next = [...authors];
    next[index] = val;
    setAuthors(next);
  };

  const addAuthorField = () => setAuthors([...authors, '']);
  const removeAuthorField = (index: number) => setAuthors(authors.filter((_, i) => i !== index));

  const handleDiagnosisChange = (index: number, val: string) => {
    const next = [...diagnoses];
    next[index] = val;
    setDiagnoses(next);
  };
  const addDiagnosisField = () => setDiagnoses([...diagnoses, '']);
  const removeDiagnosisField = (index: number) => setDiagnoses(diagnoses.filter((_, i) => i !== index));

  const handleInterventionChange = (index: number, val: string) => {
    const next = [...interventions];
    next[index] = val;
    setInterventions(next);
  };
  const addInterventionField = () => setInterventions([...interventions, '']);
  const removeInterventionField = (index: number) => setInterventions(interventions.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAuthors = authors.map((a) => a.trim()).filter(Boolean);
    if (cleanAuthors.length === 0 || !title.trim() || !condition.trim() || !abstract.trim()) {
      alert('Please fill in the required fields: Title, Authors, Condition, and Abstract.');
      return;
    }

    const cleanKeywords = keywordsString
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const callNumberGenerated = `RT${Math.floor(Math.random() * 80 + 10)}.${cleanAuthors[0]?.charAt(0) || 'N'}${Math.floor(Math.random() * 80 + 10)} 2026`;
    const newId = `tua-nur-sub-${Date.now()}`;

    const newScholarlyWork: ScholarlyWork = {
      id: newId,
      title: title.trim(),
      authors: cleanAuthors,
      academicYear,
      batch,
      outputType,
      course,
      clinicalArea,
      condition: condition.trim(),
      specialty,
      subSpecialty,
      year: 2026,
      keywords: cleanKeywords.length > 0 ? cleanKeywords : [condition.toLowerCase(), 'nursing care', 'bsn study'],
      abstract: abstract.trim(),
      clinicalSummary: {
        patientProfile: patientProfile.trim() || 'Clinical case patient profile documented by BSN student group.',
        chiefComplaint: chiefComplaint.trim() || 'Acute triage symptoms documented upon hospital admission.',
        nursingDiagnoses: diagnoses.filter((d) => d.trim()),
        keyInterventions: interventions.filter((i) => i.trim()),
        clinicalOutcomes: 'Patient successfully stabilized and met NOC expected outcome benchmarks.',
        nursingImplications: 'Serves as an institutional reference for subsequent clinical rotations.'
      },
      fullDocument: {
        pagesCount: 38,
        tableOfContents: [
          'I. Clinical Vignette & Assessment',
          'II. Pathophysiology Matrix',
          'III. Comprehensive Drug Study',
          'IV. Three-Tiered Nursing Care Plans',
          'V. Discharge Planning'
        ],
        sections: [
          {
            heading: '1. Executive Case Summary',
            body: abstract.trim()
          },
          {
            heading: '2. Nursing Process Matrix',
            body: 'Detailed interventions and evaluations executed by student nursing group during clinical rotation.'
          }
        ]
      },
      physicalLibrary: {
        callNumber: callNumberGenerated,
        shelfLocation: 'Health Sciences Library, 2nd Flr — Section N4 (Recent Submissions)',
        accessionNumber: `TUA-NUR-2026-SUB-${Math.floor(Math.random() * 900 + 100)}`,
        status: 'Available',
        totalCopies: 1,
        availableCopies: 1,
        shelfRow: 'Row B, Shelf 1'
      },
      metrics: {
        views: 1,
        downloads: 0,
        citationsCount: 0,
        savesCount: 1
      },
      advisor,
      hospitalAffiliation,
      doi: `10.5281/zenodo.tua.nur.2026.${Math.floor(Math.random() * 900 + 100)}`
    };

    onAddWork(newScholarlyWork);
    setCreatedWork(newScholarlyWork);
    setIsSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#1E40AF', '#10B981', '#FEF3C7']
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header Banner with Frosted Glass Dark Canvas */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 text-white border border-white/15 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-md">
          <UploadCloud className="w-4 h-4 text-amber-400" />
          BSN Scholarly Intake Portal
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Submit Student Scholarly Work to the Repository
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          Upload your group's Grand Case Presentation, Nursing Thesis, or Community Health project. Your work will be cataloged with an official Library Call Number and APA 7th citation for succeeding batches.
        </p>
      </div>

      {isSubmitted && createdWork ? (
        <div className="glass-panel bg-white/95 rounded-3xl border border-emerald-300/80 p-8 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100/90 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-blue-950">
              Scholarly Work Successfully Cataloged!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your submission is now active in the Trinity College of Nursing digital repository and assigned a physical library call number.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-dark text-white max-w-lg mx-auto text-left space-y-2 border border-white/10">
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
              <span>Accession: {createdWork.physicalLibrary.accessionNumber}</span>
              <span>Call No: {createdWork.physicalLibrary.callNumber}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">{createdWork.title}</h3>
            <p className="text-xs text-slate-300">By {createdWork.authors.join(', ')} ({createdWork.batch})</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenDetails(createdWork)}
              className="px-6 py-2.5 rounded-xl bg-blue-950 text-amber-300 font-bold text-xs hover:bg-blue-900 transition-colors shadow-sm"
            >
              View Catalog Record
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle('');
                setCondition('');
                setAbstract('');
              }}
              className="px-6 py-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-white transition-colors"
            >
              Submit Another Work
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Section 1: Basic Metadata */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider pb-2 border-b border-slate-200/60 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              1. General Work Classification
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Full Title of Scholarly Work <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Hypertensive Emergency in an Older Adult: Acute Nursing Management & Pharmacologic Protocols"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Output Type <span className="text-rose-500">*</span>
                </label>
                <select
                  value={outputType}
                  onChange={(e) => setOutputType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="Grand Case Presentation">Grand Case Presentation</option>
                  <option value="Nursing Research">Nursing Research</option>
                  <option value="Community Project">Community Project</option>
                  <option value="Evidence-Based Clinical Guideline">Evidence-Based Clinical Guideline</option>
                  <option value="Clinical Case Study">Clinical Case Study</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  BSN Batch / Cohort <span className="text-rose-500">*</span>
                </label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="BSN 2026">BSN 2026 (Current Senior Batch)</option>
                  <option value="BSN 2025">BSN 2025</option>
                  <option value="BSN 2024">BSN 2024</option>
                  <option value="BSN 2027">BSN 2027</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Authors */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Student Authors / Group Members <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addAuthorField}
                  className="text-xs text-blue-900 hover:text-amber-600 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Co-Author
                </button>
              </div>
              <div className="space-y-2">
                {authors.map((author, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Author ${idx + 1} Full Name (e.g. Juan Dela Cruz)`}
                      value={author}
                      onChange={(e) => handleAuthorChange(idx, e.target.value)}
                      className="flex-1 p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                    />
                    {authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAuthorField(idx)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Clinical & Course Categorization */}
          <div className="space-y-4 pt-4 border-t border-slate-200/60">
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider pb-2 border-b border-slate-200/60 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-amber-500" />
              2. Clinical Context & Course Mapping
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nursing Course <span className="text-rose-500">*</span>
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="Medical-Surgical Nursing">Medical-Surgical Nursing</option>
                  <option value="Maternal & Child Nursing">Maternal & Child Nursing</option>
                  <option value="Psychiatric Nursing">Psychiatric Nursing</option>
                  <option value="Emergency & Disaster Nursing">Emergency & Disaster Nursing</option>
                  <option value="Community Health Nursing">Community Health Nursing</option>
                  <option value="Nursing Research & EBP">Nursing Research & EBP</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Specific Diagnosis / Condition <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Heart Failure, Pediatric Pneumonia, Schizophrenia"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nursing Specialty
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-medium"
                >
                  <option value="Adult Health Nursing">Adult Health Nursing</option>
                  <option value="Maternal & Child Health">Maternal & Child Health</option>
                  <option value="Psychiatric-Mental Health">Psychiatric-Mental Health</option>
                  <option value="Emergency & Disaster Nursing">Emergency & Disaster Nursing</option>
                  <option value="Community Health">Community Health</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Sub-Specialty Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cardiovascular, Respiratory, Trauma, Pediatrics"
                  value={subSpecialty}
                  onChange={(e) => setSubSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Clinical Area / Ward Setting
                </label>
                <input
                  type="text"
                  placeholder="e.g. Medical Ward, MICU, Pediatric Stepdown, ER"
                  value={clinicalArea}
                  onChange={(e) => setClinicalArea(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="heart failure, fluid overload, elderly care, furosemide"
                  value={keywordsString}
                  onChange={(e) => setKeywordsString(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Abstract & Nursing Process */}
          <div className="space-y-4 pt-4 border-t border-slate-200/60">
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider pb-2 border-b border-slate-200/60 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              3. Scholarly Abstract & Nursing Diagnoses
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Structured Abstract <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Comprehensive overview of clinical background, Gordon's Functional Patterns findings, nursing interventions, drug therapy, and clinical outcomes..."
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Patient Demographic Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. 72-year-old male with Stage D Congestive Heart Failure"
                  value={patientProfile}
                  onChange={(e) => setPatientProfile(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Faculty Advisor / Clinical Instructor
                </label>
                <input
                  type="text"
                  value={advisor}
                  onChange={(e) => setAdvisor(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Nursing Diagnoses Fields */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Formulated Nursing Diagnoses (NANDA-I Priority)
                </label>
                <button
                  type="button"
                  onClick={addDiagnosisField}
                  className="text-xs text-blue-900 hover:text-amber-600 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Diagnosis
                </button>
              </div>
              <div className="space-y-2">
                {diagnoses.map((diag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`NANDA Diagnosis ${idx + 1} (e.g. Decreased Cardiac Output related to impaired myocardial contractility...)`}
                      value={diag}
                      onChange={(e) => handleDiagnosisChange(idx, e.target.value)}
                      className="flex-1 p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                    />
                    {diagnoses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDiagnosisField(idx)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Submissions undergo validation by St. Luke's College of Nursing library curators.
            </div>
            <button
              type="submit"
              id="submit-repository-work-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <UploadCloud className="w-5 h-5" />
              <span>Catalog & Archive Scholarly Work</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
