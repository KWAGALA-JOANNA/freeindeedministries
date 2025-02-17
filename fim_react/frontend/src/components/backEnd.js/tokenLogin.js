
import React, { useState } from 'react';
import axios from 'axios';

const TokenLogin = ({ onTokenReceived }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleTokenRequest = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });
            const token = response.data.access_token;
            onTokenReceived(token);
            setError(''); 
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Token expired. Please log in again.');
            } else {
                console.error('Token request error:', error.response ? error.response.data : error.message);
                setError('Token request failed. Please check your credentials.');
            }
        }
    };

    return (
        <div>
            <h2>Token Login</h2>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleTokenRequest}>Get Token</button>
            {error && <p>{error}</p>} 
        </div>
    );
};

export default TokenLogin;

