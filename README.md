# Sweet Fruit 🍓

AI-powered fruit sweetness analyzer - Take a photo and get instant sweetness analysis!

## Live Demo

Visit: https://today-self-study.github.io/sweet-fruit/

## Features

- **AI-Powered Analysis**: Multi-agent AI system using Claude Haiku 3.5
  - Agent 1: Identifies fruit type
  - Agent 2: Analyzes ripeness and quality
  - Agent 3: Estimates sweetness (0-100 scale)
- **100% Client-Side**: No backend server, runs entirely in your browser
- **Privacy-First**: Your API key and images never leave your device
- **Mobile-Optimized**: Works great on phones and tablets
- **PWA Support**: Install as an app on your device
- **Free to Use**: Get $5 in free Anthropic credits (~2,500 analyses)

## How to Use

1. Visit the app at https://today-self-study.github.io/sweet-fruit/
2. Get your free API key from [Anthropic Console](https://console.anthropic.com/)
   - Sign up for a free account
   - Get $5 in free credits (~2,500 fruit analyses)
3. Enter your API key (stored securely in your browser)
4. Take or upload a photo of any fruit
5. Get instant sweetness analysis!

## Supported Fruits

Apple, Banana, Orange, Strawberry, Grape, Watermelon, Pineapple, Mango, Peach, Pear, Cherry, Kiwi, Blueberry, Raspberry, Lemon, Lime, Grapefruit, Plum

## Technology Stack

- **Frontend**: React 18 + TypeScript 5 + Vite 6
- **Styling**: Tailwind CSS 3
- **AI**: Anthropic Claude Haiku 3.5
- **Image Processing**: browser-image-compression
- **PWA**: vite-plugin-pwa
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/today-self-study/sweet-fruit.git
cd sweet-fruit
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Architecture

### Multi-Agent System

The app uses a sophisticated multi-agent architecture:

1. **FruitIdentifierAgent**: Analyzes the image to identify the fruit type with confidence score
2. **RipenessAnalyzerAgent**: Evaluates ripeness level, quality score, and detects defects
3. **SweetnessEstimatorAgent**: Estimates sweetness based on fruit type and ripeness data

### Client-Side Only

- No backend server required
- Direct API calls to Anthropic from browser
- All processing happens on your device
- Your images and API key never leave your browser

## Cost Analysis

- **Cost per analysis**: $0.002 USD
- **Free credits**: $5 USD for new users
- **Free analyses**: ~2,500 analyses with free credits
- **No server costs**: 100% client-side architecture

## Privacy

- Your API key is stored only in your browser's localStorage
- Images are processed locally and sent directly to Anthropic
- No data is sent to our servers
- You can clear your API key at any time

## Documentation

Built using [Spec-Kit](https://github.com/github/spec-kit) methodology:
- [Constitution](docs/constitution.md) - Project principles
- [Specification](docs/spec.md) - Detailed requirements
- [Plan](docs/plan.md) - Technical implementation
- [Architecture](docs/architecture.md) - Multi-agent design
- [Tasks](docs/tasks.md) - Development breakdown

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues, please [open an issue](https://github.com/today-self-study/sweet-fruit/issues) on GitHub.

---

Made with ❤️ using Claude AI
