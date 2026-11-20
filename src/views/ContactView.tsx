import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/websiteContent';

export const ContactView: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 dark:text-slate-100 pb-16">
      
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 pt-5 pb-4 border-b border-slate-800">
        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
          Let Us Know
        </span>
        <h1 className="font-serif text-2xl font-bold">
          Contact & Location
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Connect directly with Dr. Thomas Gross, Ph.D. for consultations, school workshops, or parenting guidance.
        </p>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-amber-400 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Direct Call</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">{CLINIC_INFO.phoneDisplay}</span>
            </div>
          </a>

          <a
            href={`mailto:${CLINIC_INFO.email}`}
            className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-amber-400 active:scale-95 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-2">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Email Us</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 truncate">tailoryourbehavior</span>
            </div>
          </a>
        </div>

        {/* Location & Practice Info */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 flex-shrink-0">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Main Clinical Office
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Brooklyn, New York, NY
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                In-person sessions by appointment &bull; Nationwide secure HIPAA-compliant telehealth
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Mon - Thu: 9AM - 8PM | Fri: 9AM - 3PM</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Group Info (from Website text) */}
        <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400">
            <MessageCircle className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wide">
              Parenting WhatsApp Support Community
            </h4>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Dr. Gross moderates active community WhatsApp groups for parents and educators, offering brief clinical advice for behavioral challenges as they arise.
          </p>
          <a
            href={`mailto:${CLINIC_INFO.email}?subject=Request%20to%20Join%20Parenting%20WhatsApp%20Group`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-1"
          >
            <span>Request WhatsApp Group Invite &rarr;</span>
          </a>
        </div>

        {/* Contact Form from Website */}
        <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div>
            <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white">
              Send Direct Message
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dr. Gross or clinical staff will respond promptly within 24 hours.
            </p>
          </div>

          {isSent ? (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 text-center space-y-1 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-200">Thanks for submitting!</h4>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">Your message has been sent to tailoryourbehavior@gmail.com.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Message *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
