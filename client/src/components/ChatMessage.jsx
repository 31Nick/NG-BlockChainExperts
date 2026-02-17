import ReactMarkdown from 'react-markdown';
import GlossaryTooltip from './GlossaryTooltip';
import FollowUpChips from './FollowUpChips';

export default function ChatMessage({ message, onFollowUpClick }) {
  const isUser = message.role === 'user';

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && message.persona && (
        <div className="message-persona">
          {message.persona.emoji} {message.persona.name}
        </div>
      )}
      <div className="message-bubble">
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <GlossaryTooltip>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </GlossaryTooltip>
        )}
      </div>
      {!isUser && message.followUps && message.followUps.length > 0 && (
        <FollowUpChips questions={message.followUps} onClick={onFollowUpClick} />
      )}
    </div>
  );
}
