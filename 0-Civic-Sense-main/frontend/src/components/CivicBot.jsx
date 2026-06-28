import React, { useState, useRef, useEffect } from 'react';
import api from '../api';

const CivicBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hi! I'm **PulseBot** 🤖 — your AI assistant for CivicPulse.\n\nAsk me anything about issues, analytics, your reports, or how the platform works!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
        setInput('');
        setLoading(true);

        try {
            const res = await api.post('/api/chatbot', {
                message: trimmed,
                username: user?.username || null
            });
            setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (e) {
            console.error(e);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I ran into an error. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const renderText = (text) => {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/^- (.+)/gm, '• $1')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.75rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(43, 122, 95, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(43, 122, 95, 0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(43, 122, 95, 0.4)'; }}
            >
                <i className={isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-robot'}></i>
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '110px',
                    right: '30px',
                    width: '380px',
                    height: '550px',
                    background: 'rgba(5, 21, 12, 0.85)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 9998,
                    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '16px 20px',
                        background: 'linear-gradient(135deg, rgba(43, 122, 95, 0.15), rgba(74, 156, 124, 0.1))',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.2rem', color: 'white'
                        }}>
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.1rem', fontFamily: "'Outfit', sans-serif", color: 'white' }}>PulseBot</h4>
                            <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                                Online — AI Powered
                            </span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                padding: '12px 16px',
                                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                background: msg.role === 'user'
                                    ? 'linear-gradient(135deg, #2B7A5F, #4A9C7C)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: msg.role === 'bot' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                fontSize: '0.9rem',
                                lineHeight: '1.5',
                                color: 'white',
                                wordBreak: 'break-word',
                                boxShadow: msg.role === 'user' ? '0 4px 12px rgba(43,122,95,0.2)' : 'none'
                            }}
                                dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                            />
                        ))}
                        {loading && (
                            <div style={{
                                alignSelf: 'flex-start',
                                padding: '12px 16px',
                                borderRadius: '16px 16px 16px 4px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                fontSize: '0.9rem',
                                color: '#A8D5BA',
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center'
                            }}>
                                <i className="fa-solid fa-circle-notch fa-spin"></i> Thinking...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(255,255,255,0.02)',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center'
                    }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask PulseBot anything..."
                            style={{
                                flex: 1,
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '14px',
                                padding: '12px 16px',
                                color: 'white',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                fontFamily: "'Inter', sans-serif"
                            }}
                            onFocus={e => e.target.style.borderColor = '#4A9C7C'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '14px',
                                background: loading || !input.trim() ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                                border: 'none',
                                color: loading || !input.trim() ? '#A8D5BA' : 'white',
                                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                                flexShrink: 0,
                                transition: 'transform 0.2s, background 0.2s'
                            }}
                            onMouseEnter={e => { if(!loading && input.trim()) e.currentTarget.style.transform = 'scale(1.05)'; }}
                            onMouseLeave={e => { if(!loading && input.trim()) e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CivicBot;
