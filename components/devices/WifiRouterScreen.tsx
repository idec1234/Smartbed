import React from 'react';
import { ChevronLeft, Settings, Wifi, ArrowDown, ArrowUp, UsersRound, Signal, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../App';

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-[#FFFEF5] p-4 rounded-2xl shadow-sm flex items-center space-x-4">
    <div className="p-3 bg-[#F5F3E5] rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-bold text-lg text-gray-900">{value}</p>
    </div>
  </div>
);

const WifiRouterScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLanguage();

    const handleReboot = () => {
        if (confirm(t('confirmReboot'))) {
            alert(t('rebootingRouter'));
        }
    };

    return (
        <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
            <header className="flex justify-between items-center">
                <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">{t('wifiRouter')}</h1>
                <button className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <Settings size={24} className="text-gray-800" />
                </button>
            </header>

            <main className="flex-1 flex flex-col justify-center items-center my-4 space-y-8">
                <div className="relative">
                    <div className="w-48 h-48 bg-[#EAE8D9] rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 bg-[#FFFEF5] rounded-full shadow-inner flex items-center justify-center">
                           <Wifi size={64} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                    <InfoCard 
                        icon={<ArrowDown size={24} className="text-green-500" />}
                        label={t('download')}
                        value="350 Mbps"
                    />
                    <InfoCard 
                        icon={<ArrowUp size={24} className="text-blue-500" />}
                        label={t('upload')}
                        value="50 Mbps"
                    />
                    <InfoCard 
                        icon={<UsersRound size={24} className="text-purple-500" />}
                        label={t('devices')}
                        value="8"
                    />
                    <InfoCard 
                        icon={<Signal size={24} className="text-orange-500" />}
                        label={t('signal')}
                        value={t('excellent')}
                    />
                </div>
            </main>
            
            <button 
                onClick={handleReboot}
                className="w-full flex items-center justify-center space-x-3 py-4 rounded-full font-bold text-red-600 bg-[#FFFEF5] shadow-md hover:bg-red-50 transition-colors"
            >
                <RefreshCw size={20}/>
                <span>{t('rebootRouter')}</span>
            </button>

            <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto mt-auto mb-2"></div>
        </div>
    );
};

export default WifiRouterScreen;
