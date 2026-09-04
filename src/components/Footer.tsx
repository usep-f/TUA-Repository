import React from 'react';
import { BookOpen, GraduationCap, Library, ShieldCheck, HeartPulse } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tab: 'home' | 'catalog' | 'collections' | 'circulation' | 'submit' | 'shelf') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab }) => {
  return (
    <footer className="glass-dark !bg-[#000415] text-slate-300 border-t border-white/10 mt-12 relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-1/4 -mt-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-12 space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Institutional Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-blue-950 flex items-center justify-center font-bold shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  TUA Nursing Scholarly Repository
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  Trinity University of Asia • St. Luke's College of Nursing
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              "A searchable scholarly repository for nursing students." Empowering successive BSN batches with peer-reviewed clinical grand case presentations, nursing research, evidence-based care plans, and physical library circulation records.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
              <span>Student Work</span>
              <span>→</span>
              <span>Repository</span>
              <span>→</span>
              <span>Search</span>
              <span>→</span>
              <span>Read</span>
              <span>→</span>
              <span>Learn</span>
              <span>→</span>
              <span className="text-white underline">Cite</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Repository Sections
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToTab('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('catalog')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Catalog & Power Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('collections')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Curated Specialty Hubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('circulation')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Physical Library Reserve Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('submit')}
                  className="hover:text-amber-300 transition-colors"
                >
                  BSN Work Submission Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Curricular Disciplines */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Clinical Disciplines
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Medical-Surgical Nursing (Cardio, Renal, Endocrine)</li>
              <li>Maternal & Child Nursing (OB, Pediatrics)</li>
              <li>Psychiatric & Mental Health Nursing</li>
              <li>Emergency & Disaster Nursing (START Triage, BLS)</li>
              <li>Community & Public Health Nursing</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Trinity University of Asia College of Nursing. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
