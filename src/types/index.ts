export type NavTab = 'home' | 'services' | 'tools' | 'booking' | 'profile' | 'testimonials' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Evidence-Based' | 'Specialty Program' | 'Counseling';
  icon: string;
  heroImage: string;
  shortDescription: string;
  fullDescription: string[];
  keyBenefits: string[];
  techniques: string[];
  whoIsItFor: string[];
  duration?: string;
  format: string[];
}

export interface BookingRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  sessionType: 'in-person' | 'telehealth' | 'phone';
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  isYouthOrTeen: boolean;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed';
  createdAt: string;
}

export interface ThoughtRecord {
  id: string;
  date: string;
  situation: string;
  automaticThought: string;
  distortions: string[];
  rationalReframe: string;
  moodBefore: number; // 1-10
  moodAfter: number; // 1-10
}

export interface PraiseEntry {
  id: string;
  date: string;
  childName: string;
  behaviorObserved: string;
  praiseType: 'Enthusiastic' | 'Specific' | 'Touch/Warmth' | 'Immediate';
  notes?: string;
}

export interface SelfAssessmentResult {
  score: number;
  maxScore: number;
  level: 'Mild' | 'Moderate' | 'Significant' | 'Elevated';
  summary: string;
  recommendations: string[];
  completedAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  title: string;
  content: string;
  rating: number;
  tags: string[];
}
