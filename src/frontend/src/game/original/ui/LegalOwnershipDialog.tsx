import { Scale, CheckCircle2, Code, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LegalOwnershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LegalOwnershipDialog({ open, onOpenChange }: LegalOwnershipDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <TjDialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Legal & Ownership
          </DialogTitle>
          <DialogDescription>
            Information about assets, ownership, and usage rights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Non-Gambling Disclaimer */}
          <Alert className="border-yellow-500/20 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold text-yellow-700 dark:text-yellow-400">
                Entertainment Only - No Real Money Gambling
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                This Teen Patti card game uses play chips only and involves no real money gambling. 
                It is purely for entertainment purposes. No deposits, withdrawals, payments, or real 
                money transactions are possible or supported.
              </p>
            </AlertDescription>
          </Alert>

          {/* Original Assets */}
          <Alert className="border-green-500/20 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold text-green-700 dark:text-green-400">
                Original Assets
              </p>
              <p className="text-sm text-green-700 dark:text-green-400">
                All visual assets, graphics, card designs, and game elements in this application are 
                original creations designed specifically for this project. No copyrighted or trademarked 
                content from third parties has been used.
              </p>
            </AlertDescription>
          </Alert>

          {/* Source Code Control */}
          <Alert className="border-primary/20 bg-primary/5">
            <Code className="h-4 w-4 text-primary" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold text-foreground">
                Source Code & Project Access
              </p>
              <p className="text-sm text-muted-foreground">
                You have full access to the project source code and all included original assets within 
                this application. The game logic, card rendering, and all visual elements are available 
                to you as part of this project.
              </p>
            </AlertDescription>
          </Alert>

          {/* Distribution Notice */}
          <Alert className="border-muted bg-muted/30">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <AlertDescription className="space-y-2">
              <p className="font-semibold text-foreground">
                Distribution & Monetization
              </p>
              <p className="text-sm text-muted-foreground">
                This application is a Progressive Web App (PWA) that can be installed on mobile devices. 
                While the app can be shared and installed, it does not include built-in advertising networks, 
                in-app purchases, payment integrations, Google Play Store publishing features, or any 
                real-money gambling functionality. These would need to be implemented separately if desired.
              </p>
            </AlertDescription>
          </Alert>

          {/* Technical Info */}
          <div className="text-xs text-muted-foreground space-y-1 pt-2">
            <p>
              <strong className="text-foreground">Technology:</strong> Built with React, TypeScript, 
              and HTML5 Canvas
            </p>
            <p>
              <strong className="text-foreground">Platform:</strong> Progressive Web App (PWA) - 
              installable on Android, iOS, and desktop
            </p>
            <p>
              <strong className="text-foreground">License:</strong> Project source code and included 
              original assets are available to you within this application
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={() => onOpenChange(false)}
            size="lg"
            className="w-full h-12 tj-btn-primary tj-interactive tj-focus-ring"
          >
            Close
          </Button>
        </div>
      </TjDialogContent>
    </Dialog>
  );
}
