import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    image_url: '', 
    image: null, 
    rsvp_link: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image_url', formData.image_url); 
      if (formData.image) {
        formDataToSend.append('image', formData.image); 
      }
      formDataToSend.append('rsvp_link', formData.rsvp_link);

      const response = await axios.post(
        'http://127.0.0.1:5000/api/v1/event/create',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Event created successfully:', response.data);
      setSuccess(true);
      setError(null);
      alert('Event created successfully!');
    } catch (error) {
      console.error('Event creation failed:', error.response ? error.response.data : error.message);
      setError('Event creation failed: Please check your details and try again.');
      setSuccess(false);
    }
  };

  return (
    <div className="event-container">
      <section id="create-event">
        <h2>Create New Event</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label>
              Event Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Image URL:
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="Enter image link"
              />
            </label>
          </div>
          <div>
            <label>
              Upload Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              RSVP Link:
              <input
                type="url"
                name="rsvp_link"
                value={formData.rsvp_link}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100px',
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Event created successfully!</p>}
      </section>
    </div>
  );
};

export default CreateEvent;


