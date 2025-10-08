import React, { useState } from 'react';
import { ChevronLeft, Search, Thermometer, Zap, Droplets, Cctv, HeartPulse, CloudSun, Eye } from 'lucide-react';
import { useLanguage } from '../App';
import { useMQTT } from '../contexts/MQTTContext';

const deviceNameKeys: { [key: string]: string } = {
    'Air Conditioner': 'airConditioner', 'Light Bulbs': 'lightBulbs',
    'Humidifier': 'humidifier', 'Security Cam': 'securityCam',
    'Health Monitor': 'healthMonitor', 'Environment': 'environment',
    'Motion Sensor': 'motionSensor',
};
const roomNameKeys: { [key: string]: string } = {
    livingRoom: 'livingRoom', bedroom: 'bedroom', kitchen: 'kitchen',
    garage: 'garage', bathroom: 'bathroom', office: 'office',
};


const AllDevicesScreen: React.FC<{ onBack: () => void; onNavigateToDevice: (deviceName: string) => void; }> = ({ onBack, onNavigateToDevice }) => {
    const { t } = useLanguage();
    const { sensorData } = useMQTT();
    const [searchTerm, setSearchTerm] = useState('');

    const lightBulbsOnCount = [
        sensorData.output2State,
        sensorData.output3State,
        sensorData.output4State,
        sensorData.output5State,
        sensorData.output6State
    ].filter(Boolean).length;

    const allDevicesData = {
        livingRoom: [
            { name: 'Air Conditioner', icon: <Thermometer size={20} className="text-blue-500" />, status: sensorData.output1State ? `${t('on')} - ${sensorData.temperature ?? '--'}°C` : t('off') },
            { name: 'Light Bulbs', icon: <Zap size={20} className="text-yellow-500" />, status: t('onCount', { onCount: lightBulbsOnCount, totalCount: 5 }) },
            { name: 'Health Monitor', icon: <HeartPulse size={20} className="text-red-500" />, status: 'Monitoring' },
            { name: 'Environment', icon: <CloudSun size={20} className="text-sky-500" />, status: `AQI: ${sensorData.aqi ?? '--'}` },
            { name: 'Motion Sensor', icon: <Eye size={20} className="text-gray-500" />, status: sensorData.motionDetected ? t('motionDetected') : t('allClear') },
        ],
        kitchen: [
            { name: 'Humidifier', icon: <Droplets size={20} className="text-cyan-500" />, status: t('on') },
        ],
        garage: [
            { name: 'Security Cam', icon: <Cctv size={20} className="text-red-500" />, status: 'Recording' },
        ],
        bedroom: [],
        bathroom: [],
        office: [],
    };


    const filteredDevices = Object.entries(allDevicesData)
        .map(([roomKey, devices]) => {
            const filtered = devices.filter(device =>
                t(deviceNameKeys[device.name] || device.name).toLowerCase().includes(searchTerm.toLowerCase())
            );
            return [roomKey, filtered] as [string, typeof devices];
        })
        .filter(([, devices]) => devices.length > 0);

    return (
        <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800">
            <header className="flex items-center p-6 pt-12">
                <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 mx-auto">All Devices</h1>
                <div className="w-12 h-12"></div> {/* Spacer */}
            </header>

            <div className="px-6 mb-4">
                <div className="relative">
                    <Search size={20} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 rtl:left-auto rtl:right-4" />
                    <input
                        type="text"
                        placeholder="Search devices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#FFFEF5] border border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-full py-3 ps-12 pe-4 outline-none transition-shadow"
                    />
                </div>
            </div>

            <main className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                {filteredDevices.length > 0 ? (
                    filteredDevices.map(([roomKey, devices]) => (
                        <div key={roomKey}>
                            <h2 className="font-bold text-gray-600 mb-2">{t(roomNameKeys[roomKey] || roomKey)}</h2>
                            <div className="space-y-3">
                                {devices.map(device => (
                                    <button 
                                        key={device.name} 
                                        onClick={() => onNavigateToDevice(device.name)}
                                        className="w-full flex items-center p-4 bg-[#FFFEF5] rounded-2xl shadow-sm text-left"
                                    >
                                        <div className="p-3 bg-[#F5F3E5] rounded-full me-4">
                                            {device.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">{t(deviceNameKeys[device.name] || device.name)}</p>
                                            <p className="text-sm text-gray-500">{device.status}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 mt-12">
                        <p>No devices found</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AllDevicesScreen;
