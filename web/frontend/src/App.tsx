import { useState } from 'react'
import './App.css'

function App() {
  const [isLocationShared, setIsLocationShared] = useState(false)
  const [isFallDetectionActive, setIsFallDetectionActive] = useState(true)
  const [nextMedication, setNextMedication] = useState('Blood Pressure - 2:00 PM')

  const handleEmergencyCall = () => {
    // In a real app, this would trigger emergency services and notify contacts
    alert('Emergency services and contacts have been notified!')
  }

  return (
    <div className="elderly-safety-app">
      <header className="app-header">
        <h1>Safety Guardian</h1>
      </header>

      <main className="app-main">
        {/* Emergency Button */}
        <button 
          className="emergency-button"
          onClick={handleEmergencyCall}
        >
          EMERGENCY HELP
        </button>

        {/* Status Cards */}
        <div className="status-cards">
          <div className="status-card">
            <h2>Location Sharing</h2>
            <p>{isLocationShared ? 'Active' : 'Inactive'}</p>
            <button 
              className="toggle-button"
              onClick={() => setIsLocationShared(!isLocationShared)}
            >
              {isLocationShared ? 'Turn Off' : 'Turn On'}
            </button>
          </div>

          <div className="status-card">
            <h2>Fall Detection</h2>
            <p>{isFallDetectionActive ? 'Active' : 'Inactive'}</p>
            <button 
              className="toggle-button"
              onClick={() => setIsFallDetectionActive(!isFallDetectionActive)}
            >
              {isFallDetectionActive ? 'Turn Off' : 'Turn On'}
            </button>
          </div>

          <div className="status-card">
            <h2>Next Medication</h2>
            <p>{nextMedication}</p>
            <button className="reminder-button">
              Set Reminder
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button className="action-button">Call Family</button>
          <button className="action-button">Share Location</button>
          <button className="action-button">Check Weather</button>
        </div>
      </main>
    </div>
  )
}

export default App
