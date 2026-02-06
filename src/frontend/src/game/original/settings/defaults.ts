import { GameSettings } from '../types';

export const DEFAULT_CREATOR_CONTROLS: GameSettings = {
  speed: 1.0,
  spawnRate: 1.0,
  difficulty: 'medium',
  soundEnabled: true,
};

export const DIFFICULTY_PRESETS = {
  easy: {
    speed: 0.7,
    spawnRate: 0.7,
  },
  medium: {
    speed: 1.0,
    spawnRate: 1.0,
  },
  hard: {
    speed: 1.4,
    spawnRate: 1.3,
  },
};
