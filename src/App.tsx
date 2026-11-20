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
  
  // Theme state: defaults to dark for a calming modern aesthetic, respects localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('tyb_theme');
    if (saved) return saved === 'dark';
    return false; // Default to clean medical light theme
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tyb_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tyb_theme', 'light');
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSelectServiceFromHome = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('services');
  };

  const handleBookServiceDirectly = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('booking');
  };

  return (
    <MobileFrame darkMode={darkMode} onToggleDarkMode={handleToggleTheme}>
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
        
        {/* Mobile App Header */}
        <Header 
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenBooking={() => setCurrentTab('booking')}
          onOpenAbout={() => setCurrentTab('profile')}
        />

        {/* View Switcher Container */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
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

        {/* Bottom Tab Bar */}
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
