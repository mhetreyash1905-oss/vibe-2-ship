import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [issues, setIssues] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('requests');
    const navigate = useNavigate();

    const fetchIssues = () => {
        api.get('/api/issues')
            .then(res => setIssues(res.data))
            .catch(err => console.error(err));
    };

    const fetchPendingRequests = () => {
        api.get('/api/issues/pending-approval')
            .then(res => setPendingRequests(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchIssues();
        fetchPendingRequests();
    }, [navigate]);

    const fetchUsers = () => {
        api.get('/api/users')
            .then(res => {
                setUsers(res.data);
                setIsDrawerOpen(true);
            })
            .catch(err => console.error(err));
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/api/issues/${id}/status`, { status });
            fetchIssues();
        } catch (err) {
            console.error(err);
        }
    };

    const approveComplaint = async (id) => {
        try {
            await api.patch(`/api/issues/${id}/approve`);
            fetchPendingRequests();
            fetchIssues();
        } catch (err) {
            console.error('Failed to approve:', err);
        }
    };

    const rejectComplaint = async (id) => {
        if (!window.confirm('Are you sure you want to reject and discard this complaint?')) return;
        try {
            await api.patch(`/api/issues/${id}/reject`);
            fetchPendingRequests();
        } catch (err) {
            console.error('Failed to reject:', err);
        }
    };

    // --- Tab button styles ---
    const tabStyle = (isActive) => ({
        padding: '10px 24px',
        borderRadius: '8px 8px 0 0',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.95rem',
        transition: 'all 0.3s ease',
        background: isActive ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
        color: isActive ? '#818cf8' : 'var(--text-muted, #888)',
        borderBottom: isActive ? '2px solid #818cf8' : '2px solid transparent',
    });

    return (
        <section className="view-section active" style={{ position: 'relative' }}>
            {/* Dashboard Header */}
            <div className="admin-table-container glass-panel">
                <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
                        <span className="ml-badge"><i className="fa-solid fa-brain"></i> ML Enhanced</span>
                    </div>
                    <button onClick={fetchUsers} className="btn-primary" style={{ padding: '8px 16px', borderRadius: '6px' }}>View Users</button>
                </div>

                {/* Tab Navigation */}
                <div style={{ display: 'flex', gap: '4px', marginTop: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <button
                        onClick={() => setActiveTab('requests')}
                        style={tabStyle(activeTab === 'requests')}
                    >
                        <i className="fa-solid fa-inbox" style={{ marginRight: '8px' }}></i>
                        Complaint Requests
                        {pendingRequests.length > 0 && (
                            <span style={{
                                marginLeft: '8px',
                                background: '#ef4444',
                                color: 'white',
                                borderRadius: '10px',
                                padding: '1px 8px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                minWidth: '20px',
                                display: 'inline-block',
                                textAlign: 'center',
                                animation: 'pulse 2s infinite',
                            }}>
                                {pendingRequests.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('management')}
                        style={tabStyle(activeTab === 'management')}
                    >
                        <i className="fa-solid fa-list-check" style={{ marginRight: '8px' }}></i>
                        Issue Management
                    </button>
                </div>

                {/* ========== TAB: Complaint Requests ========== */}
                {activeTab === 'requests' && (
                    <div style={{ padding: '20px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <h3 style={{ margin: 0, color: 'var(--text-main, #fff)' }}>
                                <i className="fa-solid fa-clock-rotate-left" style={{ color: '#F59E0B', marginRight: '8px' }}></i>
                                Pending Approval
                            </h3>
                            <span style={{
                                fontSize: '0.8rem',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                background: 'rgba(245,158,11,0.12)',
                                color: '#F59E0B',
                                fontWeight: 600,
                            }}>
                                {pendingRequests.length} pending
                            </span>
                        </div>

                        {pendingRequests.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '48px 20px',
                                color: 'var(--text-muted, #888)',
                            }}>
                                <i className="fa-solid fa-check-circle" style={{ fontSize: '2.5rem', color: '#10B981', display: 'block', marginBottom: '12px' }}></i>
                                <p style={{ fontSize: '1.05rem', fontWeight: 500 }}>No pending complaint requests</p>
                                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>All complaints have been reviewed. Great job!</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {pendingRequests.map(issue => (
                                    <div key={issue._id} style={{
                                        background: 'rgba(245,158,11,0.04)',
                                        border: '1px solid rgba(245,158,11,0.15)',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        display: 'flex',
                                        gap: '16px',
                                        alignItems: 'flex-start',
                                        transition: 'all 0.3s ease',
                                    }}>
                                        {/* Thumbnail */}
                                        <img
                                            src={issue.image || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80'}
                                            alt="Issue"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                                flexShrink: 0,
                                            }}
                                        />

                                        {/* Details */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main, #fff)' }}>
                                                    {issue.title || `New ${issue.category} Issue`}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    background: 'rgba(245,158,11,0.15)',
                                                    color: '#F59E0B',
                                                    fontWeight: 600,
                                                }}>
                                                    {issue.category || 'Other'}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    background: issue.urgency === 'High' ? 'rgba(239,68,68,0.15)' : 'rgba(139,92,246,0.15)',
                                                    color: issue.urgency === 'High' ? '#ef4444' : '#8B5CF6',
                                                    fontWeight: 600,
                                                }}>
                                                    {issue.urgency || 'Medium'} Urgency
                                                </span>
                                            </div>

                                            <p style={{
                                                fontSize: '0.85rem',
                                                color: 'var(--text-muted, #888)',
                                                margin: '4px 0 8px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}>
                                                {issue.desc || 'No description provided.'}
                                            </p>

                                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted, #888)', flexWrap: 'wrap' }}>
                                                <span><i className="fa-solid fa-location-dot" style={{ color: 'var(--color-primary, #6366f1)', marginRight: '4px' }}></i>{issue.location}</span>
                                                <span><i className="fa-solid fa-user-pen" style={{ marginRight: '4px' }}></i>{issue.reportedBy || 'Citizen'}</span>
                                                <span><i className="fa-solid fa-calendar" style={{ marginRight: '4px' }}></i>{issue.date}</span>
                                                <span><i className="fa-solid fa-building-columns" style={{ marginRight: '4px' }}></i>{issue.authority || ''}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                                            <button
                                                onClick={() => approveComplaint(issue._id)}
                                                className="btn-primary"
                                                style={{
                                                    padding: '8px 16px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '6px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    whiteSpace: 'nowrap',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <i className="fa-solid fa-check"></i> Approve
                                            </button>
                                            <button
                                                onClick={() => rejectComplaint(issue._id)}
                                                style={{
                                                    padding: '8px 16px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '6px',
                                                    border: '1px solid rgba(239,68,68,0.4)',
                                                    background: 'rgba(239,68,68,0.08)',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    whiteSpace: 'nowrap',
                                                    transition: 'all 0.2s',
                                                }}
                                            >
                                                <i className="fa-solid fa-xmark"></i> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ========== TAB: Issue Management ========== */}
                {activeTab === 'management' && (
                    <div style={{ padding: '20px 0' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Category & Date</th>
                                    <th>Issue details</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issues.map(issue => (
                                    <tr key={issue._id}>
                                        <td>
                                            <div className="table-id">{issue.category}</div>
                                            <div className="table-date">{new Date(issue.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td>
                                            <div style={{fontWeight: 600, color: 'var(--text-main)'}}>{issue.title}</div>
                                            <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{issue.location}</div>
                                        </td>
                                        <td><span className={`status-badge ${issue.status}`}>{issue.status}</span></td>
                                        <td>
                                            <select value={issue.status} onChange={e => updateStatus(issue._id, e.target.value)} style={{background: 'rgba(255,255,255,0.1)', color: 'white', padding: '4px'}}>
                                                <option value="pending">Pending</option>
                                                <option value="progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Users Drawer */}
            <div style={{
                position: 'fixed',
                top: 0,
                right: isDrawerOpen ? 0 : '-450px',
                width: '400px',
                height: '100vh',
                backgroundColor: '#1a1a24',
                borderLeft: '1px solid rgba(255,255,255,0.1)',
                transition: 'right 0.3s ease',
                zIndex: 1000,
                padding: '20px',
                overflowY: 'auto',
                boxShadow: '-5px 0 15px rgba(0,0,0,0.5)',
                color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                    <h3 style={{ margin: 0 }}>Registered Users</h3>
                    <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', lineHeight: '1' }}>&times;</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {users.map((u, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '5px' }}>{u.fullname || u.username} <span style={{ fontSize: '0.8rem', color: u.role === 'admin' ? '#ff9800' : '#4caf50', marginLeft: '10px', textTransform: 'uppercase' }}>[{u.role}]</span></div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '3px' }}><strong>Username:</strong> {u.username}</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '3px' }}><strong>Email:</strong> {u.email}</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '10px' }}><strong>Phone:</strong> {u.phone || 'N/A'}</div>
                            
                            <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                                <div><strong>Complaints:</strong> <span style={{ color: '#2196f3', fontWeight: 'bold' }}>{u.complaintsRegistered}</span></div>
                                <div><strong>Resolved:</strong> <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{u.complaintsResolved}</span></div>
                            </div>
                        </div>
                    ))}
                    {users.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No users found.</p>}
                </div>
            </div>
            
            {/* Drawer Overlay */}
            {isDrawerOpen && (
                <div 
                    onClick={() => setIsDrawerOpen(false)}
                    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
                ></div>
            )}
        </section>
    );
};

export default Dashboard;
