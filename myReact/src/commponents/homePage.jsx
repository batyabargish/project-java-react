

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { userSlice } from '../features/userSlice';

export const HomePage = () => {
  const user = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const handleImageUpdate = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`http://localhost:8080/api/Users/update/${user.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update image");
      }

      const updatedUser = await response.json();
      console.log("תמונה הועלתה בהצלחה", updatedUser);
      dispatch(userSlice.actions.updateUser(updatedUser));
    } catch (error) {
      console.error("שגיאה בעדכון התמונה:", error);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
      }}
    >
      <Box
        sx={{
          height: '79vh',
          width: '100%',
          backgroundImage: 'url(/images/12.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: '25%',
          borderBottomRightRadius: '25%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* כותרת בולטת */}
        <Typography
          variant="h3"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            marginBottom: '20px',
          }}
        >
          ברוכים הבאים לבית חבד בודווה מונטנגרו
        </Typography>

        {/* כפתור מידע למטייל */}
        <Link to="/information" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF9800',
              color: 'white',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            מידע למטייל
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
