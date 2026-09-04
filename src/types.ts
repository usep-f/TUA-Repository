export type OutputType =
  | 'Grand Case Presentation'
  | 'Nursing Research'
  | 'Community Project'
  | 'Evidence-Based Clinical Guideline'
  | 'Clinical Case Study';

export type MethodologyType =
  | 'Quantitative'
  | 'Qualitative'
  | 'Mixed Methods'
  | 'Clinical Case Protocol'
  | 'Action Research'
  | 'Evidence Synthesis';

export type CirculationStatus =
  | 'Available'
  | 'On Reserve (2-Hour Loan)'
  | 'In Clinical Rotation Use'
  | 'Digitized Only';

export interface ScholarlyWork {
  id: string;
  title: string;
  authors: string[];
  academicYear: string;
  batch: string; // e.g. "BSN 2026", "BSN 2025", "BSN 2024"
  outputType: OutputType;
  course: string; // e.g. "Medical-Surgical Nursing", "Maternal & Child Nursing", "Psychiatric Nursing", "Emergency Nursing", "Community Health Nursing"
  clinicalArea: string; // e.g. "Medical Ward", "ICU / CCU", "Labor & Delivery", "Psychiatric Ward", "Emergency Department", "Rural Health Unit"
  condition: string; // e.g. "Heart Failure", "Hypertensive Emergency", "Schizophrenia", "Pediatric Pneumonia", "Disaster Nursing", "Diabetes"
  specialty: string; // e.g. "Adult Health Nursing", "Maternal & Child Health", "Psychiatric-Mental Health", "Emergency & Disaster Nursing", "Community Health"
  subSpecialty: string; // e.g. "Cardiovascular", "Respiratory", "Neurological", "Renal", "Gastrointestinal", "Endocrine", "Pregnancy", "Labor", "Newborn", "Pediatrics", "Schizophrenia", "Depression", "Bipolar disorder", "Substance use", "Trauma", "Disaster nursing", "Shock", "BLS"
  researchTopic?: string;
  methodology?: MethodologyType;
  year: number;
  keywords: string[];
  abstract: string;
  clinicalSummary: {
    patientProfile?: string;
    chiefComplaint?: string;
    vitalSignsBaseline?: string;
    nursingDiagnoses: string[];
    keyInterventions: string[];
    clinicalOutcomes: string;
    nursingImplications: string;
  };
  fullDocument: {
    pagesCount: number;
    tableOfContents: string[];
    sections: Array<{
      heading: string;
      subheading?: string;
      body: string;
      tables?: Array<{
        title: string;
        headers: string[];
        rows: string[][];
      }>;
      callout?: {
        type: 'clinical-pearl' | 'alert' | 'evidence';
        text: string;
      };
    }>;
  };
  physicalLibrary: {
    callNumber: string;
    shelfLocation: string;
    accessionNumber: string;
    status: CirculationStatus;
    totalCopies: number;
    availableCopies: number;
    shelfRow: string;
  };
  metrics: {
    views: number;
    downloads: number;
    citationsCount: number;
    savesCount: number;
  };
  advisor?: string;
  clinicalInstructor?: string;
  hospitalAffiliation?: string;
  doi?: string;
  featured?: boolean;
}

export type CitationStyle = 'APA_7' | 'HARVARD' | 'VANCOUVER' | 'MLA_9' | 'CHICAGO';

export interface SearchFilters {
  query: string;
  outputTypes: OutputType[];
  specialties: string[];
  subSpecialties: string[];
  batches: string[];
  courses: string[];
  years: number[];
  conditions: string[];
  methodologies: MethodologyType[];
  clinicalAreas: string[];
  shelfStatus?: CirculationStatus | 'ALL';
  sortBy: 'relevance' | 'year-desc' | 'year-asc' | 'citations-desc' | 'views-desc' | 'title-asc';
}

export interface PowerSearchParams {
  keyword: string;
  title: string;
  author: string;
  condition: string;
  specialty: string;
  researchTopic: string;
  year: string;
  batch: string;
  methodology: string;
  course: string;
}

export interface SavedReference {
  workId: string;
  savedAt: string;
  notes?: string;
  tags?: string[];
}

export interface LibraryAnnouncement {
  id: string;
  title: string;
  category: 'Defense Schedule' | 'Submission Call' | 'Library Notice' | 'Symposium' | 'Resource Update';
  date: string;
  content: string;
  badgeColor: string;
  linkText?: string;
}
