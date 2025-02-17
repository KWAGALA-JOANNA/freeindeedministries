import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './admin_dashboard/auth_context';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Sending login request to the backend
            const response = await axios.post('http://localhost:5000/api/v1/user/login', { email, password });

            // Destructuring response data
            const { is_admin, user, access_token } = response.data;

            // Check for specific admin email and password
            if (email === 'freeindeedministriesrivers@gmail.com' && password === 'FIMadmin@5464.org') {
                // Force the is_admin flag to true if the admin logs in with specific credentials
                sessionStorage.setItem('token', access_token);
                login(user, true); // Admin login
                setLoading(false);
                navigate('/admin'); // Redirect to admin dashboard
            } else if (is_admin) {
                // If not specific admin credentials but admin role
                sessionStorage.setItem('token', access_token);
                login(user, is_admin);
                setLoading(false);
                navigate('/admin'); // Redirect to admin dashboard
            } else {
                // Regular user
                sessionStorage.setItem('token', access_token);
                login(user, is_admin);
                setLoading(false);
                navigate('/our_services'); // Redirect to user services page
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    setError('Missing email or password.');
                } else if (status === 404) {
                    setError('User not found.');
                } else if (status === 401) {
                    setError('Invalid password.');
                } else {
                    setError('Login failed. Please try again.');
                }
            } else {
                setError('Unable to connect to the server. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && <p className="error-message">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
