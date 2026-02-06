import { Trophy } from 'lucide-react';

interface GameHudProps {
  score: number;
  highScore: number;
}

export function GameHud({ score, highScore }: GameHudProps) {
  return (
    <div className="absolute top-4 left-0 right-0 z-10 px-4 pointer-events-none">
      <div className="max-w-md mx-auto flex items-center justify-between gap-4">
        {/* Score */}
        <div className="tj-hud-chip pointer-events-auto">
          <div className="text-xs text-muted-foreground font-medium">Score</div>
          <div className="text-2xl font-bold text-primary">{score}</div>
        </div>

        {/* High Score */}
        {highScore > 0 && (
          <div className="tj-hud-chip pointer-events-auto flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            <div>
              <div className="text-xs text-muted-foreground font-medium">Best</div>
              <div className="text-xl font-bold text-accent">{highScore}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
