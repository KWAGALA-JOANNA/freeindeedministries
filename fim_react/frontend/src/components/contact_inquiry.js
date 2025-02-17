// import React, { useState } from "react";
// import axios from "axios";
// import "./contact_inquiry.css";
// import contact from "../assets/rivers of life.jpg";
// import MapSection from './map'

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       console.log("Submitting inquiry:", formData); // Debugging output
//       const response = await axios.post(
//         "http://localhost:5000/api/v1/contact-inquiry/create",
//         formData
//       );

//       console.log("Inquiry submitted:", response.data);
//       alert("Inquiry submitted successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });
//     } catch (error) {
//       console.error("Inquiry failed:", error.response ? error.response.data : error.message);
//       alert("Inquiry failed: Please check your details and try again.");
//     }
//   };

//   return (
//     <div className="contact-us-container">
//       {/* Header Section */}
//       <div className="header-section">
//         <h1>Contact Us</h1>
//         <p>Any questions or remarks? Just write us a message!</p>
//       </div>

//       <div className="content-section">
//         {/* Left Column: Office Details and Image */}
//         <div className="office-details">
//           <img
//             src={contact}
//             alt="FIM"
//             className="office-image"
//           />
//           <div className="locations">
//             <div>
//               <h4>
//                 <i className="fas fa-map-marker-alt"></i>
//               </h4>
//               <p>Plot 56, Ambassador House, 60 Kampala Road</p>
//             </div>
//             <div>
//               <h4>
//                 <i className="fas fa-phone-alt"></i>
//               </h4>
//               <p>+256752881000</p>
//             </div>
//             <div>
//               <h4>
//                 <i className="fas fa-envelope"></i>
//               </h4>
//               <p>freeindeedministriesrivers@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Form */}
//         <div className="contact-form">
//           <h2>Get in Touch</h2>
//           <p>
//             Have an inquiry or some feedback for us? Fill out the form below to
//             contact our team.
//           </p>
//           <form onSubmit={handleFormSubmit}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter a valid email address"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="subject"
//               placeholder="Enter your subject"
//               value={formData.subject}
//               onChange={handleChange}
//               required
//             />
//             <textarea
//               name="message"
//               placeholder="Enter your message?"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit">SUBMIT</button>
//           </form>
//         </div>
//       </div>
//  {/* WhatsApp Community Section */}
//  <div className="whatsapp-community">
//         <h2>Join Our WhatsApp Community</h2>
//         <p>
//           Stay connected and be a part of our community for updates, discussions, and more.
//         </p>
//         <a
//           href="https://chat.whatsapp.com/1VBdrEbNJYg38DsIW5844f"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="whatsapp-link"
//           style={{
//             display: "inline-block",
//             padding: "10px 20px",
//             backgroundColor: "#25D366",
//             color: "#fff",
//             borderRadius: "5px",
//             textDecoration: "none",
//             fontSize: "1rem",
//           }}
//         >
//           Join WhatsApp Community
//         </a>
//       </div>

// <div>
//       <MapSection />
//     </div>
//     </div>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com"; // Import emailjs
import "./contact_inquiry.css";
import contact from "../assets/rivers of life.jpg";
import MapSection from './map'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Sending form data to the backend using axios
    try {
      console.log("Submitting inquiry:", formData); // Debugging output
      const response = await axios.post(
        "http://localhost:5000/api/v1/contact-inquiry/create",
        formData
      );
      console.log("Inquiry submitted:", response.data);
      alert("Inquiry submitted successfully!");
      
      // Resetting the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Inquiry failed:", error.response ? error.response.data : error.message);
      alert("Inquiry failed: Please check your details and try again.");
    }

    // Sending email via EmailJS
    const serviceID = "service_1vrzung";
    const templateID = "template_qhs4owq";
    const publicKey = "3GyEgaST0xvflRmLw"; // Public key from EmailJS

    // Use emailjs.sendForm to send the form data
    emailjs.sendForm(serviceID, templateID, event.target, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        alert("Your message has been sent!");
      })
      .catch((error) => {
        console.error("Email sending failed:", error.text);
        alert("Failed to send your message. Please try again.");
      });
  };

  return (
    <div className="contact-us-container">
      {/* Header Section */}
      <div className="header-section">
        <h1>Contact Us</h1>
        <p>Any questions or remarks? Just write us a message!</p>
      </div>

      <div className="content-section">
        {/* Left Column: Office Details and Image */}
        <div className="office-details">
          <img
            src={contact}
            alt="FIM"
            className="office-image"
          />
          <div className="locations">
            <div>
              <h4>
                <i className="fas fa-map-marker-alt"></i>
              </h4>
              <p>Plot 56, Ambassador House, 60 Kampala Road</p>
            </div>
            <div>
              <h4>
                <i className="fas fa-phone-alt"></i>
              </h4>
              <p>+256752881000</p>
            </div>
            <div>
              <h4>
                <i className="fas fa-envelope"></i>
              </h4>
              <p>freeindeedministriesrivers@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <p>
            Have an inquiry or some feedback for us? Fill out the form below to
            contact our team.
          </p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter a valid email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Enter your subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>

      {/* WhatsApp Community Section */}
      <div className="whatsapp-community">
        <h2>Join Our WhatsApp Community</h2>
        <p>
          Stay connected and be a part of our community for updates, discussions, and more.
        </p>
        <a
          href="https://chat.whatsapp.com/1VBdrEbNJYg38DsIW5844f"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#25D366",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Join WhatsApp Community
        </a>
      </div>

      <div>
        <MapSection />
      </div>
    </div>
  );
};

export default ContactUs;
