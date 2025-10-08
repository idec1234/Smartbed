import React from 'react';
import AirConditionerScreen from './devices/AirConditionerScreen';
import LightBulbsScreen from './devices/LightBulbsScreen';
import HumidifierScreen from './devices/HumidifierScreen';
import SecurityCamScreen from './devices/SecurityCamScreen';
import UnderConstructionScreen from './UnderConstructionScreen';
import HealthMonitorScreen from './devices/HealthMonitorScreen';
import EnvironmentScreen from './devices/EnvironmentScreen';
import MotionSensorScreen from './devices/MotionSensorScreen';

interface DeviceScreenProps {
  onBack: () => void;
  deviceName: string | null;
}

const DeviceScreen: React.FC<DeviceScreenProps> = ({ onBack, deviceName }) => {
  switch (deviceName) {
    case 'Air Conditioner':
      return <AirConditionerScreen onBack={onBack} />;
    case 'Light Bulbs':
      return <LightBulbsScreen onBack={onBack} />;
    case 'Humidifier':
      return <HumidifierScreen onBack={onBack} />;
    case 'Security Cam':
      return <SecurityCamScreen onBack={onBack} />;
    case 'Health Monitor':
      return <HealthMonitorScreen onBack={onBack} />;
    case 'Environment':
        return <EnvironmentScreen onBack={onBack} />;
    case 'Motion Sensor':
        return <MotionSensorScreen onBack={onBack} />;
    default:
      return <UnderConstructionScreen onBack={onBack} title={deviceName || 'Device'} />;
  }
};

export default DeviceScreen;