import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fade,
  Stack
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import { articles } from '../data/articles';
import Navbar from './Navbar';
import { AuthDialog, AuthFormData } from './AuthDialog';

const Landing: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [scrollCount, setScrollCount] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const articlesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    phone: ''
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      // Only handle downward scrolls when in the hero section
      if (e.deltaY > 0 && window.scrollY < window.innerHeight) {
        e.preventDefault();
        setScrollCount(prev => {
          const newCount = prev + 1;
          
          // After 3 scrolls, transition to articles section
          if (newCount >= 3) {
            setIsTransitioning(true);
            setShowScrollIndicator(false);
            articlesRef.current?.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Reset after transition
            setTimeout(() => {
              setIsTransitioning(false);
              setScrollCount(0);
            }, 1000);
            
            return 0;
          }
          return newCount;
        });
      }
    };

    // Handle scroll position on page load and scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate opacity based on scroll position
      const newOpacity = Math.max(0, 1 - (scrollPosition / (windowHeight * 0.5)));
      setBackgroundOpacity(newOpacity);

      if (scrollPosition > windowHeight / 2) {
        setShowScrollIndicator(false);
      } else if (!isTransitioning) {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransitioning]);

  const handleScrollClick = () => {
    setIsTransitioning(true);
    setShowScrollIndicator(false);
    articlesRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
      setScrollCount(0);
    }, 1000);
  };

  const handleGetStarted = () => {
    login();
    navigate('/dashboard');
  };

  const handleLogin = () => {
    console.log('Login:', formData);
    setIsLoginOpen(false);
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Preload article images
  useEffect(() => {
    articles.forEach(article => {
      const img = new Image();
      img.src = article.image;
    });
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', position: 'relative' }}>
      {/* Background Layer */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          bgcolor: '#4F46E5',
          opacity: backgroundOpacity,
          transition: 'opacity 0.3s ease-in-out',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Content Layer */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        
        {/* Hero Section */}
        <Box 
          ref={heroRef}
          sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Container maxWidth="xl" sx={{ 
            mt: 8,
            mb: 12,
            flex: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', px: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 3
                }}
              >
                Find peace of mind with FallGuard
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  lineHeight: 1.5
                }}
              >
                Power your elderly care with intelligent fall detection and instant notifications.
                The most reliable platform for ensuring the safety of your loved ones.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                alignItems="center"
              >
                {!isAuthenticated && (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setIsLoginOpen(true)}
                    sx={{
                      bgcolor: 'white',
                      color: '#4F46E5',
                      textTransform: 'none',
                      px: 6,
                      py: 2,
                      fontSize: '1.125rem',
                      borderRadius: '8px',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)'
                      }
                    }}
                  >
                    Get started
                  </Button>
                )}
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleScrollClick}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    textTransform: 'none',
                    px: 6,
                    py: 2,
                    fontSize: '1.125rem',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Read more about us
                </Button>
              </Stack>
            </Box>
          </Container>

          {/* Scroll Indicator */}
          <Fade in={showScrollIndicator}>
            <Box
              onClick={handleScrollClick}
              sx={{
                position: 'absolute',
                bottom: 40,
                left: '50%',
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateY(0) translateX(-50%)',
                  },
                  '40%': {
                    transform: 'translateY(-20px) translateX(-50%)',
                  },
                  '60%': {
                    transform: 'translateY(-10px) translateX(-50%)',
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                Scroll down
              </Typography>
              <KeyboardArrowDownIcon 
                sx={{ 
                  color: 'white',
                  fontSize: '2rem'
                }} 
              />
            </Box>
          </Fade>
        </Box>

        {/* Articles Section */}
        <Box
          ref={articlesRef}
          sx={{
            py: { xs: 8, md: 12 },
            px: 2,
            bgcolor: '#F9FAFB'
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontWeight: 700,
                color: '#111827'
              }}
            >
              Latest Articles
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 4,
                '& > *': {
                  height: '100%',
                  minHeight: '500px'
                }
              }}
            >
              {articles.map((article, index) => (
                <ArticleCard key={article.title} article={article} />
              ))}
            </Box>
          </Container>
        </Box>

        <AuthDialog
          open={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          title="Log in to FallGuard"
          onSubmit={handleLogin}
          formData={formData}
          onInputChange={handleInputChange}
        />
      </Box>
    </Box>
  );
};

export default Landing; 