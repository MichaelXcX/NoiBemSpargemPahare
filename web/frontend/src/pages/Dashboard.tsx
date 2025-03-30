import React from 'react';
import StatsCard from '../components/StatsCard';
import AlertCard from '../components/AlertCard';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <StatsCard
          icon={<span className="warning-icon">⚠️</span>}
          title="Active Alerts"
          value={1}
          type="alert"
        />
        <StatsCard
          icon={<span className="user-icon">👤</span>}
          title="Monitored Users"
          value={1}
          type="user"
        />
        <StatsCard
          icon={<span className="device-icon">📱</span>}
          title="Active Devices"
          value={1}
          type="device"
        />
      </div>

      <div className="recent-alerts">
        <h2>Recent Alerts</h2>
        <div className="alerts-list">
          <AlertCard
            type="fall"
            status="active"
            description="Fall Detected"
            location="Living Room"
            time="3/30/2025, 12:36:15 PM"
            onRespond={() => console.log('Responding to alert')}
            onViewDetails={() => console.log('Viewing details')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 