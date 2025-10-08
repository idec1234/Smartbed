import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../App';

interface UnderConstructionScreenProps {
  onBack: () => void;
  title: string;
}

const UnderConstructionScreen: React.FC<UnderConstructionScreenProps> = ({ onBack, title }) => {
  const { t } = useLanguage();
  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
      <header className="flex justify-between items-center">
        <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
            <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <div className="w-12 h-12"></div> {/* Spacer */}
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-semibold text-gray-700">{title} {t('screen')}</h2>
        <p className="text-gray-500 mt-2">{t('underConstruction')}</p>
      </main>
      <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mb-2"></div>
    </div>
  );
};

export default UnderConstructionScreen;
