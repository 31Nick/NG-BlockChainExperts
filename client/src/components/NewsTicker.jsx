import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function NewsTicker() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/news`);
        setNews(data);
      } catch {
        // silently fail — news is optional
      }
    };
    fetchNews();
    const interval = setInterval(fetchNews, 300000); // refresh every 5 min
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="news-ticker">
      <h4>📰 Latest News</h4>
      <div className="news-list">
        {news.map((item, i) => (
          <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="news-item">
            <span className="news-title">{item.title}</span>
            <span className="news-source">{item.source}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
