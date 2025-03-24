

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll, LoginUser } from "../features/userSlice.js";
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginU = () => {
    const dispatch = useDispatch();
      const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessagePass, setErrorMessagePass] = useState('');

    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    const handleLogin = async () => {
        const response = await dispatch(LoginUser({ "name": username, "password": password }));
        if(response.payload){
            localStorage.setItem("currentUser",JSON.stringify(response.payload));
            console.log(response.payload);
            navigate('/');
        }
        if (response.error) {
            if (response.error.message === "The username is incorrect") {
                setErrorMessageName('שם המשתמש אינו תקין');
                setUsername('');
                setErrorMessagePass('');
            } else if(response.error.message === "The password is incorrect"){
                setErrorMessagePass('סיסמה אינה תקינה');
                setPassword('');
                setErrorMessageName('');
            }
        } else {
            setErrorMessageName('');
            setErrorMessagePass('')
        }
    };



    const orangeColor = "#f5a623"; 

    return (
        <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%', 
                height: '100%',
                backgroundImage: 'url(/images/12.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(2px)', 
                zIndex: 0, 
            }}
        />
    
        {/* טופס */}
        <Box
            sx={{
                zIndex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // צבע רקע עם שקיפות
                padding: 4,
                borderRadius: '20px', // פינות מעוגלות
                boxShadow: '0px 8px 20px rgba(0,0,0,0.3)', // צל ייחודי
                width: '60%', // רוחב קבוע של הטופס
                backdropFilter: 'blur(5px)', // טשטוש מאחורי הטופס
            }}
        >
            <Typography 
                variant="h4" 
                sx={{ marginBottom: 3, color: 'rgba(233, 178, 68, 0.8)', textAlign: 'center', fontWeight: 'bold' }}
            >
                היכנס
            </Typography>
    
            <TextField
                variant="outlined"
                placeholder="שם משתמש"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMessageName('');
                }}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: 2,
                    width: '100%',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#f5a623' },
                        '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: '2px' },
                    },
                }}
                error={Boolean(errorMessageName)}
                helperText={errorMessageName}
            />
    
            <TextField
                variant="outlined"
                type="password"
                placeholder="סיסמה"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessagePass('');
                }}
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: 2,
                    width: '100%',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#f5a623' },
                        '&.Mui-focused fieldset': { borderColor: '#f5a623', borderWidth: '2px' },
                    },
                }}
                error={Boolean(errorMessagePass)}
                helperText={errorMessagePass}
            />
    
            <Button
                variant="contained"
                sx={{
                    backgroundColor:'rgba(238, 203, 133, 0.8)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(233, 178, 68, 0.8)' },
                    width: '100%',
                    borderRadius: '10px',
                    padding: '10px',
                }}
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'טוען...' : 'התחבר'}
            </Button>
        </Box>
    </Box>
    
    


    );
};










