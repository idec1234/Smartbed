import React from 'react';
import { Power, Sun, Thermometer, Droplets, Eye, CloudSun, HeartPulse, Rss, Volume2 } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';
import { getNotificationSettings } from '../utils/storage';
import { useLanguage } from '../App';
import { useMQTT } from '../contexts/MQTTContext';

interface DeviceCardProps {
  icon: React.ReactNode;
  name: string;
  originalName: string;
  on: boolean;
  onClick?: () => void;
  count?: string;
  details?: any;
  commandTopic?: string;
}

const REDESIGNED_CARDS = ['Air Conditioner', 'Light Bulbs', 'Health Monitor', 'Environment', 'Motion Sensor'];

const DeviceCard: React.FC<DeviceCardProps> = ({ icon, name, originalName, count, on, details, onClick, commandTopic }) => {
  const { showNotification } = useNotification();
  const { t } = useLanguage();
  const { sendCommand } = useMQTT();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!commandTopic) return;
    
    const newIsOn = !on;
    sendCommand(commandTopic, newIsOn ? '1' : '0');

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    const settings = getNotificationSettings();
    if (settings[originalName]?.toggle?.enabled) {
      showNotification(t('deviceToggled', { deviceName: name, status: newIsOn ? t('on') : t('off') }));
    }
  };

  const renderDetails = () => {
    if (!details) return null;

    switch (originalName) {
      case 'Air Conditioner':
        if (!on) return <p className="text-xs text-gray-500 mt-2">{t('off')}</p>;
        return (
          <div className="flex justify-around items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Thermometer size={14} className="text-gray-400" />
              <span>{details.temperature ?? '--'}°C</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Droplets size={14} className="text-gray-400" />
              <span>{details.humidity ?? '--'}%</span>
            </div>
          </div>
        );
      case 'Light Bulbs':
        if (details.onCount === 0) return <p className="text-xs text-gray-500 mt-2">{t('allBulbsOff')}</p>;
        return (
          <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Sun size={14} className="text-gray-400" />
              <span>{t('onCount', { onCount: details.onCount, totalCount: details.totalCount })}</span>
            </div>
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: on ? details.color : '#EAE8D9' }} />
            </div>
          </div>
        );
      case 'Health Monitor':
        return (
          <div className="flex justify-around items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <HeartPulse size={14} className="text-red-400" />
              <span>{details.heartRate ?? '--'} {t('bpm')}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
               <span className="font-bold text-red-400 text-sm">%</span>
              <span>{details.spo2 ?? '--'}</span>
            </div>
          </div>
        );
      case 'Environment':
        return (
          <div className="flex justify-around items-center text-xs text-gray-500 mt-2">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Rss size={14} className="text-green-400" />
              <span>{details.aqi ?? '--'} {t('aqi')}</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Volume2 size={14} className="text-blue-400" />
              <span>{details.soundLevel ?? '--'} {t('db')}</span>
            </div>
          </div>
        );
       case 'Motion Sensor':
        return (
            <p className={`text-sm font-semibold text-center mt-2 ${on ? 'text-blue-600' : 'text-gray-500'}`}>
                {on ? t('motionDetected') : t('allClear')}
            </p>
        );
      default:
        return null;
    }
  }

  const ToggleControl = () => {
    if (!commandTopic) {
        if (originalName === 'Motion Sensor') {
             return (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${on ? 'bg-blue-600 text-white' : 'bg-[#EAE8D9] text-gray-500'}`}>
                    <Eye size={20} />
                </div>
             );
        }
        return <div className="w-10 h-10" />; // Spacer
    }

    return (
      <div
        onClick={handleToggle}
        role="switch"
        aria-checked={on}
        className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${on ? 'bg-blue-600' : 'bg-[#EAE8D9]'}`}
      >
        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${on ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
      </div>
    )
  }

  // Redesigned Card Layout
  if (REDESIGNED_CARDS.includes(originalName)) {
    const cardContent = (
      <>
        <div className="flex justify-between items-start">
          <div className="p-2 bg-[#F5F3E5] rounded-full">
            {icon}
          </div>
          <ToggleControl />
        </div>
        <div className="mt-auto">
          <p className="font-bold text-gray-800">{name}</p>
          {renderDetails()}
        </div>
      </>
    );

    if (onClick) {
      return (
        <button onClick={onClick} className="bg-[#FFFEF5] p-4 rounded-3xl shadow-sm text-start flex flex-col h-44">
          {cardContent}
        </button>
      )
    }
    return (
      <div className="bg-[#FFFEF5] p-4 rounded-3xl shadow-sm flex flex-col h-44">
        {cardContent}
      </div>
    );
  }

  // Original Card Layout (for Humidifier, etc.)
  const originalCardContent = (
    <>
      <div className="flex justify-between items-start">
        <div className="p-2 bg-[#F5F3E5] rounded-full">
          {icon}
        </div>
        <ToggleControl />
      </div>
      <div>
        <p className="font-bold text-gray-800 mt-4">{name}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span className={`w-2 h-2 rounded-full me-1.5 ${on ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          {count}
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="bg-[#FFFEF5] p-4 rounded-3xl shadow-sm text-start flex flex-col justify-between h-36">
        {originalCardContent}
      </button>
    )
  }

  return (
    <div className="bg-[#FFFEF5] p-4 rounded-3xl shadow-sm flex flex-col justify-between h-36">
      {originalCardContent}
    </div>
  );
};

export default DeviceCard;