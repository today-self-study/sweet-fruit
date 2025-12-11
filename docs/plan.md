# 🍓 Sweet Fruit - Implementation Plan (Simplified)

## Architecture Overview

**Complete Client-Side Multi-Agent System** - GitHub Pages 호환, 서버 불필요

```
Mobile Browser (GitHub Pages)
    │
    ├─ React PWA
    │   ├─ Camera Component 📸
    │   ├─ Image Compressor
    │   └─ Multi-Agent Orchestrator
    │       ├─ Agent 1: Fruit Identifier 🔍
    │       ├─ Agent 2: Ripeness Analyzer 🎯
    │       └─ Agent 3: Sweetness Estimator 🍬
    │
    └─ Direct HTTPS → Anthropic Claude API
                      (claude-haiku-3.5)
```

---

## Tech Stack (Simplified)

### Frontend (GitHub Pages)
- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Styling**: Tailwind CSS 3
- **AI SDK**: `@anthropic-ai/sdk`
- **Image**: `browser-image-compression`
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa

### AI Service
- **Provider**: Anthropic Claude
- **Model**: claude-haiku-3.5-20241022
- **Cost**: $0.002 per analysis (~2,500 analyses with $5 free credits)
- **Docs**: https://docs.anthropic.com/

---

## Project Structure

```
sweet-fruit/
├── src/
│   ├── agents/                    # 🤖 Multi-Agent System
│   │   ├── BaseAgent.ts           # Abstract agent class
│   │   ├── FruitIdentifierAgent.ts    # Agent 1: What fruit?
│   │   ├── RipenessAnalyzerAgent.ts   # Agent 2: How ripe?
│   │   ├── SweetnessEstimatorAgent.ts # Agent 3: How sweet?
│   │   └── AgentOrchestrator.ts       # Coordinates all agents
│   ├── components/
│   │   ├── Camera/
│   │   │   ├── CameraView.tsx
│   │   │   └── PhotoCapture.tsx
│   │   ├── Results/
│   │   │   ├── ResultCard.tsx
│   │   │   └─ SweetnessDisplay.tsx
│   │   └── Settings/
│   │       └── ApiKeyInput.tsx        # User provides API key
│   ├── services/
│   │   ├── claudeClient.ts            # Anthropic API wrapper
│   │   └── imageProcessor.ts          # Image compression
│   ├── config/
│   │   ├── prompts.ts                 # Agent prompt templates
│   │   └── fruitDatabase.ts           # Fruit metadata
│   ├── types/
│   │   ├── agent.ts
│   │   ├── fruit.ts
│   │   └── analysis.ts
│   ├── hooks/
│   │   ├── useAgentAnalysis.ts
│   │   └── useApiKey.ts
│   └── App.tsx
├── public/
│   ├── manifest.json
│   └── icons/
├── .env.example
├── package.json
└── vite.config.ts
```

---

## Multi-Agent Implementation

### Agent 1: Fruit Identifier 🔍

**File**: `src/agents/FruitIdentifierAgent.ts`

```typescript
export class FruitIdentifierAgent extends BaseAgent {
  async analyze(image: string): Promise<FruitIdentification> {
    const prompt = `You are a fruit identification expert.

Analyze this image and identify the fruit.

Rules:
- Respond ONLY with valid JSON
- Include confidence score (0-100)
- If multiple fruits, pick most prominent

Known fruits: apple, banana, orange, grape, strawberry,
watermelon, pineapple, mango, kiwi, peach, pear, cherry

Response format:
{
  "fruit": "apple",
  "emoji": "🍎",
  "confidence": 95,
  "reasoning": "Red skin, round shape"
}`;

    return this.callClaude(image, prompt);
  }
}
```

### Agent 2: Ripeness Analyzer 🎯

**File**: `src/agents/RipenessAnalyzerAgent.ts`

```typescript
export class RipenessAnalyzerAgent extends BaseAgent {
  async analyze(
    image: string,
    fruitType: string
  ): Promise<RipenessAnalysis> {
    const prompt = `You are analyzing a ${fruitType}.

Assess:
1. Ripeness: unripe/perfect/overripe
2. Quality: 0-100 score
3. Visual defects: bruising, spots, mold

Response format:
{
  "ripeness": {
    "level": "perfect",
    "score": 85,
    "emoji": "🟢"
  },
  "quality": {
    "score": 90,
    "defects": []
  }
}`;

    return this.callClaude(image, prompt);
  }
}
```

### Agent 3: Sweetness Estimator 🍬

**File**: `src/agents/SweetnessEstimatorAgent.ts`

```typescript
export class SweetnessEstimatorAgent extends BaseAgent {
  async estimate(
    fruit: FruitIdentification,
    ripeness: RipenessAnalysis
  ): Promise<SweetnessEstimate> {
    const prompt = `Estimate sweetness for ${fruit.fruit}.

Ripeness: ${ripeness.ripeness.level} (${ripeness.ripeness.score}/100)
Quality: ${ripeness.quality.score}/100

Average sweetness (Brix):
- Apple: 70, Banana: 75, Orange: 70, Grape: 85
- Mango: 85, Strawberry: 65, Watermelon: 65

Rules:
- Perfect ripeness = max sweetness
- Unripe = 60-80% of max
- Overripe = 90-110% of max

Response:
{
  "sweetness": {
    "score": 85,
    "emoji": "😋",
    "label": "Very Sweet"
  },
  "recommendation": {
    "text": "Perfect for eating",
    "emoji": "🍴"
  }
}`;

    return this.callClaude(null, prompt); // No image needed
  }
}
```

### Agent Orchestrator

**File**: `src/agents/AgentOrchestrator.ts`

```typescript
export class AgentOrchestrator {
  private identifier = new FruitIdentifierAgent();
  private ripenessAnalyzer = new RipenessAnalyzerAgent();
  private sweetnessEstimator = new SweetnessEstimatorAgent();

  async analyzeImage(imageData: string): Promise<FruitAnalysis> {
    try {
      // Stage 1: Identify fruit
      const identification = await this.identifier.analyze(imageData);

      if (identification.confidence < 70) {
        throw new Error('Fruit not clearly identified');
      }

      // Stage 2: Analyze ripeness
      const ripeness = await this.ripenessAnalyzer.analyze(
        imageData,
        identification.fruit
      );

      // Stage 3: Estimate sweetness
      const sweetness = await this.sweetnessEstimator.estimate(
        identification,
        ripeness
      );

      return {
        fruit: identification,
        ripeness,
        sweetness,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
```

---

## Development Phases (Simplified)

### Phase 1: Core Setup (2 hours)
- [ ] Initialize Vite + React + TypeScript
- [ ] Setup Tailwind CSS
- [ ] Install Anthropic SDK: `npm install @anthropic-ai/sdk`
- [ ] Create folder structure
- [ ] Deploy to GitHub Pages

### Phase 2: Multi-Agent System (4 hours)
- [ ] Create BaseAgent class
- [ ] Implement FruitIdentifierAgent
- [ ] Implement RipenessAnalyzerAgent
- [ ] Implement SweetnessEstimatorAgent
- [ ] Create AgentOrchestrator
- [ ] Test with sample images

### Phase 3: Camera & UI (3 hours)
- [ ] Build camera component
- [ ] Image compression
- [ ] Results display
- [ ] Loading states
- [ ] Error handling

### Phase 4: API Key & Settings (2 hours)
- [ ] API key input component
- [ ] localStorage management
- [ ] Instructions for getting Anthropic API key
- [ ] Demo mode (limited queries)

### Phase 5: PWA & Polish (2 hours)
- [ ] Configure PWA
- [ ] Add app icons
- [ ] Offline support
- [ ] Final testing

**Total: ~13 hours** (vs 62+ hours with backend)

---

## Claude API Integration

### Setup

```bash
npm install @anthropic-ai/sdk
```

### Usage

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: userApiKey, // From localStorage
  dangerouslyAllowBrowser: true // Client-side usage
});

const response = await client.messages.create({
  model: 'claude-haiku-3.5-20241022',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: 'image/jpeg',
            data: base64Image
          }
        },
        {
          type: 'text',
          text: promptText
        }
      ]
    }
  ]
});
```

---

## API Key Management

### User Flow
1. Open app
2. See prompt: "Get your free API key from Anthropic ($5 free credits)"
3. Link to: https://console.anthropic.com/
4. User pastes key into app
5. Key stored in localStorage
6. App ready to use

### Security
- ✅ Key stored locally only
- ✅ HTTPS enforced (GitHub Pages)
- ✅ Never sent to any server except Anthropic
- ✅ Can be deleted anytime
- ✅ Clear privacy policy

---

## Cost Analysis

### Per Analysis
- Agent 1: ~$0.0006
- Agent 2: ~$0.0009
- Agent 3: ~$0.0004
- **Total**: ~$0.002 (0.2 cents)

### Free Credits
- $5 free credits = **~2,500 analyses**
- After free credits: ~500 analyses per $1

### Comparison
- Google Vision API: $1.50 per 1,000 images
- AWS Rekognition: $1.00 per 1,000 images
- **Claude Haiku**: $2.00 per 1,000 images (with multi-agent intelligence)

---

## Deployment

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  },
  "homepage": "https://username.github.io/sweet-fruit"
}

# Deploy
npm run deploy
```

### Alternative Platforms

Same `dist/` folder works on:
- Vercel: `vercel deploy`
- Netlify: Drag & drop `dist/`
- Cloudflare Pages: Connect repo
- Firebase: `firebase deploy`

---

## Performance Optimizations

### Image Compression
```typescript
import imageCompression from 'browser-image-compression';

const compressed = await imageCompression(file, {
  maxSizeMB: 1,
  maxWidthOrHeight: 1024,
  useWebWorker: true
});
```

### Prompt Caching (Future)
```typescript
// Cache system prompts for 90% cost reduction on repeated calls
const response = await client.messages.create({
  system: [
    {
      type: 'text',
      text: systemPrompt,
      cache_control: { type: 'ephemeral' }
    }
  ]
  // ... rest of message
});
```

---

## Error Handling

### Common Scenarios

1. **No Fruit Detected**
   - Agent 1 returns confidence < 70
   - Show: "Please take a photo of a fruit 🍎"

2. **API Key Invalid**
   - 401 error from Anthropic
   - Show: "Please check your API key"

3. **Network Error**
   - Retry 3 times with exponential backoff
   - Show: "Connection lost. Please try again 📶"

4. **Low Quality Image**
   - Agent 2 detects blurry/dark image
   - Show: "Photo is too blurry. Try again! 📸"

---

## Testing Strategy

### Unit Tests
```typescript
describe('FruitIdentifierAgent', () => {
  it('identifies apple correctly', async () => {
    const agent = new FruitIdentifierAgent();
    const result = await agent.analyze(appleImage);
    expect(result.fruit).toBe('apple');
    expect(result.confidence).toBeGreaterThan(85);
  });
});
```

### Integration Tests
```typescript
describe('AgentOrchestrator', () => {
  it('completes full analysis flow', async () => {
    const orchestrator = new AgentOrchestrator();
    const result = await orchestrator.analyzeImage(testImage);
    expect(result.fruit).toBeDefined();
    expect(result.sweetness).toBeDefined();
  });
});
```

---

## Success Criteria (Updated)

### Technical
- ✅ Deploys to GitHub Pages
- ✅ No backend required
- ✅ <3 seconds total analysis time
- ✅ >85% fruit identification accuracy
- ✅ Works offline (after first load)

### Functional
- ✅ User can add their own API key
- ✅ Multi-agent analysis provides detailed results
- ✅ Clear error messages
- ✅ Mobile-optimized UI

### Cost
- ✅ $0.002 per analysis
- ✅ Free for first 2,500 analyses

---

## Advantages Over Previous Architecture

| Aspect | Old (Backend) | New (Client-Side) |
|--------|--------------|-------------------|
| **Complexity** | High (serverless functions) | Low (static site) |
| **Cost** | Server + API costs | API only |
| **Deployment** | Vercel setup | GitHub Pages (free) |
| **Maintenance** | Server monitoring | None needed |
| **Privacy** | Images sent to our server | Direct to Anthropic |
| **Scalability** | Limited by server | Unlimited |
| **Development Time** | 62+ hours | ~13 hours |

---

## Sources

- [Anthropic Claude API Pricing](https://www.anthropic.com/pricing)
- [Anthropic API Pricing Guide 2025](https://www.finout.io/blog/anthropic-api-pricing)
- [Claude API Documentation](https://docs.claude.com/)
- [Best AI APIs 2025](https://aimlapi.com/best-ai-apis-for-free)
- [GitHub Pages Documentation](https://pages.github.com/)

---

*Version: 2.0 (Simplified Multi-Agent Architecture)*
*Last Updated: 2025-12-11*
