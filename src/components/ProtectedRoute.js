import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../axiosConfig';


const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authToken = localStorage.getItem('accessToken');

                if (!authToken) {
                    setAuthenticated(false);
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/me', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': "application/json"
                    }
                });

       
                if (response.status === 200) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }

                setLoading(false);

            } catch (error) {
                console.error('Authentication error:', error);
                setAuthenticated(false);
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return authenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;

