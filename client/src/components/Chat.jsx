import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import ExportButton from './ExportButton';

const API_URL = 'http://localhost:3001/api';

export default function Chat({ selectedExpert, onFollowUpClick }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when expert changes
  useEffect(() => {
    setMessages([]);
  }, [selectedExpert?.id]);

  const sendMessage = async (content) => {
    if (!selectedExpert) return;

    const userMessage = { role: 'user', content, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/chat`, {
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        personaId: selectedExpert.id,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.content,
          followUps: data.followUps,
          persona: data.persona,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        {selectedExpert ? (
          <>
            <span className="expert-emoji">{selectedExpert.emoji}</span>
            <span>Chatting with <strong>{selectedExpert.name}</strong></span>
            {messages.length > 0 && (
              <ExportButton messages={messages} expertName={selectedExpert.name} />
            )}
          </>
        ) : (
          <span>Select an expert to start chatting</span>
        )}
      </div>

      <div className="chat-messages">
        {messages.length === 0 && selectedExpert && (
          <div className="chat-welcome">
            <div className="welcome-emoji">{selectedExpert.emoji}</div>
            <h3>Welcome! I'm {selectedExpert.name}</h3>
            <p>{selectedExpert.description}</p>
            <p className="welcome-hint">Ask me anything about blockchain and crypto!</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            onFollowUpClick={(q) => {
              if (onFollowUpClick) onFollowUpClick(q);
              else sendMessage(q);
            }}
          />
        ))}

        {loading && (
          <div className="message assistant">
            <div className="message-bubble loading-bubble">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={sendMessage} disabled={!selectedExpert || loading} />
    </div>
  );
}
