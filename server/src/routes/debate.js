const express = require('express');
const router = express.Router();
const { chat } = require('../services/anthropic');
const { personas } = require('../personas');

// POST /api/debate — send question to all experts in parallel
router.post('/', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'question is required' });
    }

    const messages = [{ role: 'user', content: question }];

    const results = await Promise.all(
      Object.entries(personas).map(async ([id, persona]) => {
        try {
          const reply = await chat(persona.systemPrompt, messages);

          let content = reply;
          let followUps = [];
          const followUpMatch = reply.match(/\|\|\|FOLLOWUPS\|\|\|(.+?)\|\|\|END\|\|\|/s);
          if (followUpMatch) {
            try { followUps = JSON.parse(followUpMatch[1]); } catch {}
            content = reply.replace(/\|\|\|FOLLOWUPS\|\|\|.+?\|\|\|END\|\|\|/s, '').trim();
          }

          return {
            personaId: id,
            name: persona.name,
            emoji: persona.emoji,
            color: persona.color,
            content,
            followUps,
          };
        } catch (err) {
          return {
            personaId: id,
            name: persona.name,
            emoji: persona.emoji,
            color: persona.color,
            content: 'Sorry, I was unable to respond at this time.',
            followUps: [],
            error: true,
          };
        }
      })
    );

    res.json({ question, responses: results });
  } catch (err) {
    console.error('Debate error:', err.message);
    res.status(500).json({ error: 'Failed to get debate responses' });
  }
});

module.exports = router;
