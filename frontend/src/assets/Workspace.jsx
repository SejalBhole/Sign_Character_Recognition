import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { 
  Activity, Bell, User, ChevronRight, VideoOff, 
  Trash2, Volume2, Copy, Video, ArrowLeft, Home 
} from 'lucide-react';
import './Workspace.css';

// Accept onBack prop to allow returning to Landing Page
export default function Workspace({ onBack }) {
  const webcamRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(true);
  const [prediction, setPrediction] = useState("Waiting...");
  const [confidence, setConfidence] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard'); // Track active tab

  const nodes = [
    { top: '60%', left: '45%' }, { top: '55%', left: '48%' },
    { top: '52%', left: '52%' }, { top: '58%', left: '55%' },
    { top: '65%', left: '53%' }
  ];

  // --- INTEGRATION LOGIC START ---
  const captureAndPredict = async () => {
    if (isCapturing && webcamRef.current) {
      // 1. Capture frame from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      try {
        // 2. Prepare data to send
        const formData = new FormData();
        // Convert base64 to blob
        const blob = await fetch(imageSrc).then(res => res.blob());
        formData.append('image', blob);

        // 3. Send to Flask (Make sure your Flask server is running on port 5000)
        const response = await axios.post('http://localhost:5000/predict', formData);

        // 4. Update the UI with real data
        setPrediction(response.data.prediction);
        setConfidence(response.data.confidence); // Assuming your backend sends confidence
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    }
  };

  // Run the prediction loop every 1 second (1000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      captureAndPredict();
    }, 1000); 
    return () => clearInterval(interval);
  }, [isCapturing]);
  // --- INTEGRATION LOGIC END ---

  return (
    // Added wrapper class for full-screen fix
    <div className="workspace-wrapper"> 
      <div className="ws-container">
        {/* Header */}
        <header className="ws-header">
          <div className="ws-brand" style={{cursor: 'pointer'}} onClick={onBack}>
            <Activity color="#137fec" />
            <span>SignLink AI</span>
          </div>
          
          {/* FIX 3: Functional Navbar */}
          <nav className="ws-nav">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              style={{
                background: 'none', border: 'none', 
                color: activeTab === 'dashboard' ? '#137fec' : '#64748b',
                fontWeight: 600, cursor: 'pointer', margin: '0 1rem'
              }}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
              style={{
                background: 'none', border: 'none',
                color: activeTab === 'history' ? '#137fec' : '#64748b',
                fontWeight: 600, cursor: 'pointer', margin: '0 1rem'
              }}
            >
              History
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
              style={{
                background: 'none', border: 'none',
                color: activeTab === 'settings' ? '#137fec' : '#64748b',
                fontWeight: 600, cursor: 'pointer', margin: '0 1rem'
              }}
            >
              Settings
            </button>
          </nav>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Added Back Button */}
           <button 
  onClick={onBack}
  style={{
    background: 'rgba(255,255,255,0.1)', // Changed from #f1f5f9 to transparent white
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '8px 12px',
    borderRadius: '8px', 
    cursor: 'pointer', 
    display: 'flex',
    alignItems: 'center', 
    gap: '5px', 
    color: '#cbd5e1', // Light gray text
    fontWeight: 600, 
    marginRight: '10px'
  }}
>
  <ArrowLeft size={16} /> Exit
</button>
            <button className="btn-icon"><Bell size={20} /></button>
            <button className="btn-icon"><User size={20} /></button>
          </div>
        </header>

        {/* Main Content */}
        <main className="ws-main">
           {/* ... (Keep existing video section logic unchanged) ... */}
           
           {/* Left Side: Video (Collapsed for brevity, code remains same as before) */}
           <div className="ws-video-section">
             <div className="ws-breadcrumbs">
               <span onClick={onBack} style={{cursor:'pointer'}}>Workspace</span>
               <ChevronRight size={14} />
               <span style={{ fontWeight: 600, color: '#137fec' }}>Live Recognition</span>
             </div>
             
             {/* ... Video Frame ... */}
             <div className="video-frame">
                {isCapturing ? (
                  <>
                    <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                    {nodes.map((pos, i) => <div key={i} className="skeleton-node" style={pos}></div>)}
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white' }}>
                    <VideoOff size={48} />
                  </div>
                )}
                <div className="overlay-badge">
                  <div className={`pulse-dot ${!isCapturing && 'hidden'}`}></div>{isCapturing ? "LIVE" : "OFFLINE"}
                </div>
             </div>

             {/* ... Controls ... */}
             <div className="ws-toolbar">
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-action" onClick={() => setIsCapturing(!isCapturing)}>
                    {isCapturing ? <><VideoOff size={18} /> Stop Camera</> : <><Video size={18} /> Start Camera</>}
                  </button>
                  <button className="btn-icon"><Trash2 size={18} /></button>
                  <button className="btn-icon" style={{color: '#137fec', background: '#e0f2fe'}}><Volume2 size={18} /></button>
                </div>
                <div className="stat-group">
                  <div>
                    <div style={{fontSize: '0.65rem', fontWeight:'bold', color: '#64748b', textTransform:'uppercase'}}>Confidence</div>
                    <div style={{fontSize: '0.9rem', fontWeight:'bold', color: '#137fec'}}>{confidence}%</div>
                    <div style={{width: '100px', height: '4px', background: '#e2e8f0', borderRadius: '4px', marginTop: '4px'}}><div style={{width: `${confidence}%`, height: '100%', background: '#137fec', borderRadius: '4px'}}></div></div>
                  </div>
                  <div><div style={{fontSize: '0.65rem', fontWeight:'bold', color: '#64748b', textTransform:'uppercase'}}>Latency</div><div style={{fontSize: '0.9rem', fontWeight:'bold'}}>24ms</div></div>
                </div>
             </div>
           </div>

           {/* Right Side: Transcript (Collapsed for brevity, code remains same) */}
           <div className="ws-transcript">
              <div className="transcript-header">
                <h3 style={{margin: 0, fontSize: '1.1rem'}}>Translation Log</h3>
                <p style={{margin: '5px 0 0', fontSize: '0.85rem', color: '#64748b'}}>Real-time gesture analysis</p>
              </div>
              <div className="log-list">
                <div className="log-entry"><span style={{fontFamily:'monospace', fontSize: '0.75rem', marginTop: '3px'}}>14:02:11</span><div>Hello</div></div>
                <div className="log-entry active">
                  <span style={{fontSize: '0.7rem', color: '#137fec', fontWeight: 700}}>LIVE</span>
                  <div>
<div className="recognizing-badge">Recognizing...</div>
{/* Instead of the inline style I gave you before, use this class which is now in the CSS */}                    
<div style={{fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1.2}}>{prediction}</div>
                  </div>
                </div>
              </div>
              <div style={{padding: '1.5rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc'}}>
                <div style={{padding: '1.5rem', borderTop: '1px solid #1e293b', background: '#0b121f'}}>
  <button style={{
    width: '100%', 
    padding: '0.8rem', 
    background: 'transparent', 
    border: '1px solid #334155', 
    color: 'white',
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 600, 
    display: 'flex', 
    justifyContent:'center', 
    gap: '8px', 
    alignItems:'center',
    transition: 'background 0.2s'
  }}
  onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
  onMouseOut={(e) => e.target.style.background = 'transparent'}
  >
    <Copy size={18} /> Copy Transcript
  </button>
</div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
}