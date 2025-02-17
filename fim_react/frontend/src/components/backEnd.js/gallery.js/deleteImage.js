
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteImageById = () => {
  const [imageId, setImageId] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const handleInputChange = (e) => {
    setImageId(e.target.value);
  };

  const handleDeleteClick = async () => {
    if (!imageId) {
      setError('Please enter an image ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await axios.delete(`http://127.0.0.1:5000/api/v1/gallery/image/${imageId}`);
      setSuccess('Image deleted successfully!');
      // Optionally, you can update the local state or re-fetch the images
      fetchUploadedImages();
    } catch (error) {
      console.error('Error deleting image:', error.response ? error.response.data : error.message);
      setError('Error deleting image. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadedImages = () => {
    try {
      const uploadedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
      console.log('Fetched Uploaded Images:', uploadedImages);
      setUploadedImages(uploadedImages);
    } catch (error) {
      console.error('Error fetching uploaded images:', error);
    }
  };

  const handleDeleteFromLocalStorage = (index) => {
    const currentImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const updatedImages = currentImages.filter((_, idx) => idx !== index);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    setUploadedImages(updatedImages);
  };

  return (
    <div className="image-container">
      <section id="delete-image">
        <h2>Delete Image by ID</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Image ID"
            value={imageId}
            onChange={handleInputChange}
          />
          <button onClick={handleDeleteClick} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Image'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </section>

      <section id="delete-local-image">
        <h2>Delete Uploaded Images</h2>
        <div className="gallery-grid">
          {uploadedImages.map((item, index) => (
            <div className="gallery-item" key={`uploaded_${index}`}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button onClick={() => handleDeleteFromLocalStorage(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DeleteImageById;
