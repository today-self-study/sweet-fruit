import { useAgentAnalysis } from './hooks/useAgentAnalysis';
import { CameraView } from './components/Camera/CameraView';
import { LoadingView } from './components/Results/LoadingView';
import { ResultView } from './components/Results/ResultView';

type AppState = 'camera' | 'analyzing' | 'results';

// Use embedded API key from environment variable
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || '';

function App() {
  const { analyze, result, progress, isAnalyzing, error, reset } =
    useAgentAnalysis(API_KEY);

  // Determine current state
  const currentState: AppState = (() => {
    if (isAnalyzing) return 'analyzing';
    if (result) return 'results';
    return 'camera';
  })();

  const handleImageCapture = async (imageData: string) => {
    try {
      await analyze(imageData);
    } catch (err) {
      // Error is handled by useAgentAnalysis hook
      console.error('Analysis failed:', err);
    }
  };

  const handleReset = () => {
    reset();
  };

  // Render based on state
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
