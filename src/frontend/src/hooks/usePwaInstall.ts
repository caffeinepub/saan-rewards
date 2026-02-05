import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export type InstallFlowStatus = 'idle' | 'prompting' | 'completed' | 'failed';

export function usePwaInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installFlowStatus, setInstallFlowStatus] = useState<InstallFlowStatus>('idle');

  useEffect(() => {
    // Check if already installed - only check standalone mode for Android Chrome
    const checkInstalled = () => {
      // Only check display-mode: standalone for reliable detection
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }
      
      // Check if running as PWA on iOS
      if ((window.navigator as any).standalone === true) {
        return true;
      }
      
      return false;
    };

    const initialInstalled = checkInstalled();
    setIsInstalled(initialInstalled);

    // Listen for display mode changes
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
        setInstallFlowStatus('completed');
      }
    };

    if (standaloneMedia.addEventListener) {
      standaloneMedia.addEventListener('change', handleDisplayModeChange);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      setInstallFlowStatus('completed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (standaloneMedia.removeEventListener) {
        standaloneMedia.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return false;

    try {
      setInstallFlowStatus('prompting');
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
        setInstallPrompt(null);
        setInstallFlowStatus('completed');
        // Note: isInstalled will be set by appinstalled event or display-mode change
        return true;
      } else {
        // User dismissed the prompt
        setInstallFlowStatus('failed');
        return false;
      }
    } catch (error) {
      console.error('Install prompt error:', error);
      setInstallFlowStatus('failed');
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    installFlowStatus,
    install,
  };
}
