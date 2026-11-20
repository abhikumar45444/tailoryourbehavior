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
  // Default to 90% zoom as requested
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);
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
    } flex flex-col items-center justify-center p-0 sm:py-2 sm:px-3`}>
      
      {/* Top Device Bar (Simulator Controls) */}
      <aside 
        aria-label="Simulator Controls" 
        className="w-full max-w-[390px] hidden sm:flex items-center justify-between mb-2 px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs select-none"
      >
        {/* Device Mode Switcher */}
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

        {/* Zoom Controls (90% active by default) & Theme Toggle */}
        <div className="flex items-center space-x-1.5 border-l border-slate-200 dark:border-slate-800 pl-2">
          {deviceMode !== 'responsive' && (
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg">
              {[0.85, 0.9, 1.0].map((z) => (
                <button
                  key={z}
                  onClick={() => setZoomLevel(z)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                    zoomLevel === z
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={`Set view scale to ${Math.round(z * 100)}%`}
                >
                  {Math.round(z * 100)}%
                </button>
              ))}
            </div>
          )}

          <button
            onClick={onToggleDarkMode}
            className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
        </div>
      </aside>

      {/* Frame Container with 90% zoom applied on desktop */}
      <div 
        className="w-full flex justify-center transition-all duration-300"
        style={{
          // Apply 90% zoom on desktop when not in native responsive mode
          zoom: deviceMode === 'responsive' ? 1.0 : zoomLevel
        }}
      >
        <div className={`w-full transition-all duration-300 ${
          deviceMode === 'responsive' 
            ? 'max-w-md w-full h-screen sm:h-[min(740px,calc(100vh-4rem))]' 
            : deviceMode === 'iphone'
              ? 'sm:max-w-[385px] sm:h-[min(810px,calc(100vh-3.5rem))] sm:rounded-[46px] sm:p-2.5 sm:bg-slate-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] sm:border-[4.5px] sm:border-slate-800 sm:ring-1 sm:ring-slate-700/60'
              : 'sm:max-w-[385px] sm:h-[min(810px,calc(100vh-3.5rem))] sm:rounded-[38px] sm:p-2 sm:bg-slate-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] sm:border-[4px] sm:border-slate-700 sm:ring-1 sm:ring-slate-600/40'
        }`}>
          
          {/* Device screen inner */}
          <div className={`w-full h-full flex flex-col overflow-hidden relative ${
            deviceMode !== 'responsive'
              ? 'sm:rounded-[38px] sm:bg-slate-900'
              : 'bg-white dark:bg-slate-900 sm:rounded-2xl sm:border sm:border-slate-200 sm:dark:border-slate-800 sm:shadow-lg'
          }`}>

            {/* Mobile Status Bar */}
            <div className="bg-slate-950 text-white px-5 pt-2 pb-1 flex items-center justify-between text-xs select-none z-40">
              <span className="font-semibold tracking-tight text-[11px]">{currentTime}</span>

              {/* Dynamic Island / Cutout for iPhone */}
              {deviceMode === 'iphone' && (
                <div className="hidden sm:flex items-center justify-center space-x-1.5 w-22 h-4.5 bg-black rounded-full shadow-inner border border-slate-800/60">
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
              <div className="hidden sm:flex items-center justify-center py-1.5 bg-white dark:bg-slate-950">
                <div className="w-32 h-1 bg-slate-400/60 dark:bg-slate-600 rounded-full" />
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
};
