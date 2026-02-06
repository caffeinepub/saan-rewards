import { ExternalLink, Info, Download, Share2, Copy, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';
import { Input } from '@/components/ui/input';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { getSanitizedShareUrl } from '@/utils/shareUrl';

const SAAN_REWARDS_URL = 'https://sites.google.com/view/saanrewards/home';

export default function SaanRewardsHomeScreen() {
  const { isInstallable, isInstalled, installFlowStatus, install } = usePwaInstall();
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [showManualCopy, setShowManualCopy] = useState(false);

  const handleOpenSameTab = () => {
    window.location.href = SAAN_REWARDS_URL;
  };

  const handleOpenNewTab = () => {
    window.open(SAAN_REWARDS_URL, '_blank', 'noopener,noreferrer');
  };

  const handleInstall = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowInstallDialog(true);
      }
    } else {
      setShowInstallDialog(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = getSanitizedShareUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Saan Rewards',
          text: 'Check out Saan Rewards - Quick access to the rewards website!',
          url: shareUrl,
        });
        return;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return;
        }
      }
    }
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      setShowManualCopy(false);
      setTimeout(() => setShareStatus('idle'), 3000);
    } catch (error) {
      setShareStatus('failed');
      setShowManualCopy(true);
    }
    
    setShowShareDialog(true);
  };

  const handleManualCopy = async () => {
    const shareUrl = getSanitizedShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      setShowManualCopy(false);
      setTimeout(() => setShareStatus('idle'), 3000);
    } catch (error) {
      setShareStatus('failed');
    }
  };

  const isInstalling = installFlowStatus === 'prompting';

  return (
    <div className="min-h-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4 safe-top safe-bottom">
      <Card className="w-full max-w-md tj-surface-elevated">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
            🎁
          </div>
          <CardTitle className="text-3xl font-bold">Saan Rewards</CardTitle>
          <CardDescription className="text-base">
            Quick access to the Saan Rewards website
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Primary CTA - Open in Same Tab */}
          <Button
            onClick={handleOpenSameTab}
            size="lg"
            className="w-full text-lg h-14 font-bold tj-btn-primary tj-interactive tj-focus-ring"
          >
            <ExternalLink className="mr-2 h-6 w-6" />
            Open Saan Rewards
          </Button>

          {/* Secondary CTA - Open in New Tab */}
          <Button
            onClick={handleOpenNewTab}
            variant="outline"
            size="lg"
            className="w-full h-12 tj-btn-secondary tj-interactive tj-focus-ring"
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            Open in New Tab
          </Button>

          {/* Additional Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              onClick={handleInstall}
              variant="outline"
              size="lg"
              className="h-12 tj-btn-secondary tj-interactive tj-focus-ring"
              disabled={isInstalled || isInstalling}
            >
              {isInstalling ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Installing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  {isInstalled ? 'Installed' : 'Install'}
                </>
              )}
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="h-12 tj-btn-secondary tj-interactive tj-focus-ring"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Info Alert */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              This app provides quick access to the Saan Rewards website. Install for easy access from your home screen!
            </AlertDescription>
          </Alert>

          {/* Website URL Display */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Website:</p>
            <a
              href={SAAN_REWARDS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all tj-interactive"
            >
              {SAAN_REWARDS_URL}
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Install Instructions Dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <TjDialogContent>
          <DialogHeader>
            <DialogTitle>How to Install</DialogTitle>
            <DialogDescription>
              Add Saan Rewards to your home screen for quick access
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Android Chrome Installation:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Tap the menu icon (three dots) in the top-right corner</li>
                <li>Select "Add to Home screen" from the menu</li>
                <li>Confirm by tapping "Add" or "Install"</li>
                <li>The app icon will appear on your home screen</li>
              </ol>
              <p className="text-xs text-muted-foreground pt-2 border-t">
                For other browsers, look for "Add to Home screen" or "Install" options in the browser menu.
              </p>
            </div>
            
            <Button 
              onClick={() => setShowInstallDialog(false)} 
              variant="outline" 
              className="w-full tj-btn-secondary tj-interactive tj-focus-ring"
            >
              Close
            </Button>
          </div>
        </TjDialogContent>
      </Dialog>

      {/* Share Link Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <TjDialogContent>
          <DialogHeader>
            <DialogTitle>Share Saan Rewards</DialogTitle>
            <DialogDescription>
              Share this app with your friends
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {shareStatus === 'copied' && (
              <Alert className="border-green-500/20 bg-green-500/10">
                <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
                <AlertDescription className="text-green-700 dark:text-green-400 font-medium">
                  Link copied to clipboard!
                </AlertDescription>
              </Alert>
            )}

            {shareStatus === 'failed' && !showManualCopy && (
              <Alert className="border-yellow-500/20 bg-yellow-500/10">
                <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-400">
                  Unable to copy automatically. Try the manual copy option below.
                </AlertDescription>
              </Alert>
            )}

            {showManualCopy && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Copy link manually:</p>
                <div className="flex gap-2">
                  <Input 
                    value={getSanitizedShareUrl()} 
                    readOnly 
                    className="flex-1 text-sm tj-focus-ring"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button 
                    onClick={handleManualCopy}
                    variant="outline"
                    size="icon"
                    className="tj-interactive-pressed tj-focus-ring"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tap the text field to select, then copy manually.
                </p>
              </div>
            )}

            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                <strong>For recipients:</strong> Open the link, then tap Install to add to home screen.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => {
                setShowShareDialog(false);
                setShareStatus('idle');
                setShowManualCopy(false);
              }}
              variant="outline"
              className="w-full tj-btn-secondary tj-interactive tj-focus-ring"
            >
              Close
            </Button>
          </div>
        </TjDialogContent>
      </Dialog>
    </div>
  );
}
