import { BaseAgent } from './BaseAgent';
import { RipenessAnalysis } from '../types/fruit';
import { AgentConfig, RipenessAnalyzerResponse } from '../types/agent';
import { getRipenessAnalyzerPrompt } from '../config/prompts';

/**
 * Agent 2: Analyzes ripeness and quality of the fruit
 */
export class RipenessAnalyzerAgent extends BaseAgent {
  private language: string;

  constructor(config: AgentConfig, language: string = 'en') {
    super(config);
    this.language = language;
  }

  /**
   * Analyze fruit ripeness and quality
   */
  async analyze(
    imageData: string,
    fruitName: string
  ): Promise<RipenessAnalyzerResponse> {
    try {
      console.log(`🎯 Agent 2: Analyzing ${fruitName} ripeness...`);

      const prompt = getRipenessAnalyzerPrompt(fruitName, this.language);
      const response = await this.callClaude<RipenessAnalysis>(imageData, prompt);

      // Validate response structure
      this.validateResponse(response, ['ripeness', 'quality', 'visual_assessment']);
      this.validateResponse(response.ripeness, ['level', 'score', 'emoji']);
      this.validateResponse(response.quality, ['score', 'defects', 'freshness']);

      console.log(
        `✓ Ripeness: ${response.ripeness.level} (${response.ripeness.score}/100)`
      );
      console.log(`✓ Quality: ${response.quality.score}/100`);

      return {
        success: true,
        data: response
      };
    } catch (error: any) {
      console.error('Ripeness analysis failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to analyze ripeness'
      };
    }
  }
}
