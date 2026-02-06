import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GameState } from '../engine/gameState';
import { Trophy, XCircle, Minus } from 'lucide-react';

interface TeenPattiResultOverlayProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export function TeenPattiResultOverlay({ gameState, onPlayAgain }: TeenPattiResultOverlayProps) {
  if (gameState.phase !== 'showdown' && gameState.phase !== 'result') {
    return null;
  }

  const isWin = gameState.winner === 'player';
  const isTie = gameState.winner === 'tie';

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 space-y-4 bg-card/95 backdrop-blur-sm">
        {/* Result Icon and Message */}
        <div className="text-center space-y-2">
          {isWin && <Trophy className="w-16 h-16 mx-auto text-yellow-500" />}
          {!isWin && !isTie && <XCircle className="w-16 h-16 mx-auto text-red-500" />}
          {isTie && <Minus className="w-16 h-16 mx-auto text-blue-500" />}
          
          <h2 className="text-2xl font-bold text-foreground">
            {gameState.message}
          </h2>
        </div>

        {/* Hand Details */}
        {gameState.playerEvaluation && gameState.opponentEvaluation && (
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="font-semibold text-foreground">Your Hand:</div>
              <div className="text-muted-foreground">{gameState.playerEvaluation.name}</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <div className="font-semibold text-foreground">Opponent's Hand:</div>
              <div className="text-muted-foreground">{gameState.opponentEvaluation.name}</div>
            </div>
          </div>
        )}

        {/* Chip Count */}
        <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg border border-border">
          <div>
            <div className="text-xs text-muted-foreground">Your Chips</div>
            <div className="text-xl font-bold text-foreground">{gameState.player.chips}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Opponent Chips</div>
            <div className="text-xl font-bold text-foreground">{gameState.opponent.chips}</div>
          </div>
        </div>

        {/* Play Again Button */}
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="w-full h-12 text-base font-semibold"
        >
          Play Next Hand
        </Button>
      </Card>
    </div>
  );
}
