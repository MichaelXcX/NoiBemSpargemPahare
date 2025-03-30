import React, { lazy, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Link as MuiLink,
  Skeleton
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from './Navbar';

const articles = [
  {
    title: "Understanding Fall Prevention for Elderly: A Comprehensive Guide",
    description: "Learn about the latest techniques and technologies helping seniors stay safe at home.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&w=800&q=75",
    date: "Mar 15, 2024",
    category: "Guides",
    link: "https://www.nia.nih.gov/health/prevent-falls-and-fractures"
  },
  {
    title: "How Technology is Revolutionizing Elder Care",
    description: "Discover how AI and smart devices are making homes safer for our elderly loved ones.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&w=800&q=75",
    date: "Jan 30, 2024",
    category: "Insights",
    link: "https://www.who.int/news-room/fact-sheets/detail/falls"
  },
  {
    title: "The Importance of Quick Response in Fall Incidents",
    description: "Why the first hour after a fall is crucial and how to prepare for emergencies.",
    image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&w=800&q=75",
    date: "Jan 29, 2024",
    category: "Safety",
    link: "https://www.cdc.gov/falls/index.html"
  }
];

const ArticleCard: React.FC<{article: typeof articles[0]}> = ({ article }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        {!imageLoaded && (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: '#E5E7EB'
            }} 
          />
        )}
        <CardMedia
          component="img"
          image={article.image}
          alt={article.title}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none'
          }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              color: '#6366F1',
              fontSize: '0.875rem',
              fontWeight: 500,
              mb: 1
            }}
          >
            {article.category}
          </Typography>
          <Typography
            sx={{
              color: '#374151',
              fontSize: '0.875rem'
            }}
          >
            {article.date}
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#111827',
            mb: 2,
            fontSize: '1.25rem',
            minHeight: '3rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.title}
        </Typography>
        <Typography
          sx={{
            color: '#6B7280',
            fontSize: '1rem',
            lineHeight: 1.5,
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {article.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ 
        p: 3, 
        pt: 0,
        borderTop: '1px solid #E5E7EB'
      }}>
        <MuiLink
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{ ml: 'auto' }}
        >
          <Button
            endIcon={<OpenInNewIcon />}
            sx={{
              color: '#6366F1',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                bgcolor: 'rgba(99, 102, 241, 0.04)'
              }
            }}
          >
            Read more
          </Button>
        </MuiLink>
      </CardActions>
    </Card>
  );
};

const Landing: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ mt: 8, mb: 12 }}>
        <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', px: 3 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: '#111827',
              mb: 3
            }}
          >
            Find peace of mind with FallGuard
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: '#6B7280',
              mb: 4,
              lineHeight: 1.5
            }}
          >
            Power your elderly care with intelligent fall detection and instant notifications.
            The most reliable platform for ensuring the safety of your loved ones.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#6366F1',
              textTransform: 'none',
              px: 6,
              py: 2,
              fontSize: '1.125rem',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#4F46E5'
              }
            }}
          >
            Get started for free
          </Button>
        </Box>
      </Container>

      {/* Articles Section */}
      <Box sx={{ bgcolor: '#F9FAFB', py: 12 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                color: '#111827',
                mb: 2
              }}
            >
              Latest Articles on Safety
            </Typography>
            <Typography
              sx={{
                fontSize: '1.125rem',
                color: '#6B7280',
                maxWidth: '600px'
              }}
            >
              Stay informed about the latest developments in elderly care and safety technology
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {articles.map((article, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6}
                md={4} 
                key={index}
                sx={{
                  maxWidth: '400px'
                }}
              >
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing; 