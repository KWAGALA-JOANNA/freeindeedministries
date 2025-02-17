import React from 'react';
import './header.css';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation here

const Header = () => {
  const location = useLocation(); // Use the useLocation hook inside the component

  return (
    <header className="header">
      <div className="logo-section">
        <img src={logo} alt="FIM Logo" className="logo-img" />
        <h1 className="logo-text">Free Indeed Ministries</h1>
      </div>
      <div className="separator"></div> {/* The separator */}
      
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/about_us" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>
          </li>
          <li>
            <Link to="/stories" className={location.pathname === '/stories' ? 'active' : ''}>Stories</Link>
          </li>
          

          <li>
            <Link to="/contact_inquiry" className={location.pathname === '/contact_inquiry' ? 'active' : ''}>Contact</Link>
          </li>
          {/* <li>
            <Link to="/donations" className={location.pathname === '/donate' ? 'donate-active' : ''}>Donate</Link>
          </li> */}

<li>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
          </li>
<li>
  <Link
    to="/donations"
    className="donate-link"
    style={{
      backgroundColor: '#fc9206',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      textDecoration: 'none',
    }}
  >
    Donate
  </Link>
</li>


         
        </ul>
      </nav>
    </header>
  );
};

export default Header;