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
  const [hasPromptReady, setHasPromptReady] = useState(false);

  useEffect(() => {
    // Check if already installed - conservative detection using standalone mode only
    const checkInstalled = () => {
      // Primary check: display-mode standalone (most reliable for Android Chrome)
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;
      }
      
      // iOS PWA check
      if ((window.navigator as any).standalone === true) {
        return true;
      }
      
      return false;
    };

    const initialInstalled = checkInstalled();
    setIsInstalled(initialInstalled);

    // If already installed, mark as completed and not installable
    if (initialInstalled) {
      setInstallFlowStatus('completed');
      setIsInstallable(false);
      setHasPromptReady(false);
    }

    // Listen for display mode changes (detects when app is opened in standalone mode)
    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
        setInstallFlowStatus('completed');
        setHasPromptReady(false);
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
      setHasPromptReady(true);
      // Reset status to idle when prompt becomes available
      // This ensures Download button is enabled
      if (installFlowStatus !== 'completed') {
        setInstallFlowStatus('idle');
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      setInstallFlowStatus('completed');
      setHasPromptReady(false);
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
  }, [installFlowStatus]);

  const install = async () => {
    if (!installPrompt) {
      // No prompt available - return failure
      return { success: false, dismissed: false };
    }

    try {
      setInstallFlowStatus('prompting');
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        // User accepted - installation will complete via appinstalled event
        // Keep prompting state until appinstalled fires
        return { success: true, dismissed: false };
      } else {
        // User dismissed the prompt - reset to idle so they can try again
        setInstallFlowStatus('idle');
        return { success: false, dismissed: true };
      }
    } catch (error) {
      console.error('Install prompt error:', error);
      // Real error - reset to idle to allow retry
      setInstallFlowStatus('idle');
      return { success: false, dismissed: false };
    }
  };

  return {
    isInstallable,
    isInstalled,
    installFlowStatus,
    install,
    hasPromptReady,
  };
}
