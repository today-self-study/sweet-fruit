import { ClaudeClient } from '../services/claudeClient';
import { AgentConfig } from '../types/agent';

/**
 * Base Agent class - All agents extend this
 */
export abstract class BaseAgent {
  protected client: ClaudeClient;
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
    this.client = new ClaudeClient(
      config.apiKey,
      config.model || 'claude-haiku-3.5-20241022'
    );
  }

  /**
   * Call Claude API with image and prompt
   */
  protected async callClaude<T>(
    image: string | null,
    prompt: string
  ): Promise<T> {
    try {
      const maxTokens = this.config.maxTokens || 1024;

      const response = await this.client.sendMessageJson<T>(
        prompt,
        image || undefined,
        maxTokens
      );

      return response;
    } catch (error: any) {
      console.error(`Agent error:`, error);
      throw error;
    }
  }

  /**
   * Validate that required fields exist in response
   */
  protected validateResponse(response: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      if (!(field in response)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
}
