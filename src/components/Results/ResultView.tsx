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

  const { fruit, ripeness, sweetness, overall_quality } = analysis;

  // Determine background color based on overall quality
  const getBgGradient = (score: number) => {
    if (score < 30) return 'from-red-100 to-red-200'; // Inedible - red
    if (score < 50) return 'from-orange-100 to-red-100'; // Poor - orange/red
    if (score < 70) return 'from-yellow-100 to-orange-100'; // Fair - yellow/orange
    if (score < 85) return 'from-green-100 to-yellow-100'; // Good - green/yellow
    return 'from-green-200 to-emerald-200'; // Excellent - bright green
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBgGradient(
        overall_quality.score
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

        {/* Overall Quality Score - MAIN */}
        <div className="bg-white shadow-xl px-6 py-8 text-center border-t-2 border-gray-100">
          <div className="text-8xl mb-4">{overall_quality.emoji}</div>
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {overall_quality.score}
          </div>
          <p className="text-xl text-gray-600 mb-4">{t('results.overallQuality').toUpperCase()}</p>
          <p className="text-lg font-semibold text-gray-700 mb-6">
            {t(`quality.${overall_quality.grade}`)}
          </p>

          {/* Ripeness Indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">{ripeness.ripeness.emoji}</span>
            <span className="text-gray-700 font-medium capitalize">
              {ripeness.ripeness.level} {t('results.ripeness')}
            </span>
          </div>

          {/* Recommendation - Based on Overall Quality */}
          <div className={`${
            overall_quality.score < 30
              ? 'bg-red-50 border-red-200'
              : overall_quality.score < 50
              ? 'bg-orange-50 border-orange-200'
              : 'bg-green-50 border-green-200'
          } border rounded-lg p-4`}>
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
                {/* Sweetness Score - Now in Details */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-xl">{sweetness.sweetness.emoji}</span>
                    {t('results.sweetness')}
                  </h4>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${sweetness.sweetness.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {sweetness.sweetness.score}/100
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{sweetness.sweetness.label}</p>
                </div>

                {/* Quality Score */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('results.quality')} Score
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
                    {t('results.visualAssessment')}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('results.color')}: {ripeness.visual_assessment.color}</li>
                    <li>• {t('results.texture')}: {ripeness.visual_assessment.texture}</li>
                    <li>• {t('results.blemishes')}: {ripeness.visual_assessment.blemishes}</li>
                  </ul>
                </div>

                {/* Defects */}
                {ripeness.quality.defects.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                      <span>⚠️</span>
                      {t('results.defects')} ({ripeness.quality.defects.length})
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
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
                      {t('results.tasteNotes')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {sweetness.taste_notes}
                    </p>
                  </div>
                )}

                {/* Freshness */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('results.freshness')}
                  </h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {t(`freshness.${ripeness.quality.freshness}`)}
                  </p>
                </div>
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
