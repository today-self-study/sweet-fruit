import Anthropic from '@anthropic-ai/sdk';

export class ClaudeClient {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-haiku-3.5-20241022') {
    this.client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });
    this.model = model;
  }

  /**
   * Send a message to Claude with optional image
   */
  async sendMessage(
    prompt: string,
    imageData?: string,
    maxTokens: number = 1024
  ): Promise<string> {
    try {
      const content: any[] = [];

      // Add image if provided
      if (imageData) {
        // Remove data URL prefix if present
        const base64Data = imageData.includes(',')
          ? imageData.split(',')[1]
          : imageData;

        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64Data
          }
        });
      }

      // Add text prompt
      content.push({
        type: 'text',
        text: prompt
      });

      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content
          }
        ]
      });

      // Extract text from response
      const textContent = response.content.find((block) => block.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        throw new Error('No text content in response');
      }

      return textContent.text;
    } catch (error: any) {
      console.error('Claude API Error:', error);
      throw new Error(`Claude API failed: ${error.message}`);
    }
  }

  /**
   * Parse JSON response from Claude, handling markdown code blocks and extra text
   */
  parseJsonResponse<T>(response: string): T {
    try {
      // Remove markdown code blocks if present
      let cleaned = response.trim();

      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Find the JSON object - look for balanced braces
      const firstBrace = cleaned.indexOf('{');
      if (firstBrace === -1) {
        throw new Error('No JSON object found in response');
      }

      // Find matching closing brace
      let braceCount = 0;
      let lastBrace = -1;
      for (let i = firstBrace; i < cleaned.length; i++) {
        if (cleaned[i] === '{') braceCount++;
        if (cleaned[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            lastBrace = i;
            break;
          }
        }
      }

      if (lastBrace === -1) {
        throw new Error('Unbalanced braces in JSON response');
      }

      // Extract just the JSON object
      const jsonString = cleaned.substring(firstBrace, lastBrace + 1);
      return JSON.parse(jsonString);
    } catch (error: any) {
      console.error('JSON Parse Error:', error);
      console.error('Raw response:', response);
      throw new Error(`Failed to parse JSON response: ${error.message}`);
    }
  }

  /**
   * Send message and parse JSON response
   */
  async sendMessageJson<T>(
    prompt: string,
    imageData?: string,
    maxTokens: number = 1024
  ): Promise<T> {
    const response = await this.sendMessage(prompt, imageData, maxTokens);
    return this.parseJsonResponse<T>(response);
  }
}

// Helper to validate API key format
export function isValidApiKey(apiKey: string): boolean {
  return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
}

// Get API key from localStorage or env
export function getStoredApiKey(): string | null {
  // Try localStorage first (user-provided key)
  const stored = localStorage.getItem('anthropic_api_key');
  if (stored) return stored;

  // Fallback to environment variable (if set at build time)
  return import.meta.env.VITE_ANTHROPIC_API_KEY || null;
}

// Store API key in localStorage
export function storeApiKey(apiKey: string): void {
  localStorage.setItem('anthropic_api_key', apiKey);
}

// Remove API key from localStorage
export function clearApiKey(): void {
  localStorage.removeItem('anthropic_api_key');
}
