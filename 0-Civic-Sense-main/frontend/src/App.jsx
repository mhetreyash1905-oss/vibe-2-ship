import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Feed from './components/Feed';
import Auth from './components/Auth';
import CitizenDashboard from './components/CitizenDashboard';
import AdminDashboard from './components/AdminDashboard';
import ReportIssue from './components/ReportIssue';
import CivicBot from './components/CivicBot';
import { io } from 'socket.io-client';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = React.createContext();

function ProtectedRoute({ children, roleRequired }) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        return <Auth />; // Redirect to auth
    }
    
    if (roleRequired && user.role !== roleRequired) {
        return <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingTop: '100px', textAlign: 'center', color: '#94a3b8', fontFamily: "'Inter', sans-serif" }}><h2 style={{ color: '#ef4444', fontFamily: "'Outfit', sans-serif" }}>Unauthorized</h2><p>You do not have access to this page.</p></div>;
    }
    
    return children;
}

function Navigation() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [notifications, setNotifications] = useState([]);
    const [showNotifs, setShowNotifs] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
            const data = await res.json();
            const me = data.find(u => u.username === user.username);
            if (me) {
                setNotifications(me.notifications || []);
            }
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem('user')));
        };
        
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('auth-change', handleStorageChange);
        handleStorageChange();
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('auth-change', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [location.pathname, user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('auth-change'));
        navigate('/');
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const navLinkStyle = (path) => ({
        color: location.pathname === path ? 'white' : '#94a3b8',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '0.95rem',
        padding: '8px 12px',
        borderRadius: '8px',
        background: location.pathname === path ? 'var(--panel-bg)' : 'transparent',
        transition: 'color 0.2s, background 0.2s'
    });

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '16px 40px',
            background: 'rgba(5, 21, 12, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Inter', sans-serif"
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text-main)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(43,122,95,0.3)' }}>
                    <i className="fa-solid fa-leaf"></i>
                </div>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', fontWeight: '700', letterSpacing: '0.5px' }}>CivicPulse</span>
            </Link>
            
            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/" style={navLinkStyle('/')}>Home</Link>
                <Link to="/feed" style={navLinkStyle('/feed')}>Public Feed</Link>
                
                {user && user.role === 'admin' && (
                    <Link to="/admin" style={navLinkStyle('/admin')}>Admin Panel</Link>
                )}
                {user && user.role === 'citizen' && (
                    <Link to="/dashboard" style={navLinkStyle('/dashboard')}>My Dashboard</Link>
                )}

                {user && (
                    <div style={{ position: 'relative', marginLeft: '12px' }}>
                        <button onClick={() => setShowNotifs(!showNotifs)} style={{ 
                            background: 'var(--panel-bg)', border: '1px solid rgba(255,255,255,0.1)', 
                            color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.1rem', width: '40px', height: '40px', 
                            borderRadius: '10px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--panel-border)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--panel-bg)'}
                        >
                            <i className="fa-solid fa-bell"></i>
                            {unreadCount > 0 && (
                                <span style={{ 
                                    position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', 
                                    color: 'var(--text-main)', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', 
                                    fontWeight: 'bold', border: '2px solid #0a0a1a' 
                                }}>{unreadCount}</span>
                            )}
                        </button>
                        
                        {showNotifs && (
                            <div style={{ 
                                position: 'absolute', top: '50px', right: '0', width: '340px', maxHeight: '400px', 
                                overflowY: 'auto', padding: '0', zIndex: 1000, background: 'rgba(5, 21, 12, 0.95)',
                                backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', 
                                borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease'
                            }}>
                                <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: 'var(--text-main)' }}>Notifications</h4>
                                    {unreadCount > 0 && <span style={{ fontSize: '0.75rem', background: 'rgba(37,99,235,0.1)', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '8px', fontWeight: '600' }}>{unreadCount} New</span>}
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {notifications.length === 0 ? (
                                        <p style={{ padding: '30px 20px', margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>No notifications yet.</p>
                                    ) : (
                                        notifications.slice().reverse().map((n, idx) => (
                                            <div key={idx} style={{ 
                                                padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.03)', 
                                                fontSize: '0.85rem', background: !n.read ? 'rgba(37,99,235,0.1)' : 'transparent',
                                                display: 'flex', gap: '12px', alignItems: 'flex-start'
                                            }}>
                                                <div style={{ 
                                                    width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                                                    background: n.message.includes('WARNING') || n.message.includes('BLOCKED') ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                                                    color: n.message.includes('WARNING') || n.message.includes('BLOCKED') ? '#ef4444' : '#10b981',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem'
                                                }}>
                                                    <i className={`fa-solid ${n.message.includes('WARNING') || n.message.includes('BLOCKED') ? 'fa-triangle-exclamation' : 'fa-check'}`}></i>
                                                </div>
                                                <div>
                                                    <p style={{ margin: '0 0 4px 0', color: 'var(--text-main)', lineHeight: 1.4 }}>{n.message}</p>
                                                    <small style={{ color: 'var(--text-muted)' }}>{new Date(n.date).toLocaleString()}</small>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                
                {!user ? (
                    <Link to="/login" style={{
                        padding: '10px 24px', marginLeft: '12px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                        color: 'var(--text-main)', textDecoration: 'none', borderRadius: '10px', fontWeight: '600', fontSize: '0.95rem',
                        transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-block'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(43,122,95,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >Sign In</Link>
                ) : (
                    <div style={{ position: 'relative', marginLeft: '12px' }}>
                        <div 
                            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }} 
                            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', fontWeight: 'bold', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.2)' }}
                        >
                            {user.fullname ? user.fullname[0].toUpperCase() : user.username[0].toUpperCase()}
                        </div>
                        {showProfile && (
                            <div style={{ position: 'absolute', top: '50px', right: '0', width: '220px', background: 'var(--panel-bg)', backdropFilter: 'blur(20px)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '8px', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--panel-border)', marginBottom: '8px' }}>
                                    <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-main)' }}>{user.fullname || user.username}</p>
                                    <small style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</small>
                                </div>
                                {user.role === 'citizen' && (
                                    <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', color: 'var(--text-main)', textDecoration: 'none', borderRadius: '6px', transition: 'background 0.2s' }} onClick={() => setShowProfile(false)} onMouseEnter={e => e.currentTarget.style.background = 'var(--panel-border)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><i className="fa-solid fa-user"></i> My Profile</Link>
                                )}
                                {user.role === 'admin' && (
                                    <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', color: 'var(--text-main)', textDecoration: 'none', borderRadius: '6px', transition: 'background 0.2s' }} onClick={() => setShowProfile(false)} onMouseEnter={e => e.currentTarget.style.background = 'var(--panel-border)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><i className="fa-solid fa-shield-halved"></i> Admin Panel</Link>
                                )}
                                <div style={{ height: '1px', background: 'var(--panel-border)', margin: '4px 0' }}></div>
                                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#ef4444', padding: '10px 12px', cursor: 'pointer', borderRadius: '6px', fontWeight: '600', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}

function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_API_URL);
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <Router>
                <Navigation />
                <main style={{ minHeight: 'calc(100vh - 73px)' }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/login" element={<Auth />} />
                        
                        {/* Protected Routes */}
                        <Route path="/report" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute roleRequired="citizen"><CitizenDashboard /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
                    </Routes>
                </main>
                <CivicBot />
            </Router>
        </SocketContext.Provider>
    );
}

export default App;
