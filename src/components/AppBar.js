import React from 'react';
import { AppBar as MUIAppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            const authToken = localStorage.getItem('accessToken');

            await axios.post('/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
        } catch (error) {
            console.error('Error during logout:', error);
        }

        localStorage.removeItem('accessToken');
        navigate('/');
    };

    return (
        <MUIAppBar position='static'>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <Box>
                    <IconButton
                        size='large'
                        aria-label='account of current user'
                        aria-controls='menu-appbar'
                        aria-haspopup='true'
                        onClick={handleMenu}
                        color='inherit'
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id='menu-appbar'
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </MUIAppBar>
    )
}

export default AppBar;