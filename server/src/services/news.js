const axios = require('axios');

const BASE_URL = 'https://cryptopanic.com/api/free/v1/posts/';

async function getNews(limit = 10) {
  // CryptoPanic free tier — no auth token needed for public posts
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { auth_token: process.env.CRYPTOPANIC_API_KEY || '', public: true, kind: 'news' },
    });

    return (data.results || []).slice(0, limit).map((item) => ({
      title: item.title,
      url: item.url,
      source: item.source.title,
      publishedAt: item.published_at,
      currencies: (item.currencies || []).map((c) => c.code),
    }));
  } catch {
    // Fallback: return empty array if API is unavailable
    return [];
  }
}

module.exports = { getNews };
