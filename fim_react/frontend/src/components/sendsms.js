import React, { useState } from "react";
import axios from "axios";
import './sendsms.css';

const SendMessages = () => {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [emailAddresses, setEmailAddresses] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [senderEmail, setSenderEmail] = useState(""); // New state for sender email
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [messageType, setMessageType] = useState("sms"); // Default to SMS

  const handleSendMessages = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    // Clean up phone numbers and email addresses
    const numbersArray = phoneNumbers.split(",").map((number) => number.trim());
    const emailsArray = emailAddresses.split(",").map((email) => email.trim());

    // Check if input fields are valid
    if ((!numbersArray.length && !emailsArray.length) || !message) {
      setError("Please enter valid phone numbers or email addresses and a message.");
      return;
    }

    try {
      if (messageType === "sms") {
        // Send SMS API call
        const res = await axios.post("http://localhost:5000/send-sms", {
          phone_numbers: numbersArray,
          message,
        });
        if (res.data.status === "SMS sent") {
          setResponse("SMS sent successfully to all numbers!");
        } else {
          setError("Failed to send SMS. Please try again.");
        }
      } else {
        // Send Email API call with sender email
        const res = await axios.post("http://localhost:5000/send-email", {
          sender_email: senderEmail,  // Pass sender email
          email_addresses: emailsArray,
          subject,
          message,
        });
        if (res.data.status === "Emails sent successfully!") {
          setResponse("Emails sent successfully!");
        } else {
          setError("Failed to send emails. Please try again.");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send messages");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Send Messages and Emails</h2>
      <form onSubmit={handleSendMessages} className="form">
        {/* Sender Email field */}
        {messageType === "email" && (
          <input
            type="email"
            placeholder="Enter sender email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="input"
            required // Optional: make this field required if needed
          />
        )}

        {/* Phone numbers field */}
        <textarea
          placeholder="Enter phone numbers (comma-separated)"
          value={phoneNumbers}
          onChange={(e) => setPhoneNumbers(e.target.value)}
          className="textarea"
          disabled={messageType === "email"} // Disable for email
        />
        
        {/* Email addresses field */}
        <textarea
          placeholder="Enter email addresses (comma-separated)"
          value={emailAddresses}
          onChange={(e) => setEmailAddresses(e.target.value)}
          className="textarea"
          disabled={messageType === "sms"} // Disable for SMS
        />
        
        {/* Subject field (only for email) */}
        {messageType === "email" && (
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="input"
          />
        )}
        
        {/* Message field */}
        <textarea
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea"
        />
        
        {/* Message type selection */}
        <div>
          <label>
            <input
              type="radio"
              value="sms"
              checked={messageType === "sms"}
              onChange={() => setMessageType("sms")}
            />
            Send SMS
          </label>
          <label>
            <input
              type="radio"
              value="email"
              checked={messageType === "email"}
              onChange={() => setMessageType("email")}
            />
            Send Email
          </label>
        </div>
        
        {/* Submit button */}
        <div
          role="button"
          className="click"
          onClick={handleSendMessages}
          tabIndex={0}
                        >
      Send {messageType === "sms" ? "SMS" : "Email"}
</div>

      </form>
{/* 
      Display response or error */}
      {response && <p className="success">{response}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SendMessages;
