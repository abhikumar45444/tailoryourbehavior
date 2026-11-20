import React from 'react';
import { Phone, ShieldAlert, Heart, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenBooking: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency, onOpenBooking, onOpenAbout }) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white shadow-md border-b border-slate-800/80 px-4 py-2.5">
      <div className="flex items-center justify-between">
        {/* Brand / Logo info */}
        <button 
          onClick={onOpenAbout}
          className="flex items-center space-x-2.5 text-left group transition-transform active:scale-95"
          aria-label="View Doctor Profile"
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
            <img 
              src={CLINIC_INFO.doctorPhoto} 
              alt={CLINIC_INFO.doctor} 
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                // fallback if wix hotlink throttles
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-slate-900 font-bold text-xs">TG</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-sm tracking-wide text-white group-hover:text-amber-400 transition-colors">
                Tailor Your Behavior
              </span>
              <span className="inline-block px-1.5 py-0.2 text-[9px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                Ph.D.
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium leading-none mt-0.5">
              Dr. Thomas Gross &bull; Brooklyn, NY
            </p>
          </div>
        </button>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-1.5">
          {/* Quick Call */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-transform active:scale-90 border border-slate-700/60"
            title="Call Office"
            aria-label="Call (917) 843-4146"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Quick Book */}
          <button
            onClick={onOpenBooking}
            className="px-2.5 py-1 text-xs font-semibold bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 rounded-full flex items-center space-x-1 shadow-sm transition-all"
            aria-label="Book Free Consultation"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Book</span>
          </button>

          {/* Crisis / SOS trigger */}
          <button
            onClick={onOpenEmergency}
            className="w-8 h-8 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/50 flex items-center justify-center transition-transform active:scale-90"
            title="Crisis & Emergency Resources"
            aria-label="Crisis Support"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
