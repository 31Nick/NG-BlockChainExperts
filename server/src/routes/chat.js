const express = require('express');
const router = express.Router();
const { chat } = require('../services/anthropic');
const { getPersona, getAllPersonas } = require('../personas');

// GET /api/chat/personas — list available experts
router.get('/personas', (_req, res) => {
  res.json(getAllPersonas());
});

// POST /api/chat — send message to a specific expert
router.post('/', async (req, res) => {
  try {
    const { messages, personaId } = req.body;

    if (!messages || !personaId) {
      return res.status(400).json({ error: 'messages and personaId are required' });
    }

    const persona = getPersona(personaId);
    if (!persona) {
      return res.status(400).json({ error: `Unknown persona: ${personaId}` });
    }

    const reply = await chat(persona.systemPrompt, messages);

    // Parse follow-up suggestions from the response
    let content = reply;
    let followUps = [];
    const followUpMatch = reply.match(/\|\|\|FOLLOWUPS\|\|\|(.+?)\|\|\|END\|\|\|/s);
    if (followUpMatch) {
      try {
        followUps = JSON.parse(followUpMatch[1]);
      } catch { /* ignore parse errors */ }
      content = reply.replace(/\|\|\|FOLLOWUPS\|\|\|.+?\|\|\|END\|\|\|/s, '').trim();
    }

    res.json({ content, followUps, persona: { name: persona.name, emoji: persona.emoji } });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

module.exports = router;
