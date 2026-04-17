import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ uploads: 0, questions: 0, quizzes: 0 });
  const fileInputRef = useRef(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/study/status');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/study/upload', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
           setFiles(prev => [...prev, file.name]);
           fetchStatus(); // update stat counter
        } else {
           alert('Failed to upload file');
        }
      } catch (err) {
         console.error(err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <h1>Welcome to StudyAI</h1>
        <p className="text-muted">Upload your lecture notes or textbooks to get started.</p>
      </div>

      <div className="dashboard-grid">
        <div className="upload-section glass-panel">
          <h3>Upload Material</h3>
          <div 
            className="upload-dropzone" 
            onClick={handleUploadClick}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept=".pdf"
              onChange={handleFileChange}
            />
            <div className="dropzone-content">
              {isUploading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <UploadCloud className="upload-icon" />
                  <h4>Click to upload documents</h4>
                  <p className="text-muted">Supports PDF (Max 20MB)</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="activity-section glass-card">
          <h3>Recent Uploads</h3>
          {files.length === 0 ? (
            <div className="empty-state text-muted">
              <FileText className="empty-icon" />
              <p>No materials uploaded this session.</p>
            </div>
          ) : (
            <ul className="file-list">
              {files.map((file, idx) => (
                <li key={idx} className="file-item animate-fade-in">
                  <div className="file-info">
                    <FileText className="icon" />
                    <span>{file}</span>
                  </div>
                  <CheckCircle2 className="icon-success" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="stats-section">
         <div className="stat-card glass-card">
           <h4 className="text-muted">Total Uploads</h4>
           <h2>{stats.uploads}</h2>
         </div>
         <div className="stat-card glass-card">
           <h4 className="text-muted">Questions Asked</h4>
           <h2>{stats.questions}</h2>
         </div>
         <div className="stat-card glass-card">
           <h4 className="text-muted">Quizzes Taken</h4>
           <h2>{stats.quizzes}</h2>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
