import React, { useState } from 'react';
import axios from 'axios';

const EventDelete = () => {
  const [eventId, setEventId] = useState('');
  const [eventDetails, setEventDetails] = useState(null); // For fetching and displaying event details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    setEventId(e.target.value);
    setEventDetails(null); // Reset details when the ID changes
  };

  const fetchEventDetails = async () => {
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`);
      setEventDetails(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching event details:', error.response ? error.response.data : error.message);
      setError('Event not found. Please check the ID.');
      setEventDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!eventId) {
      setError('Please enter an event ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/v1/event/event/${eventId}`);
      console.log('Deleted event:', response.data);
      setSuccess('Event deleted successfully!');
      setEventDetails(null); // Clear details after deletion
    } catch (error) {
      console.error('Error deleting event:', error.response ? error.response.data : error.message);
      setError('Error deleting event. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-delete-container">
      <section id="delete-event">
        <h2>Delete Event by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Event ID"
            value={eventId}
            onChange={handleInputChange}
          />
          <button onClick={fetchEventDetails} disabled={loading}>
            {loading ? 'Fetching...' : 'Fetch Event Details'}
          </button>
        </div>

        {eventDetails && (
          <div className="event-details">
            <h3>Event Details</h3>
            <p><strong>Name:</strong> {eventDetails.name}</p>
            <p><strong>Date:</strong> {eventDetails.date}</p>
            <p><strong>Description:</strong> {eventDetails.description}</p>
            <p>
              <strong>Image:</strong>{' '}
              {eventDetails.image_url && (
                <img src={eventDetails.image_url} alt={eventDetails.name} width="150" />
              )}
            </p>
            <p>
              <strong>RSVP Link:</strong>{' '}
              <a href={eventDetails.rsvp_link} target="_blank" rel="noopener noreferrer">
                {eventDetails.rsvp_link}
              </a>
            </p>
          </div>
        )}

        <button
          onClick={handleDeleteClick}
          disabled={loading || !eventDetails}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: eventDetails ? 'red' : 'gray',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            cursor: eventDetails ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? 'Deleting...' : 'Delete Event'}
        </button>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default EventDelete;
