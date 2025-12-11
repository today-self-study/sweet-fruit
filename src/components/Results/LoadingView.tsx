import { Loader2 } from 'lucide-react';
import { OrchestratorProgress } from '../../types/agent';

interface LoadingViewProps {
  progress: OrchestratorProgress | null;
}

export function LoadingView({ progress }: LoadingViewProps) {
  const getEmoji = (stage: string) => {
    switch (stage) {
      case 'identifying':
        return '🔍';
      case 'analyzing':
        return '🎯';
      case 'estimating':
        return '🍬';
      case 'complete':
        return '✅';
      default:
        return '🤖';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Animated Fruit */}
        <div className="mb-8">
          <div className="text-8xl animate-spin-slow inline-block">
            {progress ? getEmoji(progress.stage) : '🍎'}
          </div>
        </div>

        {/* Progress Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {progress?.message || 'Analyzing your fruit...'}
          </h2>
          <p className="text-gray-600">
            Using AI to analyze sweetness
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full h-3 overflow-hidden shadow-inner mb-4">
          <div
            className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress?.progress || 0}%` }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-sm text-gray-500 mb-8">
          {progress?.progress || 0}% complete
        </p>

        {/* Stage Indicators */}
        <div className="flex justify-center gap-4">
          <div
            className={`flex flex-col items-center ${
              progress?.stage === 'identifying' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="text-2xl mb-1">🔍</div>
            <p className="text-xs text-gray-600">Identifying</p>
          </div>
          <div
            className={`flex flex-col items-center ${
              progress?.stage === 'analyzing' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="text-2xl mb-1">🎯</div>
            <p className="text-xs text-gray-600">Analyzing</p>
          </div>
          <div
            className={`flex flex-col items-center ${
              progress?.stage === 'estimating' ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className="text-2xl mb-1">🍬</div>
            <p className="text-xs text-gray-600">Estimating</p>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mt-8">
          <Loader2 className="w-6 h-6 text-green-500 animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
}
