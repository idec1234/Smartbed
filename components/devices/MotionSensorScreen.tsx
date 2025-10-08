import React from 'react';
import { ChevronLeft, Eye, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../../App';
import { useMQTT } from '../../contexts/MQTTContext';

const MotionSensorScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();
    const { sensorData } = useMQTT();
    const motionDetected = sensorData.motionDetected;

    return (
        <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
            <header className="flex items-center">
                <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 mx-auto">{t('motionSensor')}</h1>
                <div className="w-12 h-12"></div> {/* Spacer */}
            </header>

            <main className="flex-1 flex flex-col justify-center items-center text-center">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-colors duration-300 ${motionDetected ? 'bg-red-100' : 'bg-green-100'}`}>
                     <div className={`w-36 h-36 rounded-full flex items-center justify-center transition-colors duration-300 ${motionDetected ? 'bg-red-200' : 'bg-green-200'}`}>
                        {motionDetected ? (
                            <ShieldAlert size={64} className="text-red-600" />
                        ) : (
                            <ShieldCheck size={64} className="text-green-600" />
                        )}
                    </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mt-8">
                    {motionDetected ? t('motionDetected') : t('allClear')}
                </h2>
                <p className="text-gray-500 mt-1">
                    {motionDetected ? 'Activity detected in the area.' : 'The area is secure.'}
                </p>
            </main>

            <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2"></div>
        </div>
    );
};

export default MotionSensorScreen;
