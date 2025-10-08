import React, { useState } from 'react';
import { ChevronLeft, Settings, Power, Volume2, VolumeX, ArrowLeftRight, Youtube, ChevronUp, ChevronDown, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useLanguage } from '../../App';

const SmartTVScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [isOn, setIsOn] = useState(true);
  const [volume, setVolume] = useState(45);
  const [source, setSource] = useState('HDMI 1');

  const sources = [
      { id: 'HDMI 1', name: 'HDMI 1', icon: <ArrowLeftRight size={20} /> },
      { id: 'YouTube', name: 'YouTube', icon: <Youtube size={20} /> },
      { id: 'Netflix', name: 'Netflix', icon: <svg role="img" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M10.595 14.834l.004-.009.027.051c.013.025.027.05.04.074l.01.018.016.029c.01.017.02.034.03.05l.004.007.012.02c.004.006.008.012.012.018l.002.003c.01.015.02.03.03.045l.004.006.01.015c.003.004.005.008.008.012l.002.002.01.012c.002.003.004.006.006.009l.002.002c.01.01.02.02.03.03l.003.003c.006.006.012.012.018.018l.003.003.027.026.006.005.01.01c.002.002.003.003.005.005l.002.002.01.008c.003.003.007.006.01.008l.004.003.01.008.003.002.01.007c.003.002.007.004.01.006L12 19.17l5.405-9.673V19.17h2.133V4.83h-2.133l-5.414 9.83-.004.008-.027-.05c-.013-.026-.027-.05-.04-.075l-.01-.018-.016-.029c-.01-.017-.02-.034-.03-.05l-.004-.007-.012-.02c-.004-.006-.008-.012-.012-.018l-.002-.003c-.01-.015-.02-.03-.03-.045l-.004-.006-.01-.015c-.003-.004-.005-.008-.008-.012l-.002-.002-.01-.012c-.002-.003-.004-.006-.006-.009l-.002-.002c-.01-.01-.02-.02-.03-.03l-.003-.003c-.006-.006-.012-.012-.018-.018l-.003-.003-.027-.026-.006-.005-.01-.01c-.002-.002-.003-.003-.005-.005l-.002-.002-.01-.008a.72.72 0 0 0-.01-.008l-.004-.003-.01-.008-.003-.002-.01-.007a.69.69 0 0 0-.01-.006L6.595 4.83v14.34H4.462V4.83H2.33V2.697h19.34V4.83h-2.133v14.34Z"/></svg> },
  ];

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{t('smartTV')}</h1>
        <button className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
          <Settings size={24} className="text-gray-800" />
        </button>
      </header>
      
      <main className="flex-1 flex flex-col justify-center items-center my-4">
        <div className={`w-full aspect-video bg-[#EAE8D9] rounded-2xl flex items-center justify-center transition-colors ${isOn ? 'bg-gray-800' : 'bg-[#EAE8D9]'}`}>
          {isOn && source && <span className="text-white text-lg font-semibold">{source}</span>}
        </div>
      </main>

      <div className="bg-[#FFFEF5] p-4 rounded-[32px] shadow-lg space-y-4">
        <div className="flex justify-between items-center px-2">
            <div>
                <p className="text-sm text-gray-500">{t('status')}</p>
                <p className="font-bold text-lg">{isOn ? t('on') : t('off')}</p>
            </div>
            <button
                onClick={() => setIsOn(!isOn)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isOn ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-[#EAE8D9] text-gray-600'}`}
                aria-label={isOn ? `Turn off ${t('smartTV')}` : `Turn on ${t('smartTV')}`}
            >
                <Power size={28} />
            </button>
        </div>

        <div>
            <label htmlFor="volume-slider" className="font-semibold px-2">{t('volume')}</label>
            <div className="flex items-center space-x-3 mt-1">
                <VolumeX size={20} className="text-gray-400" />
                <input
                    id="volume-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    disabled={!isOn}
                    className="w-full h-2 bg-[#EAE8D9] rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
                />
                <Volume2 size={20} className="text-gray-400" />
            </div>
        </div>

        <div>
          <h3 className="font-semibold px-2">{t('source')}</h3>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {sources.map(s => (
              <button 
                key={s.id}
                onClick={() => setSource(s.id)}
                disabled={!isOn}
                className={`flex items-center justify-center space-x-2 p-3 rounded-2xl transition-colors text-sm font-semibold ${source === s.id ? 'bg-blue-600 text-white' : 'bg-[#EAE8D9] text-gray-700'} disabled:opacity-50`}
              >
                {s.icon}
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center items-center pt-2">
            <div className="grid grid-cols-3 gap-2">
                <div></div>
                <button disabled={!isOn} className="w-12 h-12 bg-[#EAE8D9] rounded-full flex justify-center items-center disabled:opacity-50"><ChevronUp size={24} /></button>
                <div></div>
                <button disabled={!isOn} className="w-12 h-12 bg-[#EAE8D9] rounded-full flex justify-center items-center disabled:opacity-50"><ChevronLeftIcon size={24} /></button>
                <button disabled={!isOn} className="w-12 h-12 bg-gray-700 text-white rounded-full flex justify-center items-center font-bold text-sm disabled:opacity-50">OK</button>
                <button disabled={!isOn} className="w-12 h-12 bg-[#EAE8D9] rounded-full flex justify-center items-center disabled:opacity-50"><ChevronRightIcon size={24} /></button>
                <div></div>
                <button disabled={!isOn} className="w-12 h-12 bg-[#EAE8D9] rounded-full flex justify-center items-center disabled:opacity-50"><ChevronDown size={24} /></button>
                <div></div>
            </div>
        </div>
      </div>
      
      <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2"></div>
    </div>
  );
};

export default SmartTVScreen;
