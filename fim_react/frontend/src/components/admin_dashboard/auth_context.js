
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    const fetchUserFromToken = async (token) => {
       
        return {
            username: 'Admin',
            is_admin: true,
            access_token: token
        };
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserFromToken(token).then(user => {
                if (user) {
                    setUser(user);
                    setIsAuthenticated(true);
                }
                setLoading(false); 
            }).catch(() => {
                setLoading(false); 
            });
        } else {
            setLoading(false); 
        }
    }, []);

    const login = async (user, isAdmin) => {
        setLoading(true);
        try {
            setUser({ ...user, is_admin: isAdmin });
            localStorage.setItem('token', user.access_token);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: Please check your details and try again.');
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext };




