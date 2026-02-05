import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AboutHelp from '@/components/AboutHelp';
import TrafficJamGame from '@/game/TrafficJamGame';

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🚗</div>
            <h1 className="text-lg font-bold text-foreground">Traffic Jam</h1>
          </div>
          <Dialog open={showAbout} onOpenChange={setShowAbout}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Help and About">
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>About Traffic Jam</DialogTitle>
                <DialogDescription>How to play and game information</DialogDescription>
              </DialogHeader>
              <AboutHelp />
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Game Content */}
      <main className="flex-1 relative">
        <TrafficJamGame />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © 2026. Built with <span className="text-primary">♥</span> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
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
