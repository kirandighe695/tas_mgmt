import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Snackbar,
    CircularProgress,
    Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 
import '../styles/SignUp.scss';
import signupImage from '../assets/bg-login.avif';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const payload = {
            name,
            email,
            password,
            userId: uuidv4(),
        };
    
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                users.push(payload);
                localStorage.setItem('users', JSON.stringify(users));
    
                setSnackbarMessage('Sign up successful!');
                setSnackbarOpen(true);
                navigate('/');
            } else {
                const errorData = await response.json();
                setSnackbarMessage(`Sign up failed: ${errorData.message || 'Please try again.'}`);
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('An error occurred. Please try again later.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Typography style={{ display: 'flex', height: '100vh' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${signupImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></Box>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '32px',
                }}>
                <Typography variant="h4" className="title" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        className="textField"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        className="textField"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        className="textField"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="button"
                        sx={{ marginTop: '15px' }}
                        disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </form>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                />
            </Box>
        </Typography>
    );
};

export default SignUp;