
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../features/userSlice.js";
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../features/userSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePhone, setErrorMessagePhone] = useState('');

    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value.includes('@')) {
            setErrorMessageEmail('כתובת אימייל לא תקינה');
        } else {
            setErrorMessageEmail('');
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);

        if (value.length < 9 || !/^\d+$/.test(value)) {
            setErrorMessagePhone('מספר פלאפון לא תקין');
        } else {
            setErrorMessagePhone('');
        }
    };

    const handleSignUp = async () => {
        if (errorMessageEmail || errorMessagePhone) {
            return;
        }

        const response = await dispatch(registerUser({ "name": username, "password": password, "email": email, "phone": phone }));
      
        if (response.payload) {
            localStorage.removeItem("currentUser");
            dispatch(userSlice.actions.logoutUser());
            console.log(response.payload);
            navigate('/login');
        }

        if (response.error) {
            if (response.error.message === "Username already exists") {
                setErrorMessage('שם המשתמש תפוס');
            } else {
                setErrorMessage('');
            }
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login'); 
    };

    return (
        <>
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
                        width: '60%',
                        height: '100%',
                        backgroundImage: 'url(/images/12.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: 'blur(2px)',
                        zIndex: 0,
                    }}
                />

                <Box
                    sx={{
                        zIndex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        padding: 4,
                        borderRadius: '20px',
                        boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
                        width: '35%',
                        backdropFilter: 'blur(5px)',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: 3,
                            color: 'rgba(233, 178, 68, 0.8)',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        צור חשבון חדש
                    </Typography>

                    <TextField
                        variant="outlined"
                        placeholder="שם משתמש"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
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
                        error={Boolean(errorMessage)}
                        helperText={errorMessage}
                    />

                    <TextField
                        variant="outlined"
                        type="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
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
                    />

                    <TextField
                        variant="outlined"
                        placeholder="אימייל"
                        value={email}
                        onChange={handleEmailChange}
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
                        error={Boolean(errorMessageEmail)}
                        helperText={errorMessageEmail}
                    />

                    <TextField
                        variant="outlined"
                        placeholder="מספר פלאפון"
                        value={phone}
                        onChange={handlePhoneChange}
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
                        error={Boolean(errorMessagePhone)}
                        helperText={errorMessagePhone}
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
                            marginBottom : '7px',
                        }}
                        onClick={handleSignUp}
                        disabled={loading}
                    >
                        {loading ? 'רושם...' : 'הרשם'}
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'rgba(238, 203, 133, 0.8)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(233, 178, 68, 0.8)' },
                            width: '100%',
                            borderRadius: '10px',
                            padding: '10px',
                        }}
                        onClick={handleLoginRedirect}
                    >
                        יש לך כבר חשבון? התחבר
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default SignUp;
