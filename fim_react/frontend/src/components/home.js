import React, { useState, useEffect } from "react";
// import SimpleFooter from "./SimpleFooter";
import { Link } from 'react-router-dom';


import "./home.css";
import backgroundImage from "../assets/background11.jpg";
import image2 from "../assets/nations.jpg";
import image3 from "../assets/surrender.jpg";
import image4 from "../assets/children.jpg";
import image5 from "../assets/evangelism.JPG";
import brendaImage from "../assets/PrMukisa.jpg";
import angellahImage from "../assets/PrHenry.JPG"; // New image for Miss. Angellah
import womanImage from "../assets/BpPeace.jpg";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image2, image3, image4, image5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="homecontainer">
        {/* Background Section */}
        <div
          className="background-section"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="background-text">
            <h1>Welcome to Free Indeed Ministries</h1>
            <p>
              River of Life
            </p>

            <div className="home-button-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
  {/* Link buttons for Login and Sign Up */}
  <Link 
    to="/login" 
    className="navigate-login-button"
    style={{
      display: 'inline-block',
      padding: '12px 25px',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '30px', // Make buttons rounded
      backgroundColor: 'orange',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = 'darkorange'}
    onMouseOut={(e) => e.target.style.backgroundColor = 'orange'}
  >
    Login 
  </Link>
  <Link 
    to="/signup" 
    className="navigate-signup-button"
    style={{
      display: 'inline-block',
      padding: '12px 25px',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      borderRadius: '30px', // Make buttons rounded
      backgroundColor: 'orange',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s, color 0.3s'
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = 'darkorange'}
    onMouseOut={(e) => e.target.style.backgroundColor = 'orange'}
  >
    Sign Up 
  </Link>
</div>

          </div>
        </div>

        {/* Heading Section */}
        <div className="heading-section">
          <h2>What is Free Indeed Ministries all about?</h2>
          <div>
  <p>
    Free Indeed Ministries is an Evangelical Christian, Bible-believing, non-denominational, 
    politically non-partisan, charitable, and non-profitable ministry and missionary 
    organization operating in Uganda. It is registered with The Government of Uganda and the 
    ministry exists primarily as a voice to support and nurture the effective growth and 
    development of the Pentecostal movement through networking, capacity building, and 
    enabling strategic partnerships.
  </p>
  <br />
  <p>
    The Ministry has over 120 church leaders, 62 member churches, and these are all actively 
    inspired by the Holy Spirit to LOVE, REACH OUT, AND SERVE. The Ministry was founded on 
    3rd April 2015 and officially registered by The Government of Uganda on 15th May 2018, 
    spearheaded by Pastor Arthur Mukisa, who came up with the objective to spread the gospel, 
    fight poverty, and help the most vulnerable groups of orphans, children, youth, and 
    disadvantaged women, in promoting their rights and in so doing achieving a better future.
  </p>
  <br />
  <p>
    The ministry embraces the core values of Christianity and presents them in an honest, 
    intelligent, brave, and fun way through UP-RIGHT LIVING, COVENANT LIVING, and SERVICE.
  </p>
</div>




        </div>

        {/* Image Slider */}
        <div className="slider-container">
          <div
            className="slider"
            style={{ backgroundImage: `url(${images[currentSlide]})` }}
          ></div>
        </div>

        {/* Cards Section */}
        <div className="cards-section">
          <h2>Free Indeed Projects</h2>
          <div className="cards-container">
            <div className="card">
              <h3>Gideon Project</h3>
              <div>
              <p>
  Free Indeed is dedicated to transforming lives in Uganda by influencing attitudes and behavior through spirituality. The ministry assists orphans, needy children, and those from single-parent homes by providing basic needs, education, and helping abandoned children find foster homes. They also work to reduce stigma against vulnerable groups, including homeless children and those with disabilities or chronic illnesses, offering healing and restoration through counseling, guidance, and prayer.
</p>

</div>

              
            </div>
            <div className="card">
              <h3>Joshua Project</h3>
              <div>
              <p>
  Free Indeed Ministries focuses on empowering vulnerable youth by creating a supportive and positive environment. The program teaches young men and women to serve God, become entrepreneurs, and develop sustainable skills for job creation. Through peer counseling and awareness programs, the ministry aims to prevent harmful behaviors and negative influences. Additionally, youth engage in community service, such as helping widows and children with food and support.
</p>

</div>
            </div>
            <div className="card">
              <h3>Dorcus Project</h3>
              <div>
              <p>
  Free Indeed Ministries works to provide better opportunities for vulnerable women, especially widows, single mothers, the elderly, and disabled, through sustainable income-generating projects like poultry farming, retail shops, and market stores. The ministry also encourages women to join home cell fellowships to grow spiritually and empowers them with various survival and livelihood skills.
</p>

</div>

            </div>
          </div>

          {/* Combined Brenda & Angellah Card */}
          <div className="brenda-card">
            <div className="brenda-content">
              <img src={brendaImage} alt="Miss Brenda" className="brenda-image" />
              <div className="brenda-text">
                <h2>Pr Arthur Mukisa</h2>
                <div>
                <p>
  Pastor Arthur Mukisa, founder of Free Indeed Ministries, is dedicated to spreading
   the gospel, fighting poverty, and supporting vulnerable communities. His leadership has established over 120 churches, empowering orphans, women, and disadvantaged groups through spiritual, educational, and economic support, continuing the mission of faith and community development.
</p>

</div>

              </div>
            </div>

            <div className="angellah-content">
              <div className="card-text">
              <img
                src={angellahImage}
                alt="Miss Angellah"
                className="brenda-image"
              />
                <h2>Pr. Henry Mukisa</h2>
                <div>
                <p>
  Pastor Henry Mukisa, Chairperson of Free Indeed Ministries, leads with wisdom and passion, overseeing initiatives that align with the ministry’s mission. He is dedicated to community transformation, empowering individuals through faith, education, and sustainable livelihoods. His leadership strengthens Free Indeed's impact, particularly in the Central Region of Uganda.
</p>

</div>

              </div>
              
            </div>

            <div className="angellah-content">
              <div className="card-text">
              <img
                src={womanImage}
                alt="Miss Angellah"
                className="brenda-image"
              />
                <h2>Bishop Peace Sibulo</h2>
                <div>
                <p>
  Bishop Peace Sibulo, Overseer of Free Indeed Ministries in Uganda’s Central Region, leads with compassion and vision. She empowers women, youth, and marginalized groups through mentorship, entrepreneurship, and education. Her leadership fosters unity among churches and strengthens the Pentecostal movement, inspiring spiritual and personal transformation.
</p>

</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default Dashboard;






