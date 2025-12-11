// Agent type definitions

import { FruitIdentification, RipenessAnalysis, SweetnessEstimate } from './fruit';

export interface AgentConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AgentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  rawResponse?: string;
}

export type FruitIdentifierResponse = AgentResponse<FruitIdentification>;
export type RipenessAnalyzerResponse = AgentResponse<RipenessAnalysis>;
export type SweetnessEstimatorResponse = AgentResponse<SweetnessEstimate>;

export interface BaseAgentInterface {
  config: AgentConfig;
  callClaude(image: string | null, prompt: string): Promise<any>;
}

export interface OrchestratorProgress {
  stage: 'identifying' | 'analyzing' | 'estimating' | 'complete' | 'error';
  message: string;
  progress: number; // 0-100
}
