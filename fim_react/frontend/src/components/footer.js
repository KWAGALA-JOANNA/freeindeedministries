import React, { useState } from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";

const SimpleFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input field after submission
  };

  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        {/* Brand Section */}
        <div style={brandStyle}>
          <h1 style={brandTitleStyle}>FREE INDEED MINISTRIES</h1>
          <p style={brandDescriptionStyle}>River of Life.</p>
          <p>For more information, follow us on our social media platforms:</p>
          <div style={socialMediaIconsStyle}>
            <a
              href="https://www.facebook.com/FIMinistries"
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/@FreeindeedMinistries-ug"
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/fiministries"
              style={iconLinkStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={quickLinksStyle}>
          <h3 style={linksTitleStyle}>Quick Links</h3>
          <ul style={linksListStyle}>
            <li>
              <a href="/home" style={linkStyle}>
                Home
              </a>
            </li>
            <li>
              <a href="/about_us" style={linkStyle}>
                About
              </a>
            </li>
            <li>
              <a href="/products" style={linkStyle}>
                Products
              </a>
            </li>
            <li>
              <a href="/contact_inquiry" style={linkStyle}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/events" style={linkStyle}>
                Events
              </a>
            </li>
            <li>
              <a href="/donations" style={linkStyle}>
                Donations
              </a>
            </li>
            <li>
              <a href="/gallery" style={linkStyle}>
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div style={contactUsStyle}>
          <h3 style={contactUsTitleStyle}>Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:freeindeedministriesrivers@gmail.com"
              style={contactLinkStyle}
            >
              freeindeedministriesrivers@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+256752881000" style={contactLinkStyle}>
              +256 752 881000
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div style={newsletterStyle}>
          <h3 style={newsletterTitleStyle}>Stay Updated</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={footerBottomStyle}>
        <marquee>
          © {new Date().getFullYear()} Free Indeed Ministries. All rights
          reserved.
        </marquee>
      </div>
    </footer>
  );
};

// Inline styles
const footerStyle = {
  backgroundColor: "#282c34",
  color: "white",
  padding: "20px",
  textAlign: "center",
  paddingBottom: "30px",
};

const footerContentStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  maxWidth: "900px",
  margin: "0 auto",
  gap: "60px",
};

const brandStyle = { flex: 1, textAlign: "left" };
const brandTitleStyle = { margin: "11px", fontSize: "24px", color:"white" };
const brandDescriptionStyle = { margin: "5px 0" };

const socialMediaIconsStyle = {
  display: "flex",
  gap: "15px",
  marginTop: "10px",
};
const iconLinkStyle = {
  color: "#f38f20",
  fontSize: "20px",
  textDecoration: "none",
};

const quickLinksStyle = { flex: 1, textAlign: "left" };
const linksTitleStyle = { fontSize: "18px", marginBottom: "10px" };

const linksListStyle = { listStyle: "none", padding: 0 };
const linkStyle = {
  color: "white",
  textDecoration: "none",
  display: "block",
  margin: "5px 0",
};

const contactUsStyle = { flex: 1, textAlign: "left" };
const contactUsTitleStyle = { fontSize: "18px", marginBottom: "10px" };
const contactLinkStyle = { color: "#f38f20", textDecoration: "none" };

const newsletterStyle = { flex: 1, textAlign: "left" };
const newsletterTitleStyle = { margin: "10px" };
const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginRight: "10px",
};
const buttonStyle = {
  padding: "10px 15px",
  marginTop: "3px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "orange",
  color: "#282c34",
  cursor: "pointer",
};

const footerBottomStyle = { marginTop: "20px" };

export default SimpleFooter;
