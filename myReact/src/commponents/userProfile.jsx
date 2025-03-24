
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from '../features/userSlice';
import { Nav } from './toolBar'; 


import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const UserProfile = ({ user, onImageUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch(userSlice.actions.logoutUser());
    navigate("/");
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSetting = () => {
    navigate('/ProfileSettings');
    handleMenuClose();
  };

  const handleImageDialogOpen = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleImageDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageSubmit = () => {
    if (selectedFile) {
      onImageUpdate(selectedFile);
      setOpenDialog(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: "20px" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold", marginRight: "10px" }}>
        {user.name}
      </Typography>
      <IconButton onClick={handleMenuOpen} size="large" color="inherit">
        {user.imageUrl ? (
          <Avatar
            alt={user.name}
            src={`http://localhost:8080/images/${user.imageUrl}`}
            sx={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <AccountCircleIcon fontSize="large" />
        )}
        
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ style: { minWidth: "150px" } }}
      >
        <MenuItem onClick={handleSetting}>הגדרות פרופיל</MenuItem>
        {/* שאני אוסיף את העדכון תמונת פרופיל */}
        {/* <MenuItem onClick={handleImageDialogOpen}>החלפת תמונה</MenuItem> */}
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleLogout();
          
          }}
        >
          התנתקות
        </MenuItem>
      </Menu>

      {/* דיאלוג להעלאת תמונה */}
      <Dialog open={openDialog} onClose={handleImageDialogClose}>
        <DialogTitle>העלאת תמונת פרופיל</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleFileChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose} color="secondary">
            ביטול
          </Button>
          <Button onClick={handleImageSubmit} color="primary">
            שמירה
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

























// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Modal, Box, Button } from "@mui/material";
// // import UpdateCustomer from "./UpdateCustomer"; // ייבוא הקומפוננטה שתוצג במודל
// // import './Profile.css';

// export const UserProfile = ({ user, onLogout }) => {
//     const [open, setOpen] = useState(false);
//     const [imageUrll, setImageUrll] = useState(null);
//     console.log('user', user)

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     useEffect(() => {
//         // אם יש תמונה, שמור את ה-URL שלה
//         if (user.imageUrl) {
//             setImageUrll(user.imageUrl);  // פשוט השתמש ב-URL אם הוא קיים
//         }
//     }, [user.imageUrl]);

//     return (
//         <div>
//             <h1>Sweet Profile🍭</h1>
//             <p><strong>NAME:</strong> {user.name}</p>
//             <p><strong>EMAIL:</strong> {user.email}</p>
//             {imageUrll ? (
//                 <img
//                     src={imageUrll}
//                     alt="user Profile"
//                     className="user-image"
//                 />
//             ) : (
//                 <p className="error-message">לא נמצאה תמונה</p>
//             )}
          
//             {/* <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="update-customer-modal"
//             >
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         border: "2px solid #000",
//                         boxShadow: 24,
//                         p: 4,
//                         borderRadius: "8px",
//                     }}
//                 >
                  
//                     <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
//                         Close
//                     </Button>
//                 </Box>
//             </Modal> */}
//         </div>
//     );
// };













































































































//////////////////////////////////////////////////////////אין לי מושג מזההה

// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Avatar,
//   Menu,
//   MenuItem,
//   IconButton,
//   Box,
// } from '@mui/material';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { ProfileSettings } from './ProfileSettings'; // ייבוא הקומפוננטה

// export const UserProfile = ({ user, onLogout }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [showSettings, setShowSettings] = useState(false); // מצב להצגת הגדרות

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleSetting = () => {
//     setShowSettings(true); // הצגת `ProfileSettings`
//   };

//   if (showSettings) {
//     return <ProfileSettings />; // מציג את קומפוננטת ההגדרות בלבד
//   }

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
//       <Typography
//         variant="body1"
//         sx={{ fontWeight: 'bold', marginRight: '10px' }}
//       >
//         {user.name}
//       </Typography>
//       <IconButton onClick={handleMenuOpen} size="large" color="inherit">
//         {user.avatar ? (
//           <Avatar alt={user.name} src={user.avatar} />
//         ) : (
//           <AccountCircleIcon fontSize="large" />
//         )}
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         PaperProps={{ style: { minWidth: '150px' } }}
//       >
//         <MenuItem onClick={handleSetting}>הגדרות פרופיל</MenuItem>
//         <MenuItem onClick={handleMenuClose}>הגדרות</MenuItem>
//         <MenuItem
//           onClick={() => {
//             handleMenuClose();
//             onLogout();
//           }}
//         >
//           התנתקות
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };



// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography, Paper, TextField } from "@mui/material";
// import EmailSender from "./EmailSender";
// import HelpWidget from "./HelpWidget";

// export const ProfileSettings = () => {
//   // const cUser = useSelector((state) => state.users.currentUser); 
//   // const [showForm, setShowForm] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     password: "",
//     email: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Box sx={{ textAlign: "center", marginTop: "20px" }}>
//       <Typography variant="h5" sx={{ marginBottom: "20px" }}>
//         טופס פרופיל משתמש
//       </Typography>
//       <Paper sx={{ padding: "20px", margin: "0 auto", maxWidth: "400px" }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="שם מלא"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             type="password"
//             label="סיסמה"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             type="email"
//             label="דואר אלקטרוני"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//            <TextField
//             fullWidth
//             margin="normal"
//             label="מספר טלפון"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             sx={{ marginTop: "20px" }}
//           >
//             שלח
//           </Button>
//         </form>
//       </Paper>
//     </Box>

//   );
// };
