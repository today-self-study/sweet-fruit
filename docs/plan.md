# 🍓 Sweet Fruit - Implementation Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   User's Mobile                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          React PWA (Frontend)                  │ │
│  │  ┌─────────────┐  ┌────────────┐             │ │
│  │  │  Camera UI  │  │  Results   │             │ │
│  │  │  Component  │→ │  Display   │             │ │
│  │  └─────────────┘  └────────────┘             │ │
│  │         ↓                ↑                     │ │
│  │  ┌─────────────────────────┐                  │ │
│  │  │   Image Processor       │                  │ │
│  │  │  (Client-side compress) │                  │ │
│  │  └─────────────────────────┘                  │ │
│  │         ↓                ↑                     │ │
│  │  ┌─────────────────────────┐                  │ │
│  │  │   Service Worker        │ (Offline)        │ │
│  │  └─────────────────────────┘                  │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                      ↓ HTTPS
┌─────────────────────────────────────────────────────┐
│              Vercel Edge Network                     │
│  ┌────────────────────────────────────────────────┐ │
│  │      Serverless Functions                      │ │
│  │  ┌──────────────────┐                          │ │
│  │  │  POST /api/analyze│                         │ │
│  │  │   - Validate     │                          │ │
│  │  │   - Optimize     │                          │ │
│  │  │   - Call AI API  │                          │ │
│  │  └──────────────────┘                          │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│          Google Cloud Vision API                     │
│          (Fruit Detection & Classification)          │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack Details

### Frontend

#### Core Framework
- **React 18.2+** with TypeScript 5.0+
  - Hooks-based architecture
  - Strict mode enabled
  - Error boundaries for resilience

#### Build Tool
- **Vite 5.0+**
  - Fast HMR for development
  - Optimized production builds
  - Built-in TypeScript support

#### Styling
- **Tailwind CSS 3.4+**
  - Mobile-first utilities
  - Custom fruit color palette
  - Dark mode support (future)

#### UI Components & Icons
- **Lucide React** - Lightweight icon library
- **Framer Motion** - Smooth animations
- Custom components (no heavy UI library)

#### PWA
- **vite-plugin-pwa**
  - Service worker generation
  - Offline caching strategy
  - Install prompts

#### State Management
- **React Context** + **useReducer**
  - No Redux (keep it simple)
  - Local state for UI
  - Context for app-wide state

### Backend

#### Hosting
- **Vercel**
  - Zero-config deployment
  - Edge network CDN
  - Serverless functions
  - Automatic HTTPS

#### API Runtime
- **Node.js 20.x**
  - Serverless functions
  - Edge middleware for caching

#### AI/ML Service
- **Primary: Google Cloud Vision API**
  - Image labeling
  - Object detection
  - Fruit classification
  - Confidence scores

- **Fallback: Custom TensorFlow.js Model**
  - Client-side inference
  - Pre-trained MobileNet
  - Offline capability

#### Image Processing
- **Sharp** (server-side)
  - Resize and optimize images
  - Format conversion
  - EXIF rotation

- **browser-image-compression** (client-side)
  - Compress before upload
  - Reduce bandwidth usage

---

## Project Structure

```
sweet-fruit/
├── public/
│   ├── icons/              # App icons (PWA)
│   ├── fruits/             # Fruit emoji/icons
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── Camera/
│   │   │   ├── CameraView.tsx
│   │   │   ├── PhotoCapture.tsx
│   │   │   └── FileUpload.tsx
│   │   ├── Results/
│   │   │   ├── ResultCard.tsx
│   │   │   ├── SweetnessDisplay.tsx
│   │   │   ├── FruitInfo.tsx
│   │   │   └── DetailPanel.tsx
│   │   ├── Loading/
│   │   │   ├── Spinner.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── UI/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Container.tsx
│   ├── hooks/
│   │   ├── useCamera.ts
│   │   ├── useImageAnalysis.ts
│   │   └── useHistory.ts
│   ├── services/
│   │   ├── api.ts            # API client
│   │   ├── imageProcessor.ts # Client-side processing
│   │   └── storage.ts        # LocalStorage utils
│   ├── types/
│   │   ├── fruit.ts
│   │   ├── analysis.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── fruitData.ts      # Fruit metadata
│   │   └── validators.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── api/
│   └── analyze.ts            # Vercel serverless function
├── docs/                     # Spec-Kit docs
├── .speckit/                 # Spec-Kit commands
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── vercel.json              # Vercel configuration
```

---

## Development Phases

### Phase 1: Foundation Setup (Week 1)
**Goal**: Project scaffolding and basic infrastructure

#### Tasks:
1. Initialize Vite + React + TypeScript project
2. Setup Tailwind CSS with custom theme
3. Configure PWA plugin
4. Create basic folder structure
5. Setup Vercel project and deployment
6. Configure environment variables

**Deliverable**: Deployable skeleton app

---

### Phase 2: Camera & Upload (Week 1-2)
**Goal**: Photo capture functionality

#### Tasks:
1. Build Camera component
   - Access device camera
   - Handle permissions
   - Capture photo
   - Display preview
2. Build FileUpload component
   - Gallery picker
   - Drag & drop (desktop)
   - File validation
3. Client-side image compression
4. Error handling for camera failures

**Deliverable**: Working photo capture UI

---

### Phase 3: API & AI Integration (Week 2)
**Goal**: Image analysis backend

#### Tasks:
1. Setup Google Cloud Vision API
   - Create project
   - Enable API
   - Generate credentials
2. Build `/api/analyze` endpoint
   - Receive image
   - Call Vision API
   - Process response
   - Map to fruit data
3. Create fruit database/mapping
   - Fruit names
   - Emoji mappings
   - Sweetness data
4. Implement error handling
5. Add response caching

**Deliverable**: Working analysis API

---

### Phase 4: Results Display (Week 2-3)
**Goal**: Beautiful results screen

#### Tasks:
1. Build ResultCard component
   - Sweetness score display
   - Emoji animation
   - Fruit information
2. Build DetailPanel (expandable)
   - Ripeness indicator
   - Recommendations
   - Confidence score
3. Implement color gradients
4. Add smooth transitions
5. Create "Scan Another" flow

**Deliverable**: Complete results UI

---

### Phase 5: Offline & PWA (Week 3)
**Goal**: App-like experience

#### Tasks:
1. Configure service worker
   - Cache static assets
   - Cache API responses
   - Offline fallback
2. Create app manifest
   - Icons (all sizes)
   - Theme colors
   - Display mode
3. Implement install prompt
4. Add offline indicator
5. Test installation flow

**Deliverable**: Installable PWA

---

### Phase 6: Polish & Optimization (Week 3-4)
**Goal**: Production-ready app

#### Tasks:
1. Performance optimization
   - Code splitting
   - Lazy loading
   - Image optimization
   - Bundle analysis
2. Accessibility audit
   - Screen reader testing
   - Keyboard navigation
   - ARIA labels
   - Contrast checking
3. Cross-browser testing
   - iOS Safari
   - Android Chrome
   - Different screen sizes
4. Error handling improvements
5. Loading states refinement

**Deliverable**: Polished, tested app

---

### Phase 7: Testing & Launch (Week 4)
**Goal**: Launch v1.0

#### Tasks:
1. End-to-end testing
2. Performance testing
3. User acceptance testing
4. Bug fixes
5. Documentation
6. Deploy to production
7. Monitor analytics

**Deliverable**: Live application

---

## API Implementation Details

### Endpoint: POST /api/analyze

**File**: `api/analyze.ts`

```typescript
import { ImageAnnotatorClient } from '@google-cloud/vision';
import sharp from 'sharp';

export default async function handler(req, res) {
  // 1. Validate request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Extract image
  const { image, format } = req.body;

  // 3. Optimize image with Sharp
  const buffer = Buffer.from(image, 'base64');
  const optimized = await sharp(buffer)
    .resize(800, 800, { fit: 'inside' })
    .jpeg({ quality: 85 })
    .toBuffer();

  // 4. Call Vision API
  const client = new ImageAnnotatorClient();
  const [result] = await client.labelDetection({
    image: { content: optimized }
  });

  // 5. Process labels
  const labels = result.labelAnnotations;
  const fruit = identifyFruit(labels);

  if (!fruit) {
    return res.status(400).json({
      error: 'No fruit detected'
    });
  }

  // 6. Calculate sweetness
  const analysis = analyzeFruit(fruit, labels);

  // 7. Return response
  return res.status(200).json({
    fruit: {
      name: fruit.name,
      emoji: fruit.emoji,
      confidence: fruit.confidence
    },
    sweetness: analysis.sweetness,
    ripeness: analysis.ripeness,
    recommendation: analysis.recommendation
  });
}
```

---

## Data Models

### Fruit Type
```typescript
interface Fruit {
  id: string;
  name: string;
  emoji: string;
  avgSweetness: number; // 0-100
  aliases: string[];    // Vision API labels
}

// Example
const FRUITS: Fruit[] = [
  {
    id: 'apple',
    name: 'Apple',
    emoji: '🍎',
    avgSweetness: 70,
    aliases: ['apple', 'red apple', 'fruit']
  },
  // ... more fruits
];
```

### Analysis Result
```typescript
interface AnalysisResult {
  fruit: {
    name: string;
    emoji: string;
    confidence: number;
  };
  sweetness: {
    score: number;      // 0-100
    emoji: string;      // 😞😐🙂😋🤩
    label: string;      // "Very Sweet"
  };
  ripeness: {
    level: 'unripe' | 'perfect' | 'overripe';
    emoji: string;      // 🟢🟡🔴
  };
  recommendation: {
    text: string;
    emoji: string;
  };
}
```

---

## Environment Variables

```env
# Google Cloud Vision API
GOOGLE_CLOUD_PROJECT_ID=sweet-fruit-12345
GOOGLE_CLOUD_VISION_API_KEY=...

# Vercel
VERCEL_URL=sweet-fruit.vercel.app

# Optional: Analytics
ANALYTICS_ID=...
```

---

## Performance Optimizations

### Client-Side
1. **Code Splitting**
   - Lazy load Results component
   - Separate vendor bundle

2. **Image Optimization**
   - Compress to max 2MB before upload
   - WebP format when supported

3. **Caching**
   - Cache API responses in localStorage
   - Service worker cache for assets

4. **Bundle Size**
   - Use tree-shaking
   - Remove unused Tailwind classes
   - Minify production build

### Server-Side
1. **Edge Caching**
   - Cache identical image analyses (1 hour)
   - Cache fruit data responses

2. **Image Processing**
   - Resize to max 800x800px
   - Reduce quality to 85%

3. **API Optimization**
   - Connection pooling
   - Timeout limits (10s)

---

## Security Considerations

1. **Input Validation**
   - Max file size: 10MB
   - Allowed formats: JPEG, PNG, HEIC
   - Sanitize file names

2. **Rate Limiting**
   - Max 10 requests/minute per IP
   - Cloudflare for DDoS protection

3. **API Keys**
   - Store in environment variables
   - Rotate regularly
   - Use service accounts

4. **HTTPS**
   - Force HTTPS (Vercel default)
   - Secure headers (CSP, HSTS)

5. **Privacy**
   - Don't log images
   - Delete images after processing
   - No user tracking

---

## Deployment Strategy

### Development
```bash
npm run dev          # Local development
```

### Staging
```bash
vercel               # Deploy to preview URL
```

### Production
```bash
vercel --prod        # Deploy to production
```

### CI/CD
- GitHub Actions for automated testing
- Deploy on merge to `main`
- Preview deployments for PRs

---

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (Speed Insights)
- Lighthouse CI in GitHub Actions
- Core Web Vitals tracking

### Error Tracking
- Console errors logged to Vercel
- API error rate monitoring
- User-reported issues (optional feedback)

### Usage Metrics
- Total scans per day
- Success/failure rate
- Average processing time
- Top identified fruits

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Vision API down | High | Implement fallback TensorFlow.js model |
| Slow API response | Medium | Client-side caching, loading indicators |
| Poor fruit recognition | High | Expand fruit database, improve prompts |
| High costs (API calls) | Medium | Implement caching, rate limiting |
| Camera permission denied | Medium | Clear explanations, file upload alternative |
| Browser compatibility | Medium | Progressive enhancement, polyfills |

---

## Success Criteria

### Technical
- ✅ Lighthouse score >90
- ✅ First Contentful Paint <1.5s
- ✅ Time to Interactive <3s
- ✅ Bundle size <150KB
- ✅ API response time <2s

### Functional
- ✅ Fruit recognition >85% accuracy
- ✅ Works offline (with limitations)
- ✅ Installable as PWA
- ✅ Zero crashes in production

---

*Version: 1.0*
*Last Updated: 2025-12-11*
