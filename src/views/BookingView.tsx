import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  CalendarCheck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLINIC_INFO, SERVICES_DATA } from '../data/websiteContent';
import { BookingRequest } from '../types';

interface BookingViewProps {
  initialServiceId?: string | null;
  onClearInitialService?: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ 
  initialServiceId, 
  onClearInitialService 
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'new' | 'my-bookings'>('new');
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || SERVICES_DATA[0].id);
  const [sessionType, setSessionType] = useState<'in-person' | 'telehealth' | 'phone'>('telehealth');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isYouthOrTeen, setIsYouthOrTeen] = useState<boolean>(false);
  
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);
  const [savedBookings, setSavedBookings] = useState<BookingRequest[]>([]);

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
      if (onClearInitialService) onClearInitialService();
    }
  }, [initialServiceId]);

  useEffect(() => {
    const saved = localStorage.getItem('tyb_bookings');
    if (saved) {
      try {
        setSavedBookings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:15 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:45 PM', '06:00 PM'
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    const chosenService = SERVICES_DATA.find(s => s.id === selectedServiceId);

    const newBooking: BookingRequest = {
      id: `TYB-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedServiceId,
      serviceName: chosenService ? chosenService.title : 'Therapy Consultation',
      sessionType,
      date: selectedDate,
      timeSlot: selectedTime,
      fullName,
      email,
      phone,
      notes,
      isYouthOrTeen,
      status: 'Pending Confirmation',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem('tyb_bookings', JSON.stringify(updated));
    setConfirmedBooking(newBooking);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const selectedServiceObj = SERVICES_DATA.find(s => s.id === selectedServiceId);

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 dark:text-slate-100 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 pt-5 pb-4 border-b border-slate-800">
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
          Confidential & Direct
        </span>
        <h1 className="font-serif text-2xl font-bold">
          Book Appointment
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Schedule your initial consultation or follow-up session with Dr. Thomas Gross, Ph.D.
        </p>

        {/* Sub-tab toggle */}
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => { setActiveSubTab('new'); setConfirmedBooking(null); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              activeSubTab === 'new'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            New Booking
          </button>
          <button
            onClick={() => setActiveSubTab('my-bookings')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeSubTab === 'my-bookings'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>My Bookings</span>
            {savedBookings.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-slate-900 text-amber-400 text-[10px] flex items-center justify-center font-bold">
                {savedBookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        
        {/* SUBTAB: MY BOOKINGS */}
        {activeSubTab === 'my-bookings' && (
          <div className="space-y-3">
            {savedBookings.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                <CalendarCheck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 dark:text-white text-sm">No Bookings Yet</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  When you schedule an appointment with Dr. Gross, your confirmation and details will be saved here.
                </p>
                <button
                  onClick={() => setActiveSubTab('new')}
                  className="mt-4 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-sm"
                >
                  Schedule an Appointment
                </button>
              </div>
            ) : (
              savedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                        {b.status}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                        {b.serviceName}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Ref #{b.id}
                      </span>
                    </div>
                    <span className="text-xs font-semibold capitalize px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      {b.sessionType}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center space-x-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{b.timeSlot}</span>
                    </div>
                  </div>

                  {b.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 p-2 rounded-lg italic">
                      &ldquo;{b.notes}&rdquo;
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">
                      Patient: {b.fullName}
                    </span>
                    <a
                      href={`tel:${CLINIC_INFO.phone}`}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
                    >
                      Call Clinic &rarr;
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SUBTAB: NEW BOOKING */}
        {activeSubTab === 'new' && (
          <div>
            {confirmedBooking ? (
              /* Confirmation Screen */
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-amber-500/30 shadow-md text-center space-y-4 animate-scale-up">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
                    Booking Request Received
                  </span>
                  <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mt-2">
                    Thank You, {confirmedBooking.fullName.split(' ')[0]}!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    Your consultation request has been routed directly to Dr. Thomas Gross&apos;s Brooklyn clinic.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-900/80 rounded-xl text-left text-xs space-y-2 border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Reference:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{confirmedBooking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Service:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{confirmedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Format:</span>
                    <span className="capitalize font-semibold text-amber-600 dark:text-amber-400">{confirmedBooking.sessionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Date & Time:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Office Directly ({CLINIC_INFO.phone})</span>
                  </a>

                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setStep(1);
                    }}
                    className="w-full py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Schedule Another Session
                  </button>
                </div>
              </div>
            ) : (
              /* Step-by-Step Booking Wizard */
              <form onSubmit={handleCompleteBooking} className="space-y-4">
                
                {/* Step indicator */}
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Step {step} of 3
                  </span>
                  <div className="flex space-x-1.5">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-6 h-1.5 rounded-full transition-all ${
                          s === step ? 'bg-amber-500' : s < step ? 'bg-amber-300 dark:bg-amber-700' : 'bg-slate-200 dark:bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* STEP 1: Select Service & Format */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        1. Choose Modality / Service
                      </label>
                      <select
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} ({s.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedServiceObj && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                          {selectedServiceObj.subtitle}
                        </span>
                        <p className="line-clamp-2 text-[11px]">
                          {selectedServiceObj.shortDescription}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        2. Session Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSessionType('telehealth')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                            sessionType === 'telehealth'
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Video className="w-4 h-4 mb-1" />
                          <span className="text-[11px] leading-tight">Telehealth Video</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSessionType('in-person')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                            sessionType === 'in-person'
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <MapPin className="w-4 h-4 mb-1" />
                          <span className="text-[11px] leading-tight">Brooklyn Office</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSessionType('phone')}
                          className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all ${
                            sessionType === 'phone'
                              ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-sm'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Phone className="w-4 h-4 mb-1" />
                          <span className="text-[11px] leading-tight">Phone Consult</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md mt-4"
                    >
                      <span>Continue to Date & Time</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: Date & Time Picker */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Select Preferred Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                        Available Time Slots (EST)
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-1 text-center rounded-xl text-xs transition-all ${
                              selectedTime === time
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <span>Continue to Patient Info</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Patient Information Form */}
                {step === 3 && (
                  <div className="space-y-3 animate-fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rachel Cohen"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(917) 000-0000"
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="checkbox"
                        id="teenCheck"
                        checked={isYouthOrTeen}
                        onChange={(e) => setIsYouthOrTeen(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                      />
                      <label htmlFor="teenCheck" className="text-xs text-slate-600 dark:text-slate-300">
                        This session is for a teenager or minor child
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Brief Note / Primary Concern (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Briefly describe what challenges you or your child are experiencing..."
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="py-3 px-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-md"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Confirm & Submit Booking</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
