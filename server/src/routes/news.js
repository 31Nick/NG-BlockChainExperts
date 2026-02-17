const express = require('express');
const router = express.Router();
const { getNews } = require('../services/news');

// GET /api/news — latest crypto headlines
router.get('/', async (_req, res) => {
  try {
    const news = await getNews(10);
    res.json(news);
  } catch (err) {
    console.error('News error:', err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
