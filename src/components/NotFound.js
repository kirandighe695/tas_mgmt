import { Typography } from '@mui/material';
import React from 'react';

const NotFound = () => {
    return (
        <Typography>
            <Typography
                sx={{ position: 'absolute', top: '200px', left: '450px', fontSize: '48px', fontWeight: '700' }}>
                Page Not Found
            </Typography>
        </Typography>
    );
}
export default NotFound;
