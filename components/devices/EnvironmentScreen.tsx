import React from 'react';
import { ChevronLeft, CloudSun, Rss, Volume2 } from 'lucide-react';
import { useLanguage } from '../../App';
import { useMQTT } from '../../contexts/MQTTContext';

const DataDisplay: React.FC<{ icon: React.ReactNode, label: string, value: number | null, unit: string }> = ({ icon, label, value, unit }) => (
    <div className="bg-[#FFFEF5] p-6 rounded-3xl shadow-sm w-full text-center">
        <div className="p-4 bg-[#F5F3E5] rounded-full inline-block">
            {icon}
        </div>
        <p className="text-lg text-gray-600 mt-4">{label}</p>
        <p className="text-6xl font-bold text-gray-900 mt-1">
            {value ?? '--'}
            <span className="text-2xl font-semibold text-gray-500 ms-2">{unit}</span>
        </p>
    </div>
);


const EnvironmentScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();
    const { sensorData } = useMQTT();

    return (
        <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
            <header className="flex items-center">
                <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 mx-auto">{t('environment')}</h1>
                <div className="w-12 h-12"></div> {/* Spacer */}
            </header>

            <main className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
                <DataDisplay
                    icon={<Rss size={32} className="text-green-500" />}
                    label={t('aqi')}
                    value={sensorData.aqi}
                    unit=""
                />
                <DataDisplay
                    icon={<Volume2 size={32} className="text-blue-500" />}
                    label={t('soundLevel')}
                    value={sensorData.soundLevel}
                    unit={t('db')}
                />
            </main>

            <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2"></div>
        </div>
    );
};

export default EnvironmentScreen;
