// Fruit type definitions

export interface Fruit {
  id: string;
  name: string;
  emoji: string;
  avgSweetness: number; // 0-100
  aliases: string[]; // For AI recognition
}

export interface FruitIdentification {
  fruit: string;
  variety?: string;
  emoji: string;
  confidence: number; // 0-100
  reasoning: string;
}

export interface RipenessLevel {
  level: 'unripe' | 'perfect' | 'overripe';
  score: number; // 0-100
  emoji: string; // 🔴 🟢 🟡
  indicators: string[];
}

export interface QualityAssessment {
  score: number; // 0-100
  defects: string[];
  freshness: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface VisualAssessment {
  color: string;
  texture: string;
  blemishes: string;
}

export interface RipenessAnalysis {
  ripeness: RipenessLevel;
  quality: QualityAssessment;
  visual_assessment: VisualAssessment;
}

export interface SweetnessScore {
  score: number; // 0-100
  emoji: string; // 😞 😐 🙂 😋 🤩
  label: string; // "Very Sweet"
  brix_estimate?: string; // "15-18° Brix"
  compared_to_average?: string;
}

export interface Recommendation {
  text: string;
  emoji: string;
  alternatives?: string[];
}

export interface SweetnessEstimate {
  sweetness: SweetnessScore;
  recommendation: Recommendation;
  taste_notes?: string;
}

export interface FruitAnalysis {
  fruit: FruitIdentification;
  ripeness: RipenessAnalysis;
  sweetness: SweetnessEstimate;
  timestamp: string;
}

export interface AnalysisError {
  error: string;
  code?: string;
  retry?: boolean;
}
