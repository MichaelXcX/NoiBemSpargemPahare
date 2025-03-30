import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Popover,
  Divider
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

interface Alert {
  id: string; // Add this line
  status: 'active' | 'resolved' | 'pending';
  type: string;
  description: string;
  location: string;
  time: string;
}

interface Filters {
  status: {
    active: boolean;
    resolved: boolean;
    pending: boolean;
  };
  type: {
    fall: boolean;
    emergency: boolean;
    'check-in': boolean;
  };
  dateRange: {
    start: string;
    end: string;
  };
}

const StatusChip: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          icon: <ErrorOutlineIcon sx={{ fontSize: 16 }} />,
          color: '#FEE2E2',
          textColor: '#DC2626',
          label: 'active'
        };
      case 'resolved':
        return {
          icon: <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />,
          color: '#DCFCE7',
          textColor: '#059669',
          label: 'resolved'
        };
      case 'pending':
        return {
          icon: <AccessTimeIcon sx={{ fontSize: 16 }} />,
          color: '#FEF9C3',
          textColor: '#CA8A04',
          label: 'pending'
        };
      default:
        return {
          icon: null,
          color: '#E5E7EB',
          textColor: '#6B7280',
          label: status
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        bgcolor: config.color,
        color: config.textColor,
        py: 0.5,
        px: 1.5,
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 500
      }}
    >
      {config.icon}
      {config.label}
    </Box>
  );
};

const Alerts: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [caretakerId, setCaretakerId] = useState<string>(""); // You should set this based on logged-in user or props
  const [filters, setFilters] = useState<Filters>({
    status: {
      active: true,
      resolved: true,
      pending: true
    },
    type: {
      fall: true,
      emergency: true,
      'check-in': true
    },
    dateRange: {
      start: '',
      end: ''
    }
  });
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        
        // If you have a specific caretaker ID
        let response = await axios.get(`http://localhost:3000/api/alerts/caretaker/67e92e8fc4c9bae373ce3093`);
        
        // Map backend data to match your frontend interface
        const mappedAlerts: Alert[] = response.data.map((alert: any) => ({
          id: alert._id, // Add this line to preserve the MongoDB ID
          status: alert.isResolved ? 'resolved' : 'active',
          type: alert.type || 'fall',
          description: alert.description || 'Alert triggered',
          location: alert.location,
          time: new Date(alert.time).toLocaleString()
        }));
        
        console.log('Fetched alerts:', mappedAlerts);
        setAlerts(mappedAlerts);
        setError(null);
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Failed to load alerts. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchAlerts();
    
    // Set up a polling interval to refresh alerts every minute
    const intervalId = setInterval(fetchAlerts, 60000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Re-run if caretakerId changes

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      // Status filter
      if (!filters.status[alert.status as keyof typeof filters.status]) {
        return false;
      }
  
      // Type filter
      if (!filters.type[alert.type as keyof typeof filters.type]) {
        return false;
      }
  
      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const alertDate = new Date(alert.time);
        if (filters.dateRange.start && alertDate < new Date(filters.dateRange.start)) {
          return false;
        }
        if (filters.dateRange.end && alertDate > new Date(filters.dateRange.end)) {
          return false;
        }
      }
  
      return true;
    });
  }, [filters, alerts]);
  // Add this function in the Alerts component
const handleRespond = async (alertId: string) => {
  try {
    // Call the API to update the alert
    const response = await axios.put(`http://localhost:3000/api/alerts/${alertId}`, {
      isResolved: true
    });
    
    // Update the local state
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' } 
          : alert
      )
    );
    
    // Optional: Show success message
    console.log('Alert marked as resolved', response.data);
  } catch (error) {
    console.error('Error resolving alert:', error);
    // Optional: Show error message to user
  }
};
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (status: keyof typeof filters.status) => {
    setFilters(prev => ({
      ...prev,
      status: {
        ...prev.status,
        [status]: !prev.status[status]
      }
    }));
  };

  const handleTypeChange = (type: keyof typeof filters.type) => {
    setFilters(prev => ({
      ...prev,
      type: {
        ...prev.type,
        [type]: !prev.type[type]
      }
    }));
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleExport = () => {
    // Convert alerts to CSV format
    const headers = ['Status', 'Type', 'Description', 'Location', 'Time'];
    const csvData = filteredAlerts.map(alert => [
      alert.status,
      alert.type,
      alert.description,
      alert.location,
      alert.time
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    // Set download attributes
    link.setAttribute('href', url);
    link.setAttribute('download', `fallguard_alerts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3
          }}
        >
          <Typography 
            sx={{ 
              fontSize: '1.875rem',
              fontWeight: 600,
              color: '#111827'
            }}
          >
            Alerts History
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleExport}
              sx={{
                bgcolor: '#6366F1',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#4F46E5'
                }
              }}
            >
              Export Alerts
            </Button>
            <Button
              variant="outlined"
              onClick={handleFilterClick}
              startIcon={<FilterListIcon />}
              sx={{
                color: '#6B7280',
                borderColor: '#E5E7EB',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  bgcolor: 'transparent'
                }
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 320,
              p: 2,
              mt: 1
            }
          }}
        >
          <Typography sx={{ fontWeight: 600, mb: 2 }}>Filter Alerts</Typography>
          
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Status</Typography>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.status.active}
                  onChange={() => handleStatusChange('active')}
                  size="small"
                />
              }
              label="Active"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.status.resolved}
                  onChange={() => handleStatusChange('resolved')}
                  size="small"
                />
              }
              label="Resolved"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.status.pending}
                  onChange={() => handleStatusChange('pending')}
                  size="small"
                />
              }
              label="Pending"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ fontWeight: 500, mb: 1 }}>Type</Typography>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.type.fall}
                  onChange={() => handleTypeChange('fall')}
                  size="small"
                />
              }
              label="Fall Detection"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.type.emergency}
                  onChange={() => handleTypeChange('emergency')}
                  size="small"
                />
              }
              label="Emergency"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.type['check-in']}
                  onChange={() => handleTypeChange('check-in')}
                  size="small"
                />
              }
              label="Check-in"
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ fontWeight: 500, mb: 1 }}>Date Range</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="date"
              size="small"
              label="Start Date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              type="date"
              size="small"
              label="End Date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </Popover>

        <TableContainer 
          component={Paper}
          sx={{ 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            borderRadius: '8px'
          }}
        >
          {loading && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography>Loading alerts...</Typography>
            </Box>
          )}

          {!loading && !error && filteredAlerts.length === 0 && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography>No alerts found matching the current filters.</Typography>
            </Box>
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>STATUS</TableCell>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>TYPE</TableCell>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>DESCRIPTION</TableCell>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>LOCATION</TableCell>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>TIME</TableCell>
                <TableCell sx={{ color: '#6B7280', fontWeight: 500 }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlerts.map((alert, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <StatusChip status={alert.status} />
                  </TableCell>
                  <TableCell sx={{ color: '#111827' }}>{alert.type}</TableCell>
                  <TableCell sx={{ color: '#111827' }}>{alert.description}</TableCell>
                  <TableCell sx={{ color: '#111827' }}>{alert.location}</TableCell>
                  <TableCell sx={{ color: '#111827' }}>{alert.time}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                    {alert.status === 'active' && (
                      <Button
                        onClick={() => handleRespond(alert.id)}
                        sx={{
                          color: '#DC2626',
                          textTransform: 'none',
                          minWidth: 'auto',
                          p: 1
                        }}
                      >
                        Respond
                      </Button>
                    )}
                      <Button
                        sx={{
                          color: '#6B7280',
                          textTransform: 'none',
                          minWidth: 'auto',
                          p: 1
                        }}
                      >
                        Details
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Alerts; 