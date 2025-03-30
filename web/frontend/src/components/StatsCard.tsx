import React from 'react';
import '../styles/StatsCard.css';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
  type: 'alert' | 'user' | 'device';
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, type }) => {
  return (
    <div className={`stats-card ${type}`}>
      <div className="stats-icon">
        {icon}
      </div>
      <div className="stats-content">
        <h3 className="stats-title">{title}</h3>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard; 