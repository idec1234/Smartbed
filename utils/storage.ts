
import { AllNotificationSettings } from '../types';

const NOTIFICATION_SETTINGS_KEY = 'smartHomeNotificationSettings';

const DEFAULT_SETTINGS: AllNotificationSettings = {
  'Air Conditioner': {
    toggle: { enabled: true },
    threshold: { enabled: false, value: 25, direction: 'above' },
  },
  'Smart TV': {
    toggle: { enabled: true },
  },
  'Light Bulbs': {
    toggle: { enabled: false },
  },
  'Wifi Router': {
    toggle: { enabled: false },
  },
  'Humidifier': {
    toggle: { enabled: false },
  },
  'Security Cam': {
    toggle: { enabled: false },
  },
};

export const getNotificationSettings = (): AllNotificationSettings => {
  try {
    const settings = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      // Deep merge defaults for nested properties
      const mergedSettings = { ...DEFAULT_SETTINGS };
      for (const device in parsedSettings) {
        mergedSettings[device] = {
          ...DEFAULT_SETTINGS[device],
          ...parsedSettings[device],
        };
      }
      return mergedSettings;
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error reading notification settings from localStorage', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveNotificationSettings = (settings: AllNotificationSettings) => {
  try {
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving notification settings to localStorage', error);
  }
};