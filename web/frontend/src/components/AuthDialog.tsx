import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export interface AuthFormData {
  email: string;
  phone: string;
}

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  formData: AuthFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onClose,
  title,
  onSubmit,
  formData,
  onInputChange
}) => {
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format phone number when formData changes
  useEffect(() => {
    if (formData.phone) {
      const formatted = formatPhoneNumber(formData.phone);
      if (formatted !== formData.phone) {
        onInputChange({
          target: {
            name: 'phone',
            value: formatted
          }
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, [formData.phone]);

  const validateForm = () => {
    const newErrors: { email?: string; phone?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+40\s?[1-9]\d{1,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Romanian phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && !isSubmitting) {
      setIsSubmitting(true);
      onSubmit();
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters except +
    const numbers = value.replace(/[^\d+]/g, '');
    
    // If the number doesn't start with +40, add it
    if (!numbers.startsWith('+40')) {
      // Remove any leading zeros and add +40
      const cleanNumber = numbers.replace(/^0+/, '');
      return '+40 ' + cleanNumber;
    }
    
    // Format the rest of the number
    const digits = numbers.slice(3); // Remove +40
    if (digits.length <= 3) return '+40 ' + digits;
    if (digits.length <= 6) return '+40 ' + digits.slice(0, 3) + ' ' + digits.slice(3);
    if (digits.length <= 9) return '+40 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
    return '+40 ' + digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 9);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onInputChange({
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: formatted
      }
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827' }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={onInputChange}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="Enter your email address"
            autoComplete="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#6B7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#E5E7EB'
                },
                '&:hover fieldset': {
                  borderColor: '#D1D5DB'
                },
                '& input': {
                  backgroundColor: 'transparent !important',
                  color: '#111827',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                    WebkitTextFillColor: '#111827',
                    caretColor: '#111827'
                  }
                }
              }
            }}
          />
          <TextField
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={formData.phone}
            onChange={handlePhoneChange}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="+40 XXX XXX XXX"
            autoComplete="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: '#6B7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#E5E7EB'
                },
                '&:hover fieldset': {
                  borderColor: '#D1D5DB'
                },
                '& input': {
                  backgroundColor: 'transparent !important',
                  color: '#111827',
                  '&:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                    WebkitTextFillColor: '#111827',
                    caretColor: '#111827'
                  }
                }
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            color: '#6B7280',
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'transparent',
              color: '#374151'
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            bgcolor: '#6366F1',
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#4F46E5'
            },
            '&:disabled': {
              bgcolor: '#A5B4FC'
            }
          }}
        >
          {isSubmitting ? 'Logging in...' : title}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AuthDialog }; 