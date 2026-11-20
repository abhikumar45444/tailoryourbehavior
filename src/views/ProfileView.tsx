import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Briefcase, 
  ShieldCheck, 
  Phone, 
  Mail, 
  FileDown, 
  Check, 
  CheckCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CLINIC_INFO, DOCTOR_CREDENTIALS } from '../data/websiteContent';

interface ProfileViewProps {
  onBookConsultation: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onBookConsultation }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'credentials' | 'mentors' | 'research'>('bio');

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 dark:text-slate-100 pb-16">
      
      {/* Hero Doctor Header */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-brand-950 text-white px-5 pt-6 pb-6 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-amber-600 shadow-xl mb-3">
            <img 
              src={CLINIC_INFO.doctorPhoto} 
              alt={CLINIC_INFO.doctor} 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white shadow-xs">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {CLINIC_INFO.doctor}
          </h1>
          <p className="text-xs text-amber-400 font-semibold mt-0.5">
            Clinical Psychologist &bull; Author &bull; Educator
          </p>
          <p className="text-[11px] text-slate-300 max-w-xs mt-1">
            Over 17 years in behavioral health specializing in defiant youth, emotional regulation, and parenting enhancement.
          </p>

          <div className="flex items-center space-x-2 mt-4">
            <button
              onClick={onBookConsultation}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book with Dr. Gross</span>
            </button>
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl border border-slate-700 flex items-center justify-center"
              title="Call"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CLINIC_INFO.email}`}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl border border-slate-700 flex items-center justify-center"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Profile Subnav Tabs */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex space-x-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'bio', label: 'Biography' },
          { id: 'credentials', label: 'Curriculum Vitae' },
          { id: 'mentors', label: 'Master Trainers' },
          { id: 'research', label: 'Published Study' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Content */}
      <div className="p-4 space-y-4">

        {/* TAB: BIOGRAPHY */}
        {activeTab === 'bio' && (
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl">
              <span className="font-serif italic text-amber-900 dark:text-amber-300 text-xs sm:text-sm block">
                &ldquo;Therapy is about understanding the whole life, not just one part of it. That is why you must read, look at the skies, sing, dance, write poems, and suffer, throughout the lifespan. Every person can be taught to tap into their greatness.&rdquo;
              </span>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                About Dr. Thomas Gross, Ph.D.
              </h3>
              <p>
                Dr. Thomas Gross has been in the field of behavioral health for over <strong>17 years</strong> and has expertise working with anxiety, depression, behavior modification, frustration tolerance, anger management, and parenting enhancement across behaviorally challenged parents, children, teens, and adults.
              </p>
              <p>
                Having received an <strong>Excellence in Teaching Award in 2014</strong>, his passion to assist teenagers became more deeply rooted. He is the author of the research study <em>&ldquo;Influence Of Perceived Parenting Styles On Alcohol Consumption & Academic Achievement Among Jewish Youth,&rdquo;</em> and developed the &ldquo;T.Y.B.&rdquo; method to guide struggling families navigate through developmental turbulence.
              </p>
              <p>
                Dr. Gross was invited to join <strong>The PSI CHI honor society</strong> for psychologists in 2015. He received his doctorate in Clinical Psychology from Walden University in Nov. 2021 and trained under top pioneers in several therapeutic modalities, gaining extensive insight into evidence-based therapy practices.
              </p>
              <p>
                Dr. Gross has been requested by several local schools within the community to educate children, teachers, and parents on substance abuse prevention, suicidal ideation indicators, and adolescent behavior modification. As a mental health resource to EMS, schools, and parents via his parenting WhatsApp groups, he provides expert consultation for acute crises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="block text-xl font-bold text-amber-500 font-serif">17+</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Years in Practice</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="block text-xl font-bold text-amber-500 font-serif">90%+</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Patient Recommendation</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CURRICULUM VITAE */}
        {activeTab === 'credentials' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Education & Degrees
              </h3>
              <button
                onClick={handlePrintResume}
                className="px-2.5 py-1 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg flex items-center space-x-1"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Print / Save CV</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {DOCTOR_CREDENTIALS.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-start space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {edu.institution} &bull; <span className="font-semibold text-amber-600 dark:text-amber-400">{edu.year}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-sm text-slate-900 dark:text-white pt-2">
              Clinical Chronology & Experience
            </h3>
            <div className="space-y-2.5">
              {DOCTOR_CREDENTIALS.clinicalHistory.map((h, idx) => (
                <div 
                  key={idx}
                  className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-start space-x-2.5">
                    <Briefcase className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {h.role}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {h.organization}
                      </p>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                        {h.period}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-sm text-slate-900 dark:text-white pt-2">
              Licenses & Certifications
            </h3>
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              {DOCTOR_CREDENTIALS.certifications.map((c, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MASTER TRAINERS */}
        {activeTab === 'mentors' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Dr. Gross has completed specialized intensive clinical training under world leaders in psychological science:
            </p>

            <div className="space-y-2.5">
              {DOCTOR_CREDENTIALS.masterTrainers.map((m, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                        {m.modality}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5">
                        {m.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {m.institution}
                      </p>
                    </div>
                    <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: RESEARCH */}
        {activeTab === 'research' && (
          <div className="bg-white dark:bg-slate-800/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center space-x-2 text-amber-500">
              <BookOpen className="w-4 h-4" />
              <span className="font-bold text-[11px] uppercase tracking-wider">
                Doctoral Research & Publication
              </span>
            </div>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-snug">
              &ldquo;{DOCTOR_CREDENTIALS.research.title}&rdquo;
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              By {DOCTOR_CREDENTIALS.research.author} &bull; Walden University School of Clinical Psychology
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              {DOCTOR_CREDENTIALS.research.description}
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs space-y-1.5 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">Key Clinical Takeaways:</span>
              <div className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                <div>&bull; Authoritative parenting (high warmth + clear structure) dramatically decreases maladaptive adolescent coping.</div>
                <div>&bull; Clear antecedent behavioral engineering reduces oppositional resistance before defiance escalates.</div>
                <div>&bull; Provides evidence for the Tailor Your Behavior Method applied across community schools.</div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
