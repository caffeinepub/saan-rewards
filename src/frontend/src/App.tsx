import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TjDialogContent } from '@/components/TjDialogContent';
import AboutHelp from '@/components/AboutHelp';
import SaanRewardsHomeScreen from '@/components/SaanRewardsHomeScreen';

function App() {
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((err) => console.error('Service Worker registration failed:', err));
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="tj-surface z-50 shadow-md flex-shrink-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🎁</div>
            <h1 className="text-lg font-bold text-foreground">Saan Rewards</h1>
          </div>
          <Dialog open={showAbout} onOpenChange={setShowAbout}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Help and About"
                className="tj-interactive tj-interactive-pressed tj-focus-ring"
              >
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <TjDialogContent>
              <DialogHeader>
                <DialogTitle>About Saan Rewards</DialogTitle>
                <DialogDescription>App information and help</DialogDescription>
              </DialogHeader>
              <AboutHelp />
            </TjDialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 min-h-0 relative">
        <SaanRewardsHomeScreen />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-4 flex-shrink-0">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2026. Built with <span className="text-primary">♥</span> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium tj-interactive"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
