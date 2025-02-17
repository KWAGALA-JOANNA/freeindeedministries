import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth_context';

const ProtectedRoute = ({ isAdminRoute }) => {
    const { user } = useAuth();
    const isAdmin = user && user.is_admin;

    if (!user) {
        
        return <Navigate to="/login" replace />;
    }

    if (isAdminRoute && !isAdmin) {
        
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
