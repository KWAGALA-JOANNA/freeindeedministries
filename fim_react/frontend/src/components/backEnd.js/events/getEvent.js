import React, { useState } from 'react';
import axios from 'axios';

const GetEventById = () => {
  const [eventId, setEventId] = useState('');
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const handleInputChange = (e) => {
    setEventId(e.target.value);
  };

  const fetchEventById = async () => {
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setEventData(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEventData(response.data);
    } catch (error) {
      console.error('Error fetching event:', error.response ? error.response.data : error.message);
      setError('Error fetching event. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-details-container">
      <section id="event-details">
        <h2>Find Event by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={handleInputChange}
          />
          <button onClick={fetchEventById} disabled={loading}>
            {loading ? 'Fetching...' : 'Get Event'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {eventData && (
          <div className="event-details">
            <h3>{eventData.name}</h3>
            <p>{eventData.description}</p>
            <p><strong>Date:</strong> {eventData.date}</p>
            <p><strong>Time:</strong> {eventData.time}</p>
            <p><strong>Location:</strong> {eventData.location}</p>
            <p><strong>Registration Required:</strong> {eventData.registration_required ? 'Yes' : 'No'}</p>
            <p><strong>Max Participants:</strong> {eventData.max_participants}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default GetEventById;
