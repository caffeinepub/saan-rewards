import { useState, useEffect } from 'react';
import { GameSettings } from '../types';
import { DEFAULT_CREATOR_CONTROLS } from './defaults';

const STORAGE_KEY = 'sky-dodge-creator-controls';

export function useCreatorControls() {
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_CREATOR_CONTROLS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load creator controls:', error);
    }
    return DEFAULT_CREATOR_CONTROLS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save creator controls:', error);
    }
  }, [settings]);

  const updateSettings = (updates: Partial<GameSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_CREATOR_CONTROLS);
  };

  return {
    settings,
    updateSettings,
    resetToDefaults,
  };
}
