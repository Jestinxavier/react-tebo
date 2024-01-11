import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useLocation,useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../auth/useAuthContext";

const LoginGoogle = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    const location = useLocation();
    const {googleLogin} = useAuthContext();
const {navigate} =useNavigate()
    // "owner": {
    //     "id": 4,
    //     "name": "VISHNU",
    //     "email": "01tvipin@gmail.com",
    //     "phone": "7012172145",
    //     "date_of_birth": "2000-05-20",
    //     "email_verified_at": null,
    //     "secret_key": "U3twX88HTVEweuOCdgGAGlqL5dy8jndHE4OBC40Qj8ieRqrjaJLf8Kgii0qd9lMlsn67W5fA91S1srQa",
    //     "api_token": "IVslVVn5W43tqbZV5NMuepZtO6VkySSDNp6wTrnSpc53hGOj8oI2aCarcki5pfnuiSNPXo2WbG5PZZoE",
    //     "image_path": null,
    //     "login_provider_name": null,
    //     "login_provider_id": null,
    //     "created_at": "2023-08-11T14:04:25.000000Z",
    //     "updated_at": "2023-08-11T14:04:56.000000Z",
    //     "deleted_at": null
    //     }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/google/callback${location.search}`, {
                    headers: { Accept: 'application/json' },
                });
    
                if (response.status === 200) {
                    setData(response.data);
                    googleLogin(response.data);
                    navigate('/home');
                } else {
                    throw new Error('Something went wrong!');
                }
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
                // Move navigate('/home') outside the finally block
            }
        };
    
        fetchData();
    
        // Move navigate('/home') here if you want to navigate after fetchData is called
        // navigate('/home');
        setTimeout(() => {
        window.location.href = '/';
        }, 2000);
    
    }, [location.search, googleLogin, navigate]);
    
    if (loading) {
        return <div>Loading....</div>;
    }

    // if (error) {
    //     return (
    //         <div>
    //             <div>
    //                 <p>Error:</p>
    //                 <code className="Code-block">{error.toString()}</code>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div>
            <div>
                <details>
                    <summary>Welcome {data.user.name}</summary>
                    <p>Here is your info: </p>
                    <code className="Code-block">{JSON.stringify(data, null, 2)}</code>
                </details>
            </div>
        </div>
    );
};

export default LoginGoogle;
