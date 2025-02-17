import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../getall.css';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/user/get_all_users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      setError('Error fetching users. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    } else {
      setError('Authentication token is missing.');
    }
  }, [fetchUsers, token]);

  return (
    <div className="users-container">
      <section id="user-list">
        <h2>Registered Users</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && users.length === 0 && <p>No users found.</p>}
        {!loading && !error && users.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Contact Number</th>
                <th>is_admin</th>
                <th>Church</th>
                <th>Created At</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.date_of_birth}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.is_admin.toString()}</td>
                  <td>{user.church}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>{user.updated_at ? new Date(user.updated_at).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default GetAllUsers;
