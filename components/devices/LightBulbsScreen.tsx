import React, { useState } from 'react';
import { ChevronLeft, Settings, Power, Sun } from 'lucide-react';
import { useLanguage } from '../../App';
import { useMQTT } from '../../contexts/MQTTContext';

const LightToggle: React.FC<{ label: string; on: boolean; onToggle: () => void; }> = ({ label, on, onToggle }) => (
    <div className="flex justify-between items-center bg-[#FFFEF5] p-3 rounded-xl">
        <span className="font-semibold">{label}</span>
        <div
            onClick={onToggle}
            role="switch"
            aria-checked={on}
            className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${on ? 'bg-blue-600' : 'bg-[#EAE8D9]'}`}
        >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${on ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
        </div>
    </div>
);


const LightBulbsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const { sensorData, sendCommand } = useMQTT();
  const [brightness, setBrightness] = useState(75);

  const lights = [
    { id: 2, name: "Light 1 (Main)", state: sensorData.output2State },
    { id: 3, name: "Light 2", state: sensorData.output3State },
    { id: 4, name: "Light 3", state: sensorData.output4State },
    { id: 5, name: "Light 4", state: sensorData.output5State },
    { id: 6, name: "Light 5", state: sensorData.output6State },
  ];

  const handleToggle = (id: number, currentState: boolean) => {
      sendCommand(`/cmd/159753/esp32_2/output${id}`, currentState ? '0' : '1');
  };
  
  const isAnyLightOn = lights.some(l => l.state);

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{t('lightBulbs')}</h1>
        <button className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
          <Settings size={24} className="text-gray-800" />
        </button>
      </header>

      <main className="flex-1 flex flex-col justify-around items-center my-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
            <div 
                className="absolute inset-0 rounded-full opacity-50 blur-2xl bg-yellow-400" 
                style={{ opacity: isAnyLightOn ? 0.5 : 0, transition: 'opacity 0.3s' }}
            />
            <Sun 
                size={120} 
                strokeWidth={1} 
                className="transition-colors duration-300"
                style={{ color: isAnyLightOn ? '#FBBF24' : '#DCDAD0' }}
            />
        </div>

        <div className="w-full space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{t('power')} (Main)</span>
             <div
                onClick={() => handleToggle(2, lights[0].state)}
                role="switch"
                aria-checked={lights[0].state}
                className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${lights[0].state ? 'bg-blue-600' : 'bg-[#EAE8D9]'}`}
            >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${lights[0].state ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
            </div>
          </div>

          <div>
            <label htmlFor="brightness-slider" className="font-semibold">{t('brightness')} (Main)</label>
            <div className="flex items-center space-x-3 mt-2">
                <Sun size={20} className="text-gray-400" />
                <input
                    id="brightness-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    disabled={!lights[0].state}
                    className="w-full h-2 bg-[#EAE8D9] rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
                />
                <span className="text-sm font-bold w-10 text-end">{brightness}%</span>
            </div>
          </div>
        </div>
      </main>

       <div className="space-y-2">
          <h3 className="font-semibold mb-2">Individual Lights</h3>
          {lights.map(light => (
            <LightToggle
                key={light.id}
                label={light.name}
                on={light.state}
                onToggle={() => handleToggle(light.id, light.state)}
            />
          ))}
      </div>

      <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2 pt-4"></div>
    </div>
  );
};

export default LightBulbsScreen;