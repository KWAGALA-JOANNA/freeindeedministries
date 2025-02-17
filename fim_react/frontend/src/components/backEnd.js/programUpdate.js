
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgramUpdate = () => {
  const [programId, setProgramId] = useState('');
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    setFormData(null);
  }, [programId]);

  const fetchProgramById = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/program/program/${programId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching program:', error.response ? error.response.data : error.message);
      setError('Error fetching program. Please check the ID and try again.');
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setProgramId(e.target.value);
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
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/program/program/${programId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data);
      alert('Program updated successfully!');
    } catch (error) {
      console.error('Error updating program:', error.response ? error.response.data : error.message);
      setError('Error updating program. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section id="program-details">
        <h2>Update Program by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Program ID"
            value={programId}
            onChange={handleInputChange}
          />
          <button onClick={fetchProgramById} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Program'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {formData && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="programName">Program Name:</label>
              <input
                type="text"
                id="programName"
                name="name"
                value={formData.name || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programDescription">Program Description:</label>
              <textarea
                id="programDescription"
                name="description"
                value={formData.description || ''}
                onChange={handleFieldChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="programSchedule">Program Schedule:</label>
              <input
                type="text"
                id="programSchedule"
                name="schedule"
                value={formData.schedule || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programCapacity">Program Capacity:</label>
              <input
                type="number"
                id="programCapacity"
                name="capacity"
                value={formData.capacity || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programDuration">Program Duration:</label>
              <input
                type="text"
                id="programDuration"
                name="duration"
                value={formData.duration || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programFees">Program Fees:</label>
              <input
                type="number"
                id="programFees"
                name="fees"
                value={formData.fees || ''}
                onChange={handleFieldChange}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Program'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ProgramUpdate;


