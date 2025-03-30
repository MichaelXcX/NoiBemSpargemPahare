import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">FallGuard</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          Dashboard
        </Link>
        <Link to="/alerts" className={`nav-link ${location.pathname === '/alerts' ? 'active' : ''}`}>
          <span className="nav-icon">🔔</span>
          Alerts
        </Link>
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <span className="nav-icon">⚙️</span>
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navigation; 