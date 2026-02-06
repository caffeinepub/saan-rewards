export type GameState = 'start' | 'playing' | 'paused' | 'gameover';

export interface GameSettings {
  speed: number;
  spawnRate: number;
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  speed: 1.0,
  spawnRate: 1.0,
  difficulty: 'medium',
  soundEnabled: true,
};

export interface GameStats {
  score: number;
  highScore: number;
  obstaclesAvoided: number;
}
