import React, { useState } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/websiteContent';
import { Testimonial } from '../types';

export const TestimonialsView: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  
  // Submit state
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tags = ['All', 'Teen Counseling', 'Parenting', 'Anxiety', 'Couples Therapy'];

  const filtered = selectedTag === 'All'
    ? testimonials
    : testimonials.filter(t => t.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase())));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    const newRev: Testimonial = {
      id: Date.now().toString(),
      author,
      role: role || 'Client',
      title: title || 'Thank You Dr. Gross',
      content,
      rating: 5,
      tags: ['Client Review']
    };

    setTestimonials([newRev, ...testimonials]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitModal(false);
      setAuthor('');
      setRole('');
      setTitle('');
      setContent('');
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 bg-slate-50 pb-16">
      
      {/* Header (Clean Light Theme) */}
      <div className="bg-white text-slate-900 px-5 pt-4 pb-3 border-b border-slate-200">
        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
          Patient Experiences
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          What They Say
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          In a recent survey of our patients, over <strong>90%</strong> would recommend our practice to a friend.
        </p>

        {/* Tag pills */}
        <div className="flex space-x-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-3.5">
        
        {/* Submit Review Banner */}
        <div className="p-3.5 bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent dark:bg-amber-950/20 border border-amber-500/30 rounded-2xl flex items-center justify-between">
          <div>
            <span className="font-bold text-xs text-slate-900 dark:text-white block">
              Worked with Dr. Gross?
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Share your confidential feedback or story.
            </span>
          </div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-sm flex items-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Leave Review</span>
          </button>
        </div>

        {/* Testimonials Cards */}
        {filtered.map((t) => (
          <div
            key={t.id}
            className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Patient</span>
              </span>
            </div>

            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              &ldquo;{t.title}&rdquo;
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{t.author}</span>
                <span className="text-[11px] text-slate-400 block">{t.role}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {t.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-[9px] text-slate-600 dark:text-slate-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Submit Review Modal (Inside Phone Frame) */}
      {showSubmitModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in overflow-hidden">
          {/* Backdrop tap to dismiss inside phone */}
          <div 
            className="absolute inset-0 bg-transparent cursor-pointer"
            onClick={() => setShowSubmitModal(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-700 p-5 space-y-3.5 animate-slide-up max-h-[85%] overflow-y-auto">
            <div 
              onClick={() => setShowSubmitModal(false)}
              className="w-full flex justify-center -mt-2 pb-2 cursor-pointer"
            >
              <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>

            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white">
              Share Your Experience
            </h3>

            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">Review Submitted</h4>
                <p className="text-xs text-slate-500">Thank you for your valuable feedback!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Your Name / Initials</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Rachel K."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Context / Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Parent of Teenager"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Headline</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Outstanding Support & Practical Tools"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Your Review</label>
                  <textarea
                    rows={3}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe how Dr. Gross helped you or your family..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
                  />
                </div>
                <div className="flex space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="py-2.5 px-3 bg-slate-200 dark:bg-slate-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 font-bold text-slate-950 rounded-xl"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
