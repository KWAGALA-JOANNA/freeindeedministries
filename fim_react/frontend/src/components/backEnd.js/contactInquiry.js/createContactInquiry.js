import React, { useState } from 'react';
import axios from 'axios';
import '../styling.css'

const ContactInquiryCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting inquiry:', formData); 
      const response = await axios.post('http://127.0.0.1:5000/api/v1/messages/', formData);
      console.log('Inquiry submitted:', response.data);
      alert('Inquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Inquiry failed:', error.response ? error.response.data : error.message);
      alert('Inquiry failed: Please check your details and try again.');
    }
  };

  

  return (
    <div className="contact-inquiry-container">
      <div className="sidebar">
    
        <h2>Contact Form</h2>
        <form id="contact-form" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
          <br/>
          {/* <button onClick={handleLogout} style={{ color: 'white',backgroundColor:'green' }}>Logout</button>  */}
        </form>
      </div>
    </div>
  );
};

export default ContactInquiryCreate;
