import React from 'react';
import { X, Phone, ShieldAlert, HeartHandshake, ExternalLink, AlertTriangle } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in overflow-hidden">
      {/* Backdrop tap to dismiss */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        className="relative z-10 w-full bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-rose-500/30 overflow-hidden max-h-[85%] flex flex-col animate-slide-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-title"
      >
        {/* Mobile Pull / Swipe Handle */}
        <div className="w-full flex justify-center pt-2.5 pb-1 bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900">
          <div className="w-10 h-1 bg-white/40 rounded-full" />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <h3 id="emergency-title" className="font-bold text-base text-rose-100 leading-tight">
                Crisis & Emergency Support
              </h3>
              <p className="text-xs text-rose-300">
                Immediate 24/7 care for mental health emergencies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-sm">
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-xl text-rose-900 dark:text-rose-200 text-xs flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            <p>
              If you, your teenager, or a loved one is in immediate physical danger, please dial <strong>911</strong> or proceed to the nearest hospital emergency room.
            </p>
          </div>

          {/* Hotline 988 */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 bg-slate-50 dark:bg-slate-800/50 hover:border-amber-400/50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 mb-1">
                  National 24/7 Hotline
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  988 Suicide & Crisis Lifeline
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Free, confidential support for anyone in emotional distress or suicidal crisis. Call or text anytime.
                </p>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <a
                href="tel:988"
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 988</span>
              </a>
              <a
                href="sms:988"
                className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-1.5"
              >
                <span>Text 988</span>
              </a>
            </div>
          </div>

          {/* Dr. Thomas Gross Practice Contact */}
          <div className="border border-amber-500/30 rounded-2xl p-3.5 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Tailor Your Behavior Direct Clinic
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Reach out directly to Dr. Thomas Gross, Ph.D. for urgent teen, parent, or individual triage.
                </p>
                <div className="mt-2.5 flex items-center space-x-2">
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call {CLINIC_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* NYC Specific Resources */}
          <div className="space-y-2 text-xs">
            <h5 className="font-semibold text-slate-700 dark:text-slate-300">
              New York City Crisis Services:
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:18886929355"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">NYC Well</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">1-888-NYC-WELL</span>
                </div>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 mt-1 flex items-center">
                  Call NYC Triage &rarr;
                </span>
              </a>

              <a
                href="sms:741741?body=HOME"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Crisis Text Line</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Text HOME to 741741</span>
                </div>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 mt-1 flex items-center">
                  Text Free &rarr;
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs rounded-xl"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
