import { useEffect, useState } from 'react';

interface GameControls {
  left: boolean;
  right: boolean;
  brake: boolean;
}

// Shared control state
let controlState: GameControls = {
  left: false,
  right: false,
  brake: false,
};

const listeners = new Set<(state: GameControls) => void>();

function updateControls(updates: Partial<GameControls>) {
  controlState = { ...controlState, ...updates };
  listeners.forEach(listener => listener(controlState));
}

export function setGameControl(key: keyof GameControls, value: boolean) {
  updateControls({ [key]: value });
}

export function useGameControls(): GameControls {
  const [controls, setControls] = useState<GameControls>(controlState);

  useEffect(() => {
    // Subscribe to control updates
    listeners.add(setControls);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        updateControls({ left: true });
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        updateControls({ right: true });
      }
      if (e.key === ' ') {
        e.preventDefault();
        updateControls({ brake: true });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        updateControls({ left: false });
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        updateControls({ right: false });
      }
      if (e.key === ' ') {
        updateControls({ brake: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      listeners.delete(setControls);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
}
