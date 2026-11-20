import React, { useState } from 'react';
import { Phone, ShieldAlert, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenBooking: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEmergency, onOpenBooking, onOpenAbout }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white shadow-md border-b border-slate-800/80 px-3.5 py-2 select-none">
      <div className="flex items-center justify-between">
        {/* Brand / Logo info */}
        <button 
          onClick={onOpenAbout}
          className="flex items-center space-x-2 text-left group transition-transform active:scale-95 min-w-0 pr-1"
          aria-label="View Doctor Profile"
        >
          <div className="relative w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/50 p-0.5 shadow-sm overflow-hidden flex items-center justify-center flex-shrink-0">
            {!imgError ? (
              <img 
                src={CLINIC_INFO.doctorPhoto} 
                alt={CLINIC_INFO.doctor} 
                className="w-full h-full object-cover rounded-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-amber-400 font-bold text-[10px]">TG</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 whitespace-nowrap">
              <span className="font-serif font-bold text-xs tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Tailor Your Behavior
              </span>
              <span className="inline-block px-1 py-0.2 text-[8px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full flex-shrink-0">
                Ph.D.
              </span>
            </div>
            <p className="text-[10px] text-slate-300 font-medium leading-none mt-0.5 truncate">
              Dr. Thomas Gross &bull; Brooklyn, NY
            </p>
          </div>
        </button>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Quick Call */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition-transform active:scale-90 border border-slate-700/60"
            title="Call Office"
            aria-label="Call (917) 843-4146"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Quick Book */}
          <button
            onClick={onOpenBooking}
            className="px-2.5 py-1 text-[11px] font-semibold bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 rounded-full flex items-center space-x-1 shadow-sm transition-all"
            aria-label="Book Free Consultation"
          >
            <Calendar className="w-3 h-3" />
            <span>Book</span>
          </button>

          {/* Crisis / SOS trigger */}
          <button
            onClick={onOpenEmergency}
            className="w-7 h-7 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/50 flex items-center justify-center transition-transform active:scale-90"
            title="Crisis & Emergency Resources"
            aria-label="Crisis Support"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
