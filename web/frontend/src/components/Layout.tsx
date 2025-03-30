import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" sx={{ bgcolor: '#6366f1' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              flexGrow: 1,
              fontWeight: 'bold'
            }}
          >
            FallGuard
          </Typography>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<DashboardIcon />}
            sx={{
              textTransform: 'none',
              borderBottom: isActive('/') ? '2px solid white' : 'none'
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/alerts"
            color="inherit"
            startIcon={<NotificationsIcon />}
            sx={{
              textTransform: 'none',
              borderBottom: isActive('/alerts') ? '2px solid white' : 'none',
              mx: 2
            }}
          >
            Alerts
          </Button>
          <Button
            component={Link}
            to="/settings"
            color="inherit"
            startIcon={<SettingsIcon />}
            sx={{
              textTransform: 'none',
              borderBottom: isActive('/settings') ? '2px solid white' : 'none'
            }}
          >
            Settings
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 