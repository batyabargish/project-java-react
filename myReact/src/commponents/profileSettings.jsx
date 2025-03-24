

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateU } from '../features/userSlice';

export const ProfileSettings = () => {

  const dispatch = useDispatch();
  const cUser = useSelector((state) => state.users.currentUser); 

  const [formData, setFormData] = useState({
    id: cUser?.id || "",
    name: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cUser || !cUser.id) {
      console.error("Current user is undefined or missing ID");
      return;
    }

    try {
      dispatch(updateU({ id: cUser.id, user: formData }));
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: "20px", minHeight: '100vh' ,marginTop:"120px"}}>
      <Typography 
        variant="h5" 
        sx={{ marginBottom: "20px", color: 'rgba(233, 178, 68, 0.8)', fontWeight: 'bold' }}
      >
        טופס פרופיל משתמש
      </Typography>
      <Paper 
        sx={{ 
          padding: "20px", 
          margin: "0 auto", 
          maxWidth: "400px", 
          borderRadius: "10px", 
          boxShadow: 6, 
          backdropFilter: 'blur(5px)', 
          backgroundColor: 'rgba(255, 255, 255, 0.8)' 
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="שם מלא"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#f5a623' },
                '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: 2 },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="סיסמה"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#f5a623' },
                '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: 2 },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="דואר אלקטרוני"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#f5a623' },
                '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: 2 },
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="מספר טלפון"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ccc' },
                '&:hover fieldset': { borderColor: '#f5a623' },
                '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: 2 },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "20px",
              backgroundColor: 'rgba(238, 203, 133, 0.8)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(233, 178, 68, 0.8)' },
              width: '100%',
              borderRadius: 2,
              padding: '10px',
              boxShadow: 2,
              '&:active': { boxShadow: 3 },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            שלח
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
