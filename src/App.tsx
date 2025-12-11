import { useState } from 'react';
import { useApiKey } from './hooks/useApiKey';
import { useAgentAnalysis } from './hooks/useAgentAnalysis';
import { ApiKeyInput } from './components/Settings/ApiKeyInput';
import { CameraView } from './components/Camera/CameraView';
import { LoadingView } from './components/Results/LoadingView';
import { ResultView } from './components/Results/ResultView';

type AppState = 'api-key' | 'camera' | 'analyzing' | 'results';

function App() {
  const { apiKey, hasApiKey, setApiKey } = useApiKey();
  const { analyze, result, progress, isAnalyzing, error, reset } =
    useAgentAnalysis(apiKey);

  const [, setAppState] = useState<AppState>('api-key');
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  // Determine current state
  const currentState: AppState = (() => {
    if (!hasApiKey) return 'api-key';
    if (isAnalyzing) return 'analyzing';
    if (result) return 'results';
    return 'camera';
  })();

  const handleApiKeySubmit = (key: string) => {
    const success = setApiKey(key);
    if (success) {
      setApiKeyError(null);
      setAppState('camera');
    } else {
      setApiKeyError('Invalid API key format. Must start with sk-ant-');
    }
  };

  const handleImageCapture = async (imageData: string) => {
    setAppState('analyzing');
    try {
      await analyze(imageData);
      setAppState('results');
    } catch (err) {
      setAppState('camera');
    }
  };

  const handleReset = () => {
    reset();
    setAppState('camera');
  };

  // Render based on state
  if (currentState === 'api-key') {
    return (
      <ApiKeyInput
        onSubmit={handleApiKeySubmit}
        error={apiKeyError || undefined}
      />
    );
  }

  if (currentState === 'analyzing') {
    return <LoadingView progress={progress} />;
  }

  if (currentState === 'results' && result) {
    return <ResultView analysis={result} onReset={handleReset} />;
  }

  // Default: camera view
  return (
    <>
      <CameraView onImageCapture={handleImageCapture} isProcessing={isAnalyzing} />
      {error && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
          <p className="text-sm text-red-600 text-center">{error}</p>
        </div>
      )}
    </>
  );
}

export default App
