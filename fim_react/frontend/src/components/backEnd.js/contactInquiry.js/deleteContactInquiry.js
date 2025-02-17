
import React, { useState } from 'react';
import axios from 'axios';

const DeleteContactInquiry = () => {
    const [message_id, setmessage_id] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const token = sessionStorage.getItem('token');

    const handleInputChange = (e) => {
        setmessage_id(e.target.value);
    };

    const handleDeleteClick = async () => {
        if (!message_id) {
            setError('Please enter an inquiry ID.');
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await axios.delete(`http://127.0.0.1:5000/api/v1/messages/delete/${message_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Inquiry deleted successfully!');
           
        } catch (error) {
            console.error('Error deleting inquiry:', error.response ? error.response.data : error.message);
            setError('Error deleting inquiry. Please check the ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="contact-inquiry-container">
            <section id="delete-inquiry">
                <h2>Delete Contact Inquiry</h2>
                {token ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Inquiry ID"
                            value={message_id}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleDeleteClick} disabled={loading}>
                            {loading ? 'Deleting...' : 'Delete Inquiry'}
                        </button>
                       
                    </div>
                ) : null}
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </section>
        </div>
    );
};

export default DeleteContactInquiry;
