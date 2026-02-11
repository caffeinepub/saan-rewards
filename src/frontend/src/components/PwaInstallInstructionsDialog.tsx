import { Info, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';

interface PwaInstallInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PwaInstallInstructionsDialog({ open, onOpenChange }: PwaInstallInstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <TjDialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Install Video Editor
          </DialogTitle>
          <DialogDescription>
            Follow these steps to install the app on your device
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Android Chrome Instructions */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="space-y-3">
              <p className="font-semibold text-foreground">
                For Android Chrome:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside ml-2">
                <li>
                  Tap the <strong className="text-foreground">three dots menu</strong> (⋮) at the top right corner of your browser
                </li>
                <li>
                  Select <strong className="text-foreground">"Add to Home screen"</strong> from the menu
                </li>
                <li>
                  Tap <strong className="text-foreground">"Add"</strong> or <strong className="text-foreground">"Install"</strong> when prompted
                </li>
                <li>
                  The app icon will appear on your home screen
                </li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* iPhone Safari Instructions */}
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="space-y-3">
              <p className="font-semibold text-foreground">
                For iPhone Safari:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside ml-2">
                <li>
                  Tap the <strong className="text-foreground">Share button</strong> (square with arrow) at the bottom
                </li>
                <li>
                  Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong>
                </li>
                <li>
                  Tap <strong className="text-foreground">"Add"</strong> in the top right corner
                </li>
                <li>
                  The app will appear on your home screen
                </li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* Why Manual Instructions */}
          <Alert className="border-muted bg-muted/30">
            <Info className="h-4 w-4 text-muted-foreground" />
            <AlertDescription className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                Why manual installation?
              </p>
              <p>
                Your browser doesn't support automatic installation prompts, or you may have previously dismissed the install prompt. 
                Follow the steps above to install manually.
              </p>
            </AlertDescription>
          </Alert>

          {/* Close Button */}
          <Button
            onClick={() => onOpenChange(false)}
            size="lg"
            className="w-full h-12 tj-btn-primary tj-interactive tj-focus-ring"
          >
            Got it
          </Button>
        </div>
      </TjDialogContent>
    </Dialog>
  );
}
