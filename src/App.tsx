import React, { useState, useEffect } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { EmergencyModal } from './components/EmergencyModal';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { BookingView } from './views/BookingView';
import { ToolsView } from './views/ToolsView';
import { ProfileView } from './views/ProfileView';
import { TestimonialsView } from './views/TestimonialsView';
import { ContactView } from './views/ContactView';
import { NavTab } from './types';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Enforce clean clinical light theme only
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('tyb_theme', 'light');
  }, []);

  const handleSelectServiceFromHome = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('services');
  };

  const handleBookServiceDirectly = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('booking');
  };

  return (
    <MobileFrame>
      <div className="flex flex-col h-full bg-slate-50 text-slate-800 overflow-hidden relative">
        
        {/* Mobile App Header (Light theme) */}
        <Header 
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenAbout={() => setCurrentTab('profile')}
        />

        {/* View Switcher Container */}
        <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
          {currentTab === 'home' && (
            <HomeView 
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectService={handleSelectServiceFromHome}
            />
          )}

          {currentTab === 'services' && (
            <ServicesView 
              selectedServiceId={selectedServiceId}
              onClearSelectedService={() => setSelectedServiceId(null)}
              onBookService={handleBookServiceDirectly}
            />
          )}

          {currentTab === 'booking' && (
            <BookingView 
              initialServiceId={selectedServiceId}
              onClearInitialService={() => setSelectedServiceId(null)}
            />
          )}

          {currentTab === 'tools' && (
            <ToolsView 
              onBookSession={() => setCurrentTab('booking')}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView 
              onBookConsultation={() => setCurrentTab('booking')}
            />
          )}

          {currentTab === 'testimonials' && (
            <TestimonialsView />
          )}

          {currentTab === 'contact' && (
            <ContactView />
          )}
        </main>

        {/* Bottom Tab Bar (Clean light theme) */}
        <BottomNav 
          currentTab={currentTab} 
          onTabChange={(tab) => {
            setSelectedServiceId(null);
            setCurrentTab(tab);
          }} 
        />

        {/* 24/7 Crisis Modal */}
        <EmergencyModal 
          isOpen={isEmergencyOpen} 
          onClose={() => setIsEmergencyOpen(false)} 
        />

      </div>
    </MobileFrame>
  );
};

export default App;