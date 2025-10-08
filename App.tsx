import React, { useState, useRef, createContext, useContext, useEffect, useMemo } from 'react';
import HomeScreen from './components/HomeScreen';
import DeviceScreen from './components/DeviceScreen';
import EnergyScreen from './components/EnergyScreen';
import SettingsScreen from './components/SettingsScreen';
import ProfileScreen from './components/ProfileScreen';
import SplashScreen from './components/SplashScreen';
import AllDevicesScreen from './components/AllDevicesScreen';
import BottomNavBar from './components/BottomNavBar';
import { View } from './types';
import { NotificationContext } from './contexts/NotificationContext';
import Notification from './components/Notification';
import { MQTTProvider } from './contexts/MQTTContext';

const translations = {
  en: {
    smarter: "Smarter",
    living: "Living",
    every: "Every",
    day: "Day",
    start: "Start",
    splashTitle: "Smarter Life Every Day",
    welcomeBack: "Welcome back,",
    viewAll: "View All",
    noDevices: "No devices in this room.",
    addDevicePrompt: "Add a new device to get started.",
    home: "Home",
    energy: "Energy",
    settings: "Settings",
    profile: "Profile",
    livingRoom: "Living Room",
    bedroom: "Bedroom",
    kitchen: "Kitchen",
    garage: "Garage",
    bathroom: "Bathroom",
    office: "Office",
    airConditioner: "Air Conditioner",
    smartTV: "Smart TV",
    lightBulbs: "Light Bulbs",
    wifiRouter: "Wifi Router",
    humidifier: "Humidifier",
    securityCam: "Security Cam",
    off: "Off",
    on: "On",
    cooling: "Cooling",
    volume: "Volume",
    source: "Source",
    allBulbsOff: "All bulbs are off",
    offline: "Offline",
    onCount: "{{onCount}} of {{totalCount}} On",
    devices: "Devices",
    signal: "Signal",
    kWh: "KWh",
    manageAlerts: "Manage alerts for your smart devices.",
    onOffAlerts: "On/Off Alerts",
    temperatureAlert: "Temperature Alert",
    alertIfTempIs: "Alert if temp is...",
    thresholdTemp: "Threshold Temp",
    language: "Language",
    energyUsage: "Energy Usage",
    underConstruction: "This feature is under construction.",
    energyComeBack: "Come back soon to check your energy consumption!",
    profileComeBack: "Manage your account details here soon!",
    notificationSaved: "Notification settings saved!",
    deviceToggled: "{{deviceName}} has been turned {{status}}.",
    acThreshold: "AC temp reached {{temperature}}°C, {{direction}} the {{threshold}}°C alert.",
    above: "above",
    below: "below",
    power: "Power",
    brightness: "Brightness",
    colors: "Colors",
    scenes: "Scenes",
    status: "Status",
    excellent: "Excellent",
    download: "Download",
    upload: "Upload",
    rebootRouter: "Reboot Router",
    confirmReboot: "Are you sure you want to reboot the router?",
    rebootingRouter: "Router is rebooting...",
    humidity: "Humidity",
    fanSpeed: "Fan Speed",
    low: "Low",
    medium: "Medium",
    high: "High",
    panTilt: "Pan / Tilt",
    snapshot: "Snapshot",
    mic: "Mic",
    stopRecording: "Stop Recording",
    startRecording: "Start Recording",
    screen: "Screen",
    healthMonitor: "Health Monitor",
    heartRate: "Heart Rate",
    spo2: "SpO2",
    bpm: "BPM",
    environment: "Environment",
    aqi: "AQI",
    soundLevel: "Sound Level",
    db: "dB",
    motionSensor: "Motion Sensor",
    motionDetected: "Motion Detected",
    allClear: "All Clear",
    percent: "%",
  },
  ar: {
    smarter: "أكثر ذكاءً",
    living: "للمعيشة",
    every: "كل",
    day: "يوم",
    start: "ابدأ",
    splashTitle: "حياة أذكى كل يوم",
    welcomeBack: "مرحباً بعودتك،",
    viewAll: "عرض الكل",
    noDevices: "لا توجد أجهزة في هذه الغرفة.",
    addDevicePrompt: "أضف جهازًا جديدًا للبدء.",
    home: "الرئيسية",
    energy: "الطاقة",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    livingRoom: "غرفة المعيشة",
    bedroom: "غرفة النوم",
    kitchen: "المطبخ",
    garage: "الكراج",
    bathroom: "الحمام",
    office: "المكتب",
    airConditioner: "مكيف الهواء",
    smartTV: "التلفزيون الذكي",
    lightBulbs: "المصابيح",
    wifiRouter: "راوتر واي فاي",
    humidifier: "مرطب الجو",
    securityCam: "كاميرا المراقبة",
    off: "إيقاف",
    on: "تشغيل",
    cooling: "تبريد",
    volume: "الصوت",
    source: "المصدر",
    allBulbsOff: "جميع المصابيح مطفأة",
    offline: "غير متصل",
    onCount: "{{onCount}} من {{totalCount}} تعمل",
    devices: "أجهزة",
    signal: "الإشارة",
    kWh: "كيلوواط ساعة",
    manageAlerts: "إدارة التنبيهات لأجهزتك الذكية.",
    onOffAlerts: "تنبيهات التشغيل/الإيقاف",
    temperatureAlert: "تنبيه درجة الحرارة",
    alertIfTempIs: "تنبيه إذا كانت الحرارة...",
    thresholdTemp: "درجة حرارة التنبيه",
    language: "اللغة",
    energyUsage: "استخدام الطاقة",
    underConstruction: "هذه الميزة قيد الإنشاء.",
    energyComeBack: "عد قريبًا للتحقق من استهلاك الطاقة الخاص بك!",
    profileComeBack: "قم بإدارة تفاصيل حسابك هنا قريبًا!",
    notificationSaved: "تم حفظ إعدادات الإشعارات!",
    deviceToggled: "تم {{status}} {{deviceName}}.",
    acThreshold: "وصلت حرارة المكيف إلى {{temperature}}°م، {{direction}} تنبيه {{threshold}}°م.",
    above: "فوق",
    below: "تحت",
    power: "الطاقة",
    brightness: "السطوع",
    colors: "الألوان",
    scenes: "المشاهد",
    status: "الحالة",
    excellent: "ممتازة",
    download: "تنزيل",
    upload: "رفع",
    rebootRouter: "إعادة تشغيل الراوتر",
    confirmReboot: "هل أنت متأكد أنك تريد إعادة تشغيل الراوتر؟",
    rebootingRouter: "جاري إعادة تشغيل الراوتر...",
    humidity: "الرطوبة",
    fanSpeed: "سرعة المروحة",
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
    panTilt: "تحريك/إمالة",
    snapshot: "لقطة",
    mic: "مايك",
    stopRecording: "إيقاف التسجيل",
    startRecording: "بدء التسجيل",
    screen: "شاشة",
    healthMonitor: "مراقبة الصحة",
    heartRate: "معدل ضربات القلب",
    spo2: "تشبع الأكسجين",
    bpm: "نبضة/دقيقة",
    environment: "البيئة",
    aqi: "جودة الهواء",
    soundLevel: "مستوى الصوت",
    db: "ديسيبل",
    motionSensor: "مستشعر الحركة",
    motionDetected: "تم كشف حركة",
    allClear: "لا يوجد حركة",
    percent: "٪",
  },
};

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const storedLang = localStorage.getItem('smartHomeLanguage');
      return (storedLang === 'ar' || storedLang === 'en') ? storedLang : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    try {
      localStorage.setItem('smartHomeLanguage', language);
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
    }
  }, [language]);
  
  const t = (key: string, options?: { [key: string]: string | number }): string => {
    const langTranslations = translations[language] as { [key: string]: string };
    let text = langTranslations[key] || key;
    if (options) {
      Object.keys(options).forEach(k => {
        text = text.replace(`{{${k}}}`, String(options[k]));
      });
    }
    return text;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const value = useMemo(() => ({
      language,
      direction: language === 'ar' ? 'rtl' : 'ltr',
      t,
      setLanguage,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedDeviceName, setSelectedDeviceName] = useState<string | null>(null);
  const [notification, setNotification] = useState({ message: '', visible: false });
  const [showSplash, setShowSplash] = useState(true);
  const timeoutRef = useRef<number | null>(null);
  const { language } = useLanguage();

  const showNotification = (message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotification({ message, visible: true });
    timeoutRef.current = window.setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSelectedDeviceName(null);
  };

  const handleNavigateToDevice = (deviceName: string) => {
    setSelectedDeviceName(deviceName);
    setCurrentView(View.DEVICE);
  };

  const handleBack = () => {
    setCurrentView(View.HOME);
    setSelectedDeviceName(null);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DEVICE:
        return <DeviceScreen deviceName={selectedDeviceName} onBack={handleBack} />;
      case View.ALL_DEVICES:
        return <AllDevicesScreen onBack={handleBack} onNavigateToDevice={handleNavigateToDevice} />;
      case View.ENERGY:
        return <EnergyScreen />;
      case View.SETTINGS:
        // Settings is a main tab but also has a back button in its header.
        // It should navigate home when that back button is pressed.
        return <SettingsScreen onBack={handleBack} />;
      case View.PROFILE:
        return <ProfileScreen />;
      case View.HOME:
      default:
        return <HomeScreen
          onNavigateToDevice={handleNavigateToDevice}
          onNavigateToAllDevices={() => handleNavigate(View.ALL_DEVICES)}
          onNavigateToSettings={() => handleNavigate(View.SETTINGS)}
        />;
    }
  };
  
  const showNavBar = [View.HOME, View.ENERGY, View.SETTINGS, View.PROFILE].includes(currentView);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div key={language} className="w-[390px] h-[844px] bg-[#F5F3E5] rounded-[40px] shadow-2xl overflow-hidden relative">
        {showSplash ? (
          <SplashScreen onStart={() => setShowSplash(false)} />
        ) : (
          <>
            <Notification message={notification.message} visible={notification.visible} />
            <div className="h-full w-full">
              {renderView()}
            </div>
            {showNavBar && <BottomNavBar activeView={currentView} onNavigate={handleNavigate} />}
          </>
        )}
      </div>
    </NotificationContext.Provider>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MQTTProvider>
        <AppContent />
      </MQTTProvider>
    </LanguageProvider>
  );
};


export default App;