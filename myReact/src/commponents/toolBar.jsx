


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar } from '@mui/material';
import { UserProfile } from './userProfile'; 
import { userSlice } from '../features/userSlice';

export const Nav = () => {
  const user = useSelector((state) => state.users.currentUser); 
  const isLoggedIn = Boolean(user); 
  return (
    <AppBar
    position="fixed" 
    sx={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      height: '80px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease', 
      '&:hover': { transform: 'translateY(5px)' }, 
    }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Box sx={{ flexGrow: 0 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <img src="/images/logo.webp" alt="Site Logo" style={{ height: '60px' }} />
          </Link>
        </Box>

    

            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
                    <Link to="/attractions" style={{ textDecoration: 'none', color: 'white' }}>אטרקציות</Link>
                    <Link to="/hotels" style={{ textDecoration: 'none', color: 'white' }}>מלונות</Link>
                    <Link to="/res" style={{ textDecoration: 'none', color: 'white' }}>אוכל כשר</Link>
                    <Link to="/information" style={{ textDecoration: 'none', color: 'white' }}>מידע למטייל</Link>
                    <Link to="/chabad" style={{ textDecoration: 'none', color: 'white' }}>בית חבד</Link>
                    <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>signUp</Link>
                    <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>logIn</Link>
                    
                  </Box>

        <Box sx={{ flexGrow: 0 }}>
          {isLoggedIn ? (
            <UserProfile user={user} />
          ) : ( null
          
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};




