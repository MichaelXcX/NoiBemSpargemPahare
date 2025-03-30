import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Typography,
  Button,
  Link as MuiLink,
  Skeleton
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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