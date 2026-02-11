import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Info, Play } from 'lucide-react';
import { VirtualCurrencyPanel } from '@/components/VirtualCurrencyPanel';

interface TeenPattiStartScreenProps {
  onStartGame: () => void;
  onShowRules: () => void;
}

export function TeenPattiStartScreen({ onStartGame, onShowRules }: TeenPattiStartScreenProps) {
  return (
    <div 
      className="h-full w-full flex items-center justify-center p-4 overflow-y-auto"
      style={{
        backgroundImage: 'url(/assets/generated/teenpatti-table-bg.dim_1536x1024.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative w-full max-w-md space-y-4 py-4">
        <Card className="w-full p-8 space-y-6 bg-card/95 backdrop-blur-sm shadow-2xl">
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="text-5xl mb-2">🃏</div>
            <h1 className="text-3xl font-bold text-foreground">Teen Patti</h1>
            <p className="text-sm text-muted-foreground">
              Classic 3-Card Poker Game
            </p>
          </div>

          {/* Chips Only Notice */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img 
                src="/assets/generated/teenpatti-chip-icon.dim_256x256.png" 
                alt="Chips" 
                className="w-6 h-6"
              />
              <span className="font-semibold text-foreground">Play Chips Only</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Entertainment only • No real money gambling
            </p>
          </div>

          {/* Quick Rules */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Quick Rules:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Each player gets 3 cards</li>
              <li>Best hand wins the pot</li>
              <li>Trail (3 of a kind) is highest</li>
              <li>Fold, Call, or Raise each turn</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onStartGame}
              size="lg"
              className="w-full h-14 text-lg font-bold"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Playing
            </Button>
            <Button
              onClick={onShowRules}
              variant="outline"
              size="lg"
              className="w-full h-12"
            >
              <Info className="w-5 h-5 mr-2" />
              Rules & Help
            </Button>
          </div>
        </Card>

        {/* Virtual Currency Panel */}
        <VirtualCurrencyPanel />
      </div>
    </div>
  );
}
