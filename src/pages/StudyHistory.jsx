import React, { useState, useEffect } from 'react';
import { Clock, FileText, MessageSquare } from 'lucide-react';
import './Dashboard.css';

const StudyHistory = () => {
    const [history, setHistory] = useState({ documents: [], chats: [] });

    useEffect(() => {
        const fetchHistory = async () => {
             const res = await fetch('/api/study/history');
             if (res.ok) {
                 const data = await res.json();
                 setHistory(data);
             }
        };
        fetchHistory();
    }, []);

    return (
         <div className="dashboard-container animate-fade-in">
             <div className="dashboard-header">
                 <h1>Study History</h1>
                 <p className="text-muted">Review your past uploads and questions.</p>
             </div>
             
             <div className="dashboard-grid">
                  <div className="activity-section glass-card">
                      <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}><FileText size={20}/> Uploaded Notes</h3>
                      <ul className="file-list" style={{maxHeight: '400px'}}>
                          {history.documents.map((doc, i) => (
                               <li key={i} className="file-item animate-fade-in">
                                   <span>{doc.filename}</span>
                               </li>
                          ))}
                          {history.documents.length === 0 && <p className="text-muted">No documents found.</p>}
                      </ul>
                  </div>
                  
                  <div className="activity-section glass-card">
                      <h3 style={{display: 'flex', alignItems: 'center', gap: '8px'}}><MessageSquare size={20}/> Recent Questions</h3>
                      <ul className="file-list" style={{maxHeight: '400px'}}>
                          {history.chats.map((chat, i) => (
                               <li key={i} className="file-item animate-fade-in" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '8px'}}>
                                   <strong style={{color: 'var(--accent-secondary)'}}>{chat.query}</strong>
                                   <span style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>{chat.response.substring(0, 100)}...</span>
                               </li>
                          ))}
                          {history.chats.length === 0 && <p className="text-muted">No chat history found.</p>}
                      </ul>
                  </div>
             </div>
         </div>
    );
};

export default StudyHistory;
