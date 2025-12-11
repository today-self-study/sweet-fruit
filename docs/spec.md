# 🍓 Sweet Fruit - Product Specification

## Overview

Sweet Fruit is a mobile web application that analyzes fruit photos to provide instant sweetness ratings and quality assessments through a simple, visually-driven interface.

---

## User Stories

### Epic 1: Photo Capture
**As a user**, I want to quickly capture a fruit photo so that I can get sweetness information.

#### Story 1.1: Open Camera
- **Given** I open the Sweet Fruit app
- **When** the app loads
- **Then** I see a clean camera interface with a large camera button
- **And** I see a fruit icon indicating what to photograph
- **And** I see minimal text (or icon-only instructions)

#### Story 1.2: Take Photo
- **Given** I'm on the camera screen
- **When** I tap the camera button
- **Then** my device camera opens
- **And** I can take a photo of a fruit
- **And** the photo is immediately processed

#### Story 1.3: Upload Photo
- **Given** I'm on the camera screen
- **When** I tap the upload/gallery button
- **Then** I can select a photo from my gallery
- **And** the selected photo is immediately processed

### Epic 2: Photo Analysis
**As a user**, I want to see instant results so that I know how sweet my fruit is.

#### Story 2.1: Processing Feedback
- **Given** I've taken/uploaded a fruit photo
- **When** the analysis starts
- **Then** I see a pleasant loading animation (e.g., rotating fruit)
- **And** I see a progress indicator
- **And** processing completes within 2-3 seconds

#### Story 2.2: View Results
- **Given** analysis is complete
- **When** results are ready
- **Then** I see a large sweetness score (0-100 or 1-5 stars)
- **And** I see an emoji indicating sweetness level
- **And** I see the identified fruit type with icon/image
- **And** I see a color-coded background (green→yellow→red based on sweetness)

#### Story 2.3: Result Details
- **Given** I'm viewing results
- **When** I want more information
- **Then** I can tap to see additional details:
  - Ripeness level
  - Quality assessment
  - Best use recommendations (eat now, wait, make juice)
- **And** details are presented visually with icons

### Epic 3: Re-scan & Navigation
**As a user**, I want to easily scan another fruit without complexity.

#### Story 3.1: New Scan
- **Given** I'm viewing results
- **When** I tap the "Scan Another" button
- **Then** I return to the camera screen
- **And** my previous result is cleared
- **And** the process starts fresh

#### Story 3.2: View History (Optional)
- **Given** I've scanned multiple fruits
- **When** I swipe down or tap history icon
- **Then** I see my last 5 scanned fruits
- **And** I can tap any to view results again

### Epic 4: Offline & Performance
**As a user**, I want the app to work quickly even with poor connectivity.

#### Story 4.1: Fast Loading
- **Given** I open the app for the first time
- **When** the page loads
- **Then** the core interface appears in <2 seconds
- **And** I can immediately use the camera

#### Story 4.2: Offline Mode
- **Given** I've used the app before
- **When** I have no internet connection
- **Then** the app still opens and shows camera
- **And** I see a message that analysis requires connection
- **And** Previously viewed results are still accessible

### Epic 5: Installation & PWA
**As a user**, I want to install the app like a native app.

#### Story 5.1: Install Prompt
- **Given** I've used the app 2-3 times
- **When** I'm on the home screen
- **Then** I see a subtle "Add to Home Screen" prompt
- **And** I can install with one tap
- **And** The prompt doesn't interrupt my workflow

#### Story 5.2: Installed Experience
- **Given** I've installed the PWA
- **When** I open it from my home screen
- **Then** it opens fullscreen without browser UI
- **And** it has a custom splash screen
- **And** it feels like a native app

---

## Functional Requirements

### FR1: Image Processing
- Support JPEG, PNG, HEIC formats
- Accept images from camera or gallery
- Compress images client-side before upload (max 2MB)
- Support portrait and landscape orientations
- Auto-rotate based on EXIF data

### FR2: Fruit Recognition
- Identify 20+ common fruits with >85% accuracy:
  - Apples, Bananas, Oranges, Grapes, Strawberries
  - Watermelon, Pineapple, Mango, Kiwi, Peach
  - Pear, Cherry, Blueberry, Raspberry, Lemon
  - Lime, Papaya, Dragon Fruit, Passion Fruit, Pomegranate
- Handle multiple fruits in one image (identify primary fruit)
- Provide confidence score with results

### FR3: Sweetness Assessment
- Rate sweetness on 0-100 scale
- Map to emoji scale: 😞 (0-20), 😐 (21-40), 🙂 (41-60), 😋 (61-80), 🤩 (81-100)
- Consider ripeness in sweetness calculation
- Provide ripeness indicator (unripe/perfect/overripe)

### FR4: Results Display
- Large, prominent sweetness score
- Fruit name with emoji/icon
- Color-coded background gradient
- Optional expandable details section
- "Scan Another" CTA button

### FR5: Performance
- Initial load: <2 seconds on 4G
- Camera launch: <500ms
- Analysis complete: <3 seconds
- Smooth 60fps animations
- Works on devices from 2020+

---

## Non-Functional Requirements

### NFR1: Compatibility
- iOS Safari 14+
- Android Chrome 90+
- Responsive: 320px - 428px width (mobile)
- Touch-optimized (44x44px minimum tap targets)

### NFR2: Accessibility
- WCAG 2.1 AA compliant
- Screen reader support
- High contrast mode
- Font scaling support (up to 200%)
- Keyboard navigation (for testing)

### NFR3: Security & Privacy
- No user data stored server-side
- Images deleted after analysis
- No tracking cookies
- HTTPS only
- No third-party analytics by default

### NFR4: Reliability
- 99.5% uptime for API
- Graceful degradation if AI service fails
- Error messages in visual format
- Retry mechanism for failed analyses

### NFR5: Performance Budgets
- JavaScript bundle: <150KB gzipped
- CSS: <20KB gzipped
- Images/Icons: <50KB total
- Fonts: <30KB
- Total page weight: <250KB

---

## User Interface Specifications

### Screen 1: Camera / Home Screen
```
┌─────────────────────────┐
│   🍓 Sweet Fruit        │  ← App title/logo
├─────────────────────────┤
│                         │
│      [Fruit Icon]       │  ← Visual cue
│                         │
│   📷                    │  ← Large camera button
│   Take Photo            │
│                         │
│   📁                    │  ← Upload button
│   Choose Photo          │
│                         │
│   [Recent: 🍎🍌🍊]       │  ← History (if any)
└─────────────────────────┘
```

### Screen 2: Processing
```
┌─────────────────────────┐
│                         │
│      🍎                 │  ← Spinning fruit
│     ⟲                   │
│                         │
│   Analyzing...          │
│   ▓▓▓░░░░░              │  ← Progress bar
└─────────────────────────┘
```

### Screen 3: Results
```
┌─────────────────────────┐
│  🍎 Apple               │  ← Fruit name + icon
├─────────────────────────┤
│                         │
│        😋               │  ← Emoji rating
│        85               │  ← Sweetness score
│      SWEETNESS          │
│                         │
│   🟢 Perfect Ripeness   │  ← Additional info
│   🍴 Best for eating    │
│                         │
│   [ Scan Another ]      │  ← CTA button
│                         │
│   › More Details        │  ← Expandable
└─────────────────────────┘
```

---

## Technical Specifications

### Frontend Stack
- **Framework**: React 18+ with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React or Heroicons
- **Animations**: Framer Motion
- **PWA**: Vite PWA Plugin
- **Camera**: HTML5 Media Capture API

### Backend Stack
- **Platform**: Vercel Serverless Functions (or similar)
- **Runtime**: Node.js 20+
- **AI/ML**:
  - Primary: Google Cloud Vision API or AWS Rekognition
  - Fallback: TensorFlow.js (client-side for offline)
- **Database**: None (stateless)
- **Caching**: Edge caching for API responses

### API Design

#### POST /api/analyze
**Request:**
```json
{
  "image": "base64_encoded_image",
  "format": "jpeg"
}
```

**Response:**
```json
{
  "fruit": {
    "name": "Apple",
    "emoji": "🍎",
    "confidence": 0.95
  },
  "sweetness": {
    "score": 85,
    "emoji": "😋",
    "label": "Very Sweet"
  },
  "ripeness": {
    "level": "perfect",
    "emoji": "🟢"
  },
  "recommendation": {
    "text": "Best for eating",
    "emoji": "🍴"
  }
}
```

---

## Design System

### Color Palette
```css
--primary-green: #10B981    /* Fresh, natural */
--primary-yellow: #FBBF24   /* Ripe, sweet */
--primary-red: #EF4444      /* Very ripe */
--background: #FFFFFF
--text-primary: #111827
--text-secondary: #6B7280
--border: #E5E7EB
```

### Typography
```css
--font-family: 'Inter', system-ui, sans-serif
--heading-size: 24px (mobile)
--body-size: 16px
--small-size: 14px
--line-height: 1.5
```

### Spacing Scale
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
```

### Components
- **Button**: Rounded corners (12px), min-height 48px
- **Card**: Shadow, rounded (16px), padding 24px
- **Input**: Border, rounded (8px), padding 12px

---

## Success Metrics

### Primary Metrics
1. **Time to Result**: Average <2.5 seconds
2. **Accuracy**: >85% correct fruit identification
3. **User Satisfaction**: Emoji feedback >4/5 average
4. **Completion Rate**: >90% users complete scan flow

### Secondary Metrics
1. **Return Users**: >30% return within 7 days
2. **Install Rate**: >20% add to home screen
3. **Error Rate**: <5% failed analyses
4. **Performance**: Lighthouse score >90

---

## Edge Cases & Error Handling

### Error Scenarios
1. **No fruit detected**: "Please take a photo of a fruit 🍎"
2. **Poor image quality**: "Photo is too blurry. Try again! 📸"
3. **Multiple fruits**: "I see multiple fruits! Let's focus on one 🎯"
4. **Network error**: "Connection lost. Please try again 📶"
5. **Unknown fruit**: "Hmm, I don't recognize this fruit yet 🤔"

### Validation
- Image size: Max 10MB, show error if exceeded
- Image format: Only JPEG/PNG/HEIC, show error otherwise
- Camera permission: Request with clear explanation
- API timeout: 10 seconds max, fallback to cached result

---

## Future Enhancements (Out of Scope for v1)

- 🔮 Nutrition information overlay
- 🌍 Multi-language UI text
- 📊 Sweetness comparison charts
- 🛒 Where to buy suggestions
- 👥 Social sharing features
- 📝 Personalized recommendations based on history
- 🎮 Gamification (collect fruit badges)

---

*Version: 1.0*
*Last Updated: 2025-12-11*
