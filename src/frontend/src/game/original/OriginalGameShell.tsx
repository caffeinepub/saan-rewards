import { useState, useEffect } from 'react';
import { GameStartScreen } from './ui/GameStartScreen';
import { GameHud } from './ui/GameHud';
import { CreatorControlsDialog } from './ui/CreatorControlsDialog';
import { LegalOwnershipDialog } from './ui/LegalOwnershipDialog';
import { ShareLinkDialog } from '@/components/ShareLinkDialog';
import { PwaInstallInstructionsDialog } from '@/components/PwaInstallInstructionsDialog';
import { OriginalCanvasGame } from './OriginalCanvasGame';
import { useCreatorControls } from './settings/useCreatorControls';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { GameState, GameStats } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RotateCcw, Home } from 'lucide-react';

const HIGH_SCORE_KEY = 'sky-dodge-high-score';

export function OriginalGameShell() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const stored = localStorage.getItem(HIGH_SCORE_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showInstallInstructions, setShowInstallInstructions] = useState(false);

  const { settings, updateSettings, resetToDefaults } = useCreatorControls();
  const { isInstallable, isInstalled, install, hasPromptReady } = usePwaInstall();

  // Check for ?install=1 deep link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('install') === '1' && hasPromptReady && !isInstalled) {
      // Auto-trigger install flow
      handleInstall();
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [hasPromptReady, isInstalled]);

  const handleInstall = async () => {
    if (!isInstallable || isInstalled) {
      setShowInstallInstructions(true);
      return;
    }

    const result = await install();
    if (!result.success && !result.dismissed) {
      setShowInstallInstructions(true);
    }
  };

  const handleStartGame = () => {
    setCurrentScore(0);
    setGameStats(null);
    setGameState('playing');
  };

  const handleGameOver = (stats: GameStats) => {
    const finalScore = currentScore;
    const newHighScore = Math.max(highScore, finalScore);
    
    if (newHighScore > highScore) {
      setHighScore(newHighScore);
      try {
        localStorage.setItem(HIGH_SCORE_KEY, newHighScore.toString());
      } catch (error) {
        console.error('Failed to save high score:', error);
      }
    }

    setGameStats({
      ...stats,
      score: finalScore,
      highScore: newHighScore,
    });
    setGameState('gameover');
  };

  const handleScoreUpdate = (score: number) => {
    setCurrentScore(score);
  };

  const handleBackToStart = () => {
    setGameState('start');
    setCurrentScore(0);
    setGameStats(null);
  };

  const showInstallButton = (isInstallable || !isInstalled) && gameState === 'start';

  return (
    <div className="h-full w-full relative">
      {/* Start Screen */}
      {gameState === 'start' && (
        <GameStartScreen
          onStart={handleStartGame}
          onOpenSettings={() => setShowSettings(true)}
          onOpenShare={() => setShowShare(true)}
          onOpenInstall={handleInstall}
          onOpenLegal={() => setShowLegal(true)}
          highScore={highScore}
          showInstallButton={showInstallButton}
        />
      )}

      {/* Playing State */}
      {gameState === 'playing' && (
        <>
          <OriginalCanvasGame
            settings={settings}
            onGameOver={handleGameOver}
            onScoreUpdate={handleScoreUpdate}
          />
          <GameHud score={currentScore} highScore={highScore} />
        </>
      )}

      {/* Game Over Overlay */}
      {gameState === 'gameover' && gameStats && (
        <div className="absolute inset-0 tj-game-overlay flex items-center justify-center p-4 z-20">
          <Card className="w-full max-w-md tj-surface-elevated tj-gameover-enter">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                <Trophy className="h-8 w-8" />
                Game Over!
              </CardTitle>
              <CardDescription className="text-base">
                {gameStats.score === gameStats.highScore && gameStats.score > 0
                  ? '🎉 New High Score!'
                  : 'Nice try! Keep practicing!'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-sm font-medium text-muted-foreground">Final Score</span>
                  <span className="text-3xl font-bold text-primary">{gameStats.score}</span>
                </div>
                
                {gameStats.highScore > 0 && (
                  <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <span className="text-sm font-medium text-muted-foreground">High Score</span>
                    <span className="text-2xl font-bold text-accent">{gameStats.highScore}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Obstacles Avoided</span>
                  <span className="text-xl font-semibold text-foreground">{gameStats.obstaclesAvoided}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={handleStartGame}
                  size="lg"
                  className="w-full h-14 text-lg font-bold tj-btn-primary tj-interactive tj-focus-ring"
                >
                  <RotateCcw className="mr-2 h-6 w-6" />
                  Play Again
                </Button>
                
                <Button
                  onClick={handleBackToStart}
                  variant="outline"
                  size="lg"
                  className="w-full h-12 tj-btn-secondary tj-interactive tj-focus-ring"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Back to Menu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dialogs */}
      <CreatorControlsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetToDefaults={resetToDefaults}
      />

      <LegalOwnershipDialog open={showLegal} onOpenChange={setShowLegal} />

      <ShareLinkDialog open={showShare} onOpenChange={setShowShare} />

      <PwaInstallInstructionsDialog
        open={showInstallInstructions}
        onOpenChange={setShowInstallInstructions}
      />
    </div>
  );
}
