# 🍓 Sweet Fruit - Project Constitution

## Project Vision

**Sweet Fruit** is a mobile-first web application that answers one simple question: "How sweet is this fruit?" Users take a photo of any fruit, and the app instantly provides a sweetness rating and quality assessment.

## Core Principles

### 1. **Simplicity Above All**
- Single, clear purpose: Assess fruit sweetness from photos
- Minimal steps: Photo → Result (2 steps maximum)
- No unnecessary features or complexity
- Language-agnostic design (icons, visuals, minimal text)

### 2. **Mobile-First Design**
- Optimized for smartphone cameras and touch interfaces
- Fast loading on mobile networks
- Responsive across all mobile device sizes
- Progressive Web App (PWA) capabilities for installation

### 3. **Universal Accessibility**
- Visual communication (emojis, colors, icons)
- Multi-language support without changing UX
- Intuitive without instructions
- Works offline (core features)

### 4. **Modern & Delightful UX**
- Clean, modern interface
- Smooth animations and transitions
- Instant feedback on user actions
- Playful but professional aesthetic

### 5. **Privacy & Performance**
- No user accounts required
- Minimal data collection
- Client-side processing when possible
- Fast response times (<2 seconds)

## Design Philosophy

### Visual Language
- **Colors**: Fresh fruit palette (greens, reds, oranges, yellows)
- **Typography**: Large, readable sans-serif fonts
- **Icons**: Simple, universally recognized symbols
- **Feedback**: Emoji-based ratings (😞 → 😐 → 🙂 → 😋 → 🤩)

### User Journey
1. Open app → Clean camera interface with fruit icon
2. Take/upload photo → Processing animation
3. View result → Large sweetness score + visual indicator
4. Optional: View details, take another photo

### Technical Constraints
- Must work on iOS Safari and Android Chrome
- Maximum 3-second initial load time
- Supports offline mode for previously analyzed fruits
- Accessible (WCAG 2.1 AA compliant)

## Technology Guidelines

### Frontend
- Modern JavaScript framework (React/Vue/Svelte)
- Mobile-optimized CSS (Tailwind or similar)
- PWA with service workers
- Camera API integration

### Backend/AI
- Image recognition API (TensorFlow.js, Vision API, or similar)
- Lightweight backend (serverless preferred)
- Fast image processing pipeline
- Caching for common fruits

### Development
- Mobile-first development approach
- Component-based architecture
- Comprehensive testing on real devices
- Performance budgets enforced

## Success Criteria

A successful Sweet Fruit app:
1. ✅ Takes <2 seconds from photo to result
2. ✅ Accurately identifies fruit type >85% of the time
3. ✅ Provides meaningful sweetness ratings
4. ✅ Understandable without text explanations
5. ✅ Works smoothly on 3+ year old mobile devices
6. ✅ Delights users (smile-inducing experience)

## Non-Goals

What Sweet Fruit is **NOT**:
- ❌ A comprehensive nutrition database
- ❌ A recipe or cooking app
- ❌ A fruit identification encyclopedia
- ❌ A social sharing platform
- ❌ A marketplace or shopping tool

## Quality Standards

### Code Quality
- Clean, maintainable code
- Component reusability
- Comprehensive comments for complex logic
- TypeScript for type safety

### Testing
- Unit tests for utility functions
- Integration tests for core flows
- Manual testing on real devices
- Performance testing on slow networks

### Documentation
- Clear README with setup instructions
- Component documentation
- API documentation
- User guide (visual, minimal text)

## Development Workflow

1. **Spec First**: Define features in spec before coding
2. **Mobile Testing**: Test on real devices frequently
3. **Performance**: Monitor and optimize continuously
4. **Accessibility**: Test with screen readers and accessibility tools
5. **Iterate**: Gather feedback, refine, repeat

## Team Values

- **User Empathy**: Always consider the user's perspective
- **Simplicity**: Question every feature - is it necessary?
- **Quality**: Better to do one thing excellently than many things poorly
- **Delight**: Small touches that make users smile
- **Transparency**: Clear communication and documentation

---

*Last Updated: 2025-12-11*
