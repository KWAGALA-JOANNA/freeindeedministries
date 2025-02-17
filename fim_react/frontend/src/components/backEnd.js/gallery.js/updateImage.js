
import React, { useState } from 'react';
import axios from 'axios';

const UpdateImageById = () => {
  const [token] = useState(sessionStorage.getItem('token'));
  const [imageId, setImageId] = useState('');
  const [image, setImage] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    setImageId(e.target.value);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setImage({ ...image, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageId) {
      setError('Please enter an image ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/v1/gallery/image/${imageId}`, image, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log('Image updated:', response.data);
      setSuccess('Image updated successfully!');
    } catch (error) {
      console.error('Error updating image:', error.response ? error.response.data : error.message);
      setError('Error updating image. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-container">
      <section id="update-image">
        <h2>Update Image by ID</h2>
        <input
          type="text"
          placeholder="Enter Image ID"
          value={imageId}
          onChange={handleInputChange}
        />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={image.title}
              onChange={handleFieldChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={image.description}
              onChange={handleFieldChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image_url">Image URL:</label>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={image.image_url}
              onChange={handleFieldChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Image'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>
    </div>
  );
};

export default UpdateImageById;

