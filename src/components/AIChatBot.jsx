import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Mic, MicOff, LayoutDashboard, MonitorPlay } from 'lucide-react';
import mockData from '../data/mockDatabase.json';

const MiniExecutiveDashboard = () => (
  <div style={{ background: 'var(--bg-surface-hover)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><LayoutDashboard size={14} /> Executive Summary</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
      <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>CX Score</div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{mockData.executive.kpis.customerExperienceScore.value}</div>
      </div>
      <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Incidents</div>
        <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--accent-warning)' }}>{mockData.executive.kpis.activeIncidents.value}</div>
      </div>
    </div>
  </div>
);

const MiniMonitoringDashboard = () => (
  <div style={{ background: 'var(--bg-surface-hover)', padding: '0.75rem', borderRadius: '0.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}><MonitorPlay size={14} /> Monitoring Status</div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
      {mockData.monitoring.syntheticMonitors.slice(0,2).map((mon, i) => (
        <div key={i} style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '500' }}>{mon.name}</div>
          <div style={{ fontSize: '0.65rem', color: mon.status === 'Running' ? 'var(--accent-success)' : 'var(--accent-danger)' }}>{mon.status}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function AIChatBot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi Mark! I am powered by Antigravity CLI. How can I help you analyze the dashboard today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const quickActions = [
    "Show the executive dashboard",
    "Show the monitoring dashboard",
    "What is the customer experience score?"
  ];

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
        
      setInputValue(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e, directMessage = null) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const userMsg = directMessage || inputValue;
    if (!userMsg.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      
      if (!response.ok) {
        setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Error connecting to local AI.' }]);
        setIsLoading(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      const botMsgId = Date.now();
      
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: '' }]);
      setIsLoading(false); // Stop loading spinner once streaming starts

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: msg.text + chunk } : msg
        ));
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Failed to connect to local AI.' }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Window Side Panel */}
      {isOpen && (
        <div className="animate-fade-in" style={{ 
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px', 
          height: '100vh', 
          background: 'rgba(var(--bg-surface-rgb, 255, 255, 255), 0.85)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.05)', 
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9998
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface-hover)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>pulseCX Assistant</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-success)' }}></div> Online
                </div>
              </div>
            </div>
            <button className="btn-ghost tooltip-container" onClick={() => setIsOpen(false)} style={{ padding: '0.25rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }} data-tooltip="Close">
              <X size={18} color="var(--text-muted)" />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-base)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ 
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{ 
                  background: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)', 
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  padding: '0.75rem 1rem', 
                  borderRadius: '1rem',
                  borderBottomRightRadius: msg.sender === 'user' ? '4px' : '1rem',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '1rem',
                  border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                  fontSize: '0.875rem',
                  boxShadow: 'var(--shadow-sm)',
                  lineHeight: 1.5,
                  width: '100%',
                  wordBreak: 'break-word'
                }}>
                  {msg.text.replace('[RENDER_EXECUTIVE_DASHBOARD]', '').replace('[RENDER_MONITORING_DASHBOARD]', '')}
                  
                  {msg.text.includes('[RENDER_EXECUTIVE_DASHBOARD]') && <MiniExecutiveDashboard />}
                  {msg.text.includes('[RENDER_MONITORING_DASHBOARD]') && <MiniMonitoringDashboard />}
                </div>
              </div>
            ))}
            
            {/* Quick Actions (only show if chat just started) */}
            {messages.length === 1 && !isLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.25rem', fontWeight: '500' }}>Quick Actions</span>
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'none' }}>
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(null, action)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button 
              type="button" 
              onClick={toggleListening}
              className="btn-ghost" 
              style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                border: 'none', 
                cursor: 'pointer', 
                color: isListening ? '#ef4444' : 'var(--text-muted)' 
              }}
            >
              {isListening ? (
                <MicOff size={18} style={{ animation: 'pulse 2s infinite' }} />
              ) : (
                <Mic size={18} />
              )}
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? "Thinking..." : "Ask me anything..."}
              disabled={isLoading}
              style={{ flex: 1, background: 'var(--bg-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-full)', padding: '0.5rem 1rem', fontSize: '0.875rem', color: 'var(--text-primary)', outline: 'none', opacity: isLoading ? 0.6 : 1 }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
            <button type="submit" disabled={!inputValue.trim() || isLoading} style={{ 
              background: (inputValue.trim() && !isLoading) ? 'var(--accent-primary)' : 'var(--bg-surface-hover)', 
              color: (inputValue.trim() && !isLoading) ? '#ffffff' : 'var(--text-muted)', 
              border: 'none', 
              borderRadius: '50%', 
              width: '36px', 
              height: '36px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: (inputValue.trim() && !isLoading) ? 'pointer' : 'default',
              transition: 'background-color 0.2s'
            }}>
              {isLoading ? (
                <div style={{ width: '16px', height: '16px', border: '2px solid transparent', borderTopColor: 'var(--text-muted)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              ) : (
                <Send size={16} style={{ marginLeft: inputValue.trim() ? '2px' : '0' }} />
              )}
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              width: '56px', 
              height: '56px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))', 
              color: '#ffffff', 
              border: 'none', 
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(99, 102, 241, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(99, 102, 241, 0.4)';
            }}
          >
            <img src="/favicon.svg" alt="PulseCX AI" style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
      )}
    </>
  );
}
