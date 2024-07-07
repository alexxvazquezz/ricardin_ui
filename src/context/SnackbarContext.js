import React, { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const showSnackbar = (message) => {
        setSnackbar({ open: true, message });
    };

    const closeSnackbar = () => {
        setSnackbar({ open: false, message: '' });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                message={snackbar.message}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            />
        </SnackbarContext.Provider>
    );
};

export default SnackbarContext;