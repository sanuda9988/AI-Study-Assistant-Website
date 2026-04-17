import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            navigate('/');
        } else {
            const errData = await response.json();
            setErrorMsg(errData.msg || "Login failed");
        }
    } catch (err) {
        setErrorMsg("Network error connecting to backend.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-panel animate-fade-in">
        <div className="auth-header">
          <BookOpen className="auth-logo" />
          <h1 className="text-gradient">Welcome Back</h1>
          <p className="text-muted">Sign in to continue your study journey.</p>
        </div>
        
        {errorMsg && <div style={{color: 'var(--accent-error)', textAlign: 'center'}}>{errorMsg}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input-base" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              placeholder="Password" 
              className="input-base" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full">
            Sign In to StudyAI
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <a href="#" className="link">Sign up</a></p>
        </div>
      </div>
      
      {/* Decorative background blurs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </div>
  );
};

export default Auth;
