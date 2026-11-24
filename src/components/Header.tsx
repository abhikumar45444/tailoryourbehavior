import React, { useState } from 'react';
import { Phone, ShieldAlert } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenEmergency, 
  onOpenAbout
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200/80 px-4 py-2.5 select-none transition-colors">
      <div className="flex items-center justify-between">
        {/* Brand / Doctor Profile link */}
        <button 
          onClick={onOpenAbout}
          className="flex items-center space-x-2.5 text-left group transition-transform active:scale-98 min-w-0"
          aria-label="View Doctor Profile"
        >
          <div className="relative w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 p-0.5 shadow-xs overflow-hidden flex items-center justify-center flex-shrink-0">
            {!imgError ? (
              <img 
                src={CLINIC_INFO.doctorPhoto} 
                alt={CLINIC_INFO.doctor} 
                className="w-full h-full object-cover rounded-full"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-amber-600 font-bold text-xs">TG</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-600 transition-colors truncate">
                Tailor Your Behavior
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5 truncate">
              Dr. Thomas Gross &bull; Brooklyn, NY
            </p>
          </div>
        </button>

        {/* Clean minimal action buttons */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Quick Call */}
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 flex items-center justify-center transition-transform active:scale-90 border border-slate-200"
            title={`Call ${CLINIC_INFO.phoneDisplay}`}
            aria-label="Call Office"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          {/* Crisis / SOS trigger */}
          <button
            onClick={onOpenEmergency}
            className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 border border-rose-200 flex items-center justify-center transition-transform active:scale-90"
            title="Crisis & Emergency Resources"
            aria-label="Crisis Support"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};