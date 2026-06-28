import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App';

const Feed = () => {
    const [issues, setIssues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [userVotes, setUserVotes] = useState({});
    
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchIssues = () => {
        api.get('/api/issues')
            .then(res => setIssues(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchIssues();

        if (socket) {
            socket.on('new_issue', (newIssue) => {
                setIssues(prev => [newIssue, ...prev]);
            });

            socket.on('issue_updated', (updatedIssue) => {
                setIssues(prev => prev.map(i => i.id === updatedIssue.id ? updatedIssue : i));
            });
        }

        return () => {
            if (socket) {
                socket.off('new_issue');
                socket.off('issue_updated');
            }
        };
    }, [socket]);

    const handleUpvote = async (id) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (userVotes[id] === 'up') return;
        try {
            await api.patch(`/api/issues/${id}/upvote`);
            if (userVotes[id] === 'down') {
                await api.patch(`/api/issues/${id}/upvote`);
            }
            setUserVotes(prev => ({ ...prev, [id]: 'up' }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownvote = async (id) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (userVotes[id] === 'down') return;
        try {
            await api.patch(`/api/issues/${id}/downvote`);
            if (userVotes[id] === 'up') {
                await api.patch(`/api/issues/${id}/downvote`);
            }
            setUserVotes(prev => ({ ...prev, [id]: 'down' }));
        } catch (err) {
            console.error(err);
        }
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

    const getCategoryColor = (cat) => {
        if (!cat) return '#2B7A5F';
        const p = cat.toLowerCase();
        if (p.includes('pothole') || p.includes('road')) return '#ef4444';
        if (p.includes('garbage') || p.includes('sanitation')) return '#10b981';
        if (p.includes('water') || p.includes('leak')) return '#3b82f6';
        if (p.includes('light') || p.includes('electric')) return '#f59e0b';
        return '#4A9C7C';
    };

    const filteredIssues = issues.filter(issue => {
        const matchesSearch = (issue.title?.toLowerCase().includes(searchTerm.toLowerCase()) || issue.location?.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = categoryFilter === 'All' || issue.category === categoryFilter;
        let matchesStatus = true;
        if (statusFilter === 'Pending') {
            matchesStatus = ['Reported', 'Community Verification', 'Under Scrutiny'].includes(issue.workflowStage);
        } else if (statusFilter === 'Resolved') {
            matchesStatus = ['Resolved', 'Closed'].includes(issue.workflowStage);
        }
        return matchesSearch && matchesCategory && matchesStatus;
    });

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
                position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
                width: '100vw', height: '100vh', background: 'radial-gradient(ellipse at top, rgba(43,122,95,0.15) 0%, rgba(5,21,12,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                
                {/* Header */}
                <div style={{ marginBottom: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', margin: '0 0 8px 0', color: '#ffffff' }}>Community Feed</h2>
                            <p style={{ color: '#A8D5BA', fontSize: '1rem', margin: 0 }}>Real-time civic issues reported by citizens.</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: '600', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #10b981' }}></span>
                            Live Updates Active
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '16px',
                    padding: '16px 24px',
                    marginBottom: '32px',
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: '1 1 300px', position: 'relative' }}>
                        <i className="fa-solid fa-search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#74B49B' }}></i>
                        <input 
                            type="text" 
                            placeholder="Search issues or locations..." 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%', padding: '12px 16px 12px 48px',
                                background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px', color: 'white', fontSize: '0.95rem', outline: 'none'
                            }}
                            onFocus={e => e.target.style.borderColor = '#4A9C7C'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                    </div>
                    <select 
                        value={categoryFilter}
                        onChange={e => setCategoryFilter(e.target.value)}
                        style={{
                            padding: '12px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px', color: 'white', fontSize: '0.95rem', outline: 'none', cursor: 'pointer', appearance: 'none'
                        }}
                    >
                        <option value="All" style={{background:'#05150C'}}>All Categories</option>
                        <option value="Potholes / Road Damage" style={{background:'#05150C'}}>Roads & Potholes</option>
                        <option value="Garbage / Sanitation" style={{background:'#05150C'}}>Sanitation</option>
                        <option value="Streetlight / Electrical" style={{background:'#05150C'}}>Electrical</option>
                        <option value="Water Leakage" style={{background:'#05150C'}}>Water Leakage</option>
                    </select>
                    <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '4px' }}>
                        {['All', 'Pending', 'Resolved'].map(status => (
                            <button 
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                style={{
                                    padding: '8px 16px', background: statusFilter === status ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    border: 'none', borderRadius: '8px', color: statusFilter === status ? 'white' : '#A8D5BA',
                                    fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >{status}</button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
                    {filteredIssues.map(issue => (
                        <div key={issue.id} style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(43,122,95,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                        }}
                        >
                            {/* Image Header */}
                            <div style={{ position: 'relative', height: '200px' }}>
                                <img src={issue.image} alt={issue.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }}></div>
                                
                                <div style={{ position: 'absolute', top: '16px', left: '16px', background: getCategoryColor(issue.category), padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', color: 'white', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    {issue.category || 'Issue'}
                                </div>
                                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', color: getStageColor(issue.workflowStage), border: `1px solid ${getStageColor(issue.workflowStage)}40` }}>
                                    {issue.workflowStage}
                                </div>
                                
                                <h3 style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                    {issue.title}
                                </h3>
                            </div>
                            
                            {/* Content Body */}
                            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#A8D5BA', marginBottom: '12px' }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: '#4A9C7C' }}></i> {issue.location}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#A8D5BA', marginBottom: '20px' }}>
                                    <span>By <span style={{ color: '#fff', fontWeight: '500' }}>@{issue.reportedBy}</span></span>
                                    <span>{new Date(issue.date).toLocaleDateString()}</span>
                                </div>

                                {/* Trust Score Bar */}
                                <div style={{ marginBottom: '24px', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px', fontWeight: '500' }}>
                                        <span style={{ color: '#F4FBF7' }}>Community Trust Score</span>
                                        <span style={{ color: issue.trustScore >= 60 ? '#10b981' : (issue.trustScore < 40 ? '#ef4444' : '#f59e0b') }}>{issue.trustScore}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${issue.trustScore}%`, background: issue.trustScore >= 60 ? '#10b981' : (issue.trustScore < 40 ? '#ef4444' : '#f59e0b'), transition: 'width 0.5s ease' }}></div>
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: '#74B49B', marginTop: '6px', margin: 0 }}>
                                        Verified by {issue.verifications?.length || 0} Citizens
                                    </p>
                                </div>
                            </div>

                            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        onClick={() => handleUpvote(issue.id)} 
                                        disabled={userVotes[issue.id] === 'up'}
                                        style={{ 
                                            padding: '8px 12px', background: userVotes[issue.id] === 'up' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '10px', color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: userVotes[issue.id] === 'up' ? 'default' : 'pointer',
                                            display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s'
                                        }}
                                        title="Upvote"
                                    >
                                        <i className="fa-solid fa-arrow-up" style={{ color: userVotes[issue.id] === 'up' ? '#34d399' : '#10b981' }}></i>
                                        {issue.upvotes}
                                    </button>
                                    <button 
                                        onClick={() => handleDownvote(issue.id)} 
                                        disabled={userVotes[issue.id] === 'down'}
                                        style={{ 
                                            padding: '8px 12px', background: userVotes[issue.id] === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
                                            borderRadius: '10px', color: 'white', fontSize: '0.9rem', fontWeight: '600', cursor: userVotes[issue.id] === 'down' ? 'default' : 'pointer',
                                            display: 'flex', alignItems: 'center', transition: 'background 0.2s'
                                        }}
                                        title="Downvote"
                                    >
                                        <i className="fa-solid fa-arrow-down" style={{ color: userVotes[issue.id] === 'down' ? '#f87171' : '#ef4444' }}></i>
                                    </button>
                                </div>
                                
                                <button style={{ background: 'none', border: 'none', color: '#A8D5BA', cursor: 'pointer', padding: '8px', transition: 'color 0.2s' }} onMouseEnter={e=>e.currentTarget.style.color='white'} onMouseLeave={e=>e.currentTarget.style.color='#A8D5BA'}>
                                    <i className="fa-solid fa-share-nodes"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredIssues.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: '#A8D5BA' }}>
                            <i className="fa-solid fa-folder-open" style={{ fontSize: '3rem', marginBottom: '16px', color: 'rgba(255,255,255,0.1)' }}></i>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', color: 'white', marginBottom: '8px' }}>No issues found</h3>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feed;
