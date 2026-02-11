import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, RotateCcw, Coins, Gem } from 'lucide-react';
import { useVirtualCurrency } from '@/hooks/useVirtualCurrency';
import { useState, useEffect } from 'react';

export function VirtualCurrencyPanel() {
  const { diamonds, coins, canClaim, claimDailyBonus, reset, getTimeUntilNextClaim } = useVirtualCurrency();
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    if (!canClaim) {
      const updateTimer = () => {
        const ms = getTimeUntilNextClaim();
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m`);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [canClaim, getTimeUntilNextClaim]);

  const handleClaim = () => {
    const success = claimDailyBonus();
    if (success) {
      // Optional: Show success feedback
    }
  };

  return (
    <Card className="w-full bg-card/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Demo Currency
        </CardTitle>
        <CardDescription className="text-xs">
          Free virtual currency for entertainment only
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Balances */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3 border border-primary/20">
            <Gem className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-xs text-muted-foreground">Diamonds</div>
              <div className="text-lg font-bold text-foreground">{diamonds}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-3 border border-primary/20">
            <Coins className="h-5 w-5 text-yellow-500" />
            <div>
              <div className="text-xs text-muted-foreground">Coins</div>
              <div className="text-lg font-bold text-foreground">{coins}</div>
            </div>
          </div>
        </div>

        {/* Free Daily Claim */}
        <div className="space-y-2">
          <Button
            onClick={handleClaim}
            disabled={!canClaim}
            className="w-full"
            variant="default"
          >
            <Gift className="h-4 w-4 mr-2" />
            {canClaim ? 'Claim Free Daily Bonus' : `Next claim in ${timeRemaining}`}
          </Button>
          {canClaim && (
            <p className="text-xs text-center text-muted-foreground">
              +50 Diamonds, +500 Coins (Free, not a purchase)
            </p>
          )}
        </div>

        {/* Reset Demo Currency */}
        <Button
          onClick={reset}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <RotateCcw className="h-3 w-3 mr-2" />
          Reset Demo Currency
        </Button>
      </CardContent>
    </Card>
  );
}
