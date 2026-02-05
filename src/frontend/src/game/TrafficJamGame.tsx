import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import TrafficJamScene from './scene/TrafficJamScene';
import GameHud from './ui/GameHud';
import OnlineRequiredBlocker from '@/components/OnlineRequiredBlocker';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export type GameState = 'playing' | 'gameOver';

export default function TrafficJamGame() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);
  const { isOnline, recheck } = useOnlineStatus();

  const handleGameOver = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const handleRestart = useCallback(() => {
    setScore(0);
    setGameState('playing');
    setGameKey(prev => prev + 1);
  }, []);

  const handleScoreUpdate = useCallback((newScore: number) => {
    setScore(newScore);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* 3D Game Scene */}
      <TrafficJamScene
        key={gameKey}
        gameState={gameState}
        onGameOver={handleGameOver}
        onScoreUpdate={handleScoreUpdate}
        isBlocked={!isOnline}
      />

      {/* HUD Overlay */}
      <GameHud
        score={score}
        gameState={gameState}
        onRestart={handleRestart}
      />

      {/* Start Instructions (shown briefly at game start) */}
      {gameState === 'playing' && score === 0 && isOnline && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg px-6 py-4 shadow-lg border border-border animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-foreground font-semibold text-center">
              Avoid the traffic!
            </p>
          </div>
        </div>
      )}

      {/* Online Required Blocker */}
      {!isOnline && <OnlineRequiredBlocker onRetry={recheck} />}
    </div>
  );
}
