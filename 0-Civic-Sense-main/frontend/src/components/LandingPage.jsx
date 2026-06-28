import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, max = 100 }) => {
    const [hover, setHover] = useState(false);
    const percentage = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
    
    return (
        <div 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            style={{ 
                textAlign: 'center', cursor: 'pointer', padding: '24px', 
                background: 'rgba(255,255,255,0.03)', borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.1)', width: '240px', 
                transition: 'all 0.3s',
                boxShadow: hover ? '0 10px 30px rgba(43, 122, 95, 0.2)' : 'none',
                transform: hover ? 'translateY(-5px)' : 'translateY(0)'
            }}
        >
            <div style={{ 
                position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px', 
                background: 'rgba(43,122,95,0.1)', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                overflow: 'hidden', border: '2px solid rgba(116, 180, 155, 0.3)' 
            }}>
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, 
                    background: 'linear-gradient(0deg, #2B7A5F, #74B49B)',
                    height: hover ? `${percentage}%` : '5%', 
                    transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)', opacity: 0.8
                }}></div>
                <div style={{ 
                    position: 'relative', zIndex: 1, fontFamily: "'Outfit', sans-serif", 
                    fontSize: '2rem', fontWeight: 700, color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                }}>
                    {hover ? value : '?'}
                </div>
            </div>
            <div style={{ color: '#A8D5BA', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{label}</div>
            <p style={{ color: '#F4FBF7', fontSize: '0.8rem', marginTop: '8px', opacity: hover ? 1 : 0, transition: 'opacity 0.3s' }}>
                Hover to reveal!
            </p>
        </div>
    );
};

const LandingPage = () => {
    const [stats, setStats] = useState({ totalIssues: 0, resolvedIssues: 0, activeCitizens: 0, verifiedIssues: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [issuesRes, usersRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/issues`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
                ]);
                const issues = await issuesRes.json();
                const users = await usersRes.json();
                
                setStats({
                    totalIssues: issues.length,
                    resolvedIssues: issues.filter(i => ['Resolved', 'Closed'].includes(i.workflowStage)).length,
                    verifiedIssues: issues.filter(i => i.verifications && i.verifications.length > 0).length,
                    activeCitizens: users.filter(u => u.role === 'citizen').length
                });
            } catch (e) { console.error("Error fetching stats:", e); }
        };
        fetchStats();
    }, []);

    return (
        <div style={{
            backgroundColor: '#05150C',
            color: '#F4FBF7',
            minHeight: '100vh',
            fontFamily: "'Inter', sans-serif",
            overflowX: 'hidden'
        }}>
            {/* Background Glows */}
            <div style={{
                position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
                width: '80vw', height: '600px', background: 'radial-gradient(circle, rgba(43,122,95,0.2) 0%, rgba(5,21,12,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            {/* Hero Section */}
            <section style={{ position: 'relative', zIndex: 1, padding: '120px 20px 80px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: 800,
                    margin: '0 0 24px 0',
                    background: 'linear-gradient(135deg, #2B7A5F, #A8D5BA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1
                }}>Report. Resolve. Revive.</h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#A8D5BA',
                    maxWidth: '600px',
                    margin: '0 auto 40px',
                    lineHeight: 1.6
                }}>AI-powered civic issue detection and community-driven resolution. Help revive and build a better, smarter city today with CivicPulse.</p>
                
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/report" style={{
                        background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        boxShadow: '0 8px 24px rgba(43,122,95,0.3)',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}><i className="fa-solid fa-camera"></i> Report an Issue</Link>
                    <Link to="/feed" style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        padding: '16px 32px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        transition: 'background 0.2s, transform 0.2s',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}><i className="fa-solid fa-earth-americas"></i> Explore Feed</Link>
                </div>
            </section>

            {/* Live Statistics (Real Data & Animated) */}
            <section style={{ position: 'relative', zIndex: 1, padding: '60px 20px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2rem', color: 'white' }}>Real-Time CivicPulse Stats</h2>
                    <p style={{ color: '#A8D5BA', fontSize: '1rem' }}>We believe in transparency. No fake numbers, just real impact.</p>
                </div>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
                    <StatCard label="Total Reports" value={stats.totalIssues} max={Math.max(10, stats.totalIssues)} />
                    <StatCard label="Resolved Cases" value={stats.resolvedIssues} max={Math.max(10, stats.totalIssues)} />
                    <StatCard label="Verified Reports" value={stats.verifiedIssues} max={Math.max(10, stats.totalIssues)} />
                    <StatCard label="Active Citizens" value={stats.activeCitizens} max={Math.max(10, stats.activeCitizens)} />
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ position: 'relative', zIndex: 1, padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', marginBottom: '16px', color: 'white' }}>Powered by Next-Gen AI</h2>
                    <p style={{ color: '#A8D5BA', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>CivicPulse uses cutting-edge technology to streamline municipal issue resolution.</p>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {[
                        { icon: 'fa-solid fa-microchip', title: 'AI Issue Detection', desc: 'Automatically categorizes and assesses images of civic issues with high precision.' },
                        { icon: 'fa-solid fa-copy', title: 'Smart Duplicate Detection', desc: 'Prevents spam by merging identical reports based on visual and location similarity.' },
                        { icon: 'fa-solid fa-users', title: 'Community Verification', desc: 'Crowdsourced validation ensures authenticity and prioritizes real problems.' },
                        { icon: 'fa-solid fa-location-crosshairs', title: 'Real-Time Tracking', desc: 'Follow your reports from submission to assignment and final resolution.' },
                        { icon: 'fa-solid fa-medal', title: 'Gamification & Rewards', desc: 'Earn Hero Points, Badges, and Trust Scores by contributing positively.' },
                        { icon: 'fa-solid fa-chart-line', title: 'Predictive Analytics', desc: 'Helps city officials anticipate infrastructure failures before they happen.' }
                    ].map((feat, i) => (
                        <div key={i} className="glass-panel" style={{
                            padding: '32px',
                            background: 'rgba(255,255,255,0.03)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '16px',
                            transition: 'transform 0.3s, background 0.3s'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(43,122,95,0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}>
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '12px',
                                background: 'rgba(43,122,95,0.2)', color: '#74B49B',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', marginBottom: '24px'
                            }}><i className={feat.icon}></i></div>
                            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', marginBottom: '12px', color: 'white' }}>{feat.title}</h3>
                            <p style={{ color: '#A8D5BA', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section style={{ position: 'relative', zIndex: 1, padding: '80px 20px 120px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', marginBottom: '16px', color: 'white' }}>How It Works</h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '30px', top: '40px', bottom: '40px', width: '2px', background: 'rgba(43,122,95,0.5)', zIndex: 0 }}></div>
                    {[
                        { step: 1, title: 'Report an Issue', desc: 'Snap a photo and upload it. The app grabs your GPS location.' },
                        { step: 2, title: 'AI Analysis & Verification', desc: 'AI scans the image, filters duplicates, and routes it to the community for quick verification.' },
                        { step: 3, title: 'Resolution', desc: 'The verified report is sent to the relevant department and tracked until fixed.' }
                    ].map((step, i) => (
                        <div key={i} style={{ display: 'flex', gap: '30px', position: 'relative', zIndex: 1, alignItems: 'flex-start' }}>
                            <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: '#05150C', border: '2px solid #4A9C7C',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', fontWeight: 'bold', color: '#74B49B', flexShrink: 0
                            }}>{step.step}</div>
                            <div style={{ paddingTop: '10px' }}>
                                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', marginBottom: '10px', color: 'white' }}>{step.title}</h3>
                                <p style={{ color: '#A8D5BA', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Footer */}
            <footer style={{ padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <div style={{ color: '#A8D5BA', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} CivicPulse. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
