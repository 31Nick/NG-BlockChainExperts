import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { experts } from '../experts';

const API_URL = 'http://localhost:3001/api';

export default function DebatePanel() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDebate = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setResponses(null);

    try {
      const { data } = await axios.post(`${API_URL}/debate`, { question: question.trim() });
      setResponses(data);
    } catch {
      setResponses({ error: 'Failed to get debate responses. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="debate-panel">
      <div className="debate-header">
        <h2>🤼 Panel Debate</h2>
        <p>Ask one question and get perspectives from all 5 experts side-by-side</p>
      </div>

      <form className="debate-input" onSubmit={handleDebate}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g., Is Bitcoin a good store of value?"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? 'Debating...' : 'Ask All Experts'}
        </button>
      </form>

      {loading && (
        <div className="debate-loading">
          <div className="typing-indicator"><span></span><span></span><span></span></div>
          <p>All 5 experts are thinking...</p>
        </div>
      )}

      {responses?.error && (
        <div className="debate-error">{responses.error}</div>
      )}

      {responses?.responses && (
        <div className="debate-grid">
          {responses.responses.map((r) => {
            const expert = experts.find((e) => e.id === r.personaId);
            return (
              <div
                key={r.personaId}
                className="debate-card"
                style={{ '--expert-color': r.color }}
              >
                <div className="debate-card-header">
                  <span>{r.emoji}</span>
                  <strong>{r.name}</strong>
                </div>
                <div className="debate-card-body">
                  <ReactMarkdown>{r.content}</ReactMarkdown>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
