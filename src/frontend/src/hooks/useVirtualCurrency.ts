import { useState, useEffect } from 'react';

const STORAGE_KEY = 'teenpatti_virtual_currency';
const LAST_CLAIM_KEY = 'teenpatti_last_claim';
const CLAIM_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

interface VirtualCurrency {
  diamonds: number;
  coins: number;
}

const DEFAULT_CURRENCY: VirtualCurrency = {
  diamonds: 100,
  coins: 1000,
};

export function useVirtualCurrency() {
  const [currency, setCurrency] = useState<VirtualCurrency>(DEFAULT_CURRENCY);
  const [lastClaim, setLastClaim] = useState<number | null>(null);
  const [canClaim, setCanClaim] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedClaim = localStorage.getItem(LAST_CLAIM_KEY);
      
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrency(parsed);
      }
      
      if (storedClaim) {
        const claimTime = parseInt(storedClaim, 10);
        setLastClaim(claimTime);
        const timeSinceClaim = Date.now() - claimTime;
        setCanClaim(timeSinceClaim >= CLAIM_COOLDOWN_MS);
      }
    } catch (error) {
      console.error('Failed to load virtual currency:', error);
    }
  }, []);

  // Check claim cooldown periodically
  useEffect(() => {
    if (lastClaim === null) return;

    const interval = setInterval(() => {
      const timeSinceClaim = Date.now() - lastClaim;
      setCanClaim(timeSinceClaim >= CLAIM_COOLDOWN_MS);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastClaim]);

  // Save to localStorage whenever currency changes
  const saveCurrency = (newCurrency: VirtualCurrency) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCurrency));
      setCurrency(newCurrency);
    } catch (error) {
      console.error('Failed to save virtual currency:', error);
    }
  };

  // Free daily claim (demo/non-monetized)
  const claimDailyBonus = () => {
    if (!canClaim) return false;

    const newCurrency = {
      diamonds: currency.diamonds + 50,
      coins: currency.coins + 500,
    };

    saveCurrency(newCurrency);
    
    const now = Date.now();
    setLastClaim(now);
    setCanClaim(false);
    
    try {
      localStorage.setItem(LAST_CLAIM_KEY, now.toString());
    } catch (error) {
      console.error('Failed to save claim time:', error);
    }

    return true;
  };

  // Demo add (for testing/demo purposes)
  const demoAdd = (diamonds: number, coins: number) => {
    const newCurrency = {
      diamonds: currency.diamonds + diamonds,
      coins: currency.coins + coins,
    };
    saveCurrency(newCurrency);
  };

  // Reset to defaults
  const reset = () => {
    saveCurrency(DEFAULT_CURRENCY);
    setLastClaim(null);
    setCanClaim(true);
    try {
      localStorage.removeItem(LAST_CLAIM_KEY);
    } catch (error) {
      console.error('Failed to clear claim time:', error);
    }
  };

  // Get time until next claim
  const getTimeUntilNextClaim = (): number => {
    if (lastClaim === null || canClaim) return 0;
    const timeSinceClaim = Date.now() - lastClaim;
    return Math.max(0, CLAIM_COOLDOWN_MS - timeSinceClaim);
  };

  return {
    diamonds: currency.diamonds,
    coins: currency.coins,
    canClaim,
    claimDailyBonus,
    demoAdd,
    reset,
    getTimeUntilNextClaim,
  };
}
