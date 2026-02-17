const express = require('express');
const router = express.Router();
const { chat, DEMO_MODE } = require('../services/anthropic');
const { getPersona } = require('../personas');

const QUIZ_SYSTEM_PROMPT = `You are a blockchain and cryptocurrency quiz generator. Generate exactly 5 multiple-choice questions on the given topic.

Return ONLY valid JSON in this exact format, with no other text:
{
  "questions": [
    {
      "question": "What is...?",
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
      "correctIndex": 0,
      "explanation": "Brief explanation of why this answer is correct."
    }
  ]
}

Rules:
- Questions should progress from basic to intermediate difficulty
- Each question must have exactly 4 options
- Explanations should be educational and cite sources when possible
- Make questions relevant to a student learning for school assignments`;

const DEMO_QUIZZES = {
  default: {
    questions: [
      {
        question: "What is a blockchain?",
        options: ["A) A type of cryptocurrency", "B) A distributed ledger that records transactions across many computers", "C) A programming language", "D) A type of database owned by a single company"],
        correctIndex: 1,
        explanation: "A blockchain is a distributed digital ledger that records transactions across many computers so the record cannot be altered retroactively. (Source: Nakamoto, 2008)"
      },
      {
        question: "Who created Bitcoin?",
        options: ["A) Vitalik Buterin", "B) Elon Musk", "C) Satoshi Nakamoto", "D) Mark Zuckerberg"],
        correctIndex: 2,
        explanation: "Bitcoin was created in 2008 by the pseudonymous Satoshi Nakamoto, who published the Bitcoin whitepaper and released the software in 2009."
      },
      {
        question: "What is the maximum supply of Bitcoin?",
        options: ["A) 1 million", "B) 100 million", "C) 21 million", "D) Unlimited"],
        correctIndex: 2,
        explanation: "Bitcoin has a hard cap of 21 million coins, making it provably scarce. This is enforced by the protocol's code. (Source: Bitcoin Whitepaper)"
      },
      {
        question: "What does 'decentralization' mean in blockchain?",
        options: ["A) One company controls the network", "B) The government regulates all transactions", "C) Control is distributed across many participants rather than a central authority", "D) All data is stored on a single server"],
        correctIndex: 2,
        explanation: "Decentralization means no single entity controls the network. Instead, thousands of nodes worldwide maintain copies of the ledger and validate transactions."
      },
      {
        question: "What is a 'hash' in blockchain?",
        options: ["A) A type of cryptocurrency", "B) A fixed-length string generated from input data that acts like a digital fingerprint", "C) A password for your wallet", "D) The fee paid for transactions"],
        correctIndex: 1,
        explanation: "A hash is a fixed-length output from a hash function (like SHA-256). Even a tiny change in input produces a completely different hash, making tampering detectable."
      }
    ]
  }
};

// POST /api/quiz — generate quiz questions
router.post('/', async (req, res) => {
  try {
    const { topic, personaId } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'topic is required' });
    }

    if (DEMO_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.json({ topic, ...DEMO_QUIZZES.default });
    }

    // Use specified persona or default to web3-educator
    const persona = getPersona(personaId || 'web3-educator');
    const systemPrompt = QUIZ_SYSTEM_PROMPT;
    const messages = [
      { role: 'user', content: `Generate a quiz about: ${topic}` },
    ];

    const reply = await chat(systemPrompt, messages);

    // Parse JSON from the response
    const jsonMatch = reply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: 'Failed to parse quiz questions' });
    }

    const quiz = JSON.parse(jsonMatch[0]);
    res.json({ topic, ...quiz });
  } catch (err) {
    console.error('Quiz error:', err.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

module.exports = router;
