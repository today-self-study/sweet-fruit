import { useState, useEffect, useCallback } from 'react';
import { getStoredApiKey, storeApiKey, clearApiKey, isValidApiKey } from '../services/claudeClient';

interface UseApiKeyReturn {
  apiKey: string | null;
  hasApiKey: boolean;
  setApiKey: (key: string) => boolean;
  removeApiKey: () => void;
  isValid: boolean;
}

/**
 * React Hook for managing Anthropic API key
 */
export function useApiKey(): UseApiKeyReturn {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Load API key on mount
  useEffect(() => {
    const stored = getStoredApiKey();
    if (stored) {
      setApiKeyState(stored);
      setIsValid(isValidApiKey(stored));
    }
  }, []);

  const setApiKey = useCallback((key: string): boolean => {
    const trimmedKey = key.trim();

    if (!isValidApiKey(trimmedKey)) {
      setIsValid(false);
      return false;
    }

    storeApiKey(trimmedKey);
    setApiKeyState(trimmedKey);
    setIsValid(true);
    return true;
  }, []);

  const removeApiKey = useCallback(() => {
    clearApiKey();
    setApiKeyState(null);
    setIsValid(false);
  }, []);

  return {
    apiKey,
    hasApiKey: apiKey !== null && isValid,
    setApiKey,
    removeApiKey,
    isValid
  };
}
