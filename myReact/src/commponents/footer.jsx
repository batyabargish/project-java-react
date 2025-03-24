


import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material'; 
import { Link } from 'react-router-dom'; 

export const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFooter(true); 
      } else {
        setShowFooter(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0',
        textAlign: 'center',
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky', 
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
        opacity: showFooter ? 1 : 0, 
        visibility: showFooter ? 'visible' : 'hidden', 
        transition: 'opacity 0.3s ease',
        height: 'auto', 
                left: 0, 
        right: 0, 
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ mb: 1 }}>
          📞 +38268815599
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          💬 WhatsApp: +38268815599
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          ✉️ chabadbudva@gmail.com
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Link to="/chabad" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="body2" sx={{ display: 'inline-block' }}>
              ליצירת קשר במייל
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

