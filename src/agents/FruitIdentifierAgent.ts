import { BaseAgent } from './BaseAgent';
import { FruitIdentification } from '../types/fruit';
import { AgentConfig, FruitIdentifierResponse } from '../types/agent';
import { getFruitIdentifierPrompt } from '../config/prompts';

/**
 * Agent 1: Identifies the type of fruit from an image
 */
export class FruitIdentifierAgent extends BaseAgent {
  private language: string;

  constructor(config: AgentConfig, language: string = 'en') {
    super(config);
    this.language = language;
  }

  /**
   * Analyze image and identify the fruit
   */
  async analyze(imageData: string): Promise<FruitIdentifierResponse> {
    try {
      console.log('🔍 Agent 1: Identifying fruit...');

      const prompt = getFruitIdentifierPrompt(this.language);
      const response = await this.callClaude<FruitIdentification>(
        imageData,
        prompt
      );

      // Validate response
      this.validateResponse(response, ['fruit', 'emoji', 'confidence']);

      // Check confidence threshold
      if (response.confidence < 70) {
        return {
          success: false,
          error: 'Low confidence in fruit identification. Please take a clearer photo.',
          data: response
        };
      }

      console.log(`✓ Identified: ${response.fruit} (${response.confidence}% confidence)`);

      return {
        success: true,
        data: response
      };
    } catch (error: any) {
      console.error('Fruit identification failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to identify fruit'
      };
    }
  }
}
