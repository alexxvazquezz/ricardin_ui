import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import SnackbarContext from '../context/SnackbarContext';

function RegisterForm({ onLoginClick, onCloseClick }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword:'',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { showSnackbar } = useContext(SnackbarContext);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.password) newErrors.password = 'Password is required';
        if (!form.confirmPassword) newErrors.confirmPassword = true
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
        if (!form.firstName) newErrors.firstName = 'First Name is required';
        if (!form.lastName) newErrors.lastName = 'Last Name is required';
        if (!form.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const payload = {
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
            phone_number: form.phoneNumber
        };

        try {
            const response = await axios.post('http://localhost:5000/api/register', payload);
            if (response.data.message) {
                showSnackbar(response.data.message);
                onLoginClick();
            }
            setForm({
                email: '',
                password: '',
                confirmPassword:'',
                firstName: '',
                lastName: '',
                phoneNumber: ''
            });
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrors({ apiError: error.response.data.error });
            } else {
                setErrors({ apiError: 'Registration failed' });
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>
                {errors.apiError && (
                    <Typography variant="body1" color="error" gutterBottom>
                        {errors.apiError}
                    </Typography>
                )}
                {errors.confirmPassword && (
                    <Typography variant='body1' color='error' gutterBottom>
                        {errors.confirmPassword}
                    </Typography>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField 
                        label="First Name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        variant='outlined'
                        error={!!errors.firstName}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                        variant='outlined'
                        error={!!errors.lastName}
                    />
                    <TextField 
                        label="Phone Number"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                        variant='outlined'
                        error={!!errors.phoneNumber}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        variant='outlined'
                        error={!!errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                        variant='outlined'
                        error={!!errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} edge='end'>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField 
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                        required
                        variant='outlined'
                        error={!!errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton aria-label='toggle password visibility' onClick={handleClickShowConfirmPassword} edge='end'>
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', mt: 2 }}>
                        <Button type='submit' variant='contained' color='primary' fullWidth>
                            Register
                        </Button>
                        <Button type='button' fullWidth variant='contained' color='secondary' onClick={onLoginClick} sx={{ mt: 1 }}>
                            Login
                        </Button>
                        <Button type='button' variant='contained' color='primary' fullWidth onClick={onCloseClick} sx={{ mt: 1 }}>
                            Close
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default RegisterForm;
