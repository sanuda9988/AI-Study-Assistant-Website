import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <header className="top-nav glass-panel">
          <div className="nav-brand">
            <span className="text-gradient" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>StudyAI</span>
          </div>
          <div className="user-profile">
            <div className="avatar">U</div>
          </div>
        </header>
        <div className="page-content hidden-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
