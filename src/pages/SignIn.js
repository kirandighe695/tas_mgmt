import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignIn.scss';
import signinImage from '../assets/bg-login.avif';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userId', user.userId);
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/all-task');
            }, 1000);

        } else {
            setErrorMessage('Invalid email or password. Please try again.');
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
                    backgroundImage: `url(${signinImage})`,
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
                    Sign In
                </Typography>
                <form onSubmit={handleSignIn}>
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
                    {errorMessage && (
                        <Typography className="errorMessage" variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="button"
                        sx={{ marginTop: '15px' }}>
                        Sign In
                    </Button>
                </form>
                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message="Sign in successful!"
                />
            </Box>
        </Typography>
    );
};

export default SignIn;