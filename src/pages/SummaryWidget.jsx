import React, { useState, useEffect } from 'react';
import { AlignLeft, Loader2 } from 'lucide-react';
import './QuizWidget.css'; 

const SummaryWidget = () => {
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchSummary = async () => {
        setIsLoading(true);
        setErrorMsg("");
        try {
            const res = await fetch('/api/study/summary', { method: 'GET' });
            if (res.ok) {
                const data = await res.json();
                if (data.summary) {
                    setSummary(data.summary);
                } else {
                    setErrorMsg("No document available to summarize.");
                }
            } else {
                setErrorMsg("Backend error processing summary.");
            }
        } catch (e) {
            setErrorMsg("Could not reach backend.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    if (isLoading) {
        return (
            <div className="quiz-container animate-fade-in" style={{alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
                <Loader2 className="spinner" size={48} color="var(--accent-primary)" style={{ animation: 'spin 1s linear infinite' }} />
                <p className="mt-4 text-muted">Generating an intelligent summary...</p>
            </div>
        );
    }

    return (
        <div className="quiz-container animate-fade-in">
             <div className="quiz-header">
                <h2>Document Summary</h2>
                <p className="text-muted">A distilled overview of your context.</p>
             </div>
             
             <div className="quiz-card glass-panel" style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                 {errorMsg ? (
                     <div style={{textAlign: 'center', width: '100%', padding: '40px'}}>
                        <AlignLeft size={64} style={{color: 'var(--text-muted)', marginBottom: '20px'}} />
                        <h3>Summary Engine Unavailable</h3>
                        <p className="text-muted">{errorMsg}</p>
                        <button className="btn btn-primary" style={{marginTop: '24px'}} onClick={fetchSummary}>Retry</button>
                     </div>
                 ) : (
                     <div style={{padding: '20px', lineHeight: '1.8', fontSize: '1.1rem', whiteSpace: 'pre-wrap'}}>
                         {summary}
                     </div>
                 )}
             </div>
        </div>
    );
};

export default SummaryWidget;
