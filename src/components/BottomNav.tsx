import React from 'react';
import { Home, Layers, Sparkles, Calendar, UserCheck } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'services' as NavTab, label: 'Services', icon: Layers },
    { id: 'tools' as NavTab, label: 'Tools', icon: Sparkles },
    { id: 'booking' as NavTab, label: 'Book', icon: Calendar },
    { id: 'profile' as NavTab, label: 'Dr. Gross', icon: UserCheck },
  ];

  return (
    <nav 
      className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-sm px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
      aria-label="Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                if ('vibrate' in navigator) {
                  try { navigator.vibrate(10); } catch {}
                }
              }}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-amber-600 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800 font-normal'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-amber-50 scale-105' : ''
                }`}>
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                </div>
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight leading-none">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-amber-500 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};