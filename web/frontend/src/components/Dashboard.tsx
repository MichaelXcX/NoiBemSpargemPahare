import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Container, CircularProgress } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Elder {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color?: string;
  isLoading?: boolean;
}

interface Alert {
  _id: string;
  location: string;
  time: string;
  isResolved: boolean;
  careTaker: string;
  description: string;
  type: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color, isLoading = false }) => (
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
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: color }} />
          ) : (
            <Typography sx={{ 
              fontSize: '2rem',
              fontWeight: 600,
              color: '#111827',
              lineHeight: 1
            }}>
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const RecentAlerts: React.FC<{ alerts: Alert[], isLoading: boolean, handleResolve: (id: string) => void }> = 
  ({ alerts, isLoading, handleResolve }) => (
  <Box sx={{ mt: 4 }}>
    <Typography sx={{ 
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#111827',
      mb: 2
    }}>
      Recent Alerts
    </Typography>
    
    {isLoading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    ) : alerts.length === 0 ? (
      <Card sx={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: '24px !important' }}>
          <Typography sx={{ textAlign: 'center', color: '#6B7280' }}>
            No active alerts at the moment
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Card sx={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: '24px !important', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {alerts.map(alert => (
            <Card key={alert._id} sx={{ 
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
                      {alert.type === 'fall' ? 'Fall Detected' : alert.type}
                    </Typography>
                    <Typography sx={{ 
                      color: '#DC2626',
                      fontSize: '0.875rem',
                      mb: 0.5
                    }}>
                      Location: {alert.location}
                    </Typography>
                    <Typography sx={{ 
                      color: '#DC2626',
                      fontSize: '0.875rem'
                    }}>
                      Time: {new Date(alert.time).toLocaleString()}
                    </Typography>
                    {alert.description && (
                      <Typography sx={{ 
                        color: '#DC2626',
                        fontSize: '0.875rem',
                        mt: 1
                      }}>
                        {alert.description}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant="contained" 
                    onClick={() => handleResolve(alert._id)}
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
          ))}
        </CardContent>
      </Card>
    )}
  </Box>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [elders, setElders] = useState<Elder[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;
      
      setIsLoading(true);
      try {
        // Fetch elders associated with the caretaker
        const eldersResponse = await axios.get(`http://localhost:3000/api/elders/${user.id}`);
        setElders(eldersResponse.data);
        
        // Fetch alerts for this caretaker
        const alertsResponse = await axios.get(`http://localhost:3000/api/alerts/caretaker/${user.id}`);
        
        // Filter for unresolved alerts only and sort by time (most recent first)
        const unresolvedAlerts = alertsResponse.data
          .filter((alert: Alert) => !alert.isResolved)
          .sort((a: Alert, b: Alert) => new Date(b.time).getTime() - new Date(a.time).getTime());
        
        setAlerts(unresolvedAlerts);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Function to handle resolving an alert
  const handleResolveAlert = async (alertId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/alerts/${alertId}`, {
        isResolved: true
      });
      
      // Update local state
      setAlerts(prevAlerts => prevAlerts.filter(alert => alert._id !== alertId));
    } catch (err) {
      console.error('Error resolving alert:', err);
      setError('Failed to resolve alert. Please try again.');
    }
  };

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
        
        {error && (
          <Typography sx={{ color: 'error.main', mb: 2 }}>
            {error}
          </Typography>
        )}
        
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          <StatCard
            icon={<WarningIcon sx={{ fontSize: 32 }} />}
            title="Active Alerts"
            value={alerts.length}
            color="#DC2626"
            isLoading={isLoading}
          />
          <StatCard
            icon={<PersonIcon sx={{ fontSize: 32 }} />}
            title="Monitored Users"
            value={elders.length}
            color="#4F46E5"
            isLoading={isLoading}
          />
          <StatCard
            icon={<PhoneAndroidIcon sx={{ fontSize: 32 }} />}
            title="Active Devices"
            value={elders.length} // Assuming one device per elder
            color="#059669"
            isLoading={isLoading}
          />
        </Box>

        <RecentAlerts 
          alerts={alerts} 
          isLoading={isLoading}
          handleResolve={handleResolveAlert}
        />
        
        {/* Elders List Section remains the same... */}
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ 
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#111827',
            mb: 2
          }}>
            Monitored Elders
          </Typography>
          
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : elders.length === 0 ? (
            <Card sx={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <CardContent>
                <Typography sx={{ textAlign: 'center', color: '#6B7280' }}>
                  No elders are currently being monitored
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
              {elders.map(elder => (
                <Card key={elder._id} sx={{ 
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {elder.name}
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 0.5 }}>
                      Email: {elder.email || 'Not provided'}
                    </Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                      Phone: {elder.phone || 'Not provided'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Box>

    </Container>
  );
};
export default Dashboard; 