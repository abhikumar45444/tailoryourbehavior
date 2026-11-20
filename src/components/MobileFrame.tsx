import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Moon, Sun, Wifi, Battery } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export type DeviceMode = 'iphone' | 'android' | 'responsive';
export type DeviceScale = 'compact' | 'normal';

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, darkMode, onToggleDarkMode }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('iphone');
  const [scale, setScale] = useState<DeviceScale>('normal');
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

  // Sleek, compact dimensions that fit on 100% zoom screens
  const frameDimensions = scale === 'compact'
    ? 'sm:max-w-[315px] sm:h-[min(590px,calc(100vh-4rem))]'
    : 'sm:max-w-[345px] sm:h-[min(660px,calc(100vh-4.2rem))]';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    } flex flex-col items-center justify-center p-0 sm:py-2 sm:px-3`}>
      
      {/* Top Device Bar (Simulator Controls) */}
      <aside 
        aria-label="Simulator Controls" 
        className="w-full max-w-[345px] hidden sm:flex items-center justify-between mb-2 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs"
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

        {/* Zoom & Theme Controls */}
        <div className="flex items-center space-x-1 border-l border-slate-200 dark:border-slate-800 pl-1.5 ml-1">
          {deviceMode !== 'responsive' && (
            <button
              onClick={() => setScale(scale === 'normal' ? 'compact' : 'normal')}
              className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Size (Compact / Normal)"
            >
              {scale === 'compact' ? 'Size: Sm' : 'Size: Md'}
            </button>
          )}

          <button
            onClick={onToggleDarkMode}
            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-slate-700" />}
          </button>
        </div>
      </aside>

      {/* Frame Container */}
      <div className={`w-full transition-all duration-300 flex justify-center ${
        deviceMode === 'responsive' 
          ? 'max-w-md w-full h-screen sm:h-[min(700px,calc(100vh-4rem))]' 
          : deviceMode === 'iphone'
            ? `${frameDimensions} sm:rounded-[42px] sm:p-2 sm:bg-slate-900 sm:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] sm:border-[4px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700/60`
            : `${frameDimensions} sm:rounded-[36px] sm:p-2 sm:bg-slate-900 sm:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] sm:border-[3.5px] sm:border-slate-700 sm:ring-1 sm:ring-slate-600/40`
      }`}>
        
        {/* Device screen inner */}
        <div className={`w-full h-full flex flex-col overflow-hidden relative ${
          deviceMode !== 'responsive'
            ? 'sm:rounded-[34px] sm:bg-slate-900'
            : 'bg-white dark:bg-slate-900 sm:rounded-2xl sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:shadow-lg'
        }`}>

          {/* Mobile Status Bar */}
          <div className="bg-slate-950 text-white px-4 pt-1.5 pb-1 flex items-center justify-between text-xs select-none z-40">
            <span className="font-semibold tracking-tight text-[10px]">{currentTime}</span>

            {/* Dynamic Island / Cutout for iPhone */}
            {deviceMode === 'iphone' && (
              <div className="hidden sm:flex items-center justify-center space-x-1.5 w-20 h-4 bg-black rounded-full shadow-inner border border-slate-800/60">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-1 h-1 rounded-full bg-amber-500/80" />
              </div>
            )}

            {/* Galaxy punch hole */}
            {deviceMode === 'android' && (
              <div className="hidden sm:block w-2.5 h-2.5 rounded-full bg-black border border-slate-800 mx-auto" />
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
            <div className="hidden sm:flex items-center justify-center py-1 bg-white dark:bg-slate-950">
              <div className="w-28 h-1 bg-slate-400/60 dark:bg-slate-600 rounded-full" />
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
