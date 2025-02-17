
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date_of_birth: '',
    contact_number: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const token = sessionStorage.getItem('token');

  const fetchUserById = async () => {
    if (!userId) {
      
      return;
    }
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/user/update_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        date_of_birth: response.data.date_of_birth,
        contact_number: response.data.contact_number,
        address: response.data.address,
      });
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

  const handleUserDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/user/user/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User updated:', response.data);
      setSuccessMessage('User updated successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      setError('Error updating user. Please check the details and try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserById();
    }
  }, [token]);

  return (
    <div className="update-user-container">
      <section id="update-user">
        <h2>Update User</h2>
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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleUserDataChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleUserDataChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date_of_birth">Date of Birth:</label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleUserDataChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact_number">Contact Number:</label>
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleUserDataChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleUserDataChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update User'}
            </button>
          </form>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </section>
    </div>
  );
};

export default UpdateUser;
