
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../getall.css'


const GetAllDonors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/donation/donations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDonors(response.data.donations);
    } catch (error) {
      console.error('Error fetching donors:', error.response ? error.response.data : error.message);
      setError('Error fetching donors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDonors();
    } else {
      window.location.href = '/admin';
    }
  }, [token]);

 

  return (
    <div className="donor-list-container">
      <section id="donor-list">
        <h2>Our Donors</h2>
        {loading && <p>Loading donors...</p>}
        {error && <p className="error-message">{error}</p>}
        {donors.length === 0 ? (
          <p>No donors available.</p>
        ) : (
          <table className="donors-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Donation Amount</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id} className="donor-item">
                  <td>{donor.donor_name}</td>
                  <td>{donor.donor_email}</td>
                  <td>${donor.donation_amount}</td>
                  <td>{donor.message || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
       
      </section>
    </div>
  );
};

export default GetAllDonors;
