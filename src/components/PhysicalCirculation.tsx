import React, { useState } from 'react';
import { ScholarlyWork, CirculationStatus } from '../types';
import { 
  Library, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Info,
  Building,
  Check,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PhysicalCirculationProps {
  works: ScholarlyWork[];
  onOpenDetails: (work: ScholarlyWork) => void;
  onOpenReader: (work: ScholarlyWork) => void;
}

export const PhysicalCirculation: React.FC<PhysicalCirculationProps> = ({
  works,
  onOpenDetails,
  onOpenReader
}) => {
  const [shelfQuery, setShelfQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [reserveModalWork, setReserveModalWork] = useState<ScholarlyWork | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM – 11:00 AM');
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const filteredCirculation = works.filter((w) => {
    if (statusFilter !== 'ALL' && w.physicalLibrary.status !== statusFilter) {
      return false;
    }
    if (shelfQuery.trim()) {
      const q = shelfQuery.toLowerCase();
      return (
        w.title.toLowerCase().includes(q) ||
        w.physicalLibrary.callNumber.toLowerCase().includes(q) ||
        w.physicalLibrary.accessionNumber.toLowerCase().includes(q) ||
        w.physicalLibrary.shelfLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentId) return;

    setReservationSuccess(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#1E40AF', '#10B981']
    });

    setTimeout(() => {
      setReservationSuccess(false);
      setReserveModalWork(null);
      setStudentName('');
      setStudentId('');
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner with Frosted Glass Dark Canvas */}
      <div className="glass-dark rounded-3xl p-6 sm:p-8 text-white border border-white/15 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold backdrop-blur-md">
          <Library className="w-4 h-4 text-amber-400" />
          Physical Library & Reserve Desk Management
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Health Sciences Library Physical Catalog (Follett Destiny Sync)
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
          Locate bound print volumes, Grand Case Presentation binders, and clinical research manuscripts on the 2nd Floor Health Sciences Library. Reserve 2-hour reading room loans or access instant digitized scans.
        </p>
      </div>

      {/* Library Hours & Shelf Locator Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-900 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Physical Location</h3>
            <p className="text-sm font-bold text-blue-950">2nd Floor Health Sciences Wing</p>
            <p className="text-[11px] text-slate-600">Sections N1 to N6 (Nursing Archive)</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Reserve Desk Loan Policy</h3>
            <p className="text-sm font-bold text-blue-950">2-Hour Reading Room Loans</p>
            <p className="text-[11px] text-slate-600">Renewable if no pending batch requests</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Digital Archive Access</h3>
            <p className="text-sm font-bold text-blue-950">100% Digitized & OCR Searchable</p>
            <p className="text-[11px] text-slate-600">PDF download and online reader active</p>
          </div>
        </div>
      </div>

      {/* Filter and Shelf Search */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Call Number (e.g. RT86.7), Accession No., or Title..."
              value={shelfQuery}
              onChange={(e) => setShelfQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-semibold shrink-0">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-2.5 rounded-xl bg-white/80 backdrop-blur-xs border border-slate-200 text-slate-800 focus:outline-none focus:border-amber-400 w-full sm:w-auto"
            >
              <option value="ALL">All Items</option>
              <option value="Available">Available on Shelf</option>
              <option value="On Reserve (2-Hour Loan)">On 2-Hour Reserve</option>
              <option value="Digitized Only">Digitized Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Circulation Table */}
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/60 flex items-center justify-between">
          <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
            <Library className="w-4 h-4 text-blue-900" />
            Physical Inventory & Shelf Holdings ({filteredCirculation.length} Volumes)
          </h2>
          <span className="text-xs text-slate-500 font-mono">Follett Destiny Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-blue-950 text-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3">Call Number</th>
                <th className="px-5 py-3">Title & Authors</th>
                <th className="px-4 py-3">Type & Batch</th>
                <th className="px-4 py-3">Shelf Location</th>
                <th className="px-4 py-3">Copies</th>
                <th className="px-4 py-3">Circulation Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60">
              {filteredCirculation.map((work) => (
                <tr key={work.id} className="hover:bg-white/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono font-bold text-blue-950 whitespace-nowrap">
                    {work.physicalLibrary.callNumber}
                  </td>
                  <td className="px-5 py-3.5 max-w-xs">
                    <button
                      onClick={() => onOpenDetails(work)}
                      className="font-bold text-blue-950 hover:text-blue-700 text-left line-clamp-2"
                    >
                      {work.title}
                    </button>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {work.authors.join(', ')}
                    </p>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-900 font-semibold block w-max border border-blue-200/50">
                      {work.outputType}
                    </span>
                    <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                      {work.batch}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{work.physicalLibrary.shelfLocation}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block ml-4">
                      {work.physicalLibrary.shelfRow}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className="font-bold text-slate-800">
                      {work.physicalLibrary.availableCopies} / {work.physicalLibrary.totalCopies}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Available</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {work.physicalLibrary.status === 'Available' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100/80 text-amber-900 border border-amber-300">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {work.physicalLibrary.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                    <button
                      onClick={() => setReserveModalWork(work)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold text-[11px] transition-all shadow-xs"
                    >
                      Reserve 2-Hr Loan
                    </button>
                    <button
                      onClick={() => onOpenReader(work)}
                      className="px-3 py-1.5 rounded-xl bg-blue-900/90 hover:bg-blue-900 text-amber-300 font-semibold text-[11px] transition-colors border border-blue-700"
                    >
                      Read Scan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Hour Reserve Desk Reservation Modal */}
      {reserveModalWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel bg-white/95 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-white/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Library className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-blue-950">
                  2-Hour Reserve Desk Loan Request
                </h3>
              </div>
              <button
                onClick={() => setReserveModalWork(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs">
              <p className="font-bold text-blue-950">{reserveModalWork.title}</p>
              <p className="text-slate-600 mt-1">Call Number: <span className="font-mono font-semibold text-blue-900">{reserveModalWork.physicalLibrary.callNumber}</span></p>
              <p className="text-amber-700 font-semibold mt-0.5">{reserveModalWork.physicalLibrary.shelfLocation}</p>
            </div>

            {reservationSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-950">Reservation Confirmed!</h4>
                <p className="text-xs text-emerald-800">
                  Please present your TUA Student ID at the 2nd Floor Health Sciences Reserve Desk at your selected time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReserveSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juan Dela Cruz"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">TUA Student ID Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023-01894-BSN"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Preferred 2-Hour Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white/80 border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-400"
                  >
                    <option value="09:00 AM – 11:00 AM">09:00 AM – 11:00 AM (Morning Slot)</option>
                    <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM (Midday Slot)</option>
                    <option value="01:00 PM – 03:00 PM">01:00 PM – 03:00 PM (Afternoon Slot)</option>
                    <option value="03:00 PM – 05:00 PM">03:00 PM – 05:00 PM (Late Afternoon)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReserveModalWork(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-bold shadow-md transition-all"
                  >
                    Confirm 2-Hour Hold
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
