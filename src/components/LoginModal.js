import React, { useState } from 'react';
import { Modal, Paper, Button } from '@mui/material';
import { useTransition, animated } from 'react-spring';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { SnackbarProvider } from '../context/SnackbarContext';

const LoginModal = ({ children }) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    // React Spring transitions
    const transitions = useTransition(loginOpen || registerOpen, {
        from: { opacity: 0, transform: 'scale(0.5)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0.5)' },
        config: { tension: 300, friction: 20 }
    });
    
    const handleLoginOpen = () => {
        setRegisterOpen(false);
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

    const handleRegisterOpen = () => {
        setLoginOpen(false);
        setRegisterOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterOpen(false);
    };

    return (
        <SnackbarProvider>
            {children(handleLoginOpen)}
            {transitions((styles, item) =>
                item && (
                    <animated.div style={styles}>
                        <Modal
                            open={loginOpen || registerOpen }
                            onClose={loginOpen ? handleLoginClose : handleRegisterClose}
                            aria-labelledby="modal-title"
                            aria-describedby="modal-description"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Paper sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, minWidth: 300 }}>
                                {loginOpen && (
                                    <LoginForm
                                        onRegisterClick={handleRegisterOpen}
                                        onCloseClick={handleLoginClose}
                                    />
                                )}
                                {registerOpen && (
                                    <RegisterForm
                                        onLoginClick={handleLoginOpen}
                                        onCloseClick={handleRegisterClose}
                                    />
                                )}
                            </Paper>
                        </Modal>
                    </animated.div>
                )
            )}
        </SnackbarProvider>
    );
};

export default LoginModal;
