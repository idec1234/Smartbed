import React from 'react';
import { ChevronLeft, Zap, Thermometer, Tv, Wifi } from 'lucide-react';
import { useLanguage } from '../App';

const weekData = [
  { day: 'Mon', usage: 8 },
  { day: 'Tue', usage: 12 },
  { day: 'Wed', usage: 10 },
  { day: 'Thu', usage: 15 },
  { day: 'Fri', usage: 14 },
  { day: 'Sat', usage: 18 },
  { day: 'Sun', usage: 16 },
];

const topDevices = [
    { name: 'airConditioner', icon: <Thermometer className="text-blue-500" />, usage: '4.8 kWh' },
    { name: 'smartTV', icon: <Tv className="text-purple-500" />, usage: '2.1 kWh' },
    { name: 'wifiRouter', icon: <Wifi className="text-green-500" />, usage: '1.5 kWh' },
];

const EnergyScreen: React.FC = () => {
  const { t } = useLanguage();
  const maxUsage = Math.max(...weekData.map(d => d.usage));

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800 p-6 pt-12">
      <header className="flex justify-center items-center relative">
        <h1 className="text-xl font-bold text-gray-900">{t('energyUsage')}</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto pt-8 pb-28 space-y-6 scrollbar-hide">
        {/* Today's Usage */}
        <div className="bg-[#FFFEF5] p-6 rounded-3xl shadow-sm text-center">
            <p className="text-sm text-gray-500">Today's Consumption</p>
            <div className="flex justify-center items-baseline my-2">
                <span className="text-5xl font-bold text-gray-900">12.5</span>
                <span className="text-lg font-semibold text-gray-600 ms-1">{t('kWh')}</span>
            </div>
            <div className="flex justify-center items-center text-sm text-green-600">
                <Zap size={16} className="me-1 fill-current" />
                <span>2% less than yesterday</span>
            </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-[#FFFEF5] p-6 rounded-3xl shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Weekly Usage</h2>
            <div className="flex justify-between items-end h-32">
                {weekData.map(item => (
                    <div key={item.day} className="flex flex-col items-center w-1/7">
                        <div 
                            className="w-5 bg-blue-500 rounded-t-lg transition-all duration-500"
                            style={{ height: `${(item.usage / maxUsage) * 100}%` }}
                        />
                        <span className="text-xs font-semibold text-gray-500 mt-2">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Top Devices */}
        <div>
            <h2 className="font-bold text-gray-900 mb-2 px-2">Top Devices</h2>
            <div className="space-y-3">
                {topDevices.map(device => (
                     <div key={device.name} className="bg-[#FFFEF5] p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="p-3 bg-[#F5F3E5] rounded-full">
                                {device.icon}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{t(device.name)}</p>
                            </div>
                        </div>
                        <p className="font-bold text-gray-900">{device.usage}</p>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default EnergyScreen;