import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
  Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';
import { AuthDialog, AuthFormData } from './AuthDialog';


const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, login, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    phone: ''
  });

  const handleLogin = () => {
    setIsLoginOpen(false);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };
  
  // Update the handleRegister function
  const handleRegister = () => {
    console.log('Register:', formData);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setIsRegisterOpen(false);
    navigate('/dashboard');
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'white',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ px: '0 !important' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              sx={{
                color: '#6366F1',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              🛡️ FallGuard
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            // Authenticated navigation items
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                component={Link}
                to="/dashboard"
                startIcon={<HomeIcon />}
                sx={{
                  color: location.pathname === '/dashboard' ? '#6366F1' : '#6B7280',
                  textTransform: 'none',
                  borderBottom: location.pathname === '/dashboard' ? '2px solid #6366F1' : 'none',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/alerts"
                startIcon={<NotificationsIcon />}
                sx={{
                  color: location.pathname === '/alerts' ? '#6366F1' : '#6B7280',
                  textTransform: 'none',
                  borderBottom: location.pathname === '/alerts' ? '2px solid #6366F1' : 'none',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                Alerts
              </Button>
              <Button
                component={Link}
                to="/settings"
                startIcon={<SettingsIcon />}
                sx={{
                  color: location.pathname === '/settings' ? '#6366F1' : '#6B7280',
                  textTransform: 'none',
                  borderBottom: location.pathname === '/settings' ? '2px solid #6366F1' : 'none',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': { backgroundColor: 'transparent' }
                }}
              >
                Settings
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 2, height: '24px', alignSelf: 'center' }} />
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: '#6B7280',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#374151',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Log out
              </Button>
            </Box>
          ) : (
            // Unauthenticated navigation items
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={() => setIsLoginOpen(true)}
                sx={{
                  color: '#6B7280',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'transparent',
                    color: '#374151'
                  }
                }}
              >
                Log in
              </Button>
              <Button
                onClick={() => setIsRegisterOpen(true)}
                variant="contained"
                sx={{
                  bgcolor: '#6366F1',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#4F46E5'
                  }
                }}
              >
                Sign up for free
              </Button>
            </Box>
          )}

          <AuthDialog
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            title="Log in to FallGuard"
            onSubmit={handleLogin}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <AuthDialog
            open={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            title="Create your FallGuard account"
            onSubmit={handleRegister}
            formData={formData}
            onInputChange={handleInputChange}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;