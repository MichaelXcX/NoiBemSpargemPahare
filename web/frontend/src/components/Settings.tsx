import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface CaretakerFormData {
  name: string;
  email: string;
  phone: string;
  age?: number;
}

const Settings: React.FC = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState<CaretakerFormData>({
    name: '',
    email: '',
    phone: '',
    age: undefined
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age
      });
    } else {
      // If no user in context, try to fetch from API
      fetchCaretakerData();
    }
  }, [user]);

  const fetchCaretakerData = async () => {
    // Skip if we don't have a user ID
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/caretakers/${user.email}`);
      const caretakerData = response.data;
      
      setFormData({
        name: caretakerData.name || '',
        email: caretakerData.email || '',
        phone: caretakerData.phone || '',
      });
      
      setError(null);
    } catch (err) {
      console.error('Error fetching caretaker data:', err);
      setError('Failed to load your profile information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Skip if we don't have a user ID
    if (!user?.id) {
      setError('You must be logged in to update your profile.');
      return;
    }
    
    setSaving(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/caretakers/${user.id}`, formData);
      
      // Update user in auth context
      if (setUser && user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          age: formData.age
        });
      }
      
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.error('Error updating caretaker data:', err);
      setError('Failed to update your profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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
          Profile Settings
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper 
            component="form"
            onSubmit={handleSubmit}
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
                Personal Information
              </Typography>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
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
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
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
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
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
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+40 XXX XXX XXX"
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
                  type="submit"
                  variant="contained"
                  disabled={saving}
                  sx={{
                    bgcolor: '#6366F1',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#4F46E5'
                    },
                    '&.Mui-disabled': {
                      bgcolor: '#A5B4FC'
                    }
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSuccess(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Your profile has been updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Settings;