# 🔗 Blockchain & Crypto Expert Chatbot

A full-stack AI-powered chatbot that lets you converse with blockchain and cryptocurrency expert personas. Built for learning, school assignments, and developing critical thinking about blockchain technology.

## Features

- **5 Expert Personas** — Satoshi Purist, DeFi Strategist, Blockchain Architect, Crypto Skeptic, Web3 Educator
- **Panel Debate Mode** — Ask one question, get all 5 experts' perspectives side-by-side
- **Glossary Tooltips** — Hover over technical terms to learn their definitions
- **Suggested Follow-ups** — AI suggests next questions to guide your learning
- **Knowledge Quizzes** — Test your understanding with generated multiple-choice quizzes
- **Learning Roadmap** — Structured curriculum from fundamentals to advanced topics
- **Live Market Data** — Real-time crypto prices via CoinGecko
- **Crypto News Feed** — Latest headlines from the crypto world
- **Export Conversations** — Download chats as Markdown for school assignments
- **Dark/Light Theme** — Comfortable reading in any lighting
- **Source Citations** — Academic references for use in school papers

## Tech Stack

- **Frontend**: React (Vite) + React Router + React Markdown
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude API
- **Market Data**: CoinGecko API
- **News**: CryptoPanic API

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd NG-BlockChainExperts
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Set up the client**
   ```bash
   cd ../client
   npm install
   ```

4. **Run both servers**
   ```bash
   # Terminal 1 — Backend (port 3001)
   cd server
   npm run dev

   # Terminal 2 — Frontend (port 3000)
   cd client
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # UI components
│       ├── experts.js    # Expert persona metadata
│       ├── glossary.js   # Blockchain term definitions
│       └── roadmapData.js # Learning path data
├── server/          # Express backend
│   └── src/
│       ├── routes/       # API endpoints
│       ├── services/     # External API integrations
│       └── personas/     # Expert system prompts
```

## License

MIT
