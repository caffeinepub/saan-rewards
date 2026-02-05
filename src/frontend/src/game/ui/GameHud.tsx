import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { GameState } from '../TrafficJamGame';

interface GameHudProps {
  score: number;
  gameState: GameState;
  onRestart: () => void;
}

export default function GameHud({ score, gameState, onRestart }: GameHudProps) {
  return (
    <>
      {/* Score display */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
        <div className="tj-hud-chip">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Score</p>
            <p className="text-3xl font-bold text-foreground tabular-nums">{score}</p>
          </div>
        </div>
      </div>

      {/* Game Over overlay */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 tj-game-overlay flex items-center justify-center z-50 tj-overlay-enter">
          <div className="tj-surface-elevated rounded-2xl p-8 max-w-sm w-full mx-4 tj-gameover-enter">
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">💥</div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Game Over!</h2>
                <p className="text-muted-foreground text-base">You crashed into traffic</p>
              </div>
              
              <div className="bg-accent/10 rounded-xl p-5 border-2 border-accent/30 shadow-inner">
                <p className="text-sm text-muted-foreground mb-1 font-semibold uppercase tracking-wide">Final Score</p>
                <p className="text-5xl font-bold text-primary tabular-nums">{score}</p>
              </div>

              <Button
                size="lg"
                onClick={onRestart}
                className="w-full text-lg h-14 font-bold tj-btn-primary tj-interactive tj-focus-ring"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>

              <p className="text-xs text-muted-foreground">
                Tip: Use arrow keys or on-screen controls to dodge traffic
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
