require('dotenv').config();
const express = require('express');
const cors = require('cors');

const chatRouter = require('./routes/chat');
const debateRouter = require('./routes/debate');
const quizRouter = require('./routes/quiz');
const marketRouter = require('./routes/market');
const newsRouter = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/chat', chatRouter);
app.use('/api/debate', debateRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/market', marketRouter);
app.use('/api/news', newsRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
