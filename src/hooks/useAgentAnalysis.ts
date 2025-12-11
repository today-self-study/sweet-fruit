import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AgentOrchestrator } from '../agents/AgentOrchestrator';
import { FruitAnalysis } from '../types/fruit';
import { OrchestratorProgress } from '../types/agent';

interface UseAgentAnalysisReturn {
  analyze: (imageData: string) => Promise<FruitAnalysis | null>;
  result: FruitAnalysis | null;
  progress: OrchestratorProgress | null;
  isAnalyzing: boolean;
  error: string | null;
  reset: () => void;
}

/**
 * React Hook for using the multi-agent analysis system
 */
export function useAgentAnalysis(apiKey: string | null): UseAgentAnalysisReturn {
  const { i18n } = useTranslation();
  const [result, setResult] = useState<FruitAnalysis | null>(null);
  const [progress, setProgress] = useState<OrchestratorProgress | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(
    async (imageData: string): Promise<FruitAnalysis | null> => {
      if (!apiKey) {
        setError('No API key provided');
        return null;
      }

      setIsAnalyzing(true);
      setError(null);
      setResult(null);
      setProgress(null);

      try {
        const orchestrator = new AgentOrchestrator(apiKey, i18n.language);

        const analysis = await orchestrator.analyzeImage(imageData, (prog) => {
          setProgress(prog);
        });

        setResult(analysis);
        setIsAnalyzing(false);
        return analysis;
      } catch (err: any) {
        const errorMessage = err.message || 'Analysis failed';
        setError(errorMessage);
        setIsAnalyzing(false);
        return null;
      }
    },
    [apiKey, i18n.language]
  );

  const reset = useCallback(() => {
    setResult(null);
    setProgress(null);
    setError(null);
    setIsAnalyzing(false);
  }, []);

  return {
    analyze,
    result,
    progress,
    isAnalyzing,
    error,
    reset
  };
}
