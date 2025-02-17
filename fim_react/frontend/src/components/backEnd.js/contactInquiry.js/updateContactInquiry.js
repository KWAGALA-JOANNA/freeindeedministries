import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactInquiryUpdate = () => {
  const [message_id, setmessage_id] = useState('');
  const [message, setmessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    setmessage(null);
  }, [message_id]);

  const fetchmessage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/messages/update/${message_id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setmessage(response.data);
    } catch (error) {
      console.error('Error fetching message:', error.response ? error.response.data : error.message);
      setError('Error fetching message. Please check the ID and try again.');
      setmessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setmessage_id(e.target.value);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setmessage({ ...message, [name]: value });
  };

  const handleUpdateClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/messages/update/${message_id}`, message, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      setmessage(response.data);
      alert('Contact message updated successfully!');
    } catch (error) {
      console.error('Error updating message:', error.response ? error.response.data : error.message);
      setError('Error updating message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section id="message-details">
        <h2>Contact message Details</h2>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="message_id">Enter message ID:</label>
            <input
              type="text"
              id="message_id"
              value={message_id}
              onChange={handleInputChange}
              placeholder="Enter message ID"
            />
            <button onClick={fetchmessage} disabled={loading}>
              {loading ? 'Fetching...' : 'Fetch message'}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {message && (
            <form onSubmit={handleUpdateClick} className="form-group">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={message.name || ''}
                  onChange={handleFieldChange}
                  placeholder="Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={message.email || ''}
                  onChange={handleFieldChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject:</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={message.subject || ''}
                  onChange={handleFieldChange}
                  placeholder="Subject"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message.message || ''}
                  onChange={handleFieldChange}
                  placeholder="Message"
                  rows={5}
                ></textarea>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactInquiryUpdate;
