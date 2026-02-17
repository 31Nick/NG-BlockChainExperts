import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import './App.css';

import Chat from './components/Chat';
import ExpertSelector from './components/ExpertSelector';
import ThemeToggle from './components/ThemeToggle';
import MarketCard from './components/MarketCard';
import NewsTicker from './components/NewsTicker';
import DebatePanel from './components/DebatePanel';
import QuizPage from './components/QuizPage';
import RoadmapPage from './components/RoadmapPage';

function ChatPage() {
  const [selectedExpert, setSelectedExpert] = useState(null);

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <ExpertSelector selectedExpert={selectedExpert} onSelect={setSelectedExpert} />
        <MarketCard />
        <NewsTicker />
      </aside>
      <main className="main-content">
        <Chat selectedExpert={selectedExpert} />
      </main>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  const handleRoadmapChat = (expert, topicTitle) => {
    navigate('/', { state: { expert, topicTitle } });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <span>🔗</span>
          <h1>BlockchainIQ</h1>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>💬 Chat</NavLink>
          <NavLink to="/debate">🤼 Debate</NavLink>
          <NavLink to="/quiz">🧠 Quiz</NavLink>
          <NavLink to="/roadmap">🗺️ Roadmap</NavLink>
        </nav>
        <ThemeToggle />
      </header>

      <div className="app-body">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/debate" element={<DebatePanel />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/roadmap" element={<RoadmapPage onStartChat={handleRoadmapChat} />} />
        </Routes>
      </div>
    </div>
  );
}
