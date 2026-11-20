# Tailor Your Behavior — Mobile Application
### Professional Mobile App for [tailoryourbehavior.com](https://www.tailoryourbehavior.com/)
**Clinical Psychology & Behavioral Health Practice of Dr. Thomas Gross, Ph.D.**

---

## 🌟 Overview

This mobile application brings the full clinical presence, evidence-based services, and patient resources of **Tailor Your Behavior (Dr. Thomas Gross, Ph.D., Brooklyn, NY)** directly to iOS, Android, and mobile web devices.

Designed specifically with modern mobile UX standards, it features high-touch behavioral health tools, one-tap appointment booking, a 24/7 crisis response panel, interactive self-screening, and full service deep-dives.

---

## 📱 Feature Mapping to Website

| Website Feature / Page | Mobile App Implementation | Enhanced Mobile Capabilities |
| :--- | :--- | :--- |
| **Home Page** | `HomeView.tsx` | Daily CBT Mindset reflection, quick action grid, 4-step treatment journey, proof metrics (90%+ recommend). |
| **All 9 Clinical Services** | `ServicesView.tsx` | Filter by category (Evidence-Based, Specialty, Counseling), full clinical overviews, treatment goals, techniques, candidate criteria, and one-tap direct booking. |
| **Cognitive Behavioral Therapy (CBT)** | Service Card + `ToolsView.tsx` | Interactive **CBT Thought Journal** with cognitive distortion detection & rational reframing. |
| **Dialectical Behavior Therapy (DBT)** | Service Card + `ToolsView.tsx` | Interactive **DBT Paced Breathing visual guide (4-4-6)** + 5-4-3-2-1 Sensory Grounding tool. |
| **Teen & Young Adult IOP** | Highlighted Program Banner | Complete breakdown of 3 tiers of care (Intensive Outpatient, Hospitalization partnership, 30-day outpatient). |
| **Parenting Enhancement Program** | Specialty Program + Praise Tool | **Kazdin Parenting Praise Tracker** calculating positive reinforcement ratios (aiming for 4:1 ratio). |
| **Teen Counseling** | Dedicated Service Module | Specialized adolescent coaching for identity, school avoidance, and executive functioning. |
| **Couples & Family Therapy** | Modality Deep-Dives | Structural family and emotionally focused relationship repair frameworks. |
| **Book Now** | `BookingView.tsx` | 3-Step Interactive Booking Wizard (Service, Care Format [Telehealth / Brooklyn / Phone], Date/Time, Patient Info, ICS Calendar sync, LocalStorage "My Bookings" manager). |
| **About Dr. Thomas Gross** | `ProfileView.tsx` | 17+ years biography, Beck Institute / Charlie Swenson / Alan Kazdin master mentorships, doctoral research summary, printable Curriculum Vitae. |
| **Resume** | Interactive CV Drawer | Complete education, clinical chronology, NYS EMT & Red Cross certifications, and print/export feature. |
| **Testimonials** | `TestimonialsView.tsx` | Filterable client stories, verified patient badges, and "Leave a Review" interactive submission form. |
| **Contact / Let Us Know** | `ContactView.tsx` | Tap-to-Call (`917-843-4146`), Tap-to-Email, Brooklyn clinic hours, WhatsApp parenting community join request, interactive message form. |
| **Crisis & Emergency Support** | `EmergencyModal.tsx` | Immediate access to 988 Suicide & Crisis Lifeline, NYC Well, Crisis Text Line, and Dr. Gross triage. |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom medical theme (Deep Navy `#072749`, Amber `#f59e0b`, Slate)
- **Icons**: Lucide React
- **Mobile Native Shell**: Capacitor 7 (`@capacitor/core`, `@capacitor/cli`)
- **PWA & Offline Readiness**: Web App Manifest (`manifest.json`) + Apple Touch Icon + Mobile Viewport
- **Device Simulator**: Built-in interactive frame toggle for iPhone 15 Pro, Samsung Galaxy S24, or Full Native Mobile view.

---

## 🚀 How to Run the App

### 1. Development Mode (Interactive Mobile Simulator)
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. You can toggle between iPhone, Android, or Full Screen Native view, switch between Dark and Light mode, and test all interactive features.

### 2. Production Build
```bash
npm run build
```
Generates the optimized static distribution in the `dist/` directory.

### 3. Generate Native iOS & Android Apps (Capacitor)
```bash
# Add iOS project (requires macOS & Xcode)
npx cap add ios
npx cap open ios

# Add Android project (requires Android Studio)
npx cap add android
npx cap open android

# Sync web assets to native projects
npx cap sync
```

---

## 🔒 Privacy & Clinical Safety

- All thought records, praise entries, self-assessment results, and booking history are securely stored in the patient's local device storage (`localStorage`).
- Emergency modal includes prominent disclaimers and direct connections to 911, 988 Lifeline, and local emergency crisis resources.
