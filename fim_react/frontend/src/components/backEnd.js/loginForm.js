import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './auth_context';
import ProgramUpdate from '../ProgramUpdate';

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Route path="/admin/program-update" element={<ProgramUpdate />} />
      
    </div>
  );
};

export default AdminDashboard;
