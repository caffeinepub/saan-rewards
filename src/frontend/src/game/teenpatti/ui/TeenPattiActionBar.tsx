import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TeenPattiActionBarProps {
  onFold: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
  callAmount: number;
  playerChips: number;
  minRaise: number;
  disabled?: boolean;
}

export function TeenPattiActionBar({
  onFold,
  onCall,
  onRaise,
  callAmount,
  playerChips,
  minRaise,
  disabled = false
}: TeenPattiActionBarProps) {
  const [raiseAmount, setRaiseAmount] = useState(minRaise);
  const [showRaiseInput, setShowRaiseInput] = useState(false);

  const maxRaise = playerChips - callAmount;
  const canRaise = maxRaise >= minRaise;

  const handleRaise = () => {
    if (showRaiseInput) {
      const amount = Math.min(Math.max(raiseAmount, minRaise), maxRaise);
      onRaise(amount);
      setShowRaiseInput(false);
      setRaiseAmount(minRaise);
    } else {
      setShowRaiseInput(true);
    }
  };

  const handleQuickRaise = (multiplier: number) => {
    const amount = Math.min(Math.floor(minRaise * multiplier), maxRaise);
    onRaise(amount);
    setShowRaiseInput(false);
  };

  return (
    <div className="space-y-3">
      {showRaiseInput && canRaise && (
        <div className="space-y-2 p-3 bg-card/50 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={minRaise}
              max={maxRaise}
              value={raiseAmount}
              onChange={(e) => setRaiseAmount(Number(e.target.value))}
              className="flex-1"
              disabled={disabled}
            />
            <Button
              onClick={() => setShowRaiseInput(false)}
              variant="ghost"
              size="sm"
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => handleQuickRaise(1)}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={disabled}
            >
              Min ({minRaise})
            </Button>
            <Button
              onClick={() => handleQuickRaise(2)}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={disabled || maxRaise < minRaise * 2}
            >
              2x
            </Button>
            <Button
              onClick={() => handleQuickRaise(3)}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={disabled || maxRaise < minRaise * 3}
            >
              3x
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={onFold}
          variant="destructive"
          className="flex-1 h-12 text-base font-semibold"
          disabled={disabled}
        >
          Fold
        </Button>
        <Button
          onClick={onCall}
          variant="default"
          className="flex-1 h-12 text-base font-semibold"
          disabled={disabled}
        >
          {callAmount === 0 ? 'Check' : `Call ${callAmount}`}
        </Button>
        {canRaise && (
          <Button
            onClick={handleRaise}
            variant="default"
            className="flex-1 h-12 text-base font-semibold bg-primary hover:bg-primary/90"
            disabled={disabled}
          >
            Raise
          </Button>
        )}
      </div>
    </div>
  );
}
