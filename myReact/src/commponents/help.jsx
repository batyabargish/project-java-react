

import React, { useState } from 'react';
import { Box, Button, Typography, Popover, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

const HelpWidget = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const options = [
    { label: "בית חבד", path: "/chabad", icon: "/public/images/home.png" },
    { label: "מלונות", path: "/hotels", icon: "/public/images/hotel.png" },
    { label: "מסעדות", path: "/restaurants", icon: "/public/images/restaurant.png" },
    { label: "מידע כללי", path: "/information", icon: "/public/images/travelInfor.png" },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          borderRadius: '20px',
          height : '40px',
          padding: '12px 18px',
          boxShadow: 3,
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          bgcolor:'rgba(238, 203, 133, 0.8)',
          color: '#000',
          '&:hover': {
            bgcolor: 'rgba(233, 178, 68, 0.8)',
          },
        }}
      >
        אני כאן כדי לעזור
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '16px',
            boxShadow: 4,
            padding: '16px',
            width: '220px',
          },
        }}
      >
      
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textAlign: 'center',
            color: '#000',
          }}
        >
          אפשרויות
        </Typography>

        <List sx={{ padding: 0 }}>
          {options.map((option, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                marginBottom: 1,
                '&:last-child': { marginBottom: 0 },
              }}
            >
              <ListItemButton
                onClick={() => navigate(option.path)}
                sx={{
                  bgcolor: '#f5f5f5',
                  borderRadius: '8px',
                  padding: '10px',
                  '&:hover': {
                    bgcolor: '#e0e0e0',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={option.icon}
                    alt={option.label}
                    style={{ width: '40px', height: '40px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={option.label}
                  sx={{
                    textAlign: 'center',
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default HelpWidget;
