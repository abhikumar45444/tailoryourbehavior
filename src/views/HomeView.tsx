import React from 'react';
import { 
  Calendar, 
  Brain, 
  Sparkles, 
  UserCheck, 
  Phone, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';
import { NavTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: NavTab, params?: any) => void;
  onSelectService: (serviceId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 bg-slate-50 p-4 space-y-4 pb-12">
      
      {/* 1. Calm, Minimal Welcome Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider block mb-1">
          Clinical Psychology &bull; Brooklyn, NY
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
          Build the Skills to Greatness
        </h1>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          Compassionate, evidence-based CBT & DBT therapy tailored for children, teens, adults, and families.
        </p>
      </div>

      {/* 2. Primary Action: Book Free Consultation */}
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 text-slate-950 font-bold text-xs uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>Free Initial Consultation</span>
        </div>
        <h2 className="font-serif font-bold text-lg text-slate-950 mt-1">
          Ready to begin?
        </h2>
        <p className="text-xs text-slate-900/90 mt-1 leading-relaxed">
          Schedule a direct, confidential phone or video conversation with Dr. Thomas Gross.
        </p>
        <button
          onClick={() => onNavigate('booking')}
          className="mt-4 w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-900 active:bg-black text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center space-x-2 transition-transform active:scale-98"
        >
          <span>Book Free Consultation</span>
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* 3. Three Clean Core Navigation Cards */}
      <div className="space-y-2.5">
        
        {/* Services Card */}
        <div 
          onClick={() => onNavigate('services')}
          className="bg-white hover:bg-slate-50/80 active:bg-slate-100 p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
              <Brain className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Clinical Services
              </h3>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                CBT, DBT, Teen IOP, Couples & Parenting
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
        </div>

        {/* Tools Card */}
        <div 
          onClick={() => onNavigate('tools')}
          className="bg-white hover:bg-slate-50/80 active:bg-slate-100 p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-200/60">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                Self-Care & Daily Tools
              </h3>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                Thought journal, paced breath & self-check
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
        </div>

        {/* Doctor Bio Card */}
        <div 
          onClick={() => onNavigate('profile')}
          className="bg-white hover:bg-slate-50/80 active:bg-slate-100 p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-3.5 min-w-0">
            <img 
              src={CLINIC_INFO.doctorPhoto} 
              alt={CLINIC_INFO.doctor} 
              className="w-10 h-10 rounded-full object-cover border border-amber-400/40 flex-shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  Dr. Thomas Gross, Ph.D.
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                17+ Yrs Exp &bull; Beck & Yale Kazdin Method
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
        </div>

      </div>

      {/* 4. Minimal Direct Contact Pill */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="min-w-0 pr-2">
          <span className="font-semibold text-slate-800 block truncate">
            Questions or urgent inquiries?
          </span>
          <span className="text-[11px] text-slate-500 block truncate mt-0.5">
            Office: {CLINIC_INFO.phoneDisplay}
          </span>
        </div>
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl flex items-center space-x-1.5 flex-shrink-0 border border-slate-200 active:scale-95 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-amber-600" />
          <span>Call</span>
        </a>
      </div>

    </div>
  );
};