import React, { useState } from 'react';
import './App.css';
import Workspace from './assets/Workspace';
import { Activity, Video, Mic, Globe, Cpu, ArrowRight, Play, CheckCircle } from 'lucide-react';



const LandingPage = ({ onStart }) => (
  <div className="landing-wrapper">
    {/* Navbar */}
    <nav className="navbar">
      <div className="brand">
        <div style={{color: '#137fec'}}><Activity size={28} /></div>
        <span>SignLink</span>
      </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#how">How it Works</a>
        <a href="#about">About</a>
        <button className="btn-primary" onClick={onStart}>Get Started</button>
      </div>
    </nav>

    {/* Hero */}
    <header className="hero">
      <div className="hero-content">
        <span className="tagline">‹ Powered by Advanced ML</span>
        <h1>Breaking Barriers with <br />Real-Time <span className="text-gradient">Sign Translation</span></h1>
        <p>Convert hand gestures into text and speech instantly using our state-of-the-art neural networks. Connect with the world without limits.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={onStart}>Try Free Demo</button>
          <button className="btn-outline">Watch Video</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="video-card">
          <img 
            src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800" 
            alt="Sign Language User" 
            style={{width: '100%', display: 'block', opacity: 0.6}} 
          />
          <div className="video-overlay">
            <Mic size={20} color="#137fec" />
            <span>"Hello, how can I help you today?"</span>
          </div>
        </div>
      </div>
    </header>

    {/* Features */}
    <section className="features-section" id="features">
      <div className="section-title">
        <h2>Seamless Communication Technology</h2>
        <p style={{color: '#94a3b8'}}>Our ML-powered platform ensures precision and minimal latency.</p>
      </div>
      <div className="feature-grid">
        <div className="feature-card">
          <div className="icon-box"><Cpu /></div>
          <h3>Real-time Processing</h3>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Ultra low latency processing under 30ms for fluid conversations.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><Mic /></div>
          <h3>Text-to-Speech</h3>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Integrated high-fidelity voice synthesizer to vocalize gestures.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><Globe /></div>
          <h3>Universal Support</h3>
          <p style={{color: '#94a3b8', marginTop: '10px'}}>Native support for ASL, BSL, and over 40 regional sign dialects.</p>
        </div>
      </div>
    </section>



  
    <section className="features-section" id="features">
      
    </section>

    {/* How It Works */}
    <section className="steps-section" id="how">
      <div className="section-title" style={{marginBottom: '4rem'}}>
        <h2>How SignLink Works</h2>
      </div>
      
      <div className="steps-container" style={{maxWidth: '800px', margin: '0 auto'}}>
        
        {/* Step 1 */}
        <div className="step">
          <div className="step-icon">
            <Video color="white" size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Step 1: Gesture Input</h3>
            <p style={{color: '#94a3b8'}}>Our system uses your device's camera to capture high-definition frames of hand movements and facial expressions in real-time.</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="step">
          <div className="step-icon">
            <Cpu color="white" size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Step 2: Neural Network Analysis</h3>
            <p style={{color: '#94a3b8'}}>Advanced LSTM and Transformer models process spatial and temporal data points to identify complex sign patterns and syntax.</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="step">
          <div className="step-icon">
            <CheckCircle color="white" size={24} />
          </div>
          <div>
            <h3 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Step 3: Instant Translation</h3>
            <p style={{color: '#94a3b8'}}>The gesture is converted into text or synthesized speech, allowing for a seamless two-way conversation between signers and non-signers.</p>
          </div>
        </div>

      </div>
    </section>
    
    {/* CTA */}
    <section className="cta-section">
      <div className="cta-box">
        <h2 style={{fontSize: '2.5rem', marginBottom: '1.5rem'}}>Ready to experience the future?</h2>
        <p style={{marginBottom: '2.5rem', opacity: 0.9}}>Join thousands of users using SignLink to connect, learn, and collaborate.</p>
        <button 
          onClick={onStart}
          style={{
            background: 'white', 
            color: '#137fec', 
            padding: '1rem 2rem', 
            borderRadius: '8px', 
            border: 'none', 
            fontWeight: 'bold', 
            cursor: 'pointer'
          }}
        >
          Start Free Trial
        </button>
      </div>
    </section>

    {/* Footer */}
    <footer style={{padding: '3rem 4rem', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#64748b'}}>
      <p>© 2024 SignLink AI Technologies. All rights reserved.</p>
    </footer>
  </div>
);

// inside frontend/src/App.jsx

function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);

  return (
    <>
      {showWorkspace ? (
        // Pass the function to go back to false
        <Workspace onBack={() => setShowWorkspace(false)} />
      ) : (
        <LandingPage onStart={() => setShowWorkspace(true)} />
      )}
    </>
  );
}
export default App;