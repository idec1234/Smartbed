import React, { useState } from 'react';
import { ChevronLeft, Settings, Power, Droplets, Wind, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../../App';

const HumidifierScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();
    const [isOn, setIsOn] = useState(true);
    const [humidity, setHumidity] = useState(55);
    const [fanSpeed, setFanSpeed] = useState('medium'); // low, medium, high

    const handleHumidityChange = (delta: number) => {
        if (!isOn) return;
        setHumidity(prev => Math.max(30, Math.min(80, prev + delta)));
    };

    return (
        <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
            <header className="flex justify-between items-center">
                <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">{t('humidifier')}</h1>
                <button className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <Settings size={24} className="text-gray-800" />
                </button>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center my-4 space-y-8">
                <div className="relative w-36 h-64 bg-[#EAE8D9] rounded-full flex flex-col justify-end overflow-hidden shadow-inner">
                    <div 
                        className="w-full bg-blue-400 transition-all duration-500"
                        style={{ height: `${isOn ? humidity : 0}%` }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <Droplets size={48} className={`transition-colors ${isOn ? 'text-white/80' : 'text-gray-500'}`} />
                        <span className={`text-5xl font-bold mt-2 transition-colors ${isOn ? 'text-white' : 'text-gray-600'}`}>
                            {humidity}<span className="text-3xl">%</span>
                        </span>
                        <p className={`text-sm font-medium transition-colors ${isOn ? 'text-white/80' : 'text-gray-500'}`}>
                            {t('humidity')}
                        </p>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center space-x-8">
                     <button 
                        onClick={() => handleHumidityChange(-5)} 
                        disabled={!isOn || humidity <= 30}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FFFEF5] shadow-md disabled:opacity-50"
                        aria-label="Decrease humidity"
                    >
                        <Minus size={28} />
                    </button>
                     <button 
                        onClick={() => setIsOn(!isOn)}
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-lg
                            ${isOn ? 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-cyan-200/80' : 'bg-[#EAE8D9]'}`
                        }
                        aria-label={isOn ? "Turn off humidifier" : "Turn on humidifier"}
                        aria-pressed={isOn}
                    >
                        <Power size={36} className={isOn ? 'text-white' : 'text-gray-500'} />
                    </button>
                     <button 
                        onClick={() => handleHumidityChange(5)}
                        disabled={!isOn || humidity >= 80}
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FFFEF5] shadow-md disabled:opacity-50"
                        aria-label="Increase humidity"
                    >
                        <Plus size={28} />
                    </button>
                </div>
            </main>

            <div>
                <h3 className="font-semibold mb-2">{t('fanSpeed')}</h3>
                <div className="flex justify-between items-center bg-[#FFFEF5] p-1.5 rounded-full shadow-sm">
                    {['low', 'medium', 'high'].map(speed => (
                        <button 
                            key={speed}
                            onClick={() => setFanSpeed(speed)}
                            disabled={!isOn}
                            className={`w-1/3 py-2.5 rounded-full text-sm font-semibold transition-all ${fanSpeed === speed ? 'bg-white shadow text-blue-600' : 'text-gray-600'} disabled:opacity-50`}
                        >
                            {t(speed)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2"></div>
        </div>
    );
};

export default HumidifierScreen;
