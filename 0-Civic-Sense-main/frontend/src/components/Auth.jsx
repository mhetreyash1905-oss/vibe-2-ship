import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!isLogin) {
            if (!validateEmail(email)) {
                setError("Please enter a valid email address.");
                return;
            }
            if (!validatePassword(password)) {
                setError("Password must be at least 8 characters long, contain an uppercase, lowercase, number, and special character.");
                return;
            }
        }
        
        try {
            if (isLogin) {
                const res = await api.post('/api/login', { email, password });
                const user = res.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                window.dispatchEvent(new Event('auth-change'));
                
                if (user.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const res = await api.post('/api/signup', { fullname, username, email, password });
                const user = res.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                window.dispatchEvent(new Event('auth-change'));
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: 'var(--panel-bg)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'var(--text-main)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        marginBottom: '20px',
        fontFamily: "'Inter', sans-serif"
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        fontWeight: '500',
        fontFamily: "'Inter', sans-serif"
    };
    
    // Password strength visual indicator
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    return (
        <div style={{
            backgroundColor: 'var(--bg-main)',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '20px',
            overflow: 'hidden'
        }}>
            {/* Subtle radial gradient background */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(43,122,95,0.2) 0%, rgba(5,21,12,0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>

            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '450px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.5)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ 
                        width: '48px', height: '48px', borderRadius: '14px', 
                        background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '16px',
                        boxShadow: '0 4px 12px rgba(43,122,95,0.3)'
                    }}>
                        <i className="fa-solid fa-leaf"></i>
                    </div>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        margin: '0 0 8px 0'
                    }}>
                        {isLogin ? 'Welcome Back' : 'Join CivicPulse'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                        {isLogin ? 'Sign in to track your reports and earn points.' : 'Create an account to start improving your city.'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#fca5a5',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        marginBottom: '24px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        fontFamily: "'Inter', sans-serif",
                        animation: 'fadeIn 0.3s'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div>
                                <label style={labelStyle}>Full Name</label>
                                <input 
                                    type="text" 
                                    value={fullname} 
                                    onChange={e => setFullname(e.target.value)} 
                                    required 
                                    style={inputStyle}
                                    onFocus={e => {
                                        e.target.style.borderColor = 'var(--primary-hover)';
                                        e.target.style.boxShadow = '0 0 0 2px rgba(43,122,95,0.2)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'var(--panel-border)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Username</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)} 
                                    required 
                                    style={inputStyle}
                                    onFocus={e => {
                                        e.target.style.borderColor = 'var(--primary-hover)';
                                        e.target.style.boxShadow = '0 0 0 2px rgba(43,122,95,0.2)';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'var(--panel-border)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <label style={labelStyle}>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            style={inputStyle}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary-hover)';
                                e.target.style.boxShadow = '0 0 0 2px rgba(43,122,95,0.2)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'var(--panel-border)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <label style={labelStyle}>Password</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                            style={{...inputStyle, marginBottom: (!isLogin && password.length > 0) ? '8px' : '20px', paddingRight: '40px'}}
                            onFocus={e => {
                                e.target.style.borderColor = 'var(--primary-hover)';
                                e.target.style.boxShadow = '0 0 0 2px rgba(43,122,95,0.2)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'var(--panel-border)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute', right: '12px', top: '38px',
                                background: 'none', border: 'none', color: '#74B49B',
                                cursor: 'pointer', fontSize: '1.1rem'
                            }}
                        >
                            <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                        </button>
                        {!isLogin && password.length > 0 && (
                            <div style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                    {[1, 2, 3, 4].map(level => (
                                        <div key={level} style={{ 
                                            flex: 1, height: '4px', borderRadius: '2px', 
                                            background: strength >= level ? (strength === 4 ? '#10b981' : (strength >= 2 ? '#f59e0b' : '#ef4444')) : 'var(--panel-border)',
                                            transition: 'background 0.3s'
                                        }}></div>
                                    ))}
                                </div>
                                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                    {strength === 4 ? 'Strong password' : 'Needs uppercase, lowercase, number, and special char'}
                                </small>
                            </div>
                        )}
                    </div>
                    
                    <button type="submit" style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'var(--text-main)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '8px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        fontFamily: "'Inter', sans-serif"
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(43,122,95,0.3)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                    }}
                    >
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontFamily: "'Inter', sans-serif" }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setEmail('');
                            setPassword('');
                        }} 
                        style={{ 
                            background: 'none', border: 'none', color: '#74B49B', 
                            cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem',
                            fontFamily: "'Inter', sans-serif", padding: '0 4px',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={e => e.target.style.color = 'var(--text-muted)'}
                        onMouseLeave={e => e.target.style.color = '#74B49B'}
                    >
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
