import { GameState } from '../engine/gameState';
import { TeenPattiCard } from './TeenPattiCard';
import { TeenPattiActionBar } from './TeenPattiActionBar';
import { useVirtualCurrency } from '@/hooks/useVirtualCurrency';
import { Gem, Coins } from 'lucide-react';

interface TeenPattiTableProps {
  gameState: GameState;
  onFold: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
  showOpponentCards: boolean;
  isProcessing: boolean;
}

export function TeenPattiTable({
  gameState,
  onFold,
  onCall,
  onRaise,
  showOpponentCards,
  isProcessing
}: TeenPattiTableProps) {
  const callAmount = gameState.currentBet - gameState.player.currentBet;
  const minRaise = 20;
  const { diamonds, coins } = useVirtualCurrency();

  return (
    <div 
      className="relative h-full w-full flex flex-col"
      style={{
        backgroundImage: 'url(/assets/generated/teenpatti-table-bg.dim_1536x1024.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Virtual Currency Display - Top Right */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-primary/20">
          <Gem className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-bold text-foreground">{diamonds}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-primary/20">
          <Coins className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-bold text-foreground">{coins}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col p-4 gap-4">
        {/* Opponent Area */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <img 
              src="/assets/generated/teenpatti-chip-icon.dim_256x256.png" 
              alt="Chips" 
              className="w-5 h-5"
            />
            <span className="font-bold text-foreground">Opponent: {gameState.opponent.chips}</span>
          </div>
          <div className="flex gap-2">
            {gameState.opponent.hand.map((card, i) => (
              <TeenPattiCard
                key={i}
                card={card}
                faceDown={!showOpponentCards}
                className="transform hover:scale-105 transition-transform"
              />
            ))}
          </div>
          {gameState.opponent.currentBet > 0 && (
            <div className="text-sm font-semibold text-white bg-primary/80 px-3 py-1 rounded-full">
              Bet: {gameState.opponent.currentBet}
            </div>
          )}
        </div>

        {/* Center - Pot */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-card/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-2xl border-2 border-primary/50">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/teenpatti-chip-icon.dim_256x256.png" 
                alt="Pot" 
                className="w-8 h-8"
              />
              <div>
                <div className="text-xs text-muted-foreground font-medium">POT</div>
                <div className="text-2xl font-bold text-primary">{gameState.pot}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Area */}
        <div className="flex flex-col items-center gap-2">
          {gameState.player.currentBet > 0 && (
            <div className="text-sm font-semibold text-white bg-primary/80 px-3 py-1 rounded-full">
              Bet: {gameState.player.currentBet}
            </div>
          )}
          <div className="flex gap-2">
            {gameState.player.hand.map((card, i) => (
              <TeenPattiCard
                key={i}
                card={card}
                className="transform hover:scale-105 transition-transform"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <img 
              src="/assets/generated/teenpatti-chip-icon.dim_256x256.png" 
              alt="Chips" 
              className="w-5 h-5"
            />
            <span className="font-bold text-foreground">You: {gameState.player.chips}</span>
          </div>
        </div>

        {/* Action Bar */}
        {gameState.phase === 'betting' && !isProcessing && (
          <div className="bg-card/95 backdrop-blur-sm p-4 rounded-xl shadow-xl">
            <TeenPattiActionBar
              onFold={onFold}
              onCall={onCall}
              onRaise={onRaise}
              callAmount={callAmount}
              playerChips={gameState.player.chips}
              minRaise={minRaise}
              disabled={isProcessing}
            />
          </div>
        )}
      </div>
    </div>
  );
}
