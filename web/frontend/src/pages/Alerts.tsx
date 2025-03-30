import React from 'react';
import AlertCard from '../components/AlertCard';
import '../styles/Alerts.css';

const Alerts: React.FC = () => {
  const alerts = [
    {
      type: 'fall' as const,
      status: 'active' as const,
      description: 'Possible fall detected',
      location: 'Living Room',
      time: '3/30/2025, 1:19:42 PM'
    },
    {
      type: 'emergency' as const,
      status: 'resolved' as const,
      description: 'Emergency button pressed',
      location: 'Kitchen',
      time: '3/30/2025, 12:19:42 PM'
    },
    {
      type: 'check-in' as const,
      status: 'pending' as const,
      description: 'Daily check-in required',
      location: 'Bedroom',
      time: '3/30/2025, 11:19:42 AM'
    }
  ];

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <h1>Alerts History</h1>
        <div className="alerts-actions">
          <button className="export-button">Export Alerts</button>
          <button className="filter-button">Filter</button>
        </div>
      </div>

      <div className="alerts-table">
        <div className="alerts-table-header">
          <div className="header-cell">STATUS</div>
          <div className="header-cell">TYPE</div>
          <div className="header-cell">DESCRIPTION</div>
          <div className="header-cell">LOCATION</div>
          <div className="header-cell">TIME</div>
          <div className="header-cell">ACTIONS</div>
        </div>

        <div className="alerts-table-body">
          {alerts.map((alert, index) => (
            <AlertCard
              key={index}
              {...alert}
              onRespond={() => console.log('Responding to alert', index)}
              onViewDetails={() => console.log('Viewing details for alert', index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts; 