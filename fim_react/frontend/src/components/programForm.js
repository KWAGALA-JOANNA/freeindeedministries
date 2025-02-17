
import React, { useState } from 'react';
import axios from 'axios';

const ProgramForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    capacity: '',
    duration: '',
    fees: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/program/register', {
        name: formData.name,
        description: formData.description,
        schedule: formData.schedule,
        capacity: parseInt(formData.capacity),
        duration: formData.duration,
        fees: parseFloat(formData.fees)
      });
      console.log('Program created successfully:', response.data);
      setSuccess(true);
      setError(null);
      alert('Program created successfully!');
    } catch (error) {
      console.error('Program creation failed:', error.response ? error.response.data : error.message);
      setError('Program creation failed: Please check your details and try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="program-container">
      <section id="program-form">
        <h2>Program Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="schedule">Schedule:</label>
            <input
              type="text"
              id="schedule"
              name="schedule"
              value={formData.schedule}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="fees">Fees:</label>
            <input
              type="text"
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={{ width: '100px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Program created successfully!</p>}
      </section>
    </div>
  );
};

export default ProgramForm;
