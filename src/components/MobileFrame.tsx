import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Moon, Sun, Wifi, Battery } from 'lucide-react';

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
    } flex flex-col items-center justify-center p-2 sm:py-4 select-none`}>
      
      {/* Top Device Bar (Simulator Controls) */}
      <aside 
        aria-label="Simulator Controls" 
        className="w-[320px] max-w-full flex items-center justify-between mb-2.5 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs"
      >
        {/* Device Switcher */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setDeviceMode('iphone')}
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 text-[11px] transition-all ${
              deviceMode === 'iphone'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>iPhone</span>
          </button>
          <button
            onClick={() => setDeviceMode('android')}
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 text-[11px] transition-all ${
              deviceMode === 'android'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>Galaxy</span>
          </button>
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 text-[11px] transition-all ${
              deviceMode === 'responsive'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>Native</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center border-l border-slate-200 dark:border-slate-800 pl-2">
          <button
            onClick={onToggleDarkMode}
            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
        </div>
      </aside>

      {/* Frame Container - Slim, elegant smartphone aspect ratio */}
      <div className={`transition-all duration-300 flex justify-center ${
        deviceMode === 'responsive'
          ? 'w-full max-w-sm h-screen sm:h-[680px]'
          : deviceMode === 'iphone'
            ? 'w-[320px] h-[670px] max-h-[86vh] rounded-[44px] p-2 bg-slate-900 shadow-[0_22px_55px_-12px_rgba(0,0,0,0.5)] border-[3.5px] border-slate-800 ring-1 ring-slate-700/60'
            : 'w-[320px] h-[670px] max-h-[86vh] rounded-[38px] p-2 bg-slate-900 shadow-[0_22px_55px_-12px_rgba(0,0,0,0.5)] border-[3px] border-slate-700 ring-1 ring-slate-600/40'
      }`}>
        
        {/* Device screen inner */}
        <div className={`w-full h-full flex flex-col overflow-hidden relative ${
          deviceMode !== 'responsive'
            ? 'rounded-[36px] bg-slate-900'
            : 'bg-white dark:bg-slate-900 sm:rounded-2xl sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:shadow-lg'
        }`}>

          {/* Slim Mobile Status Bar */}
          <div className="bg-slate-950 text-white px-4 pt-1.5 pb-1 flex items-center justify-between text-xs select-none z-40">
            <span className="font-semibold tracking-tight text-[10px]">{currentTime}</span>

            {/* Dynamic Island / Cutout for iPhone */}
            {deviceMode === 'iphone' && (
              <div className="flex items-center justify-center space-x-1.5 w-18 h-4 bg-black rounded-full shadow-inner border border-slate-800/80">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-1 h-1 rounded-full bg-amber-500/80" />
              </div>
            )}

            {/* Galaxy punch hole */}
            {deviceMode === 'android' && (
              <div className="w-2.5 h-2.5 rounded-full bg-black border border-slate-800 mx-auto" />
            )}

            <div className="flex items-center space-x-1 text-slate-300">
              <span className="text-[9px] font-bold tracking-tighter">5G</span>
              <Wifi className="w-2.5 h-2.5" />
              <Battery className="w-3 h-3 fill-current" />
            </div>
          </div>

          {/* Main App Content Viewport */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-white dark:bg-slate-900">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          {deviceMode === 'iphone' && (
            <div className="flex items-center justify-center py-1 bg-white dark:bg-slate-950">
              <div className="w-24 h-1 bg-slate-400/50 dark:bg-slate-600 rounded-full" />
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
