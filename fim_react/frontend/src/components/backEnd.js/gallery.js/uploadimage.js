
import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageUrl || !title || !description) {
      setUploadStatus('Please fill in all fields and provide an image URL.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/gallery/upload', {
        image_url: imageUrl,
        title,
        description,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from API:', response.data);
      setUploadStatus('Image uploaded successfully!');
      setImageUrl('');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus(`Error uploading image: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        image: reader.result,
        title: title,
        description: description,
      };

      const currentImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
      currentImages.push(newImage);
      localStorage.setItem('uploadedImages', JSON.stringify(currentImages));
      setUploadStatus('Image uploaded successfully to local storage!');
      setTitle('');
      setDescription('');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-container">
      <header>
        <h1>Upload New Image</h1>
      </header>
      <section className="upload-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={handleUrlChange}
          />
          <label htmlFor="fileUpload">Or Upload Image File:</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
          <br/>
          <button type="submit" style={{ width: '100px', padding: '10px 20px', backgroundColor: 'blue', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Upload</button>
        </form>
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </section>
    </div>
  );
};

export default UploadImage;
