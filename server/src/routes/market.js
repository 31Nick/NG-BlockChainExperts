const express = require('express');
const router = express.Router();
const { getCoinData, getTopCoins } = require('../services/coingecko');

// GET /api/market — top coins
router.get('/', async (_req, res) => {
  try {
    const coins = await getTopCoins(10);
    res.json(coins);
  } catch (err) {
    console.error('Market error:', err.message);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

// GET /api/market/:coinId — specific coin data
router.get('/:coinId', async (req, res) => {
  try {
    const data = await getCoinData(req.params.coinId);
    res.json(data);
  } catch (err) {
    console.error('Market error:', err.message);
    res.status(500).json({ error: `Failed to fetch data for ${req.params.coinId}` });
  }
});

module.exports = router;
