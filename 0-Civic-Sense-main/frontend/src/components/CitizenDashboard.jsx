import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SocketContext } from '../App';

const CitizenDashboard = () => {
    const [stats, setStats] = useState(null);
    const [myReports, setMyReports] = useState([]);
    const [pendingVerifications, setPendingVerifications] = useState([]);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [statusFilter, setStatusFilter] = useState('All');
    
    const socket = useContext(SocketContext);
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchUserData = async () => {
        try {
            const res = await axios.get('http://localhost:5501/api/users');
            const me = res.data.find(u => u.username === user.username);
            if (me) setStats(me);

            const resIssues = await axios.get('http://localhost:5501/api/issues');
            setMyReports(resIssues.data.filter(i => i.reportedBy === user.username));
        } catch (e) { console.error(e); }
    };

    const fetchVerificationQueue = async () => {
        try {
            const res = await axios.get('http://localhost:5501/api/issues');
            const queue = res.data.filter(i => i.workflowStage === 'Community Verification' && i.reportedBy !== user.username);
            setPendingVerifications(queue);
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchUserData();
        fetchVerificationQueue();

        if (socket) {
            socket.on('issue_updated', (issue) => {
                if (issue.reportedBy === user.username) {
                    setMyReports(prev => prev.map(i => i.id === issue.id ? issue : i));
                }
                fetchVerificationQueue(); 
            });
            socket.on('new_issue', () => {
                fetchVerificationQueue();
            });
        }
        return () => {
            if (socket) {
                socket.off('issue_updated');
                socket.off('new_issue');
            }
        };
    }, [socket]);

    const handleVerify = async (id) => {
        try {
            await axios.post(`http://localhost:5501/api/issues/${id}/verify`, {
                user: user.username,
                severity: 'Medium' 
            });
            alert('✅ Verification submitted! +5 Hero Points awarded.');
            fetchUserData();
            fetchVerificationQueue();
        } catch (e) { console.error(e); }
    };

    const getStageColor = (stage) => {
        switch(stage) {
            case 'Reported': return '#94a3b8'; 
            case 'Under Scrutiny': return '#ef4444'; 
            case 'Community Verification': return '#f59e0b'; 
            case 'Approved': return '#4A9C7C'; 
            case 'Assigned': return '#38bdf8'; 
            case 'In Progress': return '#2B7A5F'; 
            case 'Resolved': return '#10b981'; 
            case 'Closed': return '#475569'; 
            case 'Rejected': return '#ef4444'; 
            default: return '#94a3b8';
        }
    };

    if (!stats) return (
        <div style={{ backgroundColor: '#05150C', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#2B7A5F' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
        </div>
    );

    const filteredReports = myReports.filter(r => statusFilter === 'All' || r.workflowStage === statusFilter);
    const uniqueStatuses = ['All', ...new Set(myReports.map(r => r.workflowStage))];

    return (
        <div style={{
            backgroundColor: '#05150C',
            minHeight: 'calc(100vh - 80px)',
            color: '#F4FBF7',
            fontFamily: "'Inter', sans-serif",
            padding: '40px 20px',
            position: 'relative'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'fixed', top: '0', left: '0', 
                width: '100vw', height: '100vh', background: 'radial-gradient(circle at top left, rgba(43,122,95,0.1) 0%, rgba(5,21,12,0) 50%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', margin: '0 0 8px 0', color: '#ffffff' }}>
                            Welcome, {stats.fullname || stats.username}
                        </h2>
                        <p style={{ color: '#A8D5BA', fontSize: '1rem', margin: 0 }}>Civic Dashboard Overview</p>
                    </div>
                    <Link to="/report" style={{
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                        borderRadius: '12px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 8px 20px rgba(43,122,95,0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <i className="fa-solid fa-plus"></i> New Report
                    </Link>
                </div>

                {/* Tabs Navigation */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {[
                        { id: 'dashboard', label: 'Overview', icon: 'fa-chart-pie' },
                        { id: 'explorer', label: 'Issue Explorer', icon: 'fa-magnifying-glass' },
                        { id: 'profile', label: 'Profile & Settings', icon: 'fa-user-gear' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                padding: '12px 24px',
                                color: activeTab === tab.id ? '#74B49B' : '#A8D5BA',
                                borderBottom: activeTab === tab.id ? '2px solid #74B49B' : '2px solid transparent',
                                cursor: 'pointer',
                                fontSize: '1.05rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
                        </button>
                    ))}
                </div>

                {/* TAB CONTENT: Overview (Dashboard) */}
                {activeTab === 'dashboard' && (
                    <div>
                        {/* Gamification Stats Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                            {[
                                { icon: 'fa-star', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', value: stats.heroPoints || 0, label: 'Hero Points' },
                                { icon: 'fa-shield-halved', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', value: `${stats.trustScore || 0}%`, label: 'Trust Score' },
                                { icon: 'fa-bullhorn', color: '#4A9C7C', bg: 'rgba(74, 156, 124, 0.15)', value: myReports.length, label: 'Issues Reported' },
                                { icon: 'fa-medal', color: '#2B7A5F', bg: 'rgba(43, 122, 95, 0.15)', value: stats.badges?.length || 0, label: 'Badges Earned' }
                            ].map((stat, i) => (
                                <div key={i} style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '20px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    transition: 'transform 0.3s, background 0.3s'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                                >
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '16px',
                                        background: stat.bg, color: stat.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.8rem'
                                    }}>
                                        <i className={`fa-solid ${stat.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', margin: '0 0 4px 0', color: 'white', lineHeight: 1 }}>{stat.value}</h3>
                                        <p style={{ color: '#A8D5BA', fontSize: '0.9rem', margin: 0 }}>{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Verification Queue */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                    <i className="fa-solid fa-list-check"></i>
                                </div>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', margin: 0, color: 'white' }}>Community Verification Queue</h3>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#A8D5BA', marginBottom: '24px', marginLeft: '52px' }}>
                                Verify issues reported by others in your community to help them get approved faster and earn Hero Points!
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
                                {pendingVerifications.length === 0 ? (
                                    <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#A8D5BA' }}>
                                        <i className="fa-solid fa-check-double" style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.5 }}></i>
                                        <p style={{ margin: 0 }}>No issues near you require verification right now.</p>
                                    </div>
                                ) : (
                                    pendingVerifications.map(issue => {
                                        const iVerified = issue.verifications?.some(v => v.user === user.username);
                                        return (
                                            <div key={issue.id} style={{
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                                borderRadius: '16px',
                                                padding: '24px'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                                    <h4 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: 'white' }}>{issue.title}</h4>
                                                    <span style={{ fontSize: '0.8rem', color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
                                                        Needs {Math.max(0, Math.ceil((60 - issue.trustScore) / 20))} more
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: '#A8D5BA', margin: '0 0 20px 0' }}><i className="fa-solid fa-location-dot"></i> {issue.location}</p>
                                                
                                                {iVerified ? (
                                                    <div style={{
                                                        width: '100%', padding: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                                                        borderRadius: '12px', color: '#10b981', textAlign: 'center', fontSize: '0.9rem', fontWeight: '600'
                                                    }}>
                                                        <i className="fa-solid fa-check"></i> You Verified This
                                                    </div>
                                                ) : (
                                                    <button onClick={() => handleVerify(issue.id)} style={{
                                                        width: '100%', padding: '12px', background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)', border: 'none',
                                                        borderRadius: '12px', color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer',
                                                        transition: 'transform 0.2s, box-shadow 0.2s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                                                        boxShadow: '0 4px 12px rgba(43,122,95,0.3)'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                                    >
                                                        Confirm Issue Exists
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: Issue Explorer */}
                {activeTab === 'explorer' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(74, 156, 124, 0.1)', color: '#74B49B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                    <i className="fa-solid fa-map-location-dot"></i>
                                </div>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', margin: 0, color: 'white' }}>My Reported Issues</h3>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <label style={{ color: '#A8D5BA', fontWeight: '600' }}>Filter Status:</label>
                                <select 
                                    value={statusFilter} 
                                    onChange={e => setStatusFilter(e.target.value)}
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        outline: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        cursor: 'pointer'
                                    }}
                                >
                                    {uniqueStatuses.map(s => (
                                        <option key={s} value={s} style={{ background: '#05150C', color: 'white' }}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                            {filteredReports.length === 0 ? (
                                <div style={{ gridColumn: '1 / -1', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#A8D5BA' }}>
                                    <i className="fa-solid fa-folder-open" style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.5 }}></i>
                                    <p style={{ margin: 0 }}>No issues found matching this filter.</p>
                                </div>
                            ) : (
                                filteredReports.map(report => (
                                    <div key={report.id} style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        display: 'flex',
                                        gap: '20px',
                                        alignItems: 'center'
                                    }}>
                                        <img src={report.image} alt={report.title} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                <h4 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: 'white' }}>{report.title}</h4>
                                                <span style={{ 
                                                    background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '8px', 
                                                    fontSize: '0.75rem', fontWeight: 'bold', color: getStageColor(report.workflowStage),
                                                    border: `1px solid ${getStageColor(report.workflowStage)}40`
                                                }}>
                                                    {report.workflowStage}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: '#A8D5BA', margin: '0 0 12px 0' }}>{new Date(report.date).toLocaleDateString()} &bull; {report.location}</p>
                                            
                                            <div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', color: '#F4FBF7' }}>
                                                    <span>Verification Progress</span>
                                                    <span>{Math.min(100, Math.max(0, report.trustScore))}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, report.trustScore))}%`, background: report.trustScore >= 60 ? '#10b981' : '#f59e0b' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: Profile & Settings */}
                {activeTab === 'profile' && (
                    <div style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(43, 122, 95, 0.1)', color: '#4A9C7C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                <i className="fa-solid fa-address-card"></i>
                            </div>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', margin: 0, color: 'white' }}>Account Settings</h3>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>
                                    {stats.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif", color: 'white' }}>{stats.fullname || stats.username}</h3>
                                    <span style={{ background: 'rgba(74, 156, 124, 0.2)', color: '#74B49B', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>Active Citizen</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#A8D5BA', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                                    <input type="text" value={stats.email || 'user@example.com'} disabled style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontSize: '1rem', outline: 'none' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#A8D5BA', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Username</label>
                                    <input type="text" value={stats.username} disabled style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontSize: '1rem', outline: 'none' }} />
                                </div>
                            </div>

                            <button style={{
                                width: '100%', padding: '14px', marginTop: '32px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px', color: 'white', fontSize: '1rem', fontWeight: '600',
                                cursor: 'not-allowed', opacity: 0.7
                            }}>
                                Save Changes (Coming Soon)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CitizenDashboard;
