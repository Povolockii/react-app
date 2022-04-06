import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

export const Loading = () => {
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <h3>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="35vh">
                    <CircularProgress />
                </Box>
            </h3>
        </div>
    );
};
