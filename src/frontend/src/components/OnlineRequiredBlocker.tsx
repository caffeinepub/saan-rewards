import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OnlineRequiredBlockerProps {
  onRetry: () => void;
}

export default function OnlineRequiredBlocker({ onRetry }: OnlineRequiredBlockerProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center tj-game-overlay tj-overlay-enter">
      <Card className="max-w-md mx-4 tj-surface-elevated">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center border-2 border-destructive/20">
            <WifiOff className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">No Internet Connection</CardTitle>
          <CardDescription className="text-base">
            Traffic Jam requires an active internet connection to play
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Please check your connection and try again. The game will automatically resume when you're back online.
          </p>
          <Button 
            onClick={onRetry} 
            className="w-full tj-btn-primary tj-interactive tj-focus-ring"
            size="lg"
          >
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
