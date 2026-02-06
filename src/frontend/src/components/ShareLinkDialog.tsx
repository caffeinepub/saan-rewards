import { Share2, Copy, Check, Info, AlertTriangle } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';
import { getSanitizedShareUrl, getInstallDeepLinkUrl } from '@/utils/shareUrl';

interface ShareLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareLinkDialog({ open, onOpenChange }: ShareLinkDialogProps) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [whatsappError, setWhatsappError] = useState(false);

  const shareUrl = getSanitizedShareUrl();
  const installDeepLink = getInstallDeepLinkUrl();
  const canShare = typeof navigator.share !== 'undefined';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('copied');
      setShowManualCopy(false);
      setWhatsappError(false);
      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (error) {
      setCopyStatus('failed');
      setShowManualCopy(true);
    }
  };

  const handleWhatsAppShare = () => {
    // WhatsApp share uses install deep-link for direct download experience
    const message = encodeURIComponent(
      `Check out Sky Dodge! 🎮\n\n` +
      `Tap this link to download and install:\n${installDeepLink}\n\n` +
      `Addictive mobile game - dodge obstacles and beat your high score!`
    );
    
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    try {
      // Try to open WhatsApp
      const opened = window.open(whatsappUrl, '_blank');
      
      // Check if popup was blocked or failed
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        setWhatsappError(true);
      } else {
        setWhatsappError(false);
      }
    } catch (error) {
      setWhatsappError(true);
    }
  };

  const handleNativeShare = async () => {
    if (!canShare) return;

    try {
      await navigator.share({
        title: 'Sky Dodge',
        text: 'Check out Sky Dodge - Addictive mobile game!',
        url: shareUrl,
      });
    } catch (error) {
      // User cancelled or error occurred - ignore AbortError
      if ((error as Error).name !== 'AbortError') {
        console.error('Share error:', error);
      }
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setCopyStatus('idle');
      setShowManualCopy(false);
      setWhatsappError(false);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <TjDialogContent>
        <DialogHeader>
          <DialogTitle>Share Sky Dodge</DialogTitle>
          <DialogDescription>
            Share this game with your friends via WhatsApp or any messaging app
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Copy Success Alert */}
          {copyStatus === 'copied' && (
            <Alert className="border-green-500/20 bg-green-500/10">
              <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
              <AlertDescription className="text-green-700 dark:text-green-400 font-medium">
                Link copied to clipboard! You can now paste it in WhatsApp or any messaging app.
              </AlertDescription>
            </Alert>
          )}

          {/* Copy Failed Alert */}
          {copyStatus === 'failed' && !showManualCopy && (
            <Alert className="border-yellow-500/20 bg-yellow-500/10">
              <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              <AlertDescription className="text-sm text-yellow-700 dark:text-yellow-400">
                Unable to copy automatically. Try the manual copy option below.
              </AlertDescription>
            </Alert>
          )}

          {/* WhatsApp Error Alert */}
          {whatsappError && (
            <Alert className="border-yellow-500/20 bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
              <AlertDescription className="text-sm space-y-2">
                <p className="font-semibold text-yellow-700 dark:text-yellow-400">
                  Unable to open WhatsApp
                </p>
                <p className="text-yellow-700 dark:text-yellow-400">
                  Please use "Copy Link" instead and paste the link manually in WhatsApp.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Manual Copy Section */}
          {showManualCopy && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Copy link manually:</p>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-sm tj-focus-ring"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <Button
                  onClick={handleCopyLink}
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

          {/* Link Display */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Share this link:</p>
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-foreground break-all font-mono">
                {shareUrl}
              </p>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handleCopyLink}
              size="lg"
              className="w-full h-12 font-semibold tj-btn-primary tj-interactive tj-focus-ring"
            >
              <Copy className="mr-2 h-5 w-5" />
              Copy Link
            </Button>

            <Button
              onClick={handleWhatsAppShare}
              variant="outline"
              size="lg"
              className="w-full h-12 font-semibold tj-btn-secondary tj-interactive tj-focus-ring bg-[#25D366]/10 hover:bg-[#25D366]/20 border-[#25D366]/30 text-foreground"
            >
              <SiWhatsapp className="mr-2 h-5 w-5 text-[#25D366]" />
              Share on WhatsApp
            </Button>

            {canShare && (
              <Button
                onClick={handleNativeShare}
                variant="outline"
                size="lg"
                className="w-full h-12 tj-btn-secondary tj-interactive tj-focus-ring"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            )}
          </div>

          {/* Important Warning - Open in Browser */}
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertDescription className="text-sm space-y-2">
              <p className="font-semibold text-yellow-700 dark:text-yellow-400">
                Important: Open the link in your browser address bar
              </p>
              <p className="text-yellow-700 dark:text-yellow-400">
                Do NOT paste the link into Google Search. Instead, paste it directly into your browser's address bar at the top of the screen.
              </p>
            </AlertDescription>
          </Alert>

          {/* Recipient Instructions */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm space-y-2">
              <p className="font-semibold text-foreground">
                Instructions for recipients:
              </p>
              <ol className="text-muted-foreground space-y-1 list-decimal list-inside ml-2">
                <li>Open the link in your browser (paste in address bar, not Google Search)</li>
                <li>Tap the large <strong className="text-foreground">"Download"</strong> button</li>
                <li>Install and play the game from your home screen anytime</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* Close Button */}
          <Button
            onClick={handleClose}
            variant="outline"
            className="w-full tj-btn-secondary tj-interactive tj-focus-ring"
          >
            Close
          </Button>
        </div>
      </TjDialogContent>
    </Dialog>
  );
}
