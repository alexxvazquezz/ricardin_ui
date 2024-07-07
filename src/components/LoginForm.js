import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from '../axiosConfig'
import { useTheme } from '@emotion/react';

function LoginForm({ onRegisterClick, onCloseClick }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
        setError(null);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email is required'
        if (!form.password) newErrors.password = 'Password is required'
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            email: form.email,
            password: form.password
        };

        try {
            const response = await axios.post('/login', payload);
            const { access_token, message } = response.data;
            if (access_token) {
                setError(null);
                setSuccess(true);
                localStorage.setItem('accessToken', access_token);
                navigate('/dashboard');
            } else {
                console.error('Login failed:', message);
            }
            
        } catch (error) {
            setError(error.response.data.error || 'Login failed.')
            setSuccess(false)
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Typography variant='body1' color='error' gutterBottom>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography variant='body1' color='primary' gutterBottom>
                        Login Successful!
                    </Typography>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField 
                        label='Email'
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        required
                        error={!!errors.email}
                    />
                    <TextField 
                        label='Password'
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        required
                        error={!!errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} edge='end'>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'stretch', mt: 2 }}>
                        <Button type='submit' variant='contained' color='primary' fullWidth>
                            Login
                        </Button>
                        <Button variant='contained' color='secondary' onClick={onRegisterClick} fullWidth sx={{ mt: 1}}>
                            Register
                        </Button>
                        <Button variant='contained' color='primary' onClick={onCloseClick} fullWidth sx={{ mt: 1}}>
                            Close
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default LoginForm;
