import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const isMobileScreen = typeof window !== 'undefined' && (
    window.innerWidth < 640 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  );
  const [deviceMode] = useState<'iphone' | 'responsive'>(isMobileScreen ? 'responsive' : 'iphone');
  const [currentTime, setCurrentTime] = useState<string>('9:41');
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

  // Dynamic Auto-fit scaling to fit screen height comfortably
  useEffect(() => {
    const calculateScale = () => {
      if (deviceMode === 'responsive') {
        setScale(1);
        return;
      }
      const availableHeight = window.innerHeight - 32;
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
  }, [deviceMode]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 text-slate-800 flex flex-col items-center justify-center p-1 sm:p-2 select-none">
      
      {/* Main View Area: Scaled Wrapper Container */}
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden my-auto">
        {deviceMode === 'responsive' ? (
          <div className="w-full max-w-md h-full bg-white rounded-none sm:rounded-3xl border-0 sm:border sm:border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
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
              className="rounded-[50px] p-3 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border-[5px] border-slate-800 ring-1 ring-slate-700/50 flex-shrink-0 transition-all duration-200"
            >
              
              {/* Inner Screen */}
              <div className="w-full h-full flex flex-col overflow-hidden relative rounded-[38px] bg-white shadow-inner">
                
                {/* Mobile Status Bar (Clean Light Theme) */}
                <div className="bg-white text-slate-800 px-5 pt-2 pb-1 flex items-center justify-between text-xs select-none z-50 flex-shrink-0 border-b border-slate-100">
                  <span className="font-semibold tracking-tight text-[11px] text-slate-800">{currentTime}</span>

                  {/* Dynamic Island for iPhone */}
                  <div className="flex items-center justify-center space-x-1.5 w-24 h-5 bg-black rounded-full shadow-inner border border-slate-800/40">
                    <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  </div>

                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <span className="text-[10px] font-bold tracking-tighter">5G</span>
                    <Wifi className="w-3 h-3 text-slate-700" />
                    <Battery className="w-3.5 h-3.5 fill-current text-slate-700" />
                  </div>
                </div>

                {/* Viewport Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
                  {children}
                </div>

                {/* iPhone Home Indicator Bar */}
                <div className="flex items-center justify-center py-1.5 bg-white border-t border-slate-100 flex-shrink-0">
                  <div className="w-32 h-1 bg-slate-300 rounded-full" />
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};