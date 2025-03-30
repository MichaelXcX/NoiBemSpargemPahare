import React from 'react';
import { Box, Card, CardContent, Typography, Button, Container } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <Card sx={{ 
    height: '100%', 
    backgroundColor: 'white', 
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px'
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box color={color} sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ color: '#4B5563', mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 600, color: '#111827' }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const RecentAlert: React.FC = () => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, color: '#111827' }}>
      Recent Alerts
    </Typography>
    <Card sx={{ 
      backgroundColor: '#F3F4F6',
      borderRadius: '8px',
      boxShadow: 'none'
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#DC2626' }}>
              Fall Detected
            </Typography>
            <Typography sx={{ mb: 0.5, color: '#DC2626' }}>
              Location: Living Room
            </Typography>
            <Typography sx={{ color: '#DC2626' }}>
              Time: 3/30/2025, 12:36:15 PM
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="error"
            sx={{ 
              textTransform: 'none',
              borderRadius: '6px',
              px: 3
            }}
          >
            Respond
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#000000', fontWeight: 600 }}>
          Dashboard
        </Typography>
        
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          <StatCard
            icon={<WarningIcon sx={{ fontSize: 40 }} />}
            title="Active Alerts"
            value={1}
            color="#DC2626"
          />
          <StatCard
            icon={<PersonIcon sx={{ fontSize: 40 }} />}
            title="Monitored Users"
            value={1}
            color="#4F46E5"
          />
          <StatCard
            icon={<PhoneAndroidIcon sx={{ fontSize: 40 }} />}
            title="Active Devices"
            value={1}
            color="#059669"
          />
        </Box>

        <RecentAlert />
      </Box>
    </Container>
  );
};

export default Dashboard; 