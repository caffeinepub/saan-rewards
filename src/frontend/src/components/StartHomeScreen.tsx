import { useState } from 'react';
import { Play, Share2, Download, Info, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { getSanitizedShareUrl } from '@/utils/shareUrl';

interface StartHomeScreenProps {
  onPlay: () => void;
}

export default function StartHomeScreen({ onPlay }: StartHomeScreenProps) {
  const { isInstallable, isInstalled, installFlowStatus, install } = usePwaInstall();
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [showManualCopy, setShowManualCopy] = useState(false);

  const handleInstall = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        // If prompt was dismissed or failed, show manual instructions
        setShowInstallDialog(true);
      }
    } else {
      // No install prompt available, show manual instructions
      setShowInstallDialog(true);
    }
  };

  const handleShare = async () => {
    const shareUrl = getSanitizedShareUrl();
    
    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Traffic Jam',
          text: 'Play Traffic Jam - Navigate through traffic and survive as long as you can!',
          url: shareUrl,
        });
        // Successfully shared via native share
        return;
      } catch (error) {
        // User cancelled or share failed, fall through to clipboard
        if ((error as Error).name === 'AbortError') {
          return; // User cancelled, don't show dialog
        }
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
      setShowManualCopy(false);
      setTimeout(() => setShareStatus('idle'), 3000);
    } catch (error) {
      // Clipboard failed, show manual copy option
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
      // Still failed, keep manual copy visible
      setShareStatus('failed');
    }
  };

  const isInstalling = installFlowStatus === 'prompting';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-2xl border-2 overflow-hidden">
        <CardHeader className="text-center space-y-4 pb-4 relative">
          {/* Hero Image with Title Overlay */}
          <div className="relative -mx-6 -mt-6 mb-4">
            <div className="relative w-full aspect-[4/5] max-h-[400px] overflow-hidden">
              <img 
                src="/assets/generated/traffic-jam-hero.dim_1080x1350.png" 
                alt="Traffic Jam Game"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-2">
                  Traffic Jam
                </h1>
                <p className="text-white/90 text-base drop-shadow-lg">
                  Navigate through traffic and survive as long as you can!
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Primary Play Button */}
          <Button
            onClick={onPlay}
            size="lg"
            className="w-full text-lg h-14 font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Play className="mr-2 h-6 w-6" />
            Play Now
          </Button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleInstall}
              variant="outline"
              size="lg"
              className="h-12"
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
                  {isInstalled ? 'Installed' : 'Download'}
                </>
              )}
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              size="lg"
              className="h-12"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>

          {/* Info Alert */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Internet connection required to play. Install for quick access!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Install Instructions Dialog */}
      <Dialog open={showInstallDialog} onOpenChange={setShowInstallDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>How to Install</DialogTitle>
            <DialogDescription>
              Add Traffic Jam to your home screen for quick access
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
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Link Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Traffic Jam</DialogTitle>
            <DialogDescription>
              Share this game with your friends
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Status Alert */}
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

            {/* Manual Copy Option */}
            {showManualCopy && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Copy link manually:</p>
                <div className="flex gap-2">
                  <Input 
                    value={getSanitizedShareUrl()} 
                    readOnly 
                    className="flex-1 text-sm"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <Button 
                    onClick={handleManualCopy}
                    variant="outline"
                    size="icon"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Tap the text field to select, then copy manually.
                </p>
              </div>
            )}

            {/* Recipient Instructions */}
            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                <strong>For recipients:</strong> Open the link, then tap Download to install.
              </AlertDescription>
            </Alert>

            {/* Security Note */}
            <Alert className="border-yellow-500/20 bg-yellow-500/5">
              <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              <AlertDescription className="text-xs text-muted-foreground">
                Do not share admin links that contain tokens.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => {
                setShowShareDialog(false);
                setShareStatus('idle');
                setShowManualCopy(false);
              }}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
