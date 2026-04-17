import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am your AI Study Assistant. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input;
    const userMsg = { id: Date.now(), type: 'user', text: userQuery };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
        const res = await fetch('/api/study/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userQuery })
        });
        
        if (res.ok) {
            const data = await res.json();
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: data.response
            }]);
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (e) {
        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            type: 'bot',
            text: "Sorry, I couldn't connect to the backend server."
        }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="chat-container animate-fade-in">
      <div className="chat-header">
        <h2>AI Study Assistant</h2>
        <p className="text-muted">Ask questions about your uploaded documents.</p>
      </div>

      <div className="chat-window glass-panel">
        <div className="chat-history hidden-scrollbar">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-bubble ${msg.type === 'bot' ? 'bot-bubble' : 'user-bubble'} animate-fade-in`}>
              <div className="bubble-icon">
                {msg.type === 'bot' ? <Bot /> : <User />}
              </div>
              <div className="bubble-content">
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
              <div className="chat-bubble bot-bubble">
                  <div className="bubble-icon"><Bot /></div>
                  <div className="bubble-content" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                     <Loader2 className="spinner" size={20} /> Thinking...
                  </div>
              </div>
          )}
        </div>
        
        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            className="input-base" 
            placeholder="Ask a question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary btn-icon" disabled={isLoading}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
