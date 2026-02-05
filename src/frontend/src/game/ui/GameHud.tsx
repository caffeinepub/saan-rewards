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
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Score</p>
            <p className="text-3xl font-bold text-foreground tabular-nums">{score}</p>
          </div>
        </div>
      </div>

      {/* Game Over overlay */}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <div className="bg-card rounded-2xl shadow-2xl border border-border p-8 max-w-sm w-full mx-4 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-6">
              <div className="text-6xl">💥</div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Game Over!</h2>
                <p className="text-muted-foreground">You crashed into traffic</p>
              </div>
              
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Final Score</p>
                <p className="text-4xl font-bold text-primary tabular-nums">{score}</p>
              </div>

              <Button
                size="lg"
                onClick={onRestart}
                className="w-full text-lg h-14 shadow-md hover:shadow-lg transition-all"
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
