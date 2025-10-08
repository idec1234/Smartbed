
export enum View {
  HOME,
  DEVICE,
  ENERGY,
  SETTINGS,
  PROFILE,
  ALL_DEVICES,
}

export interface ThresholdSetting {
  enabled: boolean;
  value: number;
  direction: 'above' | 'below';
}

export interface ToggleSetting {
  enabled: boolean;
}

export interface DeviceNotificationSettings {
  toggle?: ToggleSetting;
  threshold?: ThresholdSetting;
}

export interface AllNotificationSettings {
  [deviceName: string]: DeviceNotificationSettings;
}