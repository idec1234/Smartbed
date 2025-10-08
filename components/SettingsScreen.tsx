import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell, BellOff, Thermometer, ChevronsUp, ChevronsDown } from 'lucide-react';
import { getNotificationSettings, saveNotificationSettings } from '../utils/storage';
import { AllNotificationSettings, DeviceNotificationSettings } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../App';

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
  <div
    onClick={() => onChange(!checked)}
    role="switch"
    aria-checked={checked}
    className={`w-12 h-6 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ${checked ? 'bg-blue-600' : 'bg-[#EAE8D9]'}`}
  >
    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-0'}`} />
  </div>
);

const SettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [settings, setSettings] = useState<AllNotificationSettings | null>(null);
  const { showNotification } = useNotification();
  const { t, language, setLanguage } = useLanguage();
  
  const deviceNameKeys: { [key: string]: string } = {
      'Air Conditioner': 'airConditioner',
      'Smart TV': 'smartTV',
      'Light Bulbs': 'lightBulbs',
      'Wifi Router': 'wifiRouter',
      'Humidifier': 'humidifier',
      'Security Cam': 'securityCam',
  }

  useEffect(() => {
    setSettings(getNotificationSettings());
  }, []);

  const handleSettingChange = (deviceName: string, newDeviceSettings: Partial<DeviceNotificationSettings>) => {
    if (!settings) return;
    
    const updatedDeviceSettings = {
        ...settings[deviceName],
        ...newDeviceSettings
    };

    const newSettings: AllNotificationSettings = {
      ...settings,
      [deviceName]: updatedDeviceSettings,
    };
    
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
    showNotification(t('notificationSaved'));
  };

  if (!settings) {
    return null; // or a loading indicator
  }

  const devices = Object.keys(settings);

  return (
    <div className="h-full w-full bg-[#F5F3E5] flex flex-col text-gray-800">
      <header className="flex items-center p-6 pt-12">
        <button onClick={onBack} className="p-3 bg-[#FFFEF5] rounded-full shadow-sm">
            <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 mx-auto">{t('settings')}</h1>
         <div className="w-12 h-12"></div> {/* Spacer */}
      </header>
      
      <main className="flex-1 overflow-y-auto px-6 pb-6 space-y-4 pt-4">
        <div className="bg-[#FFFEF5] p-4 rounded-2xl shadow-sm">
            <h2 className="font-bold text-gray-900">{t('language')}</h2>
            <div className="flex justify-between items-center mt-3 bg-[#F5F3E5] p-1 rounded-full">
                <button onClick={() => setLanguage('en')} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${language === 'en' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>English</button>
                <button onClick={() => setLanguage('ar')} className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${language === 'ar' ? 'bg-white shadow text-blue-600' : 'text-gray-600'}`}>العربية</button>
            </div>
        </div>

        <p className="text-sm text-gray-500 text-center">{t('manageAlerts')}</p>
        
        {devices.map(deviceName => (
          <div key={deviceName} className="bg-[#FFFEF5] p-4 rounded-2xl shadow-sm">
            <h2 className="font-bold text-gray-900">{t(deviceNameKeys[deviceName] || deviceName)}</h2>
            
            {settings[deviceName].toggle && (
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  {settings[deviceName].toggle?.enabled ? <Bell size={20} className="text-blue-500" /> : <BellOff size={20} className="text-gray-400" />}
                  <span className="text-sm font-medium text-gray-700">{t('onOffAlerts')}</span>
                </div>
                <ToggleSwitch 
                  checked={settings[deviceName].toggle?.enabled || false}
                  onChange={enabled => handleSettingChange(deviceName, { toggle: { enabled } })}
                />
              </div>
            )}

            {settings[deviceName].threshold && (
              <>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#EAE8D9]">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Thermometer size={20} className={settings[deviceName].threshold?.enabled ? "text-orange-500" : "text-gray-400"} />
                    <span className="text-sm font-medium text-gray-700">{t('temperatureAlert')}</span>
                  </div>
                  <ToggleSwitch
                    checked={settings[deviceName].threshold?.enabled || false}
                    onChange={enabled => handleSettingChange(deviceName, { threshold: { ...settings[deviceName].threshold!, enabled } })}
                  />
                </div>
                {settings[deviceName].threshold?.enabled && (
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between bg-[#F5F3E5] p-2 rounded-lg">
                      <span className="text-sm text-gray-600">{t('alertIfTempIs')}</span>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <button
                          onClick={() => handleSettingChange(deviceName, { threshold: { ...settings[deviceName].threshold!, direction: 'above' }})}
                          className={`p-2 rounded-md ${settings[deviceName].threshold?.direction === 'above' ? 'bg-blue-500 text-white' : 'bg-[#EAE8D9] text-gray-500'}`}
                          aria-label="Set alert for temperature above"
                        >
                          <ChevronsUp size={16} />
                        </button>
                        <button
                          onClick={() => handleSettingChange(deviceName, { threshold: { ...settings[deviceName].threshold!, direction: 'below' }})}
                          className={`p-2 rounded-md ${settings[deviceName].threshold?.direction === 'below' ? 'bg-blue-500 text-white' : 'bg-[#EAE8D9] text-gray-500'}`}
                          aria-label="Set alert for temperature below"
                        >
                          <ChevronsDown size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-[#F5F3E5] p-2 rounded-lg">
                      <label htmlFor={`temp-threshold-${deviceName}`} className="text-sm text-gray-600">{t('thresholdTemp')}</label>
                      <div className="flex items-center">
                        <input
                          id={`temp-threshold-${deviceName}`}
                          type="number"
                          value={settings[deviceName].threshold?.value}
                          onChange={(e) => handleSettingChange(deviceName, { threshold: { ...settings[deviceName].threshold!, value: parseInt(e.target.value, 10) || 16 } })}
                          className="w-16 bg-transparent text-end font-semibold text-gray-800 focus:outline-none"
                        />
                        <span className="text-sm text-gray-600">°C</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </main>
      <div className="w-32 h-1.5 bg-[#DCDAD0] rounded-full mx-auto my-2"></div>
    </div>
  );
};

export default SettingsScreen;