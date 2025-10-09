
import React, { useState, useRef, useEffect } from 'react';
import DeviceCard from './DeviceCard';
import { Bell, Settings, ArrowRight, Thermometer, Droplets, Cctv, Leaf, Zap, HeartPulse, CloudSun, Eye } from 'lucide-react';
import { useLanguage } from '../App';
import { useMQTT } from '../contexts/MQTTContext';

interface HomeScreenProps {
  onNavigateToDevice: (deviceName: string) => void;
  onNavigateToAllDevices: () => void;
  onNavigateToSettings: () => void;
}

const RoomStatusCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="bg-[#FFFEF5] p-3 rounded-2xl flex items-center space-x-3 rtl:space-x-reverse shadow-sm">
        <div className="p-2 bg-[#F5F3E5] rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-bold text-sm text-gray-800">{value}</p>
        </div>
    </div>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToDevice, onNavigateToAllDevices, onNavigateToSettings }) => {
  const { t } = useLanguage();
  const { sensorData } = useMQTT();
  const roomsRaw = ['livingRoom', 'bedroom', 'kitchen', 'garage', 'bathroom', 'office'];
  const [activeRoom, setActiveRoom] = useState(roomsRaw[0]);
  const [isFading, setIsFading] = useState(false);
  const rooms = roomsRaw.map(r => t(r));
  const roomRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const enableScrolling = rooms.length > 4;
  
  const deviceNameKeys: { [key: string]: string } = {
      'Air Conditioner': 'airConditioner',
      'Light Bulbs': 'lightBulbs',
      'Humidifier': 'humidifier',
      'Security Cam': 'securityCam',
      'Health Monitor': 'healthMonitor',
      'Environment': 'environment',
      'Motion Sensor': 'motionSensor',
  }

  useEffect(() => {
    if (enableScrolling) {
      const activeRoomIndex = roomsRaw.findIndex(room => room === activeRoom);
      if (activeRoomIndex !== -1 && roomRefs.current[activeRoomIndex]) {
        roomRefs.current[activeRoomIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeRoom, roomsRaw, enableScrolling]);

  const handleNotImplemented = () => {
    alert('This feature is not yet implemented.');
  };

  const handleRoomChange = (roomKey: string) => {
    if (roomKey === activeRoom) return;

    setIsFading(true);
    setTimeout(() => {
      setActiveRoom(roomKey);
      setIsFading(false);
    }, 300);
  };

  const lightBulbsOnCount = [
    sensorData.output2State,
    sensorData.output3State,
    sensorData.output4State,
    sensorData.output5State,
    sensorData.output6State
  ].filter(Boolean).length;

  const devices: { [key: string]: any[] } = {
    'livingRoom': [
      { name: 'Air Conditioner', icon: <Thermometer size={24} className="text-blue-500" />, on: sensorData.output1State, action: () => onNavigateToDevice('Air Conditioner'), details: { temperature: sensorData.temperature, humidity: sensorData.humidity }, commandTopic: '/cmd/159753/esp32_2/output1' },
      { name: 'Light Bulbs', icon: <Zap size={24} className="text-yellow-500" />, on: sensorData.output2State, action: () => onNavigateToDevice('Light Bulbs'), details: { onCount: lightBulbsOnCount, totalCount: 5, color: '#FBBF24' }, commandTopic: '/cmd/159753/esp32_2/output2' },
      { name: 'Health Monitor', icon: <HeartPulse size={24} className="text-red-500" />, on: true, action: () => onNavigateToDevice('Health Monitor'), details: { heartRate: sensorData.heartRate, spo2: sensorData.spo2 } },
      { name: 'Environment', icon: <CloudSun size={24} className="text-sky-500" />, on: true, action: () => onNavigateToDevice('Environment'), details: { aqi: sensorData.aqi, soundLevel: sensorData.soundLevel } },
      { name: 'Motion Sensor', icon: <Eye size={24} className="text-gray-500" />, on: !!sensorData.motionDetected, action: () => onNavigateToDevice('Motion Sensor'), details: { motionDetected: sensorData.motionDetected } },
    ],
    'bedroom': [],
    'kitchen': [
      { name: 'Humidifier', icon: <Droplets size={24} className="text-cyan-500" />, count: t('on'), on: true, action: () => onNavigateToDevice('Humidifier') },
    ],
    'garage': [
      { name: 'Security Cam', icon: <Cctv size={24} className="text-red-500" />, count: 'Recording', on: true, action: () => onNavigateToDevice('Security Cam') },
    ],
    'bathroom': [],
    'office': [],
  };

  const activeDevices = devices[activeRoom] || [];
  const activeRoomName = t(activeRoom);

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800">
      {/* Header */}
      <header className="flex justify-between items-center p-6 pt-12">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://picsum.photos/seed/user-avatar/48/48" alt="User Avatar" className="w-12 h-12 rounded-full" />
            <div>
                <p className="text-gray-500 text-sm">{t('welcomeBack')}</p>
                <p className="font-bold text-lg text-gray-900">Andrew</p>
            </div>
        </div>
        <div className="flex items-center gap-x-3">
            <button onClick={handleNotImplemented} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                <Bell size={24} className="text-gray-800" />
            </button>
            <button onClick={onNavigateToSettings} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
                <Settings size={24} className="text-gray-800" />
            </button>
        </div>
      </header>

      {/* Rooms */}
      <div className={`px-6 mt-4 ${enableScrolling ? 'overflow-x-auto scrollbar-hide' : ''}`}>
        <div className="flex gap-x-3 whitespace-nowrap">
          {roomsRaw.map((roomKey, index) => (
            <button
              key={roomKey}
              // FIX: The ref callback function should not return a value. Encapsulating the assignment in curly braces ensures it returns void.
              ref={el => { roomRefs.current[index] = el; }}
              onClick={() => handleRoomChange(roomKey)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeRoom === roomKey ? 'bg-blue-600 text-white' : 'bg-[#FFFEF5] text-gray-600'}`}
            >
              {t(roomKey)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Room Status */}
       <div className={`px-6 mt-6 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
         <h3 className="font-bold text-gray-500 text-sm mb-2">Room Status</h3>
         <div className="grid grid-cols-3 gap-3">
            <RoomStatusCard icon={<Thermometer size={20} className="text-red-500"/>} label="Temperature" value={sensorData.temperature ? `${sensorData.temperature}°C` : '--'} />
            <RoomStatusCard icon={<Droplets size={20} className="text-blue-500"/>} label="Humidity" value={sensorData.humidity ? `${sensorData.humidity}%` : '--'} />
            <RoomStatusCard icon={<Leaf size={20} className="text-green-500"/>} label="Air Quality" value={sensorData.aqi ? `${sensorData.aqi}` : '--'} />
         </div>
      </div>


      {/* Devices Grid */}
      <main className={`flex-1 p-6 overflow-y-auto transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'} pb-28`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{activeRoomName}</h2>
          <button onClick={onNavigateToAllDevices} className="text-blue-600 font-semibold text-sm flex items-center">
            {t('viewAll')} <ArrowRight size={16} className="ms-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {activeDevices.length > 0 ? (
            activeDevices.map((device: any, index) => (
              <DeviceCard
                key={index}
                icon={device.icon}
                name={t(deviceNameKeys[device.name] || device.name)}
                originalName={device.name}
                on={device.on}
                onClick={device.action}
                count={device.count}
                details={device.details}
                commandTopic={device.commandTopic}
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 mt-8">
                <p>{t('noDevices')}</p>
                <p className="text-sm">{t('addDevicePrompt')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
