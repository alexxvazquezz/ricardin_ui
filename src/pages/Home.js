import React,{ useState } from 'react';
import { Box } from '@mui/material';
import PublicAppBar from '../components/PublicAppBar';

function Home() {
    return (
        <Box>
            <PublicAppBar />
            <h1>Home</h1>
        </Box>
   
    );
}

export default Home;