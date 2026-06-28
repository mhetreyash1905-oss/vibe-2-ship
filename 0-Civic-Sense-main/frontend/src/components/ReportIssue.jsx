import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
    const [desc, setDesc] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [gpsLoading, setGpsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const getGPSLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        setGpsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
                setGpsLoading(false);
            },
            () => {
                alert('Unable to retrieve your location');
                setGpsLoading(false);
            }
        );
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageFile) {
            alert('Please upload an image for AI verification.');
            return;
        }
        if (!coordinates) {
            alert('Please share your GPS location to report this issue accurately.');
            return;
        }

        setLoading(true);
        try {
            const base64Image = await toBase64(imageFile);

            const res = await axios.post('http://localhost:5501/api/issues', {
                desc, 
                location, 
                coordinates,
                reportedBy: user.username, 
                image: base64Image
            });
            
            if (res.data.workflowStage === 'Under Scrutiny') {
                alert('⚠️ Notice: Your report was flagged as potentially suspicious by the AI. It has been placed Under Scrutiny and will be manually reviewed by an administrator.');
            } else if (res.data.merged) {
                alert('🔁 Duplicate Detected: Your report was identified as a duplicate and has been merged with an existing issue. You earned +10 Hero Points!');
            } else {
                alert('✅ Your issue has been reported and sent to Community Verification! You earned +10 Hero Points!');
            }
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('❌ Failed to submit the issue.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: '#ffffff',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: "'Inter', sans-serif"
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        color: '#A8D5BA',
        fontSize: '0.9rem',
        fontWeight: '500',
        fontFamily: "'Inter', sans-serif"
    };

    return (
        <div style={{
            backgroundColor: '#05150C',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: '40px 20px',
            overflow: 'hidden'
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '60vw', height: '600px', background: 'radial-gradient(circle, rgba(43,122,95,0.15) 0%, rgba(5,21,12,0) 70%)',
                zIndex: 0, pointerEvents: 'none'
            }}></div>

            <div style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '600px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '40px 32px',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h2 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        margin: '0 0 8px 0'
                    }}>Report Civic Issue</h2>
                    <p style={{ color: '#A8D5BA', fontSize: '0.95rem', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                        Your report will be analyzed by AI and verified by the community.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Capture / Upload Image <span style={{color:'#ef4444'}}>*</span></label>
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                border: '2px dashed rgba(255, 255, 255, 0.15)',
                                borderRadius: '16px',
                                padding: '40px 20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: 'rgba(255, 255, 255, 0.02)',
                                transition: 'border-color 0.2s, background 0.2s',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#4A9C7C';
                                e.currentTarget.style.background = 'rgba(74, 156, 124, 0.05)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                            }}
                        >
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                            />
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }} />
                            ) : (
                                <>
                                    <div style={{ fontSize: '2.5rem', color: '#4A9C7C', marginBottom: '16px' }}>
                                        <i className="fa-solid fa-camera"></i>
                                    </div>
                                    <div style={{ color: '#ffffff', fontWeight: '500', marginBottom: '4px' }}>Drag & drop or click to upload a photo</div>
                                    <div style={{ color: '#A8D5BA', fontSize: '0.85rem' }}>JPEG, PNG up to 10MB</div>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>Exact Location (GPS) <span style={{color:'#ef4444'}}>*</span></label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <input 
                                type="text" 
                                value={location} 
                                placeholder="Click the button to fetch GPS" 
                                readOnly 
                                required 
                                style={{ ...inputStyle, background: 'rgba(0,0,0,0.3)', cursor: 'not-allowed', color: '#A8D5BA' }} 
                            />
                            <button 
                                type="button" 
                                onClick={getGPSLocation} 
                                disabled={gpsLoading} 
                                style={{
                                    padding: '0 24px',
                                    background: 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: '600',
                                    cursor: gpsLoading ? 'not-allowed' : 'pointer',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseEnter={e => !gpsLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={e => !gpsLoading && (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                {gpsLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-location-crosshairs"></i>} 
                                Fetch GPS
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={labelStyle}>Additional Details (Optional)</label>
                        <textarea 
                            rows="4" 
                            placeholder="Describe the issue if the AI needs more context..."
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            style={{ ...inputStyle, resize: 'vertical' }}
                            onFocus={e => {
                                e.target.style.borderColor = '#4A9C7C';
                                e.target.style.boxShadow = '0 0 0 2px rgba(74, 156, 124, 0.2)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{
                        background: 'rgba(43, 122, 95, 0.15)',
                        border: '1px solid rgba(43, 122, 95, 0.3)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        marginBottom: '24px'
                    }}>
                        <i className="fa-solid fa-circle-info" style={{ color: '#4A9C7C', fontSize: '1.2rem', marginTop: '2px' }}></i>
                        <p style={{ color: '#F4FBF7', fontSize: '0.9rem', margin: 0, lineHeight: 1.5, fontFamily: "'Inter', sans-serif" }}>
                            Your image will be analyzed by our AI for issue detection, duplicate checking, and authenticity verification.
                        </p>
                    </div>

                    <button type="submit" disabled={loading} style={{
                        width: '100%',
                        padding: '16px',
                        background: loading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #2B7A5F, #4A9C7C)',
                        border: 'none',
                        borderRadius: '12px',
                        color: loading ? '#A8D5BA' : 'white',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        fontFamily: "'Inter', sans-serif"
                    }}
                    onMouseEnter={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {loading ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Analyzing with AI & Submitting...</>
                        ) : (
                            'Submit Issue to Community'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportIssue;
