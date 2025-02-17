
import React, { useState } from 'react';
import axios from 'axios';

const GetUserById = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const fetchUserById = async () => {
    if (!userId) {
      setError('Please enter a user ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/user/get_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user:', error.response ? error.response.data : error.message);
      setError('Error fetching user. Please check the ID and try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  return (
    <div className="user-details-container">
      <section id="user-details">
        <h2>Find User by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={handleInputChange}
          />
          <button onClick={fetchUserById} disabled={loading}>
            {loading ? 'Fetching...' : 'Get User'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <div className="user-details">
            <h3>{userData.name}</h3>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Date of Birth: {userData.date_of_birth}</p>
            <p>Contact Number: {userData.contact_number}</p>
            <p>Address: {userData.address}</p>
            <p>Sports: {userData.sports}</p>
            <p>Role: {userData.role}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GetUserById;
