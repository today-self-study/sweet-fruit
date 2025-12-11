import { useTranslation } from 'react-i18next';
import { FruitAnalysis } from '../../types/fruit';
import { Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultViewProps {
  analysis: FruitAnalysis;
  onReset: () => void;
}

export function ResultView({ analysis, onReset }: ResultViewProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  const { fruit, ripeness, sweetness } = analysis;

  // Determine background color based on sweetness
  const getBgGradient = (score: number) => {
    if (score <= 40) return 'from-gray-100 to-gray-200';
    if (score <= 60) return 'from-yellow-100 to-yellow-200';
    if (score <= 80) return 'from-orange-100 to-orange-200';
    return 'from-green-100 to-yellow-200';
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBgGradient(
        sweetness.sweetness.score
      )} flex items-center justify-center p-4`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        {/* Fruit Info */}
        <div className="bg-white rounded-t-3xl shadow-xl p-6 text-center">
          <div className="text-7xl mb-4 animate-bounce">{fruit.emoji}</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {fruit.fruit}
          </h2>
          {fruit.variety && (
            <p className="text-gray-600 text-sm mb-2">{fruit.variety}</p>
          )}
          <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-600">
            {fruit.confidence}% confident
          </div>
        </div>

        {/* Sweetness Score */}
        <div className="bg-white shadow-xl px-6 py-8 text-center border-t-2 border-gray-100">
          <div className="text-8xl mb-4">{sweetness.sweetness.emoji}</div>
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {sweetness.sweetness.score}
          </div>
          <p className="text-xl text-gray-600 mb-4">{t('results.sweetness').toUpperCase()}</p>
          <p className="text-lg font-semibold text-gray-700 mb-6">
            {sweetness.sweetness.label}
          </p>

          {/* Ripeness Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">{ripeness.ripeness.emoji}</span>
            <span className="text-gray-700 font-medium capitalize">
              {ripeness.ripeness.level} {t('results.ripeness')}
            </span>
          </div>

          {/* Recommendation */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{sweetness.recommendation.emoji}</span>
              <span className="font-semibold text-gray-800">
                {t('results.recommendation')}
              </span>
            </div>
            <p className="text-gray-700">{sweetness.recommendation.text}</p>
          </div>
        </div>

        {/* Details Toggle */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-white shadow-xl px-6 py-4 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition-colors border-t-2 border-gray-100"
        >
          <span className="font-medium">
            {showDetails ? t('results.hideDetails') : t('results.showDetails')}
          </span>
          {showDetails ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* Expandable Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white shadow-xl overflow-hidden"
            >
              <div className="p-6 space-y-4 border-t-2 border-gray-100">
                {/* Quality Score */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Quality Score
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${ripeness.quality.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {ripeness.quality.score}/100
                    </span>
                  </div>
                </div>

                {/* Visual Assessment */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Visual Assessment
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Color: {ripeness.visual_assessment.color}</li>
                    <li>• Texture: {ripeness.visual_assessment.texture}</li>
                    <li>• Blemishes: {ripeness.visual_assessment.blemishes}</li>
                  </ul>
                </div>

                {/* Defects */}
                {ripeness.quality.defects.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Defects Found
                    </h4>
                    <ul className="text-sm text-red-600 space-y-1">
                      {ripeness.quality.defects.map((defect, i) => (
                        <li key={i}>• {defect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Taste Notes */}
                {sweetness.taste_notes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Taste Notes
                    </h4>
                    <p className="text-sm text-gray-600">
                      {sweetness.taste_notes}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <button
          onClick={onReset}
          className="w-full bg-white rounded-b-3xl shadow-xl px-6 py-4 text-green-600 hover:bg-green-50 font-semibold transition-colors flex items-center justify-center gap-2 border-t-2 border-gray-100"
        >
          <Camera className="w-5 h-5" />
          {t('results.scanAnother')}
        </button>
      </motion.div>
    </div>
  );
}
