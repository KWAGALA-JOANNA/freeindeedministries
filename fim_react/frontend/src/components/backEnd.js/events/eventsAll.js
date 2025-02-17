import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../getall.css';

const EventAll = () => {
  const [events, setEvents] = useState(null);
  const [token] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/event/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        sessionStorage.setItem('token', token);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div>
      <section id="event-list">
        <h2>Our Events</h2>
        <div className="event-list-container">
          {events === null ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events available.</p>
          ) : (
            <table className="events-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th>RSVP Link</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="event-item">
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.date}</td>
                    <td>
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      ) : (
                        'No Image Available'
                      )}
                    </td>
                    <td>
                      {event.rsvp_link ? (
                        <a
                          href={event.rsvp_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rsvp-link"
                        >
                          RSVP Here
                        </a>
                      ) : (
                        'No RSVP Link'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventAll;
