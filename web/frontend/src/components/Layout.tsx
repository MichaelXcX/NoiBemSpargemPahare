import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#F3F4F6' }}>
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'white', 
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          color: 'black'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: '0 !important' }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#6366F1',
                flexGrow: 1,
                fontWeight: 'bold',
                fontSize: '1.25rem'
              }}
            >
              FallGuard
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/"
                startIcon={<HomeIcon />}
                sx={{
                  color: location.pathname === '/' ? '#6366F1' : '#6B7280',
                  textTransform: 'none',
                  borderBottom: location.pathname === '/' ? '2px solid #6366F1' : 'none',
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 