import React from 'react';
import AppBar from '../components/AppBar';

function Dashboard() {
    return (
        <div>
            <AppBar />
            <h1>Welcome to the Dashboard!</h1>
            <p>This is a simple dashboard for authenticated users.</p>
        </div>
    );
}

export default Dashboard;