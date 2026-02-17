export default function ExportButton({ messages, expertName }) {
  const handleExport = () => {
    const lines = [
      `# Chat with ${expertName}`,
      `_Exported on ${new Date().toLocaleString()}_\n`,
      '---\n',
    ];

    messages.forEach((msg) => {
      const time = new Date(msg.timestamp).toLocaleTimeString();
      if (msg.role === 'user') {
        lines.push(`## 🧑 You (${time})\n`);
        lines.push(`${msg.content}\n`);
      } else {
        const name = msg.persona?.name || expertName;
        const emoji = msg.persona?.emoji || '🤖';
        lines.push(`## ${emoji} ${name} (${time})\n`);
        lines.push(`${msg.content}\n`);
      }
      lines.push('---\n');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${expertName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="export-btn" onClick={handleExport} title="Export chat as Markdown">
      📝 Export
    </button>
  );
}
