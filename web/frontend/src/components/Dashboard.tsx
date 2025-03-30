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
    borderRadius: '8px',
    p: 2
  }}>
    <CardContent sx={{ p: '0 !important' }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box color={color} sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ 
            color: '#111827', 
            fontSize: '0.875rem',
            fontWeight: 500,
            mb: 0.5
          }}>
            {title}
          </Typography>
          <Typography sx={{ 
            fontSize: '2rem',
            fontWeight: 600,
            color: '#111827',
            lineHeight: 1
          }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const RecentAlert: React.FC = () => (
  <Box sx={{ mt: 4 }}>
    <Typography sx={{ 
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#111827',
      mb: 2
    }}>
      Recent Alerts
    </Typography>
    <Card sx={{ 
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    }}>
      <CardContent sx={{ p: '24px !important' }}>
        <Card sx={{ 
          backgroundColor: '#FEF2F2',
          borderRadius: '8px',
          boxShadow: 'none',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: '16px !important' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography sx={{ 
                  color: '#DC2626',
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 1
                }}>
                  Fall Detected
                </Typography>
                <Typography sx={{ 
                  color: '#DC2626',
                  fontSize: '0.875rem',
                  mb: 0.5
                }}>
                  Location: Living Room
                </Typography>
                <Typography sx={{ 
                  color: '#DC2626',
                  fontSize: '0.875rem'
                }}>
                  Time: 3/30/2025, 12:36:15 PM
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#DC2626',
                  textTransform: 'none',
                  borderRadius: '6px',
                  px: 3,
                  '&:hover': {
                    bgcolor: '#B91C1C'
                  }
                }}
              >
                Respond
              </Button>
            </Box>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </Box>
);

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Typography sx={{ 
          fontSize: '1.875rem',
          fontWeight: 600,
          color: '#111827',
          mb: 3
        }}>
          Dashboard
        </Typography>
        
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          <StatCard
            icon={<WarningIcon sx={{ fontSize: 32 }} />}
            title="Active Alerts"
            value={1}
            color="#DC2626"
          />
          <StatCard
            icon={<PersonIcon sx={{ fontSize: 32 }} />}
            title="Monitored Users"
            value={1}
            color="#4F46E5"
          />
          <StatCard
            icon={<PhoneAndroidIcon sx={{ fontSize: 32 }} />}
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