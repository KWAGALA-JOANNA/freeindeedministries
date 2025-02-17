
import React, { useState } from 'react';
import axios from 'axios';

const ProgramDelete = () => {
  const [programId, setProgramId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    setProgramId(e.target.value);
  };

  const handleDeleteClick = async () => {
    if (!programId) {
      setError('Please enter a program ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/program/program/${programId}`);
      console.log('Deleted program:', response.data);
      setSuccess('Program deleted successfully!');
    } catch (error) {
      console.error('Error deleting program:', error.response ? error.response.data : error.message);
      setError('Error deleting program. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="program-delete-container">
      <section id="delete-program">
        <h2>Delete Program by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Program ID"
            value={programId}
            onChange={handleInputChange}
          />
          <button onClick={handleDeleteClick} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Program'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default ProgramDelete;
