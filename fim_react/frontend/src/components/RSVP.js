import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

const Contact = () => {
  const form = useRef();
  const [messageStatus, setMessageStatus] = useState(""); // For displaying feedback to the user

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_1vrzung",  // Replace with your EmailJS Service ID
        "template_qhs4owq", // Replace with your EmailJS Template ID
        form.current,
        "3GyEgaST0xvflRmLw" // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageStatus("Message sent successfully!");

          // Automatically hide the message after 5 seconds
          setTimeout(() => {
            setMessageStatus("");
          }, 5000); // 5 seconds
        },
        (error) => {
          console.log(error.text);
          setMessageStatus("Failed to send message. Please try again.");

          // Automatically hide the message after 5 seconds
          setTimeout(() => {
            setMessageStatus("");
          }, 5000); // 5 seconds
        }
      );

    // Optionally reset form fields
    e.target.reset();
  };

  return (
    <RSVPContainer>
      {/* Display message feedback at the top */}
      {messageStatus && <MessageStatus success={messageStatus.includes("successfully")}>{messageStatus}</MessageStatus>}

      <RSVPForm onSubmit={sendEmail} ref={form}>
        <h2>RSVP Form</h2>
        <FormGroup>
          <label>Name</label>
          <Input type="text" name="name" required />
        </FormGroup>
        <FormGroup>
          <label>Email</label>
          <Input type="email" name="email" required />
        </FormGroup>
        <FormGroup>
          <label>Phone number</label>
          <Input type="text" name="phone-number" required />
        </FormGroup>

        <FormGroup>
          <label>Message</label>
          <Textarea name="message" required placeholder= "Enter a message to confirm your presence"/>
        </FormGroup>
        <SubmitButton type="submit" className="submit-btn">
          Submit
        </SubmitButton>
      </RSVPForm>
    </RSVPContainer>
  );
};

export default Contact;

// Styled Components
const RSVPContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #3b5998, #8b9dc3);
  padding: 20px;
  box-sizing: border-box;
`;

const RSVPForm = styled.form`
  background: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 2rem;
    text-align: center;
    color: #222e50;
    margin-bottom: 20px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border: 1px solid #3b5998;
    box-shadow: 0 0 5px rgba(59, 89, 152, 0.5);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  resize: none;
  height: 100px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border: 1px solid #3b5998;
    box-shadow: 0 0 5px rgba(59, 89, 152, 0.5);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: #3b5998;
  color: #fff;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #314d86;
    transform: translateY(-2px);
  }
`;

const MessageStatus = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  color: ${props => (props.success ? 'green' : 'red')};
`;

// Responsive Design
const GlobalStyles = createGlobalStyle`
  @media (max-width: 600px) {
    form {
      padding: 20px;
    }

    #rsvp-form h2 {
      font-size: 1.8rem;
    }

    label {
      font-size: 0.9rem;
    }

    input, textarea {
      font-size: 0.9rem;
    }

    .submit-btn {
      font-size: 1rem;
    }
  }
`;
