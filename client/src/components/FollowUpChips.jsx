export default function FollowUpChips({ questions, onClick }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="follow-up-chips">
      <small className="follow-up-label">Suggested follow-ups:</small>
      <div className="chips">
        {questions.map((q, i) => (
          <button key={i} className="chip" onClick={() => onClick(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
