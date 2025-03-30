import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  Link,
  Skeleton
} from '@mui/material';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Pre-load the image
  React.useEffect(() => {
    const img = new Image();
    img.src = article.image;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [article.image]);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
        {!imageLoaded && !imageError && (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: '#F3F4F6'
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
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: '#6366F1',
                bgcolor: '#EEF2FF',
                px: 1.5,
                py: 0.5,
                borderRadius: '16px',
                fontWeight: 500
              }}
            >
              {article.category}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>
              {article.date}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#111827',
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {article.description}
          </Typography>
        </Box>
        <Box sx={{ mt: 'auto' }}>
          <Button
            component={Link}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#6366F1',
              textTransform: 'none',
              fontWeight: 500,
              p: 0,
              '&:hover': {
                bgcolor: 'transparent',
                color: '#4F46E5'
              }
            }}
          >
            Read More →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard; 