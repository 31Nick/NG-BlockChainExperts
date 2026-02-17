const express = require('express');
const router = express.Router();
const { chat } = require('../services/anthropic');
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

// POST /api/quiz — generate quiz questions
router.post('/', async (req, res) => {
  try {
    const { topic, personaId } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'topic is required' });
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
