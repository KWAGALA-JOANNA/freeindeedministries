
import React, { useState } from 'react';
import axios from 'axios';


const ContactInquiryGet = () => {
    const [mesaage_id, setmesaage_id] = useState('');
    const [inquiry, setInquiry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    

    

    const fetchInquiry = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/v1/messages/getbyid${mesaage_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInquiry(response.data);
        } catch (error) {
            console.error('Error fetching inquiry:', error.response ? error.response.data : error.message);
            setError('Error fetching inquiry. Please check the ID and try again.');
            setInquiry(null);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setmesaage_id(e.target.value);
    };

    const handleFetchClick = () => {
        if (mesaage_id) {
            fetchInquiry();
        } else {
            setError('Please enter an inquiry ID.');
        }
    };

    

    return (
        <div>
            <section id="inquiry-details">
                <h2>Inquiry Details</h2>
                {token ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Inquiry ID"
                            value={mesaage_id}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleFetchClick} disabled={loading}>
                            {loading ? 'Fetching...' : 'Fetch Inquiry'}
                        </button>
                        
                    </div>
                ) : null }
                {error && <p className="error-message">{error}</p>}
                {inquiry ? (
                    <div className="inquiry-details-container">
                        <div className="inquiry-item">
                            <h3>{inquiry.subject}</h3>
                            <p>{inquiry.message}</p>
                            <p>
                                <strong>Name:</strong> {inquiry.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {inquiry.email}
                            </p>
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    );
};

export default ContactInquiryGet;


