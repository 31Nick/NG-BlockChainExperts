import { experts } from '../experts';

export default function ExpertSelector({ selectedExpert, onSelect }) {
  return (
    <div className="expert-selector">
      <h3>🧠 Expert Panel</h3>
      <div className="expert-list">
        {experts.map((expert) => (
          <button
            key={expert.id}
            className={`expert-card ${selectedExpert?.id === expert.id ? 'selected' : ''}`}
            onClick={() => onSelect(expert)}
            style={{ '--expert-color': expert.color }}
          >
            <span className="expert-card-emoji">{expert.emoji}</span>
            <div className="expert-card-info">
              <strong>{expert.name}</strong>
              <small>{expert.description}</small>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
