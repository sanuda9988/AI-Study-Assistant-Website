import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Map, MessageSquare, ListTodo, LogOut, FileText, Clock } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <BookOpen className="logo-icon" />
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
          <Map className="icon" />
          <span className="label">Dashboard</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare className="icon" />
          <span className="label">AI Chat</span>
        </NavLink>
        <NavLink to="/quiz" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ListTodo className="icon" />
          <span className="label">Quizzes</span>
        </NavLink>
        <NavLink to="/summary" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText className="icon" />
          <span className="label">Summaries</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Clock className="icon" />
          <span className="label">History</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/login" className="nav-item warning">
          <LogOut className="icon" />
          <span className="label">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
