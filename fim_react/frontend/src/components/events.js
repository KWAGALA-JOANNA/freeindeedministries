import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import './events.css';
import banner from '../assets/HC.jpg';
import banner1 from '../assets/prayercamp.jpg'; 

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <section id="events" className="events">
      <div className="event-form">
        {/* Tabs for Events */}
        <div className="event-tabs">
          <button
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events
          </button>
        </div>

        {/* Event Details */}
        <div className="event-details">
          {activeTab === 'upcoming' && (
            <div className="event-list upcoming-events">
              {/* First Event */}
              <div className="event-card">
                <img
                  src={banner} 
                  alt="Holyspirit Conference 2024"
                  className="event-banner"
                />
                <h4>Holyspirit Conference 2025</h4>
                <p><strong>Date:</strong> 7th-13th December, 2025</p>
                <p><strong>Description:</strong> Come encounter and experience the mighty move of the Holyspirit.</p>
                <Link to="/rsvp" className="rsvp-btn">
                  RSVP
                </Link>
              </div>

              {/* Second Event */}
              <div className="event-card">
                <img
                  src={banner1} 
                  alt="Prayer Camp 2024"
                  className="event-banner"
                />
                <h4>Prayer Camp Meeting 2025</h4>
                <p><strong>Date:</strong> 22nd-28th June, 2025</p>
                <p><strong>Description:</strong> Seek the Lord while He might be found. Join us as we rebuild the walls.</p>
                <Link to="/rsvp" className="rsvp-btn">
                  RSVP
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsPage;
