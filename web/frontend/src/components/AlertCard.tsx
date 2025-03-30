import React from 'react';
import '../styles/AlertCard.css';

interface AlertCardProps {
  type: 'fall' | 'emergency' | 'check-in';
  status: 'active' | 'resolved' | 'pending';
  description: string;
  location: string;
  time: string;
  onRespond?: () => void;
  onViewDetails?: () => void;
}

const AlertCard: React.FC<AlertCardProps> = ({
  type,
  status,
  description,
  location,
  time,
  onRespond,
  onViewDetails
}) => {
  return (
    <div className="alert-card">
      <div className={`status-indicator ${status}`} />
      <div className="alert-type">{type}</div>
      <div className="alert-description">{description}</div>
      <div className="alert-location">{location}</div>
      <div className="alert-time">{time}</div>
      <div className="alert-actions">
        {status === 'active' && (
          <button className="respond-button" onClick={onRespond}>
            Respond
          </button>
        )}
        <button className="details-button" onClick={onViewDetails}>
          Details
        </button>
      </div>
    </div>
  );
};

export default AlertCard; 