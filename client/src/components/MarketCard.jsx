import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function MarketCard() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/market`);
        setCoins(data.slice(0, 5));
      } catch {
        setError('Market data unavailable');
      }
    };
    fetchMarket();
    const interval = setInterval(fetchMarket, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (error) return <div className="market-card error">{error}</div>;
  if (coins.length === 0) return null;

  return (
    <div className="market-card">
      <h4>📈 Live Market</h4>
      <div className="market-list">
        {coins.map((coin) => (
          <div key={coin.id} className="market-item">
            <img src={coin.image} alt={coin.name} width="20" height="20" />
            <span className="market-name">{coin.symbol}</span>
            <span className="market-price">${coin.price?.toLocaleString()}</span>
            <span className={`market-change ${coin.priceChange24h >= 0 ? 'positive' : 'negative'}`}>
              {coin.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(coin.priceChange24h || 0).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
