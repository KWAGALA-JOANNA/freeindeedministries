
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GalleryList from './gallery'; 



import './program.css';

const ProgramList = () => {
  const [programs, setPrograms] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/program/programs');
        setPrograms(response.data.programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms([]); 
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div>
      <header>
        <h1>FREE INDEED MINISTRIES ANNUAL PROGRAM</h1>
      </header>

      <section id="program-list">
        <div className="program-list-container">
          <div className="program-grid">
            {programs === null ? (
              <p>Loading programs...</p>
            ) : programs.length === 0 ? (
              <p>No programs available.</p>
            ) : (
              programs.map((program) => (
                <div className="program-item" key={program.id}>
                  <div className="program-details">
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
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <GalleryList /> 
      
   
      
      
    </div>
  );
};

export default ProgramList;
