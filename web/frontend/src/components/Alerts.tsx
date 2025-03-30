import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip
} from '@mui/material';

interface Alert {
  status: 'active' | 'resolved' | 'pending';
  type: string;
  description: string;
  location: string;
  time: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'error';
    case 'resolved':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};

const Alerts: React.FC = () => {
  const alerts: Alert[] = [
    {
      status: 'active',
      type: 'fall',
      description: 'Possible fall detected',
      location: 'Living Room',
      time: '3/30/2025, 1:33:28 PM'
    },
    {
      status: 'resolved',
      type: 'emergency',
      description: 'Emergency button pressed',
      location: 'Kitchen',
      time: '3/30/2025, 12:33:28 PM'
    },
    {
      status: 'pending',
      type: 'check-in',
      description: 'Daily check-in required',
      location: 'Bedroom',
      time: '3/30/2025, 11:33:28 AM'
    }
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Alerts History
        </Typography>
        <Box>
          <Button variant="contained" color="primary" sx={{ mr: 1 }}>
            Export Alerts
          </Button>
          <Button variant="outlined">
            Filter
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STATUS</TableCell>
              <TableCell>TYPE</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>LOCATION</TableCell>
              <TableCell>TIME</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Chip
                    label={alert.status}
                    color={getStatusColor(alert.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>{alert.description}</TableCell>
                <TableCell>{alert.location}</TableCell>
                <TableCell>{alert.time}</TableCell>
                <TableCell>
                  {alert.status === 'active' && (
                    <Button color="error" size="small">
                      Respond
                    </Button>
                  )}
                  <Button size="small">Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Alerts; 