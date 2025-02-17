
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './gallery.css';

const GalleryList = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    fetchGalleryItems();
    fetchUploadedImages();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/v1/gallery/images');
      console.log('Response from API:', response.data);
      setGalleryItems(response.data.images);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
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

  console.log('Gallery Items:', galleryItems);

  return (
    <div>
      
      
      <div className="gallery-list-container">
       
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div className="gallery-item" key={item.id}>
              <img src={item.image_url} alt={item.title} />
              <div className="gallery-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
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
      <br/>
      
    </div>
  );
};

export default GalleryList;

