
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetALLImages = () => {
  const [backendImages, setBackendImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [token] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    fetchBackendImages();
    fetchUploadedImages();
  }, [token]);

  const fetchBackendImages = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/gallery/images', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response from Backend API:', response.data);
      setBackendImages(response.data.images);
    } catch (error) {
      console.error('Error fetching backend images:', error);
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

  
  return (
    <div>
      
      
      <div className="gallery-list-container">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {backendImages.map((item, index) => (
            <div className="gallery-item" key={`backend_${index}`}>
              <img src={item.image_url} alt={item.title} />
              <div className="gallery-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-list-container">
        <div className="gallery-grid">
          {uploadedImages.map((item, index) => (
            <div className="gallery-item" key={`uploaded_${index}`}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default GetALLImages;
