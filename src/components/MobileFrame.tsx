import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Moon, Sun, Wifi, Battery, Volume2 } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export type DeviceMode = 'iphone' | 'android' | 'responsive';

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, darkMode, onToggleDarkMode }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('iphone');
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    } flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 lg:p-8`}>
      
      {/* Top Device Bar (Simulator Controls) */}
      <aside aria-label="Simulator Controls" className="w-full max-w-md hidden sm:flex items-center justify-between mb-3 px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1">Preview:</span>
          <button
            onClick={() => setDeviceMode('iphone')}
            className={`px-2 py-1 rounded-lg flex items-center space-x-1 transition-all ${
              deviceMode === 'iphone'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone 15</span>
          </button>
          <button
            onClick={() => setDeviceMode('android')}
            className={`px-2 py-1 rounded-lg flex items-center space-x-1 transition-all ${
              deviceMode === 'android'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Galaxy S24</span>
          </button>
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`px-2 py-1 rounded-lg flex items-center space-x-1 transition-all ${
              deviceMode === 'responsive'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Native</span>
          </button>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
        </div>
      </aside>

      {/* Frame Container */}
      <div className={`w-full transition-all duration-300 ${
        deviceMode === 'responsive' 
          ? 'max-w-md w-full' 
          : deviceMode === 'iphone'
            ? 'sm:max-w-[400px] sm:h-[840px] sm:rounded-[50px] sm:p-3 sm:bg-slate-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:border-[5px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700/50'
            : 'sm:max-w-[400px] sm:h-[840px] sm:rounded-[42px] sm:p-2.5 sm:bg-slate-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] sm:border-[4px] sm:border-slate-700 sm:ring-1 sm:ring-slate-600/40'
      }`}>
        
        {/* Device screen inner */}
        <div className={`w-full h-full flex flex-col overflow-hidden relative ${
          deviceMode !== 'responsive'
            ? 'sm:rounded-[40px] sm:bg-slate-900'
            : 'bg-white dark:bg-slate-900 sm:rounded-3xl sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:shadow-xl'
        }`}>

          {/* Realistic Mobile Status Bar */}
          <div className="bg-slate-950 text-white px-5 pt-2 pb-1 flex items-center justify-between text-xs select-none z-50">
            <span className="font-semibold tracking-tight text-[11px]">{currentTime}</span>

            {/* Dynamic Island / Camera cutout for iPhone */}
            {deviceMode === 'iphone' && (
              <div className="hidden sm:flex items-center justify-center space-x-1.5 w-24 h-5 bg-black rounded-full shadow-inner border border-slate-800/60">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              </div>
            )}

            {/* Galaxy punch hole */}
            {deviceMode === 'android' && (
              <div className="hidden sm:block w-3 h-3 rounded-full bg-black border border-slate-800 mx-auto" />
            )}

            <div className="flex items-center space-x-1.5 text-slate-300">
              <span className="text-[10px] font-bold tracking-tighter">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>

          {/* Main App Content Viewport */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-white dark:bg-slate-900">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          {deviceMode === 'iphone' && (
            <div className="hidden sm:flex items-center justify-center py-1 bg-white dark:bg-slate-950">
              <div className="w-32 h-1 bg-slate-400/60 dark:bg-slate-600 rounded-full" />
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
