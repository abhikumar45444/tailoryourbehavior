import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Moon, Sun, Wifi, Battery, Maximize2 } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export type DeviceMode = 'iphone' | 'android' | 'responsive';

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, darkMode, onToggleDarkMode }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('iphone');
  const [currentTime, setCurrentTime] = useState<string>('9:41');
  const [zoomMode, setZoomMode] = useState<'fit' | '100%'>('fit');
  const [scale, setScale] = useState<number>(1);

  // Time updater
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

  // Dynamic Auto-fit scaling to prevent vertical overflow and match "i want it to look like this"
  useEffect(() => {
    const calculateScale = () => {
      if (deviceMode === 'responsive' || zoomMode === '100%') {
        setScale(1);
        return;
      }
      // Phone frame standard height is 840px
      // Available height = window.innerHeight - (top bar + padding ≈ 60px)
      const availableHeight = window.innerHeight - 60;
      if (availableHeight < 840) {
        const factor = Math.max(0.45, Math.min(1, availableHeight / 840));
        setScale(factor);
      } else {
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [deviceMode, zoomMode]);

  return (
    <div className={`h-screen w-screen overflow-hidden transition-colors duration-200 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    } flex flex-col items-center justify-between p-2 sm:p-2.5 select-none`}>
      
      {/* Top Device Bar (Simulator Controls) */}
      <aside aria-label="Simulator Controls" className="w-full max-w-md hidden sm:flex items-center justify-between px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs z-30">
        <div className="flex items-center space-x-1">
          <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1 text-[11px]">Preview:</span>
          <button
            onClick={() => setDeviceMode('iphone')}
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 transition-all text-xs ${
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
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 transition-all text-xs ${
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
            className={`px-2 py-0.5 rounded-lg flex items-center space-x-1 transition-all text-xs ${
              deviceMode === 'responsive'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Native</span>
          </button>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Zoom toggle between auto-fit and 100% */}
          {deviceMode !== 'responsive' && (
            <button
              onClick={() => setZoomMode(zoomMode === 'fit' ? '100%' : 'fit')}
              className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-700"
              title="Toggle Auto-Fit / 100% Zoom"
            >
              {zoomMode === 'fit' ? `${Math.round(scale * 100)}% (Fit)` : '100%'}
            </button>
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

      {/* Main View Area: Scaled Wrapper Container */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden my-auto">
        {deviceMode === 'responsive' ? (
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {children}
            </div>
          </div>
        ) : (
          <div 
            style={{
              width: 400 * scale,
              height: 840 * scale,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'width 0.2s ease, height 0.2s ease'
            }}
          >
            {/* Phone Bezel Container */}
            <div 
              style={{
                width: 400,
                height: 840,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              }}
              className={`transition-all duration-200 flex-shrink-0 ${
                deviceMode === 'iphone'
                  ? 'rounded-[50px] p-3 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-[5px] border-slate-800 ring-1 ring-slate-700/50'
                  : 'rounded-[42px] p-2.5 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-[4px] border-slate-700 ring-1 ring-slate-600/40'
              }`}
            >
              
              {/* Inner Screen */}
              <div className="w-full h-full flex flex-col overflow-hidden relative rounded-[38px] bg-white dark:bg-slate-900 shadow-inner">
                
                {/* Mobile Status Bar */}
                <div className="bg-slate-950 text-white px-5 pt-2 pb-1 flex items-center justify-between text-xs select-none z-50 flex-shrink-0">
                  <span className="font-semibold tracking-tight text-[11px]">{currentTime}</span>

                  {/* Dynamic Island for iPhone */}
                  {deviceMode === 'iphone' && (
                    <div className="flex items-center justify-center space-x-1.5 w-24 h-5 bg-black rounded-full shadow-inner border border-slate-800/60">
                      <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                    </div>
                  )}

                  {/* Galaxy Camera punch */}
                  {deviceMode === 'android' && (
                    <div className="w-3 h-3 rounded-full bg-black border border-slate-800" />
                  )}

                  <div className="flex items-center space-x-1.5 text-slate-300">
                    <span className="text-[10px] font-bold tracking-tighter">5G</span>
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>

                {/* Viewport Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative bg-white dark:bg-slate-900">
                  {children}
                </div>

                {/* iPhone Home Indicator Bar */}
                {deviceMode === 'iphone' && (
                  <div className="flex items-center justify-center py-1 bg-white dark:bg-slate-950 flex-shrink-0">
                    <div className="w-32 h-1 bg-slate-400/60 dark:bg-slate-600 rounded-full" />
                  </div>
                )}

              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
