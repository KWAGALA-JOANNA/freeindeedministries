
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../getall.css'

const ContactInquiryGetAll = () => {
    const [inquiries, setInquiries] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = sessionStorage.getItem('token');

    const fetchInquiries = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/v1/messages/getall', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInquiries(response.data.messages);
        } catch (error) {
            console.error('Error fetching contact inquiries:', error.response ? error.response.data : error.message);
            setError('Error fetching contact inquiries. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchInquiries();
        } else {
            
            window.location.href = '/admin'; 
        }
    }, [token]);

    

    return (
        <div>
            <h2>Contact Inquiries</h2>
            {loading && <p>Loading inquiries...</p>}
            {error && <p className="error-message">{error}</p>}
            {inquiries ? (
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((inquiry) => (
                            <tr key={inquiry.id}>
                                <td>{inquiry.subject}</td>
                                <td>{inquiry.message}</td>
                                <td>{inquiry.name}</td>
                                <td>{inquiry.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No messages available.</p>
            )}
          
        </div>
    );
};

export default ContactInquiryGetAll;

