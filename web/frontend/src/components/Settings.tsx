import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip
} from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notification Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notification Email"
              defaultValue="caregiver@example.com"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notification Phone"
              defaultValue="+1234567890"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Alert Threshold (seconds)"
              type="number"
              defaultValue={30}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Check-in Frequency (hours)"
              type="number"
              defaultValue={24}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Device Management
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="subtitle1">
                  Fall Detection Device 1
                </Typography>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip
                    label="Status: online"
                    color="success"
                    size="small"
                  />
                  <Typography variant="body2" color="text.secondary">
                    Battery: 85%
                  </Typography>
                </Box>
              </Box>
              <Button variant="outlined">
                Configure
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Settings; 