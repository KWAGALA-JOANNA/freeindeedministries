
import React, { useState } from 'react';
import axios from 'axios';

const ProgramGet = () => {
  const [programId, setProgramId] = useState('');
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const handleInputChange = (e) => {
    setProgramId(e.target.value);
  };

  const fetchProgramById = async () => {
    if (!programId) {
      setError('Please enter a program ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setProgram(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/program/program/${programId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Program data:', response.data);
      setProgram(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching program:', error.response ? error.response.data : error.message);
      setError('Error fetching program. Please check the ID and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="program-details-container">
      <section id="program-details">
        <h2>Find Program by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Program ID"
            value={programId}
            onChange={handleInputChange}
          />
          <button onClick={fetchProgramById} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Program'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {program && (
          <div className="program-item">
            <h3>{program.name}</h3>
            <p>{program.description}</p>
            <p>
              <strong>Schedule:</strong> {program.schedule}
            </p>
            <p>
              <strong>Capacity:</strong> {program.capacity}
            </p>
            <p>
              <strong>Duration:</strong> {program.duration}
            </p>
            <p>
              <strong>Fees:</strong> {program.fees}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProgramGet;

