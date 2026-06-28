import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../App';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, activeUsers: 0 });
    const socket = useContext(SocketContext);

    const fetchData = async () => {
        try {
            const [issueRes, userRes] = await Promise.all([
                axios.get('http://localhost:5501/api/issues'),
                axios.get('http://localhost:5501/api/users')
            ]);
            
            const fetchedIssues = issueRes.data;
            setIssues(fetchedIssues);
            setUsers(userRes.data);
            setStats({
                total: fetchedIssues.length,
                pending: fetchedIssues.filter(i => i.workflowStage === 'Reported' || i.workflowStage === 'Community Verification').length,
                resolved: fetchedIssues.filter(i => i.workflowStage === 'Resolved' || i.workflowStage === 'Closed').length,
                activeUsers: userRes.data.length
            });
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        fetchData();

        if (socket) {
            socket.on('new_issue', () => fetchData());
            socket.on('issue_updated', () => fetchData());
        }
        return () => {
            if (socket) {
                socket.off('new_issue');
                socket.off('issue_updated');
            }
        };
    }, [socket]);

    const updateStage = async (id, stage) => {
        try {
            await axios.patch(`http://localhost:5501/api/issues/${id}/stage`, { stage });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const handleScrutinyAction = async (id, action) => {
        try {
            await axios.post(`http://localhost:5501/api/issues/${id}/scrutiny-action`, { action });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const adjustTrustScore = async (username, amount) => {
        try {
            await axios.post(`http://localhost:5501/api/users/${username}/trust-score`, { adjustValue: amount });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const WorkflowColumn = ({ title, stages, icon, color }) => {
        const columnIssues = issues.filter(i => stages.includes(i.workflowStage));
        
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                minWidth: '340px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: '0 0 auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', margin: 0, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className={`fa-solid ${icon}`} style={{ color }}></i>
                        {title}
                    </h3>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', color: 'white' }}>
                        {columnIssues.length}
                    </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {columnIssues.map(issue => (
                        <div key={issue.id} style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '16px',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.75rem', color: '#A8D5BA', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px' }}>#{issue.id.slice(-6)}</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: issue.trustScore >= 60 ? '#10b981' : (issue.trustScore < 40 ? '#ef4444' : '#f59e0b') }}>
                                    Trust: {issue.trustScore}%
                                </span>
                            </div>

                            {/* Image and AI Reason for Scrutiny */}
                            {stages.includes('Under Scrutiny') && (
                                <div style={{ marginBottom: '12px' }}>
                                    {issue.imageUrl && (
                                        <img src={issue.imageUrl} alt="Issue" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />
                                    )}
                                    {issue.authenticityReason && (
                                        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#fca5a5' }}>
                                            <strong><i className="fa-solid fa-robot"></i> AI Flag:</strong> {issue.authenticityReason}
                                        </div>
                                    )}
                                </div>
                            )}

                            <h4 style={{ margin: '0 0 6px 0', fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: 'white', lineHeight: 1.3 }}>{issue.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: '#A8D5BA', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <i className="fa-solid fa-location-dot" style={{ color: '#4A9C7C' }}></i> {issue.location}
                            </p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {stages.includes('Under Scrutiny') ? (
                                    <>
                                        <button onClick={() => handleScrutinyAction(issue.id, 'approve')} style={{ flex: 1, padding: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(16,185,129,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(16,185,129,0.1)'}>
                                            Verify as Genuine
                                        </button>
                                        <button onClick={() => handleScrutinyAction(issue.id, 'reject')} style={{ flex: 1, padding: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(239,68,68,0.1)'}>
                                            Mark as Fake
                                        </button>
                                    </>
                                ) : stages.includes('Reported') || stages.includes('Community Verification') ? (
                                    <button onClick={() => updateStage(issue.id, 'Approved')} style={{ width: '100%', padding: '8px', background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={e=>e.currentTarget.style.opacity=0.9} onMouseLeave={e=>e.currentTarget.style.opacity=1}>
                                        Override & Approve
                                    </button>
                                ) : stages.includes('Approved') ? (
                                    <button onClick={() => updateStage(issue.id, 'Assigned')} style={{ width: '100%', padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
                                        Assign Department
                                    </button>
                                ) : stages.includes('Assigned') ? (
                                    <button onClick={() => updateStage(issue.id, 'In Progress')} style={{ width: '100%', padding: '8px', background: 'rgba(74, 156, 124, 0.1)', border: '1px solid rgba(74, 156, 124, 0.3)', borderRadius: '8px', color: '#74B49B', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(74, 156, 124, 0.2)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(74, 156, 124, 0.1)'}>
                                        Mark In Progress
                                    </button>
                                ) : stages.includes('In Progress') ? (
                                    <button onClick={() => updateStage(issue.id, 'Resolved')} style={{ width: '100%', padding: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '8px', color: '#10b981', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(16,185,129,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(16,185,129,0.1)'}>
                                        Mark Resolved
                                    </button>
                                ) : stages.includes('Resolved') ? (
                                    <button onClick={() => updateStage(issue.id, 'Closed')} style={{ width: '100%', padding: '8px', background: 'rgba(71,85,105,0.2)', border: '1px solid rgba(71,85,105,0.4)', borderRadius: '8px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(71,85,105,0.4)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(71,85,105,0.2)'}>
                                        Close Case
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    ))}
                    
                    {columnIssues.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#74B49B', fontSize: '0.9rem' }}>
                            No issues in this stage
                        </div>
                    )}
                </div>
            </div>
        );
    };

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
                width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at bottom right, rgba(43,122,95,0.15) 0%, rgba(5,21,12,0) 60%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                    <div>
                        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', margin: '0 0 8px 0', color: '#ffffff' }}>
                            Command Center
                        </h2>
                        <p style={{ color: '#A8D5BA', fontSize: '1rem', margin: 0 }}>Real-time civic management and moderation dashboard.</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: '600', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #10b981' }}></span>
                        Live Sync Active
                    </div>
                </div>

                {/* Overview Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                    {[
                        { icon: 'fa-layer-group', color: '#4A9C7C', bg: 'rgba(74, 156, 124, 0.15)', value: stats.total, label: 'Total Issues' },
                        { icon: 'fa-hourglass-half', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', value: stats.pending, label: 'Awaiting Approval' },
                        { icon: 'fa-circle-check', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', value: stats.resolved, label: 'Resolved & Closed' },
                        { icon: 'fa-users', color: '#2B7A5F', bg: 'rgba(43, 122, 95, 0.15)', value: stats.activeUsers, label: 'Active Citizens' }
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

                {/* Kanban Board */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '24px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(43,122,95,0.5) transparent' }}>
                        <WorkflowColumn title="Under Scrutiny" stages={['Under Scrutiny']} icon="fa-triangle-exclamation" color="#ef4444" />
                        <WorkflowColumn title="Pending Verification" stages={['Reported', 'Community Verification']} icon="fa-clock" color="#f59e0b" />
                        <WorkflowColumn title="Approved" stages={['Approved']} icon="fa-thumbs-up" color="#4A9C7C" />
                        <WorkflowColumn title="Active" stages={['Assigned', 'In Progress']} icon="fa-person-digging" color="#2B7A5F" />
                        <WorkflowColumn title="Resolved" stages={['Resolved', 'Closed']} icon="fa-check-double" color="#10b981" />
                    </div>
                </div>

                {/* User Management */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(43, 122, 95, 0.2)', color: '#4A9C7C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                            <i className="fa-solid fa-users-gear"></i>
                        </div>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', margin: 0, color: 'white' }}>User Moderation</h3>
                    </div>
                    
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        overflowX: 'auto'
                    }}>
                        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '800px' }}>
                            <thead>
                                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>User</th>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Role</th>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Trust Score</th>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fake Reports</th>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                                    <th style={{ padding: '20px', color: '#A8D5BA', fontWeight: '500', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Modify Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(43, 122, 95, 0.3)', color: '#74B49B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    {u.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: '500', color: 'white' }}>{u.username}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <span style={{ 
                                                background: u.role === 'admin' ? 'rgba(74, 156, 124, 0.2)' : 'rgba(255,255,255,0.05)',
                                                color: u.role === 'admin' ? '#74B49B' : '#A8D5BA',
                                                padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize'
                                            }}>{u.role}</span>
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontWeight: '600', color: u.trustScore >= 50 ? '#10b981' : '#ef4444' }}>{u.trustScore}%</span>
                                                <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${Math.min(100, Math.max(0, u.trustScore))}%`, background: u.trustScore >= 50 ? '#10b981' : '#ef4444' }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '20px', color: u.fakeReportsCount > 0 ? '#f59e0b' : '#A8D5BA' }}>
                                            {u.fakeReportsCount || 0}
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            {u.isBlocked ? (
                                                <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '600' }}><i className="fa-solid fa-ban"></i> Blocked</span>
                                            ) : (
                                                <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '600' }}><i className="fa-solid fa-circle-check"></i> Active</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '20px' }}>
                                            {u.role !== 'admin' ? (
                                                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px', width: 'fit-content' }}>
                                                    <button onClick={() => adjustTrustScore(u.username, -1)} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '4px', color: '#ef4444', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(239,68,68,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} title="Decrease Score">
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </button>
                                                    <div style={{ width: '32px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600', fontSize: '0.85rem' }}>
                                                        {u.trustScore}
                                                    </div>
                                                    <button onClick={() => adjustTrustScore(u.username, 1)} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '4px', color: '#10b981', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e=>e.currentTarget.style.background='rgba(16,185,129,0.2)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'} title="Increase Score">
                                                        <i className="fa-solid fa-chevron-up"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
