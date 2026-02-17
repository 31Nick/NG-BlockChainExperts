import { useState, useEffect } from 'react';
import { roadmapTopics } from '../roadmapData';
import { experts } from '../experts';

export default function RoadmapPage({ onStartChat }) {
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('roadmap-progress')) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('roadmap-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleTopic = (topicId) => {
    setProgress((prev) => ({
      ...prev,
      [topicId]: prev[topicId] === 'completed' ? 'not-started' : 'completed',
    }));
  };

  const completedCount = Object.values(progress).filter((v) => v === 'completed').length;

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <h2>🗺️ Learning Roadmap</h2>
        <p>Follow this structured path to master blockchain and crypto</p>
        <div className="roadmap-progress-bar">
          <div
            className="roadmap-progress-fill"
            style={{ width: `${(completedCount / roadmapTopics.length) * 100}%` }}
          />
          <span>{completedCount}/{roadmapTopics.length} topics completed</span>
        </div>
      </div>

      <div className="roadmap-topics">
        {roadmapTopics.map((topic, i) => {
          const expert = experts.find((e) => e.id === topic.expert);
          const status = progress[topic.id] || 'not-started';

          return (
            <div key={topic.id} className={`roadmap-topic ${status}`}>
              <div className="roadmap-topic-number">{i + 1}</div>
              <div className="roadmap-topic-content">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>

                <div className="roadmap-subtopics">
                  {topic.subtopics.map((sub, si) => (
                    <span key={si} className="roadmap-subtopic">{sub}</span>
                  ))}
                </div>

                <div className="roadmap-topic-actions">
                  {expert && (
                    <button
                      className="roadmap-chat-btn"
                      onClick={() => onStartChat(expert, topic.title)}
                      style={{ '--expert-color': expert.color }}
                    >
                      {expert.emoji} Chat with {expert.name}
                    </button>
                  )}
                  <button
                    className={`roadmap-status-btn ${status}`}
                    onClick={() => toggleTopic(topic.id)}
                  >
                    {status === 'completed' ? '✅ Completed' : '⬜ Mark Complete'}
                  </button>
                </div>
              </div>
              {i < roadmapTopics.length - 1 && <div className="roadmap-connector" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
