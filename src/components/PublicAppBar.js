import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';

const PublicAppBar = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Button component={Link} to="/" color="inherit" sx={{ textDecoration: 'none', textTransform: 'none' }}>
                            Home
                        </Button>
                        <Button component={Link} to="/about" color="inherit" sx={{ ml: 2, textDecoration: 'none', textTransform: 'none' }}>
                            About
                        </Button>
                        <Button component={Link} to="/blog" color="inherit" sx={{ ml: 2, textDecoration: 'none', textTransform: 'none' }}>
                            Blog
                        </Button>
                    </Typography>
                    <LoginModal>
                        {(handleLoginOpen) => (
                            <Button color='inherit' onClick={handleLoginOpen}>
                                Login
                            </Button>
                        )}
                    </LoginModal>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default PublicAppBar;
