import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Wind, 
  HeartHandshake, 
  ClipboardCheck, 
  Plus, 
  Trash2, 
  Sparkles, 
  Smile, 
  Frown, 
  CheckCircle2, 
  RotateCcw,
  Calendar,
  ChevronRight,
  TrendingUp,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThoughtRecord, PraiseEntry, SelfAssessmentResult } from '../types';

interface ToolsViewProps {
  onBookSession: () => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({ onBookSession }) => {
  const [activeTool, setActiveTool] = useState<'cbt' | 'breathing' | 'parenting' | 'assessment'>('cbt');

  // CBT State
  const [thoughtRecords, setThoughtRecords] = useState<ThoughtRecord[]>([]);
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [rationalReframe, setRationalReframe] = useState('');
  const [moodBefore, setMoodBefore] = useState(7);
  const [moodAfter, setMoodAfter] = useState(4);
  const [showThoughtForm, setShowThoughtForm] = useState(false);

  // Breathing State
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);
  const [cycleCompleted, setCycleCompleted] = useState(0);

  // Parenting State
  const [praiseLogs, setPraiseLogs] = useState<PraiseEntry[]>([]);
  const [childName, setChildName] = useState('');
  const [behaviorObserved, setBehaviorObserved] = useState('');
  const [praiseType, setPraiseType] = useState<'Enthusiastic' | 'Specific' | 'Touch/Warmth' | 'Immediate'>('Specific');
  const [showPraiseForm, setShowPraiseForm] = useState(false);

  // Assessment State
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>(new Array(8).fill(-1));
  const [assessmentResult, setAssessmentResult] = useState<SelfAssessmentResult | null>(null);

  // Load from local storage
  useEffect(() => {
    const savedThoughts = localStorage.getItem('tyb_thoughts');
    if (savedThoughts) {
      try { setThoughtRecords(JSON.parse(savedThoughts)); } catch {}
    }
    const savedPraise = localStorage.getItem('tyb_praise');
    if (savedPraise) {
      try { setPraiseLogs(JSON.parse(savedPraise)); } catch {}
    }
  }, []);

  // Breathing timer
  useEffect(() => {
    if (!isBreathingActive) return;
    
    let timer: any;
    let phaseTimer = 4;
    setBreathCount(4);
    setBreathPhase('Inhale');

    const interval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases: Inhale (4s) -> Hold (4s) -> Exhale (6s) -> Rest (2s)
        setBreathPhase((currentPhase) => {
          if (currentPhase === 'Inhale') {
            phaseTimer = 4;
            return 'Hold';
          } else if (currentPhase === 'Hold') {
            phaseTimer = 6;
            return 'Exhale';
          } else if (currentPhase === 'Exhale') {
            phaseTimer = 2;
            setCycleCompleted(c => c + 1);
            return 'Rest';
          } else {
            phaseTimer = 4;
            return 'Inhale';
          }
        });

        return phaseTimer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive]);

  const distortionOptions = [
    'All-or-Nothing Thinking',
    'Catastrophizing',
    'Mind Reading',
    'Emotional Reasoning',
    'Fortune Telling',
    'Should Statements',
    'Overgeneralization',
    'Mental Filtering'
  ];

  const handleSaveThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation || !automaticThought || !rationalReframe) return;

    const newRecord: ThoughtRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      situation,
      automaticThought,
      distortions: selectedDistortions,
      rationalReframe,
      moodBefore,
      moodAfter
    };

    const updated = [newRecord, ...thoughtRecords];
    setThoughtRecords(updated);
    localStorage.setItem('tyb_thoughts', JSON.stringify(updated));

    // Reset
    setSituation('');
    setAutomaticThought('');
    setSelectedDistortions([]);
    setRationalReframe('');
    setShowThoughtForm(false);

    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch {}
  };

  const handleSavePraise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !behaviorObserved) return;

    const newEntry: PraiseEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      childName,
      behaviorObserved,
      praiseType
    };

    const updated = [newEntry, ...praiseLogs];
    setPraiseLogs(updated);
    localStorage.setItem('tyb_praise', JSON.stringify(updated));

    setBehaviorObserved('');
    setShowPraiseForm(false);

    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch {}
  };

  const assessmentQuestions = [
    "Feeling nervous, anxious, or on edge over daily circumstances?",
    "Not being able to stop or control worrying thoughts?",
    "Worrying too much about different things (family, school, work)?",
    "Trouble relaxing or feeling restless/agitated?",
    "Becoming easily annoyed, frustrated, or irritable with family members?",
    "Feeling afraid, as if something awful might happen?",
    "Power struggles, screaming, or defiance when giving instructions to children/teens?",
    "Feeling overwhelmed by your emotions or disconnected from hope?"
  ];

  const handleAnswerAssessment = (qIdx: number, val: number) => {
    const nextAnswers = [...assessmentAnswers];
    nextAnswers[qIdx] = val;
    setAssessmentAnswers(nextAnswers);
  };

  const calculateAssessment = () => {
    const totalScore = assessmentAnswers.reduce((sum, val) => sum + (val >= 0 ? val : 0), 0);
    const maxScore = assessmentQuestions.length * 3;

    let level: 'Mild' | 'Moderate' | 'Significant' | 'Elevated' = 'Mild';
    let summary = '';
    let recommendations: string[] = [];

    if (totalScore <= 6) {
      level = 'Mild';
      summary = 'Your responses reflect mild everyday stress with good baseline resilience.';
      recommendations = [
        'Practice daily CBT cognitive defusion and paced breathing.',
        'Maintain healthy sleep hygiene and structured routines.',
        'Schedule a preventive check-in if symptoms fluctuate.'
      ];
    } else if (totalScore <= 12) {
      level = 'Moderate';
      summary = 'Your responses show moderate anxiety and emotional friction impacting daily life.';
      recommendations = [
        'Evidence-based CBT reframing can help break recurring worry loops.',
        'DBT distress tolerance skills can alleviate irritability.',
        'A consultation with Dr. Thomas Gross can provide targeted relief.'
      ];
    } else {
      level = 'Elevated';
      summary = 'Your responses indicate significant emotional turbulence and elevated distress.';
      recommendations = [
        'Early clinical intervention with Dr. Thomas Gross is strongly encouraged.',
        'Inquire about the Intensive Outpatient Program (IOP) or specialized individual therapy.',
        'Reach out to our Brooklyn clinic for a confidential evaluation.'
      ];
    }

    setAssessmentResult({
      score: totalScore,
      maxScore,
      level,
      summary,
      recommendations,
      completedAt: new Date().toLocaleDateString()
    });
  };

  return (
    <div className="flex-1 overflow-y-auto touch-scroll text-slate-800 bg-slate-50 pb-16">
      
      {/* Header (Clean Light Theme) */}
      <div className="bg-white text-slate-900 px-5 pt-4 pb-3 border-b border-slate-200">
        <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
          Evidence-Based Companion
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
          Behavioral Health Tools
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Interactive psychological exercises based on Beck Institute CBT and Kazdin Parent Management.
        </p>

        {/* Tool selector buttons */}
        <div className="grid grid-cols-4 gap-1.5 mt-3">
          {[
            { id: 'cbt', label: 'CBT Journal', icon: Brain },
            { id: 'breathing', label: 'Breathing', icon: Wind },
            { id: 'parenting', label: 'Praise Log', icon: HeartHandshake },
            { id: 'assessment', label: 'Screening', icon: ClipboardCheck },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTool === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTool(item.id as any)}
                className={`py-2 px-1 rounded-xl text-center flex flex-col items-center transition-all ${
                  active 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] leading-tight whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4">

        {/* TOOL 1: CBT THOUGHT RECORD */}
        {activeTool === 'cbt' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  CBT Thought Record
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Catch, check, and change unhelpful thinking traps.
                </p>
              </div>
              <button
                onClick={() => setShowThoughtForm(!showThoughtForm)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Log</span>
              </button>
            </div>

            {/* Thought Entry Form Modal/Drawer */}
            {showThoughtForm && (
              <form onSubmit={handleSaveThought} className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-amber-500/40 shadow-md space-y-3 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    1. The Triggering Situation
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Son refused to start homework; Shouted back"
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    2. Automatic Negative Thought
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 'I am failing as a parent and he will never succeed'"
                    value={automaticThought}
                    onChange={(e) => setAutomaticThought(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    3. Identify Cognitive Distortion
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {distortionOptions.map((dist) => {
                      const selected = selectedDistortions.includes(dist);
                      return (
                        <button
                          key={dist}
                          type="button"
                          onClick={() => {
                            if (selected) {
                              setSelectedDistortions(selectedDistortions.filter(d => d !== dist));
                            } else {
                              setSelectedDistortions([...selectedDistortions, dist]);
                            }
                          }}
                          className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                            selected
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {dist}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    4. Balanced Rational Reframe
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. 'He is having a hard evening. One bad day does not define his future or my parenting. I will use the Kazdin calm praise approach tomorrow.'"
                    value={rationalReframe}
                    onChange={(e) => setRationalReframe(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Distress Before (1-10): {moodBefore}
                    </label>
                    <input 
                      type="range" min="1" max="10" 
                      value={moodBefore} 
                      onChange={(e) => setMoodBefore(Number(e.target.value))}
                      className="w-full accent-amber-500" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Distress After (1-10): {moodAfter}
                    </label>
                    <input 
                      type="range" min="1" max="10" 
                      value={moodAfter} 
                      onChange={(e) => setMoodAfter(Number(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowThoughtForm(false)}
                    className="py-2.5 px-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-sm"
                  >
                    Save to Journal
                  </button>
                </div>
              </form>
            )}

            {/* List of saved records */}
            <div className="space-y-3">
              {thoughtRecords.length === 0 ? (
                <div className="text-center py-8 px-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <Brain className="w-10 h-10 text-amber-500/50 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No Thought Records Yet</p>
                  <p className="mt-1">Tap &ldquo;New Log&rdquo; above to reframe an automatic negative thought.</p>
                </div>
              ) : (
                thoughtRecords.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{item.date}</span>
                      <div className="flex items-center space-x-2 font-medium">
                        <span className="text-rose-500">Before: {item.moodBefore}/10</span>
                        <span>&rarr;</span>
                        <span className="text-emerald-500 font-bold">After: {item.moodAfter}/10</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Trigger</span>
                      <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{item.situation}</p>
                    </div>

                    <div className="p-2 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200/50 dark:border-rose-900/40 text-xs">
                      <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 block">Automatic Thought:</span>
                      <p className="italic text-rose-900 dark:text-rose-200 mt-0.5">&ldquo;{item.automaticThought}&rdquo;</p>
                    </div>

                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200/50 dark:border-emerald-900/40 text-xs">
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 block">Rational Reframe:</span>
                      <p className="text-emerald-900 dark:text-emerald-200 mt-0.5">{item.rationalReframe}</p>
                    </div>

                    {item.distortions.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.distortions.map((d, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-[9px] text-slate-600 dark:text-slate-300 font-semibold">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TOOL 2: DBT PACED BREATHING & GROUNDING */}
        {activeTool === 'breathing' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                  DBT TIPP Skill
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                  Paced Calming Breath
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Activates the parasympathetic nervous system to de-escalate acute anxiety.
                </p>
              </div>

              {/* Animated Breath Guide Visual */}
              <div className="py-6 flex flex-col items-center justify-center">
                <div className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  isBreathingActive 
                    ? breathPhase === 'Inhale' 
                      ? 'scale-125 bg-amber-500/20 border-4 border-amber-400' 
                      : breathPhase === 'Hold' 
                        ? 'scale-125 bg-blue-500/20 border-4 border-blue-400' 
                        : 'scale-90 bg-emerald-500/20 border-4 border-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700'
                }`}>
                  <div className="text-center">
                    <span className="text-sm font-bold block text-slate-900 dark:text-white uppercase tracking-wider">
                      {isBreathingActive ? breathPhase : 'Ready'}
                    </span>
                    <span className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-400">
                      {isBreathingActive ? breathCount : '4-4-6'}
                    </span>
                  </div>
                </div>

                {isBreathingActive && (
                  <span className="text-xs text-slate-400 mt-4">
                    Cycles Completed: {cycleCompleted}
                  </span>
                )}
              </div>

              {/* Controls */}
              <div>
                <button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                    isBreathingActive
                      ? 'bg-rose-600 text-white hover:bg-rose-500'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  }`}
                >
                  {isBreathingActive ? 'Pause Exercise' : 'Start Paced Breathing'}
                </button>
              </div>
            </div>

            {/* DBT 5-4-3-2-1 Sensory Grounding Guide */}
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>5-4-3-2-1 Sensory Grounding Technique</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-2 bg-white dark:bg-slate-900/60 rounded-lg">
                  <strong>5 Things:</strong> Look around and acknowledge 5 things you can see.
                </div>
                <div className="p-2 bg-white dark:bg-slate-900/60 rounded-lg">
                  <strong>4 Things:</strong> Notice 4 things you can physically touch or feel.
                </div>
                <div className="p-2 bg-white dark:bg-slate-900/60 rounded-lg">
                  <strong>3 Things:</strong> Listen carefully for 3 distinct sounds.
                </div>
                <div className="p-2 bg-white dark:bg-slate-900/60 rounded-lg">
                  <strong>2 Things:</strong> Identify 2 smells in your environment.
                </div>
                <div className="p-2 bg-white dark:bg-slate-900/60 rounded-lg">
                  <strong>1 Thing:</strong> Notice 1 taste or focus on a positive thought.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TOOL 3: KAZDIN PARENTING PRAISE TRACKER */}
        {activeTool === 'parenting' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Parenting Praise Tracker
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Target Kazdin&apos;s 4:1 positive reinforcement ratio.
                </p>
              </div>
              <button
                onClick={() => setShowPraiseForm(!showPraiseForm)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Praise</span>
              </button>
            </div>

            {/* Praise Log Form */}
            {showPraiseForm && (
              <form onSubmit={handleSavePraise} className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-amber-500/40 shadow-md space-y-3 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Child&apos;s Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Specific Behavior Observed & Praised
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Put shoes away without arguing when asked"
                    value={behaviorObserved}
                    onChange={(e) => setBehaviorObserved(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kazdin Praise Method Used
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['Specific', 'Enthusiastic', 'Touch/Warmth', 'Immediate'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPraiseType(type)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          praiseType === type
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPraiseForm(false)}
                    className="py-2.5 px-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl shadow-sm"
                  >
                    Save Praise Entry
                  </button>
                </div>
              </form>
            )}

            {/* Praise Log List */}
            <div className="space-y-3">
              {praiseLogs.length === 0 ? (
                <div className="text-center py-8 px-4 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  <HeartHandshake className="w-10 h-10 text-amber-500/50 mx-auto mb-2" />
                  <p className="font-semibold text-slate-700 dark:text-slate-300">No Praise Logs Yet</p>
                  <p className="mt-1">Catch your child being good! Record a moment of praise above.</p>
                </div>
              ) : (
                praiseLogs.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{p.childName}</span>
                        <span className="px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold">
                          {p.praiseType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        &ldquo;{p.behaviorObserved}&rdquo;
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1">{p.date}</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TOOL 4: CLINICAL SELF-ASSESSMENT */}
        {activeTool === 'assessment' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Clinical Self-Screening
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Answer based on your experience over the past 2 weeks (0 = Not at all, 3 = Nearly every day).
              </p>
            </div>

            {assessmentResult ? (
              /* Assessment Results Card */
              <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-amber-500/40 shadow-md space-y-4 animate-scale-up">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    assessmentResult.level === 'Mild' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                      : assessmentResult.level === 'Moderate'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {assessmentResult.level} Distress Level ({assessmentResult.score}/{assessmentResult.maxScore})
                  </span>
                  <button
                    onClick={() => {
                      setAssessmentResult(null);
                      setAssessmentAnswers(new Array(8).fill(-1));
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {assessmentResult.summary}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Recommended Steps:
                  </span>
                  {assessmentResult.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onBookSession}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Discuss Results with Dr. Gross</span>
                </button>
              </div>
            ) : (
              /* Questions list */
              <div className="space-y-3">
                {assessmentQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {q}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-center pt-1">
                      {[
                        { label: '0 - Not at all', val: 0 },
                        { label: '1 - Several days', val: 1 },
                        { label: '2 - Over half', val: 2 },
                        { label: '3 - Every day', val: 3 },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => handleAnswerAssessment(idx, opt.val)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                            assessmentAnswers[idx] === opt.val
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  disabled={assessmentAnswers.includes(-1)}
                  onClick={calculateAssessment}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all shadow-md ${
                    assessmentAnswers.includes(-1)
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  }`}
                >
                  {assessmentAnswers.includes(-1) ? 'Please answer all 8 questions' : 'View Clinical Results'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
