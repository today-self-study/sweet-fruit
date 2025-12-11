import { BaseAgent } from './BaseAgent';
import { FruitIdentification, RipenessAnalysis, SweetnessEstimate } from '../types/fruit';
import { AgentConfig, SweetnessEstimatorResponse } from '../types/agent';
import { getSweetnessEstimatorPrompt } from '../config/prompts';

/**
 * Agent 3: Estimates sweetness based on fruit type and ripeness
 */
export class SweetnessEstimatorAgent extends BaseAgent {
  constructor(config: AgentConfig) {
    super(config);
  }

  /**
   * Estimate sweetness from fruit identification and ripeness data
   */
  async estimate(
    identification: FruitIdentification,
    ripeness: RipenessAnalysis
  ): Promise<SweetnessEstimatorResponse> {
    try {
      console.log(`🍬 Agent 3: Estimating sweetness for ${identification.fruit}...`);

      const prompt = getSweetnessEstimatorPrompt(
        identification.fruit,
        ripeness.ripeness.level,
        ripeness.ripeness.score,
        ripeness.quality.score
      );

      // No image needed for sweetness estimation (text-only)
      const response = await this.callClaude<SweetnessEstimate>(null, prompt);

      // Validate response structure
      this.validateResponse(response, ['sweetness', 'recommendation']);
      this.validateResponse(response.sweetness, ['score', 'emoji', 'label']);
      this.validateResponse(response.recommendation, ['text', 'emoji']);

      console.log(
        `✓ Sweetness: ${response.sweetness.score}/100 ${response.sweetness.emoji}`
      );

      return {
        success: true,
        data: response
      };
    } catch (error: any) {
      console.error('Sweetness estimation failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to estimate sweetness'
      };
    }
  }
}
