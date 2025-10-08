import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Settings, Power, Minus, Plus, Snowflake, Sun as SunIcon, Wind } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { getNotificationSettings } from '../../utils/storage';
import { useLanguage } from '../../App';

type Mode = 'cool' | 'heat' | 'fan';

const ModeButton: React.FC<{ icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void, disabled?: boolean }> = ({ icon, label, isActive, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex flex-col items-center justify-center space-y-2 w-20 h-20 rounded-2xl transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-[#FFFEF5] text-gray-600'} disabled:opacity-50 disabled:bg-[#EAE8D9]`}
  >
    {icon}
    <span className="text-xs font-semibold">{label}</span>
  </button>
);


const AirConditionerScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();
    const [temperature, setTemperature] = useState(21);
    const [mode, setMode] = useState<Mode>('cool');
    const [fanSpeed, setFanSpeed] = useState(50);
    const [isOn, setIsOn] = useState(true);

    const { showNotification } = useNotification();
    const prevTemperatureRef = useRef(temperature);

    useEffect(() => {
        const settings = getNotificationSettings();
        const acSettings = settings['Air Conditioner']?.threshold;

        if (acSettings && acSettings.enabled && isOn) {
            const prevTemp = prevTemperatureRef.current;
            const threshold = acSettings.value;
            const direction = acSettings.direction;

            let triggered = false;
            if (direction === 'above' && prevTemp < threshold && temperature >= threshold) {
                triggered = true;
            } else if (direction === 'below' && prevTemp > threshold && temperature <= threshold) {
                triggered = true;
            }

            if (triggered) {
                showNotification(t('acThreshold', {
                    temperature: temperature,
                    direction: t(direction),
                    threshold: threshold
                }));
            }
        }
        prevTemperatureRef.current = temperature;
    }, [temperature, isOn, showNotification, t]);
    
    const handleTempChange = (delta: number) => {
        if (!isOn) return;
        setTemperature(prev => Math.max(16, Math.min(30, prev + delta)));
    };

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
            <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{t('airConditioner')}</h1>
        <button className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
            <Settings size={24} className="text-gray-800" />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center my-4">
        <div className={`relative w-48 h-80 bg-[#EAE8D9] rounded-[48px] flex items-center justify-center transition-all duration-300 overflow-hidden ${!isOn ? 'opacity-60' : ''}`}>
          {/* Background fill */}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-[48px] transition-all duration-500" style={{ height: `${isOn ? ((temperature - 16) / 14) * 100 : 0}%` }} />
          
          <div className="relative z-10 text-center">
            <span className={`text-7xl font-bold transition-colors ${isOn ? 'text-white' : 'text-gray-500'}`}>
                {temperature}°
            </span>
            <p className={`text-sm font-semibold mt-1 transition-colors ${isOn ? 'text-white/80' : 'text-gray-400'}`}>
                {t('cooling')}
            </p>
          </div>
          
          <button onClick={() => handleTempChange(1)} disabled={!isOn || temperature >= 30} className="absolute top-4 p-3 text-gray-400 disabled:opacity-30 z-20">
              <Plus size={28} className={isOn ? 'text-white/80' : 'text-gray-500'}/>
          </button>
           <button onClick={() => handleTempChange(-1)} disabled={!isOn || temperature <= 16} className="absolute bottom-4 p-3 text-gray-400 disabled:opacity-30 z-20">
              <Minus size={28} className={isOn ? 'text-white/80' : 'text-gray-500'}/>
          </button>
        </div>
      </main>

      <div className="bg-[#FFFEF5] p-4 rounded-[32px] shadow-lg space-y-4">
        <div className="flex items-center justify-around">
          <ModeButton icon={<Snowflake size={24} />} label="Cool" isActive={mode === 'cool'} onClick={() => setMode('cool')} disabled={!isOn} />
          <ModeButton icon={<SunIcon size={24} />} label="Heat" isActive={mode === 'heat'} onClick={() => setMode('heat')} disabled={!isOn} />
          <ModeButton icon={<Wind size={24} />} label="Fan" isActive={mode === 'fan'} onClick={() => setMode('fan')} disabled={!isOn} />
        </div>
        
        <div>
            <label htmlFor="fan-speed-slider" className="font-semibold px-2">{t('fanSpeed')}</label>
            <div className="flex items-center space-x-3 mt-1">
                <Wind size={20} className="text-gray-400" />
                <input
                    id="fan-speed-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={fanSpeed}
                    onChange={(e) => setFanSpeed(Number(e.target.value))}
                    disabled={!isOn}
                    className="w-full h-2 bg-[#EAE8D9] rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
                />
                <span className="text-sm font-bold w-10 text-end">{fanSpeed}%</span>
            </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 px-2">
            <div>
                <p className="font-semibold text-lg">{t('power')}</p>
                <p className="text-sm text-gray-500">{isOn ? t('on') : t('off')}</p>
            </div>
            <button 
                onClick={() => setIsOn(!isOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all shadow-lg
                    ${isOn ? 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-cyan-200/80' : 'bg-[#EAE8D9]'}`
                }
                aria-label={isOn ? "Turn off air conditioner" : "Turn on air conditioner"}
            >
                <Power size={24} className={isOn ? 'text-white' : 'text-gray-500'} />
            </button>
        </div>
      </div>
      
      <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2 pt-4"></div>
    </div>
  );
};

export default AirConditionerScreen;
