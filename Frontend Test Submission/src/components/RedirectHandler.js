import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleRedirect } from '../services/api';
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const redirect = async () => {
      try {
        await handleRedirect(shortcode);
      } catch (err) {
        setError(err.message);
      }
    };
    
    redirect();
  }, [shortcode]);

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        p: 3
      }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Redirect Failed
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <CircularProgress size={60} sx={{ mb: 3 }} />
      <Typography variant="h5">
        Redirecting to {shortcode}...
      </Typography>
    </Box>
  );
};

export default RedirectHandler;