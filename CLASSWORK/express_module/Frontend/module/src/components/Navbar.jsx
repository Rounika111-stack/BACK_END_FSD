import React from 'react';
import { ServerIcon, SunIcon, MoonIcon, FolderIcon } from './Icons';

export function Navbar({ isConnected, directoryPath, theme, toggleTheme, onRefresh }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="brand-logo">
          <div className="brand-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M2 15h10"></path>
              <path d="m9 18 3-3-3-3"></path>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">FileVault</span>
            <span className="brand-tag">MERN File Search</span>
          </div>
        </div>

        <div className="directory-badge" title={`Active searchable directory: ${directoryPath}`}>
          <FolderIcon size={14} className="directory-icon" />
          <span className="directory-label">Target:</span>
          <code className="directory-path">{directoryPath || 'express module/files/'}</code>
        </div>
      </div>

      <div className="navbar-right">
        <div className={`status-pill ${isConnected ? 'status-connected' : 'status-disconnected'}`}>
          <span className="status-dot"></span>
          <span className="status-label">{isConnected ? 'API Online' : 'API Offline'}</span>
        </div>

        <button
          className="icon-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </button>
      </div>
    </header>
  );
}
