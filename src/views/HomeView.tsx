import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Brain, 
  HeartHandshake, 
  Phone, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Star
} from 'lucide-react';
import { CLINIC_INFO, SERVICES_DATA, TREATMENT_JOURNEY, TESTIMONIALS_DATA } from '../data/websiteContent';
import { NavTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: NavTab, params?: any) => void;
  onSelectService: (serviceId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectService }) => {
  const iopService = SERVICES_DATA.find(s => s.id === 'intensive-outpatient-program');
  const parentingService = SERVICES_DATA.find(s => s.id === 'parenting-therapy');

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 dark:text-slate-100 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-slate-900 to-slate-900 text-white px-5 pt-6 pb-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Tailor Your Behavior</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white mb-2">
            Build the Skills to <span className="text-amber-400">Greatness</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
            &ldquo;Our minds can create prisons or palaces, abundance or scarcity. If you&apos;re feeling overwhelmed by life&apos;s circumstances or need parenting advice, let me help navigate through the turbulence.&rdquo;
          </p>

          <div className="flex items-center space-x-3 pt-1">
            <button
              onClick={() => onNavigate('booking')}
              className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="flex-1 py-2.5 px-4 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>Explore Programs</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Doctor Endorsement Bar */}
          <div 
            onClick={() => onNavigate('profile')}
            className="mt-4 p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <img 
                src={CLINIC_INFO.doctorPhoto} 
                alt={CLINIC_INFO.doctor} 
                className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-white">{CLINIC_INFO.doctor}</span>
                  <span className="text-[10px] text-amber-400 font-medium">17+ Yrs Exp</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Trained at Beck Institute &bull; Yale Kazdin Method
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Quick Action Matrix */}
      <section className="px-4 -mt-3 relative z-20">
        <div className="grid grid-cols-2 gap-2.5">
          <div 
            onClick={() => onNavigate('tools')}
            className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm hover:border-amber-400/50 cursor-pointer active:scale-95 transition-all flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                CBT Thought Journal
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Identify & reframe cognitive traps
              </span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('tools')}
            className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm hover:border-amber-400/50 cursor-pointer active:scale-95 transition-all flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                Parenting Praise Tool
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Kazdin 4:1 reinforcement tracker
              </span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('tools')}
            className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm hover:border-amber-400/50 cursor-pointer active:scale-95 transition-all flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                DBT Grounding & Breath
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Paced calming breath guide
              </span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('tools')}
            className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/70 shadow-sm hover:border-amber-400/50 cursor-pointer active:scale-95 transition-all flex flex-col justify-between"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                Clinical Self-Screening
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Instant anxiety & mood assessment
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured: Teen & Young Adult IOP */}
      {iopService && (
        <section className="px-4 mt-6">
          <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 text-white rounded-2xl p-4 border border-brand-800/40 shadow-md relative overflow-hidden">
            <div className="flex items-center space-x-1.5 text-amber-400 text-[11px] font-bold tracking-wide uppercase mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Bridged Behavioral Health</span>
            </div>
            
            <h3 className="font-serif font-bold text-base sm:text-lg text-white leading-snug">
              Teen & Young Adult Intensive Outpatient (IOP)
            </h3>
            
            <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
              {iopService.shortDescription}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[11px] text-slate-300">
                <span className="px-2 py-0.5 rounded-full bg-brand-900/60 border border-brand-700/60">
                  3 Levels of Care
                </span>
                <span className="px-2 py-0.5 rounded-full bg-brand-900/60 border border-brand-700/60">
                  Crisis Bridge
                </span>
              </div>
              <button
                onClick={() => onSelectService(iopService.id)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <span>Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured: Parenting Enhancement Program */}
      {parentingService && (
        <section className="px-4 mt-4">
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-3">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-0.5">
                  The T.Y.B. Method
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                  The Parenting Enhancement Program
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                  Proven techniques from Dr. Alan Kazdin to eliminate screaming matches, handle defiance, and build lasting positive habits.
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-amber-500/20 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                Includes WhatsApp Parent Support
              </span>
              <button
                onClick={() => onSelectService(parentingService.id)}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4-Step Clinical Journey (From Website) */}
      <section className="px-4 mt-6">
        <div className="mb-3">
          <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Evidence-Based Care
          </span>
          <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
            Our 4-Step Journey to Growth
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            A structured, clinical pathway designed for your individual or family needs.
          </p>
        </div>

        <div className="space-y-2.5">
          {TREATMENT_JOURNEY.map((step) => (
            <div 
              key={step.step}
              className="p-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl flex items-start space-x-3 shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400 flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modalities Preview Grid */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
              Clinical Services
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              9 Specialized Treatment Tracks
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {SERVICES_DATA.slice(0, 4).map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-amber-400/50 cursor-pointer active:scale-98 transition-all flex items-center justify-between"
            >
              <div className="flex-1 pr-2">
                <div className="flex items-center space-x-1.5 mb-1">
                  <span className="px-2 py-0.2 text-[9px] font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {service.category}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                    {service.duration}
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {service.shortDescription}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Patient Survey / Proof Bar */}
      <section className="px-4 mt-6">
        <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center space-x-2 text-amber-400 mb-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold">90%+ Would Recommend</span>
          </div>
          <p className="font-serif italic text-xs text-slate-200 leading-relaxed">
            &ldquo;In a recent survey of our patients, over 90% would recommend our practice to a friend.&rdquo;
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Dr. Thomas Gross &bull; Brooklyn Practice
            </span>
            <button
              onClick={() => onNavigate('testimonials')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              Read Testimonials &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="px-4 mt-6">
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-sm">Need Guidance Today?</h3>
            <p className="text-xs text-slate-900 font-medium mt-0.5">
              Call {CLINIC_INFO.phoneDisplay}
            </p>
          </div>
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="px-3.5 py-2 bg-slate-950 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Call Now</span>
          </a>
        </div>
      </section>

    </div>
  );
};
