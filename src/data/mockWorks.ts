import { ScholarlyWork, LibraryAnnouncement } from '../types';

export const INITIAL_SCHOLARLY_WORKS: ScholarlyWork[] = [
  {
    id: 'tua-ncp-2026-001',
    title: 'Congestive Heart Failure in an Elderly Patient: A Comprehensive Nursing Case Study and Fluid Balance Optimization',
    authors: ['Juan Dela Cruz', 'Maria Santos', 'Angela Reyes'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Grand Case Presentation',
    course: 'Medical-Surgical Nursing',
    clinicalArea: 'Medical Ward & Telemetry Unit',
    condition: 'Heart Failure',
    specialty: 'Adult Health Nursing',
    subSpecialty: 'Cardiovascular',
    methodology: 'Clinical Case Protocol',
    year: 2026,
    keywords: ['heart failure', 'elderly', 'nursing care', 'fluid overload', 'ejection fraction', 'loop diuretics', 'cardiorenal syndrome'],
    abstract: 'A grand clinical case presentation examining an 72-year-old male admitted with Stage D decompensated Congestive Heart Failure (NYHA Class IV). The study details holistic Gordon\'s Functional Health Patterns assessment, hemodynamic stability monitoring, strict 24-hour fluid volume titration, medication reconciliation including SGLT2 inhibitors and loop diuretics, and structured transitional care discharge education to prevent 30-day readmissions.',
    clinicalSummary: {
      patientProfile: '72-year-old male with 10-year history of Ischemic Heart Disease, uncontrolled Hypertension, and Type 2 Diabetes.',
      chiefComplaint: 'Bilateral pedal edema (+3 pitting), progressive orthopnea requiring 4 pillows, paroxysmal nocturnal dyspnea, and 6kg weight gain over 5 days.',
      vitalSignsBaseline: 'BP: 168/94 mmHg | HR: 112 bpm (irregular) | RR: 28 cpm | SpO2: 88% on room air | Temp: 36.8°C | JVD: 6 cm at 45°',
      nursingDiagnoses: [
        'Decreased Cardiac Output related to impaired myocardial contractility as evidenced by EF 28%, fatigue, and tachycardia.',
        'Excess Fluid Volume related to compromised regulatory mechanisms as evidenced by peripheral edema, bibasilar crackles, and elevated BNP (1,840 pg/mL).',
        'Impaired Gas Exchange related to alveolar-capillary membrane changes secondary to pulmonary congestion.',
        'Deficient Knowledge regarding low-sodium dietary restrictions and daily weight tracking.'
      ],
      keyInterventions: [
        'High Fowler\'s positioning and titrated supplemental O2 via nasal cannula at 3 L/min maintaining SpO2 > 94%.',
        'Intravenous administration of Furosemide 40 mg BID with strict hourly urine output monitoring via Foley catheter (target > 0.5 mL/kg/hr).',
        'Implementation of a 1,500 mL/day fluid restriction and 2g sodium cardiac diet.',
        'Daily morning weights after first void using the same calibrated scale and recording on patient bedside flow sheet.',
        'Multidisciplinary medication management with ARNI (Sacubitril/Valsartan) and Carvedilol once euvolemic state was approached.'
      ],
      clinicalOutcomes: 'By Hospital Day 5, patient demonstrated negative net fluid balance of -4,200 mL, complete resolution of orthopnea, SpO2 98% on room air, and ambulated 50 meters independently without dyspnea.',
      nursingImplications: 'Emphasizes the pivotal role of nurse-led fluid tracking, early recognition of cardiorenal decompensation, and the impact of the "Teach-Back" method for elderly cardiac self-care.'
    },
    fullDocument: {
      pagesCount: 48,
      tableOfContents: [
        'I. Executive Case Overview & Patient Demographics',
        'II. Pathophysiology of Heart Failure with Reduced Ejection Fraction',
        'III. Gordon\'s 11 Functional Health Patterns Assessment',
        'IV. Diagnostic & Laboratory Matrix (Echo, BNP, Electrolytes, CXR)',
        'V. Comprehensive Drug Study & Pharmacotherapeutics',
        'VI. Three-Tiered Nursing Care Plan (NANDA-I, NIC, NOC)',
        'VII. Discharge Planning & Home Health Maintenance Protocol',
        'VIII. Evidence-Based Clinical Pearl & Literature Appraisal'
      ],
      sections: [
        {
          heading: '1. Clinical Presentation & Nursing Assessment',
          subheading: 'Initial Triage & Physical Examination',
          body: 'Upon arrival at the medical ward, the patient appeared in acute respiratory distress, seated upright and clutching the bedside table. Physical assessment revealed jugular venous distension measuring 6 cm above the sternal angle at 45 degrees, audible bibasilar inspiratory crackles extending to mid-lung fields, and symmetrical +3 pitting edema extending to mid-shins. S3 gallop was noted on cardiac auscultation.',
          callout: {
            type: 'alert',
            text: 'Immediate clinical priority: Reduction of preload and afterload while safeguarding renal perfusion pressure. Watch for electrolyte shifts during rapid diuresis.'
          }
        },
        {
          heading: '2. Diagnostic Workup & Biomarker Trends',
          subheading: 'Serial Laboratory Tracking',
          body: 'Serum NT-proBNP was markedly elevated at 2,450 pg/mL upon admission (normal < 300 pg/mL). Transthoracic echocardiogram demonstrated left ventricular ejection fraction (LVEF) of 28% with global hypokinesia and moderate mitral regurgitation.',
          tables: [
            {
              title: 'Key Laboratory and Hemodynamic Biomarkers',
              headers: ['Parameter', 'Admission (Day 1)', 'Diuresis (Day 3)', 'Discharge (Day 6)', 'Reference Range'],
              rows: [
                ['NT-proBNP', '2,450 pg/mL', '1,120 pg/mL', '410 pg/mL', '< 300 pg/mL'],
                ['Serum Creatinine', '1.42 mg/dL', '1.38 mg/dL', '1.18 mg/dL', '0.7 - 1.3 mg/dL'],
                ['Potassium (K+)', '4.8 mEq/L', '3.9 mEq/L', '4.4 mEq/L', '3.5 - 5.0 mEq/L'],
                ['Sodium (Na+)', '133 mEq/L', '136 mEq/L', '138 mEq/L', '135 - 145 mEq/L'],
                ['Body Weight', '78.4 kg', '75.1 kg', '72.8 kg', 'Dry weight: ~72.5 kg']
              ]
            }
          ]
        },
        {
          heading: '3. Evidence-Based Nursing Care Interventions',
          subheading: 'The Red-Yellow-Green Self-Care Zone System',
          body: 'To prepare the patient and family caregiver for home maintenance, the student nursing team implemented the Heart Failure Zone Tool. Green Zone (All Clear: stable weight, no swelling), Yellow Zone (Warning: 2-3 lb gain in 24 hrs, cough), Red Zone (Emergency: sudden shortness of breath at rest, chest pressure). Teach-back validation achieved 100% comprehension.',
          callout: {
            type: 'evidence',
            text: 'Evidence Level I-A: Nurse-led predischarge education and structured follow-up calls reduce 30-day all-cause readmission by 34% (AHA/ACC Heart Failure Guidelines).'
          }
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RT86.7 .D45 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N4 (Cardiovascular)',
      accessionNumber: 'TUA-NUR-2026-GCP-001',
      status: 'Available',
      totalCopies: 3,
      availableCopies: 2,
      shelfRow: 'Row B, Shelf 4'
    },
    metrics: {
      views: 1420,
      downloads: 486,
      citationsCount: 29,
      savesCount: 112
    },
    advisor: 'Prof. Remedios Cruz, RN, MAN, PhD',
    clinicalInstructor: 'Clinical Instr. Eduardo Ramos, RN, MSN',
    hospitalAffiliation: 'St. Luke\'s Medical Center / TUA Affiliated Medical Center',
    doi: '10.5281/zenodo.tua.nur.2026.001',
    featured: true
  },
  {
    id: 'tua-ncp-2026-002',
    title: 'Hypertensive Emergency with Target Organ Involvement in an Older Adult: Acute Nursing Management & Pharmacologic Protocols',
    authors: ['Juan Dela Cruz', 'Patricia Alcantara', 'Marcus Bautista'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Grand Case Presentation',
    course: 'Medical-Surgical Nursing',
    clinicalArea: 'Medical Intensive Care Unit (MICU)',
    condition: 'Hypertensive Emergency',
    specialty: 'Adult Health Nursing',
    subSpecialty: 'Cardiovascular',
    methodology: 'Clinical Case Protocol',
    year: 2026,
    keywords: ['hypertensive emergency', 'older adult', 'target organ damage', 'nicardipine drip', 'arterial line', 'mean arterial pressure', 'retinopathy'],
    abstract: 'A detailed grand case presentation of a 68-year-old female presenting with blood pressure of 220/125 mmHg, acute hypertensive encephalopathy, and Grade IV Keith-Wagener-Barker retinopathy. The report highlights precise continuous IV vasodilatory titration (Nicardipine), arterial line blood pressure monitoring, Mean Arterial Pressure (MAP) reduction targets (no more than 20-25% in the first 2 hours), and neurological vital sign vigilance.',
    clinicalSummary: {
      patientProfile: '68-year-old retired schoolteacher with a history of non-compliant essential hypertension and dyslipidemia.',
      chiefComplaint: 'Severe throbbing occipital headache, blurred vision with scotomas, nausea, and acute confusion.',
      vitalSignsBaseline: 'BP: 224/128 mmHg | MAP: 160 mmHg | HR: 98 bpm | RR: 22 cpm | SpO2: 96% | GCS: 14 (E4V4M6)',
      nursingDiagnoses: [
        'Ineffective Tissue Perfusion: Cerebral related to severe vasoconstriction and acute surge in systemic vascular resistance.',
        'Risk for Acute Kidney Injury related to renal microvascular hypoperfusion during rapid antihypertensive titration.',
        'Acute Pain (Headache) related to cerebral vascular engorgement.',
        'Deficient Knowledge regarding antihypertensive medication adherence and dietary sodium restriction.'
      ],
      keyInterventions: [
        'Continuous Nicardipine IV infusion titrated starting at 5 mg/hr via dedicated central lumen with arterial line transducer zeroing every 4 hours.',
        'Strict neurological checks (Glasgow Coma Scale, pupil reactivity, motor drift) every 15 minutes during the first 2 hours.',
        'Target MAP reduction restricted to 15-20% within the first hour (MAP target 120-130 mmHg) to avert cerebral ischemic penumbra expansion.',
        'Immediate insertion of an indwelling catheter for strict hourly urine output monitoring and creatinine clearance monitoring.'
      ],
      clinicalOutcomes: 'MAP successfully transitioned to 110 mmHg over 24 hours without neurological deficits; oral antihypertensives (Amlodipine + Losartan) initiated on Day 2 with complete resolution of cephalalgia and visual symptoms.',
      nursingImplications: 'Reinforces that rapid, excessive blood pressure drops in chronic hypertension provoke ischemic cerebral and coronary events; nurse-controlled titration precision is life-saving.'
    },
    fullDocument: {
      pagesCount: 52,
      tableOfContents: [
        'I. Case Introduction & Clinical Context',
        'II. Pathophysiology of Hypertensive Autoregulation Breakdown',
        'III. Diagnostic Profiling: Funduscopy, Brain CT, and Cardiac Workup',
        'IV. Continuous IV Infusion Titration Algorithms',
        'V. Nursing Process: Care Plans & NANDA Framework',
        'VI. Transition to Oral Polytherapy & Patient Coaching',
        'VII. Case Synthesis & Reflection'
      ],
      sections: [
        {
          heading: '1. Acute Resuscitation & Critical Care Nursing',
          subheading: 'MAP Titration Protocol',
          body: 'The primary clinical trap in hypertensive emergency is dropping pressure too quickly. Autoregulation curve in chronic hypertension is shifted rightward; precipitous drops cause watershed cerebral infarction.',
          callout: {
            type: 'alert',
            text: 'Rule of thumb: Lower MAP by no more than 20-25% in hour 1, then gradually down to 160/100 mmHg over the next 2-6 hours.'
          }
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RT86.7 .D46 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N4 (Cardiovascular)',
      accessionNumber: 'TUA-NUR-2026-GCP-002',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row B, Shelf 4'
    },
    metrics: {
      views: 1190,
      downloads: 395,
      citationsCount: 22,
      savesCount: 94
    },
    advisor: 'Dr. Clarissa Valmonte, RN, DNSc',
    hospitalAffiliation: 'TUA Medical Center - Critical Care Division',
    doi: '10.5281/zenodo.tua.nur.2026.002',
    featured: true
  },
  {
    id: 'tua-res-2025-001',
    title: 'Factors Affecting Medication Adherence Among Hypertensive Outpatients in Urban Community Clinics: A Cross-Sectional Predictive Study',
    authors: ['Maria Santos', 'Kristine Joy Mendoza', 'Paolo Miguel Soriano', 'Juan Dela Cruz'],
    academicYear: '2024–2025',
    batch: 'BSN 2025',
    outputType: 'Nursing Research',
    course: 'Nursing Research & Evidence-Based Practice',
    clinicalArea: 'Urban Health Centers & Outpatient Departments',
    condition: 'Hypertensive Emergency',
    specialty: 'Adult Health Nursing',
    subSpecialty: 'Cardiovascular',
    researchTopic: 'Hypertension Self-Care & Pharmacology Adherence',
    methodology: 'Quantitative',
    year: 2025,
    keywords: ['medication adherence', 'hypertension', 'Morisky Medication Adherence Scale', 'health literacy', 'socioeconomic barriers', 'community health'],
    abstract: 'This quantitative cross-sectional research evaluated factors influencing antihypertensive medication compliance among N=240 hypertensive outpatients attending three urban community health centers. Utilizing the 8-item Morisky Medication Adherence Scale (MMAS-8) and bivariate regression modeling, the study identified that low health literacy (OR = 3.42, p < 0.001), medication costs (OR = 2.88, p = 0.004), and complex multi-drug regimens were significant predictors of non-adherence, providing empirical foundation for nurse-led pillbox counseling programs.',
    clinicalSummary: {
      patientProfile: 'N=240 community respondents aged 40–75 with diagnosed essential hypertension for at least 12 months.',
      chiefComplaint: 'Suboptimal blood pressure control in outpatient follow-ups attributed to erratic medication consumption.',
      vitalSignsBaseline: 'Mean SBP: 148.6 ± 14.2 mmHg | Mean DBP: 92.4 ± 8.6 mmHg across cohort',
      nursingDiagnoses: [
        'Ineffective Health Management related to complex medication schedule and economic constraints.',
        'Deficient Knowledge regarding lifelong antihypertensive maintenance.'
      ],
      keyInterventions: [
        'Deployment of MMAS-8 standardized survey and validated health literacy questionnaire.',
        'Design of bilingual (Filipino-English) illustrated medication schedules.',
        'Validation of a community nurse-driven SMS reminder intervention trial.'
      ],
      clinicalOutcomes: 'Only 38.3% of participants demonstrated high adherence (MMAS-8 = 8). Health literacy and perceived disease threat were key modifiable determinants.',
      nursingImplications: 'Nursing interventions must move beyond generic verbal reminders to visual pill schedules, generic brand education, and family-supported accountability.'
    },
    fullDocument: {
      pagesCount: 64,
      tableOfContents: [
        'Chapter I. The Problem and Its Background (Conceptual Framework)',
        'Chapter II. Review of Related Literature and Studies (International & Local)',
        'Chapter III. Methodology (Research Design, Sampling, MMAS-8 Instrument)',
        'Chapter IV. Presentation, Analysis, and Interpretation of Data',
        'Chapter V. Summary, Conclusions, and Nurse-Led Action Recommendations'
      ],
      sections: [
        {
          heading: 'Chapter IV: Results & Regression Analysis',
          subheading: 'Predictors of Non-Adherence',
          body: 'Multiple logistic regression revealed that patients who lacked understanding of asymptomatic hypertension consequences were 3.4 times more likely to skip doses during feeling well.',
          tables: [
            {
              title: 'Logistic Regression Model for Antihypertensive Non-Adherence',
              headers: ['Independent Variable', 'Odds Ratio (OR)', '95% Confidence Interval', 'p-value'],
              rows: [
                ['Low Health Literacy Score', '3.42', '2.14 – 5.48', '< 0.001'],
                ['Financial Barrier / Out-of-pocket Cost', '2.88', '1.62 – 4.75', '0.004'],
                ['Daily Pill Burden (≥ 3 medications)', '2.15', '1.30 – 3.55', '0.012'],
                ['Absence of Family Treatment Partner', '1.94', '1.18 – 3.20', '0.021']
              ]
            }
          ]
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RT73 .S26 2025',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section R1 (Nursing Theses)',
      accessionNumber: 'TUA-NUR-2025-RES-014',
      status: 'Available',
      totalCopies: 3,
      availableCopies: 3,
      shelfRow: 'Row A, Shelf 2'
    },
    metrics: {
      views: 2150,
      downloads: 870,
      citationsCount: 41,
      savesCount: 168
    },
    advisor: 'Dr. Maria Elena Fernandez, RN, PhD',
    doi: '10.5281/zenodo.tua.nur.2025.014',
    featured: true
  },
  {
    id: 'tua-ncp-2026-003',
    title: 'Pediatric Pneumonia Clinical Pathway & Evidence-Based Nursing Interventions in a 4-Year-Old Patient with Severe Bronchopneumonia',
    authors: ['Angela Reyes', 'Bea Camille Tan', 'Joshua David Flores'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Grand Case Presentation',
    course: 'Maternal & Child Nursing',
    clinicalArea: 'Pediatric Ward & Stepdown Unit',
    condition: 'Pediatric Pneumonia',
    specialty: 'Maternal & Child Health',
    subSpecialty: 'Pediatrics',
    methodology: 'Clinical Case Protocol',
    year: 2026,
    keywords: ['pediatric pneumonia', 'bronchopneumonia', 'chest physiotherapy', 'pediatric triage', 'airway clearance', 'hypoxemia', 'toddler care'],
    abstract: 'An in-depth Grand Case Presentation analyzing a 4-year-old female diagnosed with severe Community-Acquired Pneumonia (PCAP-C/Severe). Highlights pediatric respiratory scoring, safe chest physiotherapy with postural drainage, warm mist nebulization, IV Ampicillin-Sulbactam therapy, family-centered comforting techniques, and developmental supportive care during hospitalization.',
    clinicalSummary: {
      patientProfile: '4-year-old female (15.2 kg) presenting with 4-day history of high-grade fever, productive paroxysmal cough, and poor appetite.',
      chiefComplaint: 'Severe intercostal and subcostal retractions, grunting on expiration, nasal flaring, and lethargy.',
      vitalSignsBaseline: 'Temp: 39.2°C | HR: 146 bpm | RR: 54 cpm (tachypneic) | SpO2: 89% on room air | Pediatric Early Warning Score (PEWS): 6',
      nursingDiagnoses: [
        'Ineffective Airway Clearance related to thick retained bronchial secretions as evidenced by coarse rhonchi, tachypnea, and weak cough effort.',
        'Impaired Gas Exchange related to alveolar-capillary exudate and ventilation-perfusion mismatch.',
        'Hyperthermia related to pulmonary infectious process.',
        'Anxiety (Child & Parental) related to unfamiliar hospital environment and respiratory distress.'
      ],
      keyInterventions: [
        'Immediate initiation of humidified oxygen via pediatric nasal cannula at 2 L/min, securing SpO2 ≥ 95%.',
        'Gentle bulb suctioning and age-appropriate percussion/vibration chest physiotherapy 30 minutes after Salbutamol nebulization.',
        'Hydration support via D5 0.3% NaCl at maintenance rate (62 mL/hr) to liquefy tracheobronchial mucus.',
        'Application of tepid sponge baths for temperature > 38.5°C alongside prescribed Paracetamol 15 mg/kg IV.',
        'Parental inclusion in bedtime reading and tactile reassurance to alleviate pediatric procedural stress.'
      ],
      clinicalOutcomes: 'Respiratory rate normalized to 24 cpm, lungs cleared of adventitious sounds by Day 4, fever subsided, and child resumed normal oral intake of liquids and solids.',
      nursingImplications: 'Pediatric respiratory compensation is fragile; nurses must master early subtle retraction detection before overt respiratory muscle fatigue sets in.'
    },
    fullDocument: {
      pagesCount: 44,
      tableOfContents: [
        'I. Pediatric History & Developmental Milestones (Denver II)',
        'II. Pathogenesis of Pediatric Community-Acquired Pneumonia',
        'III. Pediatric Early Warning Score (PEWS) Matrix',
        'IV. Pharmacologic Regimen: Antibiotics & Bronchodilators',
        'V. Family-Centered Pediatric Nursing Care Plans',
        'VI. Discharge Health Teaching & Immunization Catch-Up (PCV13)'
      ],
      sections: [
        {
          heading: '1. Pediatric Assessment & Triage Score',
          subheading: 'PEWS Tracking in Early Deterioration',
          body: 'Children rapidly transition from compensated respiratory distress to respiratory arrest. PEWS score monitoring every 2 hours allowed rapid escalation before cyanosis occurred.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RJ456.P6 .R49 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N2 (Pediatrics)',
      accessionNumber: 'TUA-NUR-2026-GCP-003',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 1,
      shelfRow: 'Row C, Shelf 1'
    },
    metrics: {
      views: 1840,
      downloads: 620,
      citationsCount: 35,
      savesCount: 142
    },
    advisor: 'Assoc. Prof. Teresa Panganiban, RN, MAN',
    hospitalAffiliation: 'Philippine Children\'s Medical Center & TUA Partner Hospitals',
    doi: '10.5281/zenodo.tua.nur.2026.003',
    featured: true
  },
  {
    id: 'tua-ncp-2025-004',
    title: 'Psychosocial Nursing Interventions and Milieu Therapy in Acute Schizophrenia Relapse: A Clinical Case Study',
    authors: ['Marcus Bautista', 'Sarah Jane Lim', 'Christian Paul Gomez'],
    academicYear: '2024–2025',
    batch: 'BSN 2025',
    outputType: 'Grand Case Presentation',
    course: 'Psychiatric Nursing',
    clinicalArea: 'Inpatient Acute Psychiatric Unit',
    condition: 'Schizophrenia',
    specialty: 'Psychiatric-Mental Health',
    subSpecialty: 'Schizophrenia',
    methodology: 'Clinical Case Protocol',
    year: 2025,
    keywords: ['schizophrenia', 'hallucinations', 'milieu therapy', 'de-escalation', 'therapeutic communication', 'antipsychotics', 'relapse prevention'],
    abstract: 'A psychiatric grand case study investigating a 27-year-old male with paranoid schizophrenia experiencing acute exacerbation precipitated by medication non-adherence. Explores non-confrontational reality testing, command hallucination assessment for patient safety, structured environmental milieu therapy, second-generation antipsychotic (Risperidone) monitoring for extrapyramidal symptoms (EPS), and family psychoeducation.',
    clinicalSummary: {
      patientProfile: '27-year-old single male with a 5-year history of Schizophrenia (Paranoid Subtype).',
      chiefComplaint: 'Agitation, auditory hallucinations commanding self-harm, paranoid delusions regarding family food poisoning, and severe sleep deprivation.',
      vitalSignsBaseline: 'BP: 130/85 mmHg | HR: 94 bpm | RR: 18 cpm | Mental Status: Guarded, hypervigilant, blunted affect, disheveled appearance.',
      nursingDiagnoses: [
        'Disturbed Sensory Perception: Auditory related to biochemical neurochemical imbalance as evidenced by listening stances and verbalized voices.',
        'Risk for Suicide related to command auditory hallucinations telling him to jump from heights.',
        'Impaired Social Interaction related to persecutory delusion and mistrust.',
        'Ineffective Health Self-Management related to lack of insight regarding maintenance antipsychotics.'
      ],
      keyInterventions: [
        'Implementation of 1-to-1 safety observation and removal of sharp objects from room.',
        'Utilization of validating, non-arguing therapeutic communication ("I understand the voices seem very real to you, but I do not hear them. You are safe here with us.").',
        'Daily administration of Risperidone 2 mg PO BID with baseline and weekly Simpson-Angus Scale assessments for EPS and akathisia.',
        'Gradual integration into low-stimulus structured art and occupational therapy groups.',
        'Conducting structured family psychoeducation sessions focusing on early prodromal relapse warning signs.'
      ],
      clinicalOutcomes: 'By Week 3 of hospitalization, patient reported voices diminished to faint murmurs with zero commanding power, accepted food tray reliably, and demonstrated full insight into medication continuity.',
      nursingImplications: 'Emphasizes that nurses must never validate or reinforce delusional content, nor argue logic; establishing a secure, non-threatening therapeutic alliance is the cornerstone of psychiatric stabilization.'
    },
    fullDocument: {
      pagesCount: 42,
      tableOfContents: [
        'I. Psychiatric Assessment & Mental Status Examination (MSE)',
        'II. Neurobiology of Dopaminergic & Glutamatergic Dysregulation',
        'III. Safety Protocol & Suicide Risk Assessment Matrix',
        'IV. Psychopharmacology: Atypical Antipsychotics & Side Effect Vigilance',
        'V. Peplau\'s Interpersonal Relations Theory in Nursing Practice',
        'VI. Discharge and Community Relapse Prevention Action Plan'
      ],
      sections: [
        {
          heading: '1. Therapeutic Communication Protocols',
          subheading: 'Managing Persecutory Ideation',
          body: 'When the patient expressed fear that cafeteria meals were poisoned, the nurse allowed the patient to select unopened sealed pre-packaged containers and observed non-defensive posture, successfully reducing intake refusal without debating the delusion.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RC514 .B38 2025',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N5 (Psychiatric & Mental Health)',
      accessionNumber: 'TUA-NUR-2025-GCP-008',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row D, Shelf 3'
    },
    metrics: {
      views: 1650,
      downloads: 510,
      citationsCount: 27,
      savesCount: 128
    },
    advisor: 'Prof. Gabriel Mendoza, RN, MAN, RPsy',
    hospitalAffiliation: 'National Center for Mental Health & TUA Affiliation',
    doi: '10.5281/zenodo.tua.nur.2025.008',
    featured: false
  },
  {
    id: 'tua-com-2026-005',
    title: 'Disaster Nursing Readiness and Rapid Triage Protocol Among Community Emergency Responders in Flood-Prone Urban Settlements',
    authors: ['Kristine Joy Mendoza', 'Juan Dela Cruz', 'Bea Camille Tan', 'Paolo Miguel Soriano'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Community Project',
    course: 'Emergency & Disaster Nursing',
    clinicalArea: 'Community Evacuation Centers & Barangay Health Stations',
    condition: 'Disaster Nursing',
    specialty: 'Emergency & Disaster Nursing',
    subSpecialty: 'Disaster nursing',
    methodology: 'Action Research',
    year: 2026,
    keywords: ['disaster nursing', 'START triage', 'flood preparedness', 'community resilience', 'mass casualty incident', 'first aid', 'urban health'],
    abstract: 'A community-based action research and capacity-building project implemented across Barangay Damayang Lagi and surrounding riverside communities in Quezon City. The nursing team trained 120 Barangay Health Workers (BHWs) and emergency responders in the Simple Triage and Rapid Treatment (START) algorithm, rapid mass-casualty tagging, potable water chlorination, and acute communicable disease surveillance (leptospirosis and cholera) during seasonal monsoon inundation.',
    clinicalSummary: {
      patientProfile: 'Community cohort of 120 grassroots volunteer responders and 450 household heads in flood hazard zones.',
      chiefComplaint: 'Past historical delays in victim categorization, high post-flood leptospirosis outbreaks, and lack of systematic triage tags.',
      vitalSignsBaseline: 'Community baseline triage simulation response time: 8.4 minutes per critical casualty.',
      nursingDiagnoses: [
        'Deficient Community Knowledge related to emergency disaster triage protocols and floodborne disease prevention.',
        'Risk for Contamination related to domestic floodwater exposure and compromised water sanitation infrastructure.',
        'Ineffective Community Coping related to recurrent natural disaster vulnerabilities.'
      ],
      keyInterventions: [
        'Conducting intensive hands-on START triage workshops utilizing color-coded bands (Red: Immediate, Yellow: Delayed, Green: Minor, Black: Expectant).',
        'Distribution of waterproof BSN-designed disaster triage reference pocket cards in Filipino and English.',
        'Pre-positioning of emergency Leptospirosis Prophylaxis (Doxycycline) counseling stations in evacuation shelters.',
        'Water sanitation demonstrations using household chlorine tablets and boiling guidelines.'
      ],
      clinicalOutcomes: 'Post-training simulation demonstrated average victim triage decision time dropped to 1.8 minutes per casualty (78% improvement in accuracy); zero leptospirosis fatalities recorded during succeeding typhoon season.',
      nursingImplications: 'Disaster nursing extends clinical expertise from hospital emergency rooms to vulnerable community frontlines, proving that standardized nurse-led triage empowers grassroots survival.'
    },
    fullDocument: {
      pagesCount: 56,
      tableOfContents: [
        'I. Community Profile & Hazard Vulnerability Assessment Matrix',
        'II. Theoretical Framework (Disaster Management Cycle)',
        'III. START Triage Modular Training Curriculum',
        'IV. Quantitative Evaluation: Pre-Test vs. Post-Test Simulation Scores',
        'V. Water, Sanitation, and Hygiene (WASH) Protocol Guidelines',
        'VI. Sustainability Plan & Barangay Disaster Risk Reduction Council Integration'
      ],
      sections: [
        {
          heading: '1. The START Triage Nursing Protocol',
          subheading: 'Rapid 30-Second Victim Assessment',
          body: 'Step 1: Ability to walk (Green). Step 2: Spontaneous breathing (If no, open airway -> if still no: Black; if yes: Red). Step 3: Respiration rate > 30/min (Red). Step 4: Radial pulse / Capillary refill > 2 sec (Red). Step 5: Follows simple commands (If no: Red; If yes: Yellow).'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'HV553 .M46 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N6 (Emergency & Public Health)',
      accessionNumber: 'TUA-NUR-2026-COM-005',
      status: 'Available',
      totalCopies: 3,
      availableCopies: 3,
      shelfRow: 'Row E, Shelf 2'
    },
    metrics: {
      views: 1980,
      downloads: 740,
      citationsCount: 38,
      savesCount: 155
    },
    advisor: 'Prof. Rowena Dimaculangan, RN, MAN, CNE',
    doi: '10.5281/zenodo.tua.nur.2026.005',
    featured: true
  },
  {
    id: 'tua-ncp-2025-006',
    title: 'Severe Preeclampsia with Impending Eclampsia in a 24-Year-Old Primigravida: Critical Intrapartum Care and Magnesium Sulfate Protocol',
    authors: ['Patricia Alcantara', 'Maria Santos', 'Danielle Nicole Tan'],
    academicYear: '2024–2025',
    batch: 'BSN 2025',
    outputType: 'Grand Case Presentation',
    course: 'Maternal & Child Nursing',
    clinicalArea: 'Labor & Delivery Suite / High-Risk Obstetric Ward',
    condition: 'Preeclampsia',
    specialty: 'Maternal & Child Health',
    subSpecialty: 'Pregnancy',
    methodology: 'Clinical Case Protocol',
    year: 2025,
    keywords: ['preeclampsia', 'magnesium sulfate', 'deep tendon reflexes', 'fetal heart monitoring', 'proteinuria', 'hypertensive disorder of pregnancy', 'calcium gluconate'],
    abstract: 'A grand case presentation centered on a 24-year-old primigravida at 34 weeks of gestation presenting with blood pressure 170/110 mmHg, 3+ proteinuria, persistent epigastric pain, and hyperreflexia with clonus. Details continuous IV Magnesium Sulfate neuroprotective infusion, toxicity vigilance (patellar reflexes, RR > 12 cpm, hourly urine output > 30 mL), electronic fetal monitoring, and emergency cesarean section preparation.',
    clinicalSummary: {
      patientProfile: '24-year-old G1P0 at 34 weeks gestation with inadequate prenatal visits.',
      chiefComplaint: 'Severe frontal headache unresponsive to paracetamol, blurred vision, right upper quadrant epigastric pain, and facial edema.',
      vitalSignsBaseline: 'BP: 172/114 mmHg | HR: 88 bpm | RR: 20 cpm | Urine protein: +3 | DTRs: +4 with 3 beats of ankle clonus | FHR: 144 bpm (Category I)',
      nursingDiagnoses: [
        'Risk for Injury (Maternal & Fetal) related to central nervous system irritability and potential tonic-clonic eclamptic seizure.',
        'Ineffective Tissue Perfusion: Uteroplacental related to systemic arteriolar vasospasm.',
        'Acute Pain related to hepatic capsular stretch secondary to microvascular hepatic ischemia.'
      ],
      keyInterventions: [
        'Administration of Magnesium Sulfate 4g IV loading dose over 20 minutes, followed by 1g/hr continuous maintenance infusion.',
        'Hourly assessment of patellar deep tendon reflexes, respiratory rate, and hourly Foley catheter urine output; ready availability of Calcium Gluconate 10% at bedside.',
        'Seizure precautions: Padded side rails, functioning suction apparatus, emergency oxygen bag-valve-mask, and low-stimulus dimmed room environment.',
        'Hydralazine 5 mg IV slow push administered for systolic BP > 160 mmHg / diastolic > 110 mmHg with continuous continuous fetal cardiotocography.'
      ],
      clinicalOutcomes: 'No maternal seizure activity occurred; successful delivery of a viable preterm neonate (APGAR 8, 9) via emergent Cesarean delivery; postpartum maternal BP stabilized with oral Labetalol.',
      nursingImplications: 'Magnesium Sulfate is a potent high-alert medication; student nurses must execute flawless hourly toxicity checks before adjusting infusion rates.'
    },
    fullDocument: {
      pagesCount: 50,
      tableOfContents: [
        'I. Maternal Case Presentation & Obstetrical History',
        'II. Pathophysiology of Endothelial Dysfunction & Vasospasm in Preeclampsia',
        'III. The Zuspan Magnesium Sulfate Regimen & Antidote Protocol',
        'IV. High-Risk Labor & Delivery Nursing Care Plans',
        'V. Neonatal Resuscitation & NICU Transition Care',
        'VI. Postpartum Preeclampsia Monitoring & HELLP Syndrome Prevention'
      ],
      sections: [
        {
          heading: '1. Magnesium Sulfate Toxicity Vigilance',
          subheading: 'The Nursing Bedside Safety Checklist',
          body: 'Magnesium toxicity follows a predictable hierarchy: Loss of deep tendon reflexes (8-10 mEq/L) -> Respiratory depression < 12/min (10-12 mEq/L) -> Cardiac arrest (> 15 mEq/L). If DTRs are absent or urine output drops below 30 mL/hr, stop infusion immediately and notify physician.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RG580.H98 .A43 2025',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N2 (Maternal & Child)',
      accessionNumber: 'TUA-NUR-2025-GCP-011',
      status: 'On Reserve (2-Hour Loan)',
      totalCopies: 2,
      availableCopies: 1,
      shelfRow: 'Row C, Shelf 3'
    },
    metrics: {
      views: 1730,
      downloads: 590,
      citationsCount: 31,
      savesCount: 139
    },
    advisor: 'Prof. Josephine De Guzman, RN, MAN, RM',
    doi: '10.5281/zenodo.tua.nur.2025.011',
    featured: false
  },
  {
    id: 'tua-res-2024-007',
    title: 'Basic Life Support (BLS) Retention and Resuscitation Self-Efficacy Among Senior Nursing Students: A Quasi-Experimental Simulation Study',
    authors: ['Joshua David Flores', 'Angela Reyes', 'Bea Camille Tan'],
    academicYear: '2023–2024',
    batch: 'BSN 2024',
    outputType: 'Nursing Research',
    course: 'Emergency & Disaster Nursing',
    clinicalArea: 'Clinical Simulation Laboratory',
    condition: 'BLS',
    specialty: 'Emergency & Disaster Nursing',
    subSpecialty: 'BLS',
    researchTopic: 'Cardiopulmonary Resuscitation Competency',
    methodology: 'Quantitative',
    year: 2024,
    keywords: ['basic life support', 'CPR quality', 'compression depth', 'simulation-based learning', 'retention decay', 'nursing education'],
    abstract: 'Investigating CPR skill retention and chest compression psychomotor quality at 3-month and 6-month post-training intervals among N=180 senior nursing students. Using high-fidelity sensorized QCPR manikins measuring compression depth (5-6 cm), recoil rate, and ventilation volume, findings demonstrated a 42% decay in optimal chest compression metrics at 6 months, advocating for low-dose high-frequency (LDHF) booster drill intervals.',
    clinicalSummary: {
      patientProfile: 'N=180 senior BSN students who completed AHA-accredited BLS training.',
      chiefComplaint: 'Natural decay of high-quality psychomotor CPR skills over time without clinical practice.',
      vitalSignsBaseline: 'Baseline pre-test pass rate on high-fidelity QCPR manikin: 91.2%',
      nursingDiagnoses: [
        'Deficient Psychomotor Skill Retention related to time elapsed since formal training certification.'
      ],
      keyInterventions: [
        'Structured 5-minute monthly "booster" simulation stations.',
        'Objective real-time visual feedback integration on chest recoil and depth.',
        'Evaluation of team leader communication in two-rescuer adult BLS.'
      ],
      clinicalOutcomes: 'Students receiving 5-minute monthly booster drills maintained 94.6% compression adequacy versus 52.1% in the control group at 6 months (p < 0.001).',
      nursingImplications: 'Supports restructuring undergraduate nursing curricula toward micro-simulation booster training rather than bi-annual re-certification alone.'
    },
    fullDocument: {
      pagesCount: 58,
      tableOfContents: [
        'Chapter I. Introduction & Statement of the Problem',
        'Chapter II. AHA Resuscitation Guidelines & Psychomotor Retention Theory',
        'Chapter III. Research Design & High-Fidelity Manikin Calibration',
        'Chapter IV. Statistical Analysis & Compression Metric Trends',
        'Chapter V. Recommendations for Nursing Curricular Integration'
      ],
      sections: [
        {
          heading: 'Chapter IV: Psychomotor Decay Curves',
          subheading: 'Decay of Compression Depth vs. Recoil',
          body: 'Full chest recoil showed the steepest rate of deterioration, with 58% of unboosted students leaning on the sternum between compressions by month 4.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RC86.7 .F56 2024',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section R1 (Nursing Theses)',
      accessionNumber: 'TUA-NUR-2024-RES-029',
      status: 'Available',
      totalCopies: 3,
      availableCopies: 3,
      shelfRow: 'Row A, Shelf 3'
    },
    metrics: {
      views: 2410,
      downloads: 910,
      citationsCount: 46,
      savesCount: 190
    },
    advisor: 'Dr. Arthur Valenzuela, RN, MAN, EMT-P',
    doi: '10.5281/zenodo.tua.nur.2024.029',
    featured: false
  },
  {
    id: 'tua-ncp-2026-008',
    title: 'Hypovolemic Shock Secondary to Major Abdominal Trauma: Critical Care Fluid Resuscitation and Hemodynamic Nursing Protocols',
    authors: ['Bea Camille Tan', 'Juan Dela Cruz', 'Marcus Bautista'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Clinical Case Study',
    course: 'Emergency Nursing',
    clinicalArea: 'Emergency Trauma Resuscitation Bay',
    condition: 'Shock',
    specialty: 'Emergency & Disaster Nursing',
    subSpecialty: 'Shock',
    methodology: 'Clinical Case Protocol',
    year: 2026,
    keywords: ['hypovolemic shock', 'massive transfusion protocol', 'trauma nursing', 'crystalloids vs colloids', 'base deficit', 'permissive hypotension', 'damage control'],
    abstract: 'A clinical case study analyzing trauma nursing resuscitation in a 32-year-old male sustaining Grade IV splenic laceration and hemoperitoneum following a vehicular collision. Examines Massive Transfusion Protocol (MTP 1:1:1 packed red blood cells, fresh frozen plasma, and platelets), balanced permissive hypotension (target SBP 80-90 mmHg until surgical hemostasis), prevention of the lethal trauma triad (acidosis, hypothermia, coagulopathy), and rapid invasive line management.',
    clinicalSummary: {
      patientProfile: '32-year-old male driver involved in high-velocity vehicular accident.',
      chiefComplaint: 'Unresponsive, pale, diaphoresis, rigid distended abdomen, positive FAST exam for free intra-abdominal fluid in Morrison\'s pouch.',
      vitalSignsBaseline: 'BP: 74/42 mmHg | HR: 138 bpm (thready) | RR: 32 cpm | SpO2: 91% | GCS: 9 | Lactate: 6.8 mmol/L | Base Deficit: -11 mEq/L',
      nursingDiagnoses: [
        'Deficient Fluid Volume related to acute intravascular blood loss secondary to splenic rupture.',
        'Decreased Cardiac Output related to severely diminished venous preload.',
        'Impaired Gas Exchange related to hypoperfusion and ventilation-perfusion mismatch.',
        'Risk for Hypothermia related to rapid administration of room-temperature fluids and impaired thermoregulation.'
      ],
      keyInterventions: [
        'Immediate placement of two large-bore 14-gauge peripheral IV cannulas and rapid infuser setup.',
        'Activation of Hospital Massive Transfusion Protocol (MTP) with blood warmer warming all infusing products to 37°C.',
        'Targeting permissive systolic blood pressure of 85-90 mmHg to avoid dislodging early hemostatic clots prior to laparotomy.',
        'Continuous monitoring of core temperature via esophageal probe and active rewarming with forced-air warming blanket.',
        'Rapid preparation and transfer to Emergency Operating Room for exploratory damage-control laparotomy and splenectomy.'
      ],
      clinicalOutcomes: 'Patient successfully underwent damage control laparotomy with 2,200 mL hemoperitoneum evacuated; lactate normalized to 1.8 mmol/L on Post-Op Day 2; discharged on Day 9 with full cognitive recovery.',
      nursingImplications: 'The trauma nurse must prevent the lethal triad; administering unwarmed IV fluids will accelerate coagulopathic exsanguination.'
    },
    fullDocument: {
      pagesCount: 46,
      tableOfContents: [
        'I. Trauma Primary & Secondary Survey (ABCDE Framework)',
        'II. Pathophysiology of Cellular Hypoxia & Lactic Acidosis',
        'III. Massive Transfusion Protocol (MTP 1:1:1 Ratio)',
        'IV. Damage Control Resuscitation Principles',
        'V. Intraoperative & Surgical Intensive Care Nursing Plans',
        'VI. Post-Splenectomy Immunization Protocol (Encapsulated Bacteria)'
      ],
      sections: [
        {
          heading: '1. The Lethal Triad Prevention',
          subheading: 'Hypothermia, Coagulopathy, and Acidosis',
          body: 'For every 1°C drop in core body temperature, clotting factor activity decreases by roughly 10%. Keeping the trauma patient normothermic is a critical independent nursing intervention.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RD93 .T36 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N6 (Emergency & Trauma)',
      accessionNumber: 'TUA-NUR-2026-CCS-019',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row E, Shelf 4'
    },
    metrics: {
      views: 1530,
      downloads: 470,
      citationsCount: 25,
      savesCount: 108
    },
    advisor: 'Prof. Ronald De Vera, RN, MAN, CEN',
    doi: '10.5281/zenodo.tua.nur.2026.019',
    featured: false
  },
  {
    id: 'tua-ncp-2025-009',
    title: 'Acute Kidney Injury (AKI) Superimposed on Chronic Kidney Disease Secondary to Urosepsis: Continuous Renal Replacement & Nursing Care',
    authors: ['Sarah Jane Lim', 'Christian Paul Gomez', 'Angela Reyes'],
    academicYear: '2024–2025',
    batch: 'BSN 2025',
    outputType: 'Grand Case Presentation',
    course: 'Medical-Surgical Nursing',
    clinicalArea: 'Renal Dialysis Unit & Medical ICU',
    condition: 'Renal',
    specialty: 'Adult Health Nursing',
    subSpecialty: 'Renal',
    methodology: 'Clinical Case Protocol',
    year: 2025,
    keywords: ['acute kidney injury', 'hemodialysis', 'hyperkalemia', 'nephrology nursing', 'vascular access care', 'dialysis disequilibrium', 'fluid balance'],
    abstract: 'A comprehensive grand case presentation focusing on a 65-year-old male with Stage 3 CKD admitted for severe urosepsis developing KDIGO Stage 3 AKI with refractory hyperkalemia (K+ 6.9 mEq/L) and anuria. Covers emergency temporary dialysis catheter (VasCath) sterile site maintenance, ultrafiltration rate calculations, prevention of Dialysis Disequilibrium Syndrome, and renal nutritional modifications.',
    clinicalSummary: {
      patientProfile: '65-year-old male with Type 2 Diabetes (20 years) and Baseline Creatinine 2.1 mg/dL.',
      chiefComplaint: 'Oliguria (< 150 mL/24 hr), asterixis, tall peaked T waves on 12-lead ECG, generalized anasarca, and uremic encephalopathy.',
      vitalSignsBaseline: 'BP: 178/102 mmHg | HR: 62 bpm | RR: 26 cpm (Kussmaul breathing) | Temp: 38.6°C | Potassium: 6.9 mEq/L | Creatinine: 7.4 mg/dL',
      nursingDiagnoses: [
        'Risk for Dysrhythmias related to severe hyperkalemic myocardial conduction alteration.',
        'Excess Fluid Volume related to acute renal filtration failure as evidenced by anasarca and 8kg weight gain.',
        'Risk for Infection related to indwelling internal jugular hemodialysis dual-lumen catheter.'
      ],
      keyInterventions: [
        'Immediate administration of Calcium Gluconate 10% 10 mL IV push over 5 minutes for cardiac membrane stabilization.',
        'Administration of regular insulin 10 units in 50 mL D50W to shift potassium intracellularly pending emergent hemodialysis.',
        'Preparation of right internal jugular double-lumen catheter under strict sterile surgical asepsis.',
        'Hemodialysis initiation with conservative blood flow rate (200 mL/min) and zero net fluid removal in first hour to prevent rapid osmolar shifts.',
        'Implementation of a renal diet: strict potassium (< 2g/day), phosphorus (< 800mg/day), and protein adjustment.'
      ],
      clinicalOutcomes: 'Serum potassium reduced to 4.5 mEq/L post-dialysis; ECG showed normalization of T-waves and PR interval; patient transitioned to intermittent hemodialysis with gradual recovery of baseline urine output.',
      nursingImplications: 'Hyperkalemia is the fastest killer in acute renal failure; recognizing tall peaked T-waves before rhythm degeneration to ventricular fibrillation is an essential critical nursing competency.'
    },
    fullDocument: {
      pagesCount: 50,
      tableOfContents: [
        'I. Pathophysiology of Sepsis-Induced Renal Tubular Necrosis',
        'II. KDIGO AKI Classification and Staging Criteria',
        'III. Hyperkalemia Emergency Management Algorithm',
        'IV. Hemodialysis Vascular Access & Anticoagulation Nursing Care',
        'V. Dialysis Disequilibrium Syndrome (DDS) Pathogenesis & Prevention',
        'VI. Long-Term Renal Rehabilitation & Dietary Counseling'
      ],
      sections: [
        {
          heading: '1. Hyperkalemia Emergency Algorithm',
          subheading: 'Step-by-Step Nursing Protocol',
          body: 'Step 1: Stabilize myocardium (Calcium Gluconate). Step 2: Shift K+ inside cells (Insulin + D50W, Salbutamol nebs). Step 3: Remove K+ from body (Hemodialysis or Sodium Zirconium Cyclosilicate).'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RC918.R4 .L56 2025',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N4 (Renal & Nephrology)',
      accessionNumber: 'TUA-NUR-2025-GCP-015',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row B, Shelf 5'
    },
    metrics: {
      views: 1390,
      downloads: 410,
      citationsCount: 21,
      savesCount: 97
    },
    advisor: 'Prof. Remedios Cruz, RN, MAN, PhD',
    doi: '10.5281/zenodo.tua.nur.2025.015',
    featured: false
  },
  {
    id: 'tua-ncp-2026-010',
    title: 'Therapeutic Communication Protocols and Crisis Intervention in Major Depressive Disorder with Active Suicidal Ideation',
    authors: ['Christian Paul Gomez', 'Sarah Jane Lim', 'Marcus Bautista'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Grand Case Presentation',
    course: 'Psychiatric Nursing',
    clinicalArea: 'Psychiatric Inpatient Ward & Crisis Unit',
    condition: 'Depression',
    specialty: 'Psychiatric-Mental Health',
    subSpecialty: 'Depression',
    methodology: 'Clinical Case Protocol',
    year: 2026,
    keywords: ['major depressive disorder', 'suicide risk assessment', 'Columbia Suicide Severity Rating Scale', 'contract for safety', 'therapeutic relationship', 'SSRIs', 'mood disorder'],
    abstract: 'A psychiatric nursing grand case presentation centered on a 21-year-old university student admitted following suicidal ideation with plan. Covers structured application of the Columbia-Suicide Severity Rating Scale (C-SSRS), continuous environmental ligature risk auditing, establishing genuine unconditional positive regard, SSRI initiation (Sertraline) monitoring for paradoxically increased energy with remaining suicidal thoughts in weeks 1-2, and hope-building cognitive restructuring.',
    clinicalSummary: {
      patientProfile: '21-year-old female university undergraduate with severe academic burnout and bereavement loss.',
      chiefComplaint: 'Intense feelings of worthlessness, hopelessness, persistent active thoughts of self-harm, severe insomnia, and 8kg weight loss over 2 months.',
      vitalSignsBaseline: 'BP: 118/74 mmHg | HR: 76 bpm | RR: 16 cpm | C-SSRS: Level 5 (Active Ideation with Plan and Intent) | PHQ-9: 23 (Severe)',
      nursingDiagnoses: [
        'Risk for Self-Directed Violence related to overwhelming emotional pain, hopelessness, and loss of future orientation.',
        'Hopelessness related to long-term stress and cognitive distortions as evidenced by verbalization of "there is no way out".',
        'Imbalanced Nutrition: Less than Body Requirements related to depressive lack of interest in food.',
        'Disturbed Sleep Pattern related to rumination and biochemical alterations.'
      ],
      keyInterventions: [
        'Execution of 1-to-1 constant arm\'s length visual observation by designated nursing personnel 24/7.',
        'Environmental ligature audit: Bathroom fixtures, bed linens, electrical cords, and personal items inspected and locked.',
        'Co-creation of an individualized Personal Safety Plan identifying personal warning signs, internal coping strategies, and trusted emergency contacts.',
        'Direct, unambiguous communication regarding suicidal intent ("Are you thinking about killing yourself today?") without euphemisms.',
        'Close vigilance during week 2 of Sertraline therapy when energy levels improve before depressive mood lifts.'
      ],
      clinicalOutcomes: 'Patient successfully contracted for safety, reported PHQ-9 score dropped to 8 (mild) by Week 4, actively participated in group cognitive behavioral coping sessions, and reunited with family support network.',
      nursingImplications: 'Asking directly about suicide does NOT plant the idea in the patient\'s mind; it provides profound relief that someone is willing to share and carry their heaviest pain.'
    },
    fullDocument: {
      pagesCount: 45,
      tableOfContents: [
        'I. Clinical Vignette & Comprehensive Psychosocial History',
        'II. Neurobiology of Serotonergic & Noradrenergic Pathways in MDD',
        'III. Columbia Suicide Severity Rating Scale (C-SSRS) Algorithm',
        'IV. Environmental Safety & Ligature-Free Nursing Ward Standards',
        'V. Psychiatric Nursing Care Plans (NANDA, NOC, NIC)',
        'VI. The Stanley-Brown Safety Planning Intervention (SPI) in Practice'
      ],
      sections: [
        {
          heading: '1. Suicide Risk Assessment & Communication',
          subheading: 'Direct Inquiry Methodology',
          body: 'Nurses must ask clearly and calmly: "Are you having thoughts of harming or killing yourself?" Direct inquiry builds trust and dismantles isolation.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RC537 .G66 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N5 (Psychiatric & Mental Health)',
      accessionNumber: 'TUA-NUR-2026-GCP-022',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row D, Shelf 4'
    },
    metrics: {
      views: 1890,
      downloads: 670,
      citationsCount: 33,
      savesCount: 145
    },
    advisor: 'Prof. Gabriel Mendoza, RN, MAN, RPsy',
    doi: '10.5281/zenodo.tua.nur.2026.022',
    featured: false
  },
  {
    id: 'tua-res-2025-011',
    title: 'Substance Use Rehabilitation: Cognitive-Behavioral Milieu Nursing Support and Relapse Triggers Among Recovering Young Adults',
    authors: ['Sarah Jane Lim', 'Marcus Bautista', 'Patricia Alcantara'],
    academicYear: '2024–2025',
    batch: 'BSN 2025',
    outputType: 'Nursing Research',
    course: 'Psychiatric Nursing & Research',
    clinicalArea: 'Community Residential Rehabilitation Center',
    condition: 'Substance use',
    specialty: 'Psychiatric-Mental Health',
    subSpecialty: 'Substance use',
    researchTopic: 'Addiction Relapse Prevention & Coping Mechanisms',
    methodology: 'Qualitative',
    year: 2025,
    keywords: ['substance use', 'relapse prevention', 'cognitive-behavioral therapy', 'milieu nursing', 'craving management', 'peer support', 'mental health'],
    abstract: 'A qualitative phenomenological investigation exploring the lived experiences of N=22 recovering young adults undergoing residential addiction rehabilitation. The thematic analysis identified four primary themes of relapse risk: social re-exposure friction, emotional distress coping deficits, craving cue triggers, and family estrangement. The study proposes the Nurse-Guided CRAVE Model for structured inpatient coping drills.',
    clinicalSummary: {
      patientProfile: 'N=22 residential participants aged 19–28 in recovery for methamphetamine and alcohol use disorders.',
      chiefComplaint: 'Intense craving episodes triggered by negative emotional states and interpersonal conflicts.',
      vitalSignsBaseline: 'All participants met DSM-5 criteria for severe substance use disorder in remission.',
      nursingDiagnoses: [
        'Ineffective Coping related to reliance on chemical substances in managing emotional distress.',
        'Compromised Family Coping related to broken communication and trust erosion.'
      ],
      keyInterventions: [
        'Nurse-led Daily Craving Surfing group sessions.',
        'Implementation of the CRAVE coping model (Calm, Recognize, Assess, Validate, Execute).',
        'Structured family reconciliation dialogue facilitation.'
      ],
      clinicalOutcomes: 'Participants demonstrated significant improvements in self-efficacy to resist relapse triggers and reported high therapeutic value in structured nurse debriefings.',
      nursingImplications: 'Addiction is a chronic relapsing neurological disorder; nursing care must replace stigma with trauma-informed craving resilience coaching.'
    },
    fullDocument: {
      pagesCount: 62,
      tableOfContents: [
        'Chapter I. Background & Stigma in Substance Rehabilitation',
        'Chapter II. Phenomenological Framework (Colaizzi Method)',
        'Chapter III. Data Collection & Ethical Approvals',
        'Chapter IV. Emergent Themes & Structural Textural Descriptions',
        'Chapter V. The CRAVE Nurse-Led Inpatient Protocol'
      ],
      sections: [
        {
          heading: 'Chapter IV: Thematic Analysis',
          subheading: 'Theme 2: "Surfing the Craving Wave"',
          body: 'Participants reported that treating cravings as temporary physiological surges that peak and decline within 15-20 minutes, rather than irresistible commands, was the most effective coping strategy taught by staff nurses.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'HV5801 .L56 2025',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section R1 (Nursing Theses)',
      accessionNumber: 'TUA-NUR-2025-RES-031',
      status: 'Available',
      totalCopies: 2,
      availableCopies: 2,
      shelfRow: 'Row A, Shelf 4'
    },
    metrics: {
      views: 1240,
      downloads: 380,
      citationsCount: 19,
      savesCount: 88
    },
    advisor: 'Dr. Maria Elena Fernandez, RN, PhD',
    doi: '10.5281/zenodo.tua.nur.2025.031',
    featured: false
  },
  {
    id: 'tua-ncp-2026-012',
    title: 'Evidence-Based Nursing Clinical Guidelines for Glycemic Control and Diabetic Foot Ulcer Prevention in Type 2 Diabetes',
    authors: ['Juan Dela Cruz', 'Angela Reyes', 'Bea Camille Tan', 'Joshua David Flores'],
    academicYear: '2025–2026',
    batch: 'BSN 2026',
    outputType: 'Evidence-Based Clinical Guideline',
    course: 'Medical-Surgical Nursing',
    clinicalArea: 'Endocrine & Metabolic Outpatient Clinic',
    condition: 'Diabetes',
    specialty: 'Adult Health Nursing',
    subSpecialty: 'Endocrine',
    researchTopic: 'Diabetic Self-Management Education & Microvascular Care',
    methodology: 'Evidence Synthesis',
    year: 2026,
    keywords: ['diabetes', 'diabetic foot ulcer', 'HbA1c', 'monofilament test', 'glycemic control', 'insulin administration', 'patient education'],
    abstract: 'An evidence-based clinical practice guideline translating international ADA/IDF recommendations into actionable nursing protocols for tertiary and community hospital settings. Outlines standard 10g Semmes-Weinstein monofilament sensory testing, daily foot inspection checklist, subcutaneous insulin site rotation to prevent lipohypertrophy, hypoglycemia recognition and rule of 15s management.',
    clinicalSummary: {
      patientProfile: 'Protocol formulated for adult outpatients with Type 2 Diabetes Mellitus with HbA1c > 7.5% or loss of protective sensation.',
      chiefComplaint: 'High incidence of uninspected micro-abrasions progressing to Wagner Grade 2 diabetic foot ulcers.',
      vitalSignsBaseline: 'Standard outpatient target: HbA1c < 7.0%, Preprandial BG 80-130 mg/dL, Postprandial BG < 180 mg/dL',
      nursingDiagnoses: [
        'Risk for Impaired Skin Integrity: Feet related to peripheral neuropathy and diminished arterial perfusion.',
        'Deficient Knowledge regarding diabetic foot self-inspection and proper footwear selection.',
        'Ineffective Health Management related to insulin injection technique errors.'
      ],
      keyInterventions: [
        'Standardized 5-point bilateral foot monofilament sensory screening during every clinic visit.',
        'Education on the "Rule of 15" for hypoglycemia (consume 15g fast-acting carbohydrate, retest in 15 minutes).',
        'Teaching proper injection technique: 90-degree angle, systematic anatomical quadrant rotation, single-use needle discipline.',
        'Prescription of protective seamless cotton socks and properly fitted closed footwear.'
      ],
      clinicalOutcomes: 'Integration of the guideline in ambulatory clinic resulted in 52% increase in early peripheral neuropathy detection and 40% reduction in severe ulcer admissions over 12 months.',
      nursingImplications: 'Nurses are the primary champions of preventative diabetic foot care; a 3-minute monofilament examination can prevent a lifetime amputation.'
    },
    fullDocument: {
      pagesCount: 40,
      tableOfContents: [
        'I. Clinical Practice Guideline Scope & Target Population',
        'II. Grading of Recommendations and Quality of Evidence (GRADE)',
        'III. Standardized Diabetic Foot Sensory Examination Algorithm',
        'IV. Insulin Pharmacodynamics & Injection Site Stewardship',
        'V. The Hypoglycemia "Rule of 15" Emergency Protocol',
        'VI. Quality Audit Checklist for Inpatient and Outpatient Nursing'
      ],
      sections: [
        {
          heading: '1. The 10g Semmes-Weinstein Monofilament Protocol',
          subheading: 'Standard Testing Points',
          body: 'Apply the 10g monofilament perpendicular to the skin surface until it buckles for 1-2 seconds. Test 10 sites per foot (plantar hallux, 3rd toe, 5th toe, 1st/3rd/5th metatarsal heads, medial/lateral midfoot, heel, and dorsal first web space). Loss of sensation at ≥ 2 sites indicates high ulcer risk.'
        }
      ]
    },
    physicalLibrary: {
      callNumber: 'RC660 .D45 2026',
      shelfLocation: 'Health Sciences Library, 2nd Flr — Section N4 (Endocrine & Diabetes)',
      accessionNumber: 'TUA-NUR-2026-EBG-035',
      status: 'Available',
      totalCopies: 4,
      availableCopies: 4,
      shelfRow: 'Row B, Shelf 6'
    },
    metrics: {
      views: 2890,
      downloads: 1140,
      citationsCount: 52,
      savesCount: 230
    },
    advisor: 'Dr. Clarissa Valmonte, RN, DNSc',
    doi: '10.5281/zenodo.tua.nur.2026.035',
    featured: true
  }
];

export const INITIAL_ANNOUNCEMENTS: LibraryAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'BSN Batch 2026 Grand Case Presentation Repository Submissions Open',
    category: 'Submission Call',
    date: 'September 2026',
    content: 'All senior nursing groups who completed their Hospital Grand Case Presentations (Medical-Surgical, Maternal & Child, Psychiatric, and Emergency Care) may now upload their complete scholarly documentation and care plan matrices to the permanent digital archive.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    linkText: 'Submit Your Case Presentation'
  },
  {
    id: 'ann-2',
    title: '14th Annual Trinity College of Nursing Research & Clinical Symposium',
    category: 'Symposium',
    date: 'October 15, 2026',
    content: 'Selected top-cited BSN research papers and grand case presentations will be presented at the University Auditorium. Physical archive volumes are available at the Health Sciences Reserve Desk.',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    linkText: 'View Schedule & Nominated Papers'
  },
  {
    id: 'ann-3',
    title: 'Physical Library Circulation & 2-Hour Reserve Desk Updates',
    category: 'Library Notice',
    date: 'Academic Year 2025–2026',
    content: 'Bound printed copies of BSN 2024-2026 Grand Case Presentations and Theses are now cataloged with Dewey/LC call numbers on the 2nd Floor Health Sciences Library Section. Students may reserve copies for 2-hour reading room loans.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    linkText: 'Browse Physical Shelf Directory'
  }
];

export const REPOSITORY_CURATED_COLLECTIONS = [
  {
    id: 'med-surg',
    name: 'Medical-Surgical Nursing',
    description: 'Adult health, acute pathophysiologic cases, systemic pharmacology, and perioperative nursing care plans.',
    subcategories: [
      { name: 'Cardiovascular', count: 3, query: 'Cardiovascular', condition: 'Heart Failure' },
      { name: 'Respiratory', count: 2, query: 'Respiratory', condition: 'Pediatric Pneumonia' },
      { name: 'Neurological', count: 1, query: 'Neurological', condition: 'Hypertensive Emergency' },
      { name: 'Renal', count: 1, query: 'Renal', condition: 'Renal' },
      { name: 'Gastrointestinal', count: 1, query: 'Gastrointestinal', condition: 'Shock' },
      { name: 'Endocrine', count: 1, query: 'Endocrine', condition: 'Diabetes' }
    ],
    color: 'from-blue-900 via-blue-800 to-indigo-900',
    accentColor: 'border-amber-400 text-amber-500',
    badgeText: 'Top Active Collection'
  },
  {
    id: 'maternal-child',
    name: 'Maternal & Child Nursing',
    description: 'High-risk obstetrics, intrapartum management, neonatal care, and pediatric developmental pathways.',
    subcategories: [
      { name: 'Pregnancy', count: 1, query: 'Pregnancy', condition: 'Preeclampsia' },
      { name: 'Labor', count: 1, query: 'Labor', condition: 'Preeclampsia' },
      { name: 'Newborn', count: 1, query: 'Newborn', condition: 'Pediatric Pneumonia' },
      { name: 'Pediatrics', count: 2, query: 'Pediatrics', condition: 'Pediatric Pneumonia' }
    ],
    color: 'from-sky-900 via-blue-900 to-slate-900',
    accentColor: 'border-amber-400 text-amber-400',
    badgeText: 'High Clinical Utility'
  },
  {
    id: 'psychiatric',
    name: 'Psychiatric Nursing',
    description: 'Inpatient mental health, therapeutic communication, psychosis management, and mood disorder crisis care.',
    subcategories: [
      { name: 'Schizophrenia', count: 1, query: 'Schizophrenia', condition: 'Schizophrenia' },
      { name: 'Depression', count: 1, query: 'Depression', condition: 'Depression' },
      { name: 'Bipolar disorder', count: 1, query: 'Bipolar disorder', condition: 'Schizophrenia' },
      { name: 'Substance use', count: 1, query: 'Substance use', condition: 'Substance use' }
    ],
    color: 'from-slate-900 via-indigo-950 to-blue-950',
    accentColor: 'border-amber-400 text-amber-400',
    badgeText: 'Evidence-Based'
  },
  {
    id: 'emergency-disaster',
    name: 'Emergency & Disaster Nursing',
    description: 'Mass casualty START triage, trauma resuscitation, shock management, and BLS competency.',
    subcategories: [
      { name: 'Trauma', count: 1, query: 'Trauma', condition: 'Shock' },
      { name: 'Disaster nursing', count: 1, query: 'Disaster nursing', condition: 'Disaster Nursing' },
      { name: 'Shock', count: 1, query: 'Shock', condition: 'Shock' },
      { name: 'BLS', count: 1, query: 'BLS', condition: 'BLS' }
    ],
    color: 'from-blue-950 via-slate-900 to-amber-950/40',
    accentColor: 'border-amber-400 text-amber-400',
    badgeText: 'Rapid Protocol'
  }
];
