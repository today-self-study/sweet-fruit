import { FruitIdentifierAgent } from './FruitIdentifierAgent';
import { RipenessAnalyzerAgent } from './RipenessAnalyzerAgent';
import { SweetnessEstimatorAgent } from './SweetnessEstimatorAgent';
import { FruitAnalysis, OverallQuality } from '../types/fruit';
import { AgentConfig, OrchestratorProgress } from '../types/agent';

export type ProgressCallback = (progress: OrchestratorProgress) => void;

/**
 * Orchestrates the multi-agent analysis workflow
 */
export class AgentOrchestrator {
  private identifier: FruitIdentifierAgent;
  private ripenessAnalyzer: RipenessAnalyzerAgent;
  private sweetnessEstimator: SweetnessEstimatorAgent;

  constructor(apiKey: string, language: string = 'en') {
    const config: AgentConfig = {
      apiKey,
      model: 'claude-3-5-haiku-20241022',
      maxTokens: 1024
    };

    this.identifier = new FruitIdentifierAgent(config, language);
    this.ripenessAnalyzer = new RipenessAnalyzerAgent(config, language);
    this.sweetnessEstimator = new SweetnessEstimatorAgent(config, language);
  }

  /**
   * Run complete analysis pipeline
   */
  async analyzeImage(
    imageData: string,
    onProgress?: ProgressCallback
  ): Promise<FruitAnalysis> {
    try {
      console.log('🚀 Starting multi-agent analysis...');

      // Stage 1: Identify fruit
      onProgress?.({
        stage: 'identifying',
        message: 'Identifying fruit...',
        progress: 10
      });

      const identificationResult = await this.identifier.analyze(imageData);

      if (!identificationResult.success || !identificationResult.data) {
        throw new Error(
          identificationResult.error || 'Failed to identify fruit'
        );
      }

      const identification = identificationResult.data;

      onProgress?.({
        stage: 'identifying',
        message: `Found: ${identification.fruit} ${identification.emoji}`,
        progress: 33
      });

      // Stage 2: Analyze ripeness
      onProgress?.({
        stage: 'analyzing',
        message: 'Analyzing ripeness and quality...',
        progress: 40
      });

      const ripenessResult = await this.ripenessAnalyzer.analyze(
        imageData,
        identification.fruit
      );

      if (!ripenessResult.success || !ripenessResult.data) {
        throw new Error(ripenessResult.error || 'Failed to analyze ripeness');
      }

      const ripeness = ripenessResult.data;

      onProgress?.({
        stage: 'analyzing',
        message: `Ripeness: ${ripeness.ripeness.level} ${ripeness.ripeness.emoji}`,
        progress: 66
      });

      // Stage 3: Estimate sweetness
      onProgress?.({
        stage: 'estimating',
        message: 'Calculating sweetness...',
        progress: 75
      });

      const sweetnessResult = await this.sweetnessEstimator.estimate(
        identification,
        ripeness
      );

      if (!sweetnessResult.success || !sweetnessResult.data) {
        throw new Error(sweetnessResult.error || 'Failed to estimate sweetness');
      }

      const sweetness = sweetnessResult.data;

      onProgress?.({
        stage: 'complete',
        message: 'Analysis complete!',
        progress: 100
      });

      // Calculate overall quality score
      const overallQuality = this.calculateOverallQuality(
        ripeness.quality.score,
        ripeness.ripeness.score,
        ripeness.quality.defects.length,
        ripeness.quality.freshness
      );

      // Combine all results
      const analysis: FruitAnalysis = {
        fruit: identification,
        ripeness,
        sweetness,
        overall_quality: overallQuality,
        timestamp: new Date().toISOString()
      };

      console.log('✅ Multi-agent analysis complete!');
      console.log(`📊 Overall Quality: ${overallQuality.score}/100 (${overallQuality.grade})`);
      return analysis;
    } catch (error: any) {
      console.error('❌ Analysis failed:', error);

      onProgress?.({
        stage: 'error',
        message: error.message || 'Analysis failed',
        progress: 0
      });

      throw error;
    }
  }

  /**
   * Calculate overall quality score based on multiple factors
   */
  private calculateOverallQuality(
    qualityScore: number,
    ripenessScore: number,
    defectCount: number,
    freshness: string
  ): OverallQuality {
    // Base score from quality assessment
    let score = qualityScore;

    // Penalty for defects (곰팡이, 상처 등)
    if (defectCount > 0) {
      score = Math.max(0, score - (defectCount * 15)); // 결함당 -15점
    }

    // Freshness adjustment
    const freshnessMultiplier = {
      'excellent': 1.0,
      'good': 0.9,
      'fair': 0.7,
      'poor': 0.4
    }[freshness] || 0.5;
    score = score * freshnessMultiplier;

    // Ripeness factor (극도로 덜 익었거나 과숙하면 감점)
    if (ripenessScore < 40) {
      score = score * 0.7; // 너무 덜 익음
    } else if (ripenessScore < 60) {
      score = score * 0.85; // 약간 덜 익음
    }

    // Final score
    score = Math.round(Math.max(0, Math.min(100, score)));

    // Determine grade and emoji
    let grade: OverallQuality['grade'];
    let emoji: string;
    let label: string;

    if (score >= 85) {
      grade = 'excellent';
      emoji = '🌟';
      label = 'Excellent Quality';
    } else if (score >= 70) {
      grade = 'good';
      emoji = '😊';
      label = 'Good Quality';
    } else if (score >= 50) {
      grade = 'fair';
      emoji = '😐';
      label = 'Fair Quality';
    } else if (score >= 30) {
      grade = 'poor';
      emoji = '😞';
      label = 'Poor Quality';
    } else {
      grade = 'inedible';
      emoji = '⚠️';
      label = 'Not Recommended';
    }

    return { score, grade, emoji, label };
  }

  /**
   * Quick validation check (useful for testing API key)
   */
  async testConnection(): Promise<boolean> {
    try {
      // Try a simple API call
      await this.identifier.analyze('data:image/jpeg;base64,test');
      return true;
    } catch (error) {
      return false;
    }
  }
}
