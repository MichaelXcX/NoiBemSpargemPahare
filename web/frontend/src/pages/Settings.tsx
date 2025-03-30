import React, { useState } from 'react';
import '../styles/Settings.css';

interface NotificationSettings {
  email: string;
  phone: string;
  alertThreshold: number;
  checkInFrequency: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: 'caregiver@example.com',
    phone: '+1234567890',
    alertThreshold: 30,
    checkInFrequency: 24
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // TODO: Implement actual save functionality
  };

  return (
    <div className="settings">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Notification Settings</h2>
        <div className="settings-form">
          <div className="form-group">
            <label>Notification Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Notification Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Alert Threshold (seconds)</label>
            <input
              type="number"
              value={settings.alertThreshold}
              onChange={(e) => setSettings({ ...settings, alertThreshold: parseInt(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label>Check-in Frequency (hours)</label>
            <input
              type="number"
              value={settings.checkInFrequency}
              onChange={(e) => setSettings({ ...settings, checkInFrequency: parseInt(e.target.value) })}
            />
          </div>

          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h2>Device Management</h2>
        <div className="device-list">
          <div className="device-item">
            <div className="device-info">
              <h3>Fall Detection Device 1</h3>
              <p className="device-status">Status: online | Battery: 85%</p>
            </div>
            <button className="configure-button">Configure</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings; 