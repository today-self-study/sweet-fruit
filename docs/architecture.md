# 🍓 Sweet Fruit - Simplified Architecture

## Overview

**100% 클라이언트 사이드 Multi-Agent 구조**로 GitHub Pages에서 직접 서비스 가능한 심플한 아키텍처

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│              User's Mobile Browser                   │
│  ┌────────────────────────────────────────────────┐ │
│  │         React PWA (GitHub Pages)               │ │
│  │                                                 │ │
│  │  ┌──────────────┐                              │ │
│  │  │  Camera UI   │  📸 Take Photo               │ │
│  │  └──────┬───────┘                              │ │
│  │         │                                       │ │
│  │         ▼                                       │ │
│  │  ┌──────────────────────────┐                  │ │
│  │  │  Image Compressor        │                  │ │
│  │  │  (browser-image-comp)    │                  │ │
│  │  └──────┬───────────────────┘                  │ │
│  │         │                                       │ │
│  │         ▼                                       │ │
│  │  ┌──────────────────────────────────────────┐  │ │
│  │  │   Multi-Agent Orchestrator               │  │ │
│  │  │                                           │  │ │
│  │  │  ┌────────────────────────────────────┐  │  │ │
│  │  │  │  Agent 1: Fruit Identifier 🔍     │  │  │ │
│  │  │  │  (Claude Haiku 3.5 + Vision)      │  │  │ │
│  │  │  │  → Identifies fruit type          │  │  │ │
│  │  │  └────────┬───────────────────────────┘  │  │ │
│  │  │           │                               │  │ │
│  │  │           ▼                               │  │ │
│  │  │  ┌────────────────────────────────────┐  │  │ │
│  │  │  │  Agent 2: Ripeness Analyzer 🎯    │  │  │ │
│  │  │  │  (Claude Haiku 3.5 + Vision)      │  │  │ │
│  │  │  │  → Ripeness, bruising, quality    │  │  │ │
│  │  │  └────────┬───────────────────────────┘  │  │ │
│  │  │           │                               │  │ │
│  │  │           ▼                               │  │ │
│  │  │  ┌────────────────────────────────────┐  │  │ │
│  │  │  │  Agent 3: Sweetness Estimator 🍬  │  │  │ │
│  │  │  │  (Claude Haiku 3.5)               │  │  │ │
│  │  │  │  → Sweetness score 0-100          │  │  │ │
│  │  │  └────────────────────────────────────┘  │  │ │
│  │  └──────────────────────────────────────────┘  │ │
│  │         │                                       │ │
│  │         ▼                                       │ │
│  │  ┌──────────────┐                              │ │
│  │  │ Results View │  😋 Display Results          │ │
│  │  └──────────────┘                              │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                      │
                      │ HTTPS (Direct API Calls)
                      ▼
┌─────────────────────────────────────────────────────┐
│           Anthropic Claude API                       │
│         (claude-haiku-3.5-20241022)                  │
│                                                      │
│  • $0.80 per million input tokens                   │
│  • $4 per million output tokens                     │
│  • Vision capability included                       │
│  • $5 free credits for new users                    │
└─────────────────────────────────────────────────────┘
```

---

## Multi-Agent Architecture

### Agent 1: Fruit Identifier 🔍
**Role**: Identify the type of fruit from the image

**Input**:
- Compressed fruit image (base64)

**Prompt Template**:
```
You are a fruit identification expert. Analyze this image and identify the fruit.

Rules:
- Respond ONLY with valid JSON
- If multiple fruits, identify the most prominent one
- Include confidence score (0-100)

Expected fruits: apple, banana, orange, grape, strawberry, watermelon,
pineapple, mango, kiwi, peach, pear, cherry, blueberry, raspberry,
lemon, lime, papaya, dragon fruit, passion fruit, pomegranate

Response format:
{
  "fruit": "apple",
  "variety": "red delicious" (optional),
  "emoji": "🍎",
  "confidence": 95,
  "reasoning": "Red skin, round shape, stem visible"
}

If no fruit detected:
{
  "fruit": "unknown",
  "confidence": 0,
  "error": "No fruit detected in image"
}
```

**Output**: JSON with fruit type, emoji, confidence

---

### Agent 2: Ripeness Analyzer 🎯
**Role**: Analyze ripeness, bruising, and overall quality

**Input**:
- Image
- Identified fruit type from Agent 1

**Prompt Template**:
```
You are a fruit quality expert analyzing a {fruit_name}.

Analyze this {fruit_name} image for:
1. Ripeness level (unripe/perfect/overripe)
2. Physical damage (bruising, cuts, mold)
3. Freshness indicators (color, texture, spots)

Rules:
- Respond ONLY with valid JSON
- Score quality 0-100 (100 = perfect condition)
- Be specific about visual defects

Response format:
{
  "ripeness": {
    "level": "perfect",
    "score": 85,
    "emoji": "🟢",
    "indicators": ["uniform color", "firm appearance", "no brown spots"]
  },
  "quality": {
    "score": 90,
    "defects": [],
    "freshness": "excellent"
  },
  "visual_assessment": {
    "color": "vibrant red",
    "texture": "smooth and firm",
    "blemishes": "none visible"
  }
}

Ripeness levels:
- unripe: 🔴 (needs time to ripen)
- perfect: 🟢 (ready to eat now)
- overripe: 🟡 (eat soon or use in cooking)
```

**Output**: JSON with ripeness, quality, visual assessment

---

### Agent 3: Sweetness Estimator 🍬
**Role**: Estimate sweetness based on fruit type and ripeness

**Input**:
- Fruit type from Agent 1
- Ripeness data from Agent 2

**Prompt Template**:
```
You are a fruit sweetness expert. Based on the fruit type and ripeness,
estimate sweetness level.

Input:
- Fruit: {fruit_name}
- Ripeness: {ripeness_level} ({ripeness_score}/100)
- Quality: {quality_score}/100

Known average sweetness levels (Brix scale reference):
- Apple: 10-15° Brix (sweetness ~70)
- Banana: 12-18° Brix (sweetness ~75)
- Orange: 10-15° Brix (sweetness ~70)
- Grape: 15-20° Brix (sweetness ~85)
- Strawberry: 8-12° Brix (sweetness ~65)
- Watermelon: 10-12° Brix (sweetness ~65)
- Pineapple: 12-16° Brix (sweetness ~75)
- Mango: 15-20° Brix (sweetness ~85)

Rules:
- Perfect ripeness = maximum sweetness for that fruit
- Unripe = 60-80% of maximum sweetness
- Overripe = 90-110% of maximum (sweeter but mushy)
- Respond ONLY with valid JSON

Response format:
{
  "sweetness": {
    "score": 85,
    "emoji": "😋",
    "label": "Very Sweet",
    "brix_estimate": "15-18° Brix",
    "compared_to_average": "above average"
  },
  "recommendation": {
    "text": "Perfect for eating fresh",
    "emoji": "🍴",
    "alternatives": ["make smoothie", "add to fruit salad"]
  },
  "taste_notes": "Sweet with slight tartness, juicy"
}

Emoji mapping:
- 0-20: 😞 "Not Sweet"
- 21-40: 😐 "Slightly Sweet"
- 41-60: 🙂 "Moderately Sweet"
- 61-80: 😋 "Sweet"
- 81-100: 🤩 "Very Sweet"
```

**Output**: JSON with sweetness score, recommendation, taste notes

---

## Tech Stack (Simplified)

### Frontend Only (GitHub Pages Compatible)
```json
{
  "framework": "React 18 + TypeScript",
  "build": "Vite 5",
  "styling": "Tailwind CSS 3",
  "state": "React Context + Hooks",
  "icons": "Lucide React",
  "animations": "Framer Motion",
  "pwa": "vite-plugin-pwa",
  "imageProcessing": "browser-image-compression",
  "ai": "@anthropic-ai/sdk"
}
```

### AI Service
- **Provider**: Anthropic Claude API
- **Model**: `claude-haiku-3.5-20241022`
- **Cost**: $0.80 input / $4 output per million tokens
- **Free Credits**: $5 for new users (≈6,250 image analyses)

### Hosting
- **Primary**: GitHub Pages (Free, HTTPS, CDN)
- **Portable**: Can deploy to Vercel, Netlify, Cloudflare Pages

---

## Project Structure (Simplified)

```
sweet-fruit/
├── src/
│   ├── agents/
│   │   ├── FruitIdentifierAgent.ts    # Agent 1
│   │   ├── RipenessAnalyzerAgent.ts   # Agent 2
│   │   ├── SweetnessEstimatorAgent.ts # Agent 3
│   │   └── AgentOrchestrator.ts       # Coordinates agents
│   ├── components/
│   │   ├── Camera/
│   │   │   ├── CameraView.tsx
│   │   │   └── PhotoCapture.tsx
│   │   └── Results/
│   │       ├── ResultCard.tsx
│   │       └── SweetnessDisplay.tsx
│   ├── services/
│   │   ├── claudeClient.ts            # Anthropic API client
│   │   └── imageProcessor.ts          # Image compression
│   ├── config/
│   │   └── prompts.ts                 # Agent prompts
│   ├── types/
│   │   ├── agent.ts
│   │   └── fruit.ts
│   └── App.tsx
├── public/
│   └── manifest.json
├── .env.example                       # API key template
├── vite.config.ts
└── package.json
```

---

## Agent Orchestrator Flow

```typescript
// Simplified orchestrator logic
class AgentOrchestrator {
  async analyzeImage(imageData: string): Promise<FruitAnalysis> {
    // Stage 1: Identify fruit
    const identification = await this.fruitIdentifier.analyze(imageData);

    if (identification.confidence < 70) {
      return this.handleLowConfidence(identification);
    }

    // Stage 2: Analyze ripeness (parallel ready but sequential for simplicity)
    const ripeness = await this.ripenessAnalyzer.analyze(
      imageData,
      identification.fruit
    );

    // Stage 3: Estimate sweetness (no image needed, faster)
    const sweetness = await this.sweetnessEstimator.estimate(
      identification,
      ripeness
    );

    return this.combineResults(identification, ripeness, sweetness);
  }
}
```

---

## API Key Management

### Development
```env
# .env.local (gitignored)
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### Production (GitHub Pages)
Users provide their own API key:
1. **Option A**: Enter API key in app (stored in localStorage)
2. **Option B**: Use demo mode with limited queries
3. **Option C**: Build-time environment variable (less secure)

**Recommended: Option A** - User provides their own key
- Instructions to get free $5 credits from Anthropic
- Key stored locally, never sent to any server except Anthropic
- Clear privacy notice

---

## Cost Analysis

### Per Analysis Estimate
- **Agent 1 (Identifier)**: ~200 input tokens + ~100 output = $0.0006
- **Agent 2 (Ripeness)**: ~300 input tokens + ~150 output = $0.0009
- **Agent 3 (Sweetness)**: ~200 input tokens + ~100 output = $0.0004

**Total per analysis**: ~$0.002 (0.2 cents)

### With $5 Free Credits
- **~2,500 fruit analyses** possible with free credits
- After free credits: ~500 analyses per $1

---

## Deployment Strategy

### GitHub Pages (Primary)
```bash
# Build for production
npm run build

# Deploy to gh-pages branch
npm run deploy
```

### Alternative Platforms
Same build works on:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **Cloudflare Pages**: Connect GitHub repo
- **Firebase Hosting**: `firebase deploy`

---

## Security & Privacy

### API Key Security
✅ **DO**:
- Store user's API key in localStorage only
- Use HTTPS (enforced by GitHub Pages)
- Clear instructions for users to get their own key
- Option to delete key anytime

❌ **DON'T**:
- Commit API keys to repository
- Send API keys to any server (except Anthropic)
- Use shared/embedded API keys

### Image Privacy
- Images processed in browser
- Sent only to Anthropic API (HTTPS)
- Not stored anywhere
- Deleted from memory after analysis

---

## Advantages of This Architecture

1. **🎯 Simple**: No backend server needed
2. **💰 Cost-Effective**: Pay only for what you use
3. **🔒 Private**: Data never touches our servers
4. **⚡ Fast**: Direct API calls, no proxy delays
5. **🌍 Portable**: Deploy anywhere static sites work
6. **🛠️ Maintainable**: Single codebase, no infrastructure
7. **📱 Offline-Ready**: PWA with service workers
8. **🔧 Scalable**: User's API keys = infinite scale

---

## Future Enhancements (Optional)

- **Proxy Service**: Add optional backend for users without API keys
- **Image Caching**: Hash images to avoid duplicate analyses
- **Batch Mode**: Analyze multiple fruits at once
- **Custom Models**: Fine-tune Claude for better accuracy
- **Feedback Loop**: Collect user corrections to improve prompts

---

## References

- [Anthropic Claude API Pricing](https://www.anthropic.com/pricing)
- [Claude API Documentation](https://docs.anthropic.com/)
- [Vision Capabilities Guide](https://docs.anthropic.com/en/docs/build-with-claude/vision)
- [GitHub Pages Deployment](https://pages.github.com/)

---

*Version: 2.0 (Simplified Architecture)*
*Last Updated: 2025-12-11*
