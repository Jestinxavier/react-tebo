import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import {Box, Button} from '@mui/material'

function AuthaticationGoogle() {
    const [googleLoginUrl, setGoogleLoginUrl] = useState(null);

    useEffect(() => {
        axios.get('/google-login/redirect', { headers: { accept: 'application/json' } })
            .then((response) => {
                const { data } = response;
                setGoogleLoginUrl(data.url);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Box>
            {googleLoginUrl && (
                <a className="App-link" href={googleLoginUrl}>
                    Sign in with Google
                </a>
            )}
        </Box>
    );
}

export default AuthaticationGoogle;
