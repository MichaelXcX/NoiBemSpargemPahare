import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Chip
} from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 3 }}>
        <Typography 
          sx={{ 
            fontSize: '1.875rem',
            fontWeight: 600,
            color: '#111827',
            mb: 3
          }}
        >
          Settings
        </Typography>

        <Paper 
          sx={{ 
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            mb: 3
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography 
              sx={{ 
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#111827',
                mb: 3
              }}
            >
              Notification Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#111827',
                    mb: 1
                  }}
                >
                  Notification Email
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="caregiver@example.com"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      '& fieldset': {
                        borderColor: '#E5E7EB'
                      },
                      '&:hover fieldset': {
                        borderColor: '#D1D5DB'
                      }
                    }
                  }}
                />
              </Box>
              <Box>
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#111827',
                    mb: 1
                  }}
                >
                  Notification Phone
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="+1234567890"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      '& fieldset': {
                        borderColor: '#E5E7EB'
                      },
                      '&:hover fieldset': {
                        borderColor: '#D1D5DB'
                      }
                    }
                  }}
                />
              </Box>
              <Box>
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#111827',
                    mb: 1
                  }}
                >
                  Alert Threshold (seconds)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  defaultValue={30}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      '& fieldset': {
                        borderColor: '#E5E7EB'
                      },
                      '&:hover fieldset': {
                        borderColor: '#D1D5DB'
                      }
                    }
                  }}
                />
              </Box>
              <Box>
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#111827',
                    mb: 1
                  }}
                >
                  Check-in Frequency (hours)
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  defaultValue={24}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '6px',
                      '& fieldset': {
                        borderColor: '#E5E7EB'
                      },
                      '&:hover fieldset': {
                        borderColor: '#D1D5DB'
                      }
                    }
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#6366F1',
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: '#4F46E5'
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper 
          sx={{ 
            borderRadius: '8px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography 
              sx={{ 
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#111827',
                mb: 3
              }}
            >
              Device Management
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                border: '1px solid #E5E7EB',
                borderRadius: '6px'
              }}
            >
              <Box>
                <Typography 
                  sx={{ 
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#111827',
                    mb: 1
                  }}
                >
                  Fall Detection Device 1
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label="Status: online"
                    size="small"
                    sx={{
                      bgcolor: '#DCFCE7',
                      color: '#059669',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                  />
                  <Typography 
                    sx={{ 
                      fontSize: '0.75rem',
                      color: '#6B7280'
                    }}
                  >
                    Battery: 85%
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
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
                Configure
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings; 