import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Settings from './components/Settings';
import Landing from './components/Landing';
import AuthProvider from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#3f51b5',
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
});

// Simple auth check - in a real app, this would be more sophisticated
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  element={
                    <Layout>
                      <Dashboard />
                    </Layout>
                  }
                />
              }
            />
            <Route
              path="/alerts"
              element={
                <PrivateRoute
                  element={
                    <Layout>
                      <Alerts />
                    </Layout>
                  }
                />
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute
                  element={
                    <Layout>
                      <Settings />
                    </Layout>
                  }
                />
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
