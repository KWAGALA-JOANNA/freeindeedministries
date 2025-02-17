import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateDonorById = () => {
  const [donorId, setDonorId] = useState('');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    setFormData(null);
  }, [donorId]);

  const fetchDonorById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching donor:', error.response ? error.response.data : error.message);
      setError('Error fetching donor. Please check the ID and try again.');
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setDonorId(e.target.value);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/donation/donation/${donorId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
      alert('Donor updated successfully!');
    } catch (error) {
      console.error('Error updating donor:', error.response ? error.response.data : error.message);
      setError('Error updating donor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section id="donor-details">
        <h2>Update Donor by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Donor ID"
            value={donorId}
            onChange={handleInputChange}
          />
          <button onClick={fetchDonorById} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Donor'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {formData && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="donorName">Donor Name:</label>
              <input
                type="text"
                id="donorName"
                name="donor_name"
                value={formData.donor_name || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="donorEmail">Donor Email:</label>
              <input
                type="email"
                id="donorEmail"
                name="donor_email"
                value={formData.donor_email || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="donationAmount">Donation Amount:</label>
              <input
                type="number"
                id="donationAmount"
                name="donation_amount"
                value={formData.donation_amount || ''}
                onChange={handleFieldChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message || ''}
                onChange={handleFieldChange}
              ></textarea>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Donor'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default UpdateDonorById;
