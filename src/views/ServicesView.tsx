import React, { useState } from 'react';
import { 
  SERVICES_DATA 
} from '../data/websiteContent';
import { ServiceItem } from '../types';
import { 
  Calendar, 
  ChevronRight, 
  X, 
  CheckCircle, 
  Clock, 
  Video, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Brain,
  Flame,
  ShieldAlert,
  HeartHandshake,
  User,
  Users,
  Home as HomeIcon,
  Compass
} from 'lucide-react';

interface ServicesViewProps {
  onBookService: (serviceId: string) => void;
  selectedServiceId?: string | null;
  onClearSelectedService?: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ 
  onBookService, 
  selectedServiceId: initialSelectedId,
  onClearSelectedService 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(() => {
    if (initialSelectedId) {
      return SERVICES_DATA.find(s => s.id === initialSelectedId) || null;
    }
    return null;
  });

  const categories = ['All', 'Evidence-Based', 'Specialty Program', 'Counseling'];

  const filteredServices = activeCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'User': return <User className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Home': return <HomeIcon className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 bg-slate-50 pb-16">
      
      {/* Header (Clean Light Theme) */}
      <div className="bg-white text-slate-900 px-5 pt-4 pb-3 border-b border-slate-200">
        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
          Clinical Modalities & Programs
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          Therapeutic Services
        </h1>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Dr. Thomas Gross utilizes empirically validated treatments tailored to children, adolescents, adults, and families.
        </p>

        {/* Category Pills */}
        <div className="flex space-x-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="p-4 space-y-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => setActiveModalService(service)}
            className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-amber-400/50 cursor-pointer active:scale-99 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  {getServiceIcon(service.icon)}
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.2 text-[9px] font-bold rounded-full bg-slate-100 text-slate-600">
                      {service.category}
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                    {service.title}
                  </h3>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-2" />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
              {service.shortDescription}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Brooklyn</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1">
                  <Video className="w-3 h-3 text-slate-400" />
                  <span>Telehealth</span>
                </span>
              </div>
              <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-0.5">
                <span>View Details</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal (Inside Phone Frame) */}
      {activeModalService && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in overflow-hidden">
          {/* Backdrop tap to dismiss inside phone */}
          <div 
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={() => {
              setActiveModalService(null);
              if (onClearSelectedService) onClearSelectedService();
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-700 max-h-[85%] flex flex-col overflow-hidden animate-slide-up">
            
            {/* Sheet Handle */}
            <div 
              onClick={() => {
                setActiveModalService(null);
                if (onClearSelectedService) onClearSelectedService();
              }}
              className="w-full flex justify-center pt-2.5 pb-1 bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 cursor-pointer"
            >
              <div className="w-10 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-brand-950 text-white px-5 py-4">
              <button
                onClick={() => {
                  setActiveModalService(null);
                  if (onClearSelectedService) onClearSelectedService();
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                  {activeModalService.category}
                </span>
                <span className="text-[11px] text-slate-300 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{activeModalService.duration}</span>
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {activeModalService.title}
              </h2>
              <p className="text-xs text-amber-400 font-medium mt-0.5">
                {activeModalService.subtitle}
              </p>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
              
              {/* Overview */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1.5">
                  Clinical Overview
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                  {activeModalService.fullDescription.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Treatment Goals & Outcomes</span>
                </h4>
                <div className="space-y-1.5">
                  {activeModalService.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Techniques Used */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1.5">
                  Evidence-Based Techniques
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalService.techniques.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-brand-50 text-brand-900 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Who Is It For */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-1.5">
                  Ideal Candidates
                </h4>
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {activeModalService.whoIsItFor.map((w, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5">
                      <span className="text-amber-500 font-bold">&bull;</span>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Available In:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  In-Person (Brooklyn)
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  Secure Video Telehealth
                </span>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-3">
              <button
                onClick={() => {
                  const serviceId = activeModalService.id;
                  setActiveModalService(null);
                  onBookService(serviceId);
                }}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Session for {activeModalService.title.split(' ')[0]}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
