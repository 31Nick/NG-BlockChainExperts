const axios = require('axios');

const BASE_URL = 'https://api.coingecko.com/api/v3';

async function getCoinData(coinId) {
  const { data } = await axios.get(`${BASE_URL}/coins/${coinId}`, {
    params: {
      localization: false,
      tickers: false,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  });

  return {
    id: data.id,
    name: data.name,
    symbol: data.symbol.toUpperCase(),
    price: data.market_data.current_price.usd,
    priceChange24h: data.market_data.price_change_percentage_24h,
    marketCap: data.market_data.market_cap.usd,
    volume24h: data.market_data.total_volume.usd,
    high24h: data.market_data.high_24h.usd,
    low24h: data.market_data.low_24h.usd,
    image: data.image.small,
  };
}

async function getTopCoins(limit = 10) {
  const { data } = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit,
      page: 1,
      sparkline: false,
    },
  });

  return data.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: coin.current_price,
    priceChange24h: coin.price_change_percentage_24h,
    marketCap: coin.market_cap,
    image: coin.image,
  }));
}

module.exports = { getCoinData, getTopCoins };
