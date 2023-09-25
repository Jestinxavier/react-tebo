import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import {Box, Button} from '@mui/material'

function AuthaticationGoogle() {
    const [googleLoginUrl, setGoogleLoginUrl] = useState(null);
    const [callbackUrl, setCallbackUrl] = useState(null)

    useEffect(() => {
        axios.get('/google-login/redirect', { headers: { accept: 'application/json' } })
            .then((response) => {
                const { data } = response;
                setCallbackUrl(data.url);
                console.log('======data.url==============================');
                console.log(data.url);
                console.log('====================================');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(callbackUrl, { headers: { accept: 'application/json' } })
            .then((response) => {
                const { data } = response;
               
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [callbackUrl])
    


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
