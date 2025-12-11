import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, Loader2 } from 'lucide-react';
import { processImageForAI, validateImageFile } from '../../services/imageProcessor';

interface CameraViewProps {
  onImageCapture: (imageData: string) => void;
  isProcessing?: boolean;
}

export function CameraView({ onImageCapture, isProcessing }: CameraViewProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    try {
      setIsCompressing(true);

      // Process and compress image
      const imageData = await processImageForAI(file);

      onImageCapture(imageData);
    } catch (err: any) {
      setError(err.message || 'Failed to process image');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isLoading = isCompressing || isProcessing;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">🍓</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t('app.title')}
          </h1>
          <p className="text-gray-600">
            {t('app.subtitle')}
          </p>
        </div>

        {/* Visual Cue */}
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <div className="flex items-center justify-center gap-3 text-gray-700 mb-4">
            <span className="text-3xl">📸</span>
            <span className="text-lg font-medium">{t('camera.title')}</span>
          </div>
          <div className="flex justify-center gap-4 text-4xl">
            🍎 🍌 🍊 🍇 🍓 🍉
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleUploadClick}
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-full transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                {isCompressing ? t('camera.compressing') : t('camera.analyzing')}
              </>
            ) : (
              <>
                <Upload className="w-6 h-6" />
                {t('camera.uploadButton')}
              </>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-white/50 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 <strong>{t('camera.tip')}:</strong> {t('camera.tipText')}
          </p>
        </div>
      </div>
    </div>
  );
}
