import { Play, Settings, Share2, Download, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GameStartScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
  onOpenInstall: () => void;
  onOpenLegal: () => void;
  highScore: number;
  showInstallButton: boolean;
}

export function GameStartScreen({
  onStart,
  onOpenSettings,
  onOpenShare,
  onOpenInstall,
  onOpenLegal,
  highScore,
  showInstallButton,
}: GameStartScreenProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background via-background to-primary/5">
      <div className="w-full max-w-md space-y-6">
        {/* Hero Image */}
        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20">
          <img
            src="/assets/generated/new-game-hero.dim_1200x600.png"
            alt="Sky Dodge Game"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Game Info Card */}
        <Card className="tj-surface-elevated">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
              <span className="text-4xl">🎮</span>
              Sky Dodge
            </CardTitle>
            <CardDescription className="text-base">
              Dodge obstacles and survive as long as you can!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* High Score */}
            {highScore > 0 && (
              <div className="text-center py-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">High Score</p>
                <p className="text-3xl font-bold text-primary">{highScore}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">How to Play:</p>
              <ul className="space-y-1 list-disc list-inside ml-2">
                <li>Tap left or right to move your player</li>
                <li>Avoid falling obstacles</li>
                <li>Survive as long as possible</li>
                <li>Beat your high score!</li>
              </ul>
            </div>

            {/* Play Button */}
            <Button
              onClick={onStart}
              size="lg"
              className="w-full h-14 text-lg font-bold tj-btn-primary tj-interactive tj-focus-ring"
            >
              <Play className="mr-2 h-6 w-6" />
              Play Now
            </Button>

            {/* Action Buttons Grid */}
            <div className="grid grid-cols-2 gap-2">
              {showInstallButton && (
                <Button
                  onClick={onOpenInstall}
                  variant="outline"
                  size="lg"
                  className="h-12 tj-btn-secondary tj-interactive tj-focus-ring"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download
                </Button>
              )}
              <Button
                onClick={onOpenShare}
                variant="outline"
                size="lg"
                className="h-12 tj-btn-secondary tj-interactive tj-focus-ring"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button
                onClick={onOpenSettings}
                variant="outline"
                size="lg"
                className="h-12 tj-btn-secondary tj-interactive tj-focus-ring col-span-2"
              >
                <Settings className="mr-2 h-5 w-5" />
                Creator Controls
              </Button>
            </div>

            {/* Legal Link */}
            <Button
              onClick={onOpenLegal}
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground tj-interactive"
            >
              <Scale className="mr-1 h-3 w-3" />
              Legal & Ownership
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
