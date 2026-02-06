import { Settings, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';
import { GameSettings } from '../types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreatorControlsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: GameSettings;
  onUpdateSettings: (updates: Partial<GameSettings>) => void;
  onResetToDefaults: () => void;
}

export function CreatorControlsDialog({
  open,
  onOpenChange,
  settings,
  onUpdateSettings,
  onResetToDefaults,
}: CreatorControlsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <TjDialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Creator Controls
          </DialogTitle>
          <DialogDescription>
            Customize gameplay parameters to your preference
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Alert */}
          <Alert className="border-primary/20 bg-primary/5">
            <AlertDescription className="text-sm text-muted-foreground">
              These settings give you full control over the game difficulty and behavior. 
              Changes take effect immediately in your next game session.
            </AlertDescription>
          </Alert>

          {/* Difficulty Preset */}
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-sm font-semibold">
              Difficulty Preset
            </Label>
            <Select
              value={settings.difficulty}
              onValueChange={(value: 'easy' | 'medium' | 'hard') =>
                onUpdateSettings({ difficulty: value })
              }
            >
              <SelectTrigger id="difficulty" className="tj-focus-ring">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Relaxed pace</SelectItem>
                <SelectItem value="medium">Medium - Balanced challenge</SelectItem>
                <SelectItem value="hard">Hard - Intense action</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Speed Multiplier */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="speed" className="text-sm font-semibold">
                Speed Multiplier
              </Label>
              <span className="text-sm font-mono text-primary">{settings.speed.toFixed(1)}x</span>
            </div>
            <Slider
              id="speed"
              min={0.5}
              max={2.0}
              step={0.1}
              value={[settings.speed]}
              onValueChange={([value]) => onUpdateSettings({ speed: value })}
              className="tj-focus-ring"
            />
            <p className="text-xs text-muted-foreground">
              Controls how fast obstacles fall (0.5x = slower, 2.0x = faster)
            </p>
          </div>

          {/* Spawn Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="spawn-rate" className="text-sm font-semibold">
                Obstacle Spawn Rate
              </Label>
              <span className="text-sm font-mono text-primary">{settings.spawnRate.toFixed(1)}x</span>
            </div>
            <Slider
              id="spawn-rate"
              min={0.5}
              max={2.0}
              step={0.1}
              value={[settings.spawnRate]}
              onValueChange={([value]) => onUpdateSettings({ spawnRate: value })}
              className="tj-focus-ring"
            />
            <p className="text-xs text-muted-foreground">
              Controls how frequently obstacles appear (0.5x = fewer, 2.0x = more)
            </p>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="sound" className="text-sm font-semibold">
                Sound Effects
              </Label>
              <p className="text-xs text-muted-foreground">
                Enable or disable game sound effects
              </p>
            </div>
            <Switch
              id="sound"
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => onUpdateSettings({ soundEnabled: checked })}
              className="tj-focus-ring"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={onResetToDefaults}
              variant="outline"
              size="lg"
              className="w-full h-12 tj-btn-secondary tj-interactive tj-focus-ring"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset to Defaults
            </Button>

            <Button
              onClick={() => onOpenChange(false)}
              size="lg"
              className="w-full h-12 tj-btn-primary tj-interactive tj-focus-ring"
            >
              Apply & Close
            </Button>
          </div>
        </div>
      </TjDialogContent>
    </Dialog>
  );
}
