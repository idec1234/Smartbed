import React from 'react';
import { useLanguage } from '../App';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <div className="h-full w-full bg-cover bg-center text-white flex flex-col" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 flex flex-col flex-grow justify-between p-8">
        <div className="pt-32 text-center">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">{t('splashTitle')}</h1>
        </div>

        <div className="flex items-center justify-center pb-16">
            <button
              onClick={onStart}
              className="bg-white/95 text-black text-lg font-bold py-4 px-20 rounded-full shadow-2xl backdrop-blur-sm hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300 ease-in-out transform hover:scale-105"
              aria-label={t('start')}
            >
                {t('start')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;