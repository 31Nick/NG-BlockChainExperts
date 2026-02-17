import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const QUIZ_TOPICS = [
  'Bitcoin Basics',
  'Blockchain Fundamentals',
  'Smart Contracts',
  'Decentralized Finance (DeFi)',
  'NFTs and Digital Assets',
  'Consensus Mechanisms',
  'Crypto Security & Wallets',
  'Web3 and DAOs',
  'Crypto Regulation',
  'Layer 2 Scaling Solutions',
];

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  const generateQuiz = async () => {
    if (!topic) return;
    setLoading(true);
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setScore(null);

    try {
      const { data } = await axios.post(`${API_URL}/quiz`, { topic });
      setQuiz(data);
    } catch {
      setQuiz({ error: 'Failed to generate quiz. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (qIndex, optionIndex) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = () => {
    if (!quiz?.questions) return;
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h2>🧠 Knowledge Assessment</h2>
        <p>Test your blockchain knowledge with AI-generated quizzes</p>
      </div>

      <div className="quiz-topic-selector">
        <label>Choose a topic:</label>
        <div className="quiz-topics">
          {QUIZ_TOPICS.map((t) => (
            <button
              key={t}
              className={`quiz-topic-btn ${topic === t ? 'selected' : ''}`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          className="quiz-generate-btn"
          onClick={generateQuiz}
          disabled={!topic || loading}
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </div>

      {quiz?.error && <div className="quiz-error">{quiz.error}</div>}

      {quiz?.questions && (
        <div className="quiz-questions">
          {quiz.questions.map((q, qi) => (
            <div key={qi} className={`quiz-question ${submitted ? (answers[qi] === q.correctIndex ? 'correct' : 'incorrect') : ''}`}>
              <h4>Q{qi + 1}. {q.question}</h4>
              <div className="quiz-options">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    className={`quiz-option ${answers[qi] === oi ? 'selected' : ''} ${
                      submitted
                        ? oi === q.correctIndex
                          ? 'correct'
                          : answers[qi] === oi
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    onClick={() => handleAnswer(qi, oi)}
                    disabled={submitted}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {submitted && (
                <div className="quiz-explanation">
                  <strong>{answers[qi] === q.correctIndex ? '✅ Correct!' : '❌ Incorrect'}</strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}

          {!submitted ? (
            <button
              className="quiz-submit-btn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < quiz.questions.length}
            >
              Submit Answers ({Object.keys(answers).length}/{quiz.questions.length} answered)
            </button>
          ) : (
            <div className="quiz-score">
              <h3>Your Score: {score}/{quiz.questions.length}</h3>
              <p>{score === quiz.questions.length ? '🎉 Perfect!' : score >= 3 ? '👍 Good job!' : '📚 Keep studying!'}</p>
              <button className="quiz-generate-btn" onClick={generateQuiz}>
                Try Another Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
