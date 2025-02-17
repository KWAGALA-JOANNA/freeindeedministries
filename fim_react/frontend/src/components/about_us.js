/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./about_us.css";
import VisionIcon from "../assets/kate.JPG";
import VisionImage from '../assets/E1.JPG';
import GoalImage from '../assets/evangelism.JPG';

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Introduction and Mission Statement */}
      <section className="introduction-section">
        <h2 className="title">Who we are</h2>
        <div className="content-container">
          <img
            src= {VisionIcon}
            alt="Image representing evangelism"
            className="intro-image"
          />
          <p class="empowering-message">
          We are the River of life (Revelation 22:1-2). We bring life to the nations through preaching the 
          gospel our Lord Jesus Christ as commanded. (Matthew 28:19-20)
          </p>
        </div>
      </section>

      {/* Vision Section */}
       <section className="vision-section">
        <div className="vision-container">
          <img
            src={
              VisionImage
            }
            alt="Vision Icon"
            className="icon-image"
          />
          <div className="vision-text">
            <h2 className="title">Our Vision</h2>
            <p>
            To evangelize and transform the whole world through love, outreaches and service to alleviate the 
            suffering of those in need and build a community with a Jesus-like character.
            </p>
          </div>
        </div>
      </section> 

      {/* Goals Section */}
      <section className="goals-section">
  <div className="goals-wrapper">
    <div className="image-container">
      <img
        src={GoalImage}
        alt="Empowered women in tech"
        className="goals-image"
      />
    </div>
    <div className="goals-content">
      <h2 className="title">Our Objectives</h2>
      <ul className="objectives-list">
        <li>
          To change lives by providing high-impact, cost-effective, and
          faith-based capacity-building programs to people worldwide,
          particularly youth, widows, orphans, and children of school-going age.
        </li>
        <li>
          Free Indeed Ministries is devoted to reviving, empowering, and
          equipping the local church and the people of God to produce lasting
          transformation. (1 Peter 4:9-10, Haggai 1:3-10).
        </li>
        <li>
        To build schools and hospitals which strengthen the institutional capacity to effectively carry out community programs and respond timely and effectively to community challenges and needs (Haggai 1:3-10).
        </li>
        <li>
        To undertake lobbying, advocacy, and networking with partner organizations on identified pertinent issues</li>
      <li>To facilitate the formation of vibrant small community groups through the Gideon, Dorcas, and Joshua projects, where members exchange views and information to effectively identify, plan, implement and evaluate their development concerns and initiatives (Proverbs 19:17).

</li>
      </ul>
    </div>
  </div>
</section>


      {/* Core Values Section */}
      <section className="core-values-section">
        <h2 className="title">Values We Stand By</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>UPRIGHT LIVING</h3>
            <p>
            We believe in living holistically and righteously as Jesus Christ did, so that we receive the grace to live for God and not to lose eternity. (Dan. 1:8; Acts 24:16; 1Tim. 4:1-2;)
            </p>
          </div>
          <div className="value-card">
            <h3>COVENANT LIVING</h3>
            <p>
            We believe in living according to God’s covenant (the word of God):  Not bowing to any other God, tithing, evangelism, helping the needy and others. (Joshua 1:8, Ephesians 2:8-10; Exodus 20:4-6, Exodus 23:24)
            </p>
          </div>
          <div className="value-card">
            <h3>SERVICE LIVING</h3>
            <p>We believe in living a life of service to God, serving God is serving others. (Matthew 25:40, Exodus 23:25)</p>
          </div>
          <div className="value-card">
            <h3>PEOPLE-CENTERED</h3>
            <p>
            Free Indeed Ministries, we create relationships with different churches and project groups in building the kingdom of God. Just as many hands are better than one, our programs and other interventions put people first, and value their concerns and contributions to promote their dignity and 'livelihoods.
            </p>
          </div>
          <div className="value-card">
            <h3>TRANSPARENCY</h3>
            <p>
            We build people’s confidence and trust by promoting accountability and integrity, an open and transparent manner in the conduct of our public affairs.
            </p>
          </div>
          <div className="value-card">
            <h3>TEAMWORK</h3>
            <p>We promote groups and individuals working together as a team: encourage the spirit of collective responsibility, sharing knowledge and resources for the common good.</p>
        </div>
        </div>
      </section>
      {/* Programs and Services */}
      <section className="programs-section">
        <div className="container">
          <h2 className="programs-title">OUR PROGRAMS</h2>
          <ul className="programs-list">
            <li className="programs-item">
              <span className="highlight">Monthly Outreaches</span>. This happens every last saturday of the month.
            </li>
            <li className="programs-item">
              <span className="highlight">Prayer Camp</span>. A powerful moment of prayer held once a year in the last week of June at Christian Covenant Ministries Namilyango.
            </li>
            <li className="programs-item">
              <span className="highlight">Holyspirit Conference</span>{" "}
              This conference happens once a year in the first second week of December, we encounter the holyspirit and usher ourselves in the new year.
            </li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="cta-section">
        <h2 className="title">Join Us</h2>
        <p>
          Become a participant, mentor, or sponsor. Subscribe to our newsletter
          for updates. Attend an event or contribute to our programs.
        </p>
      </section> */}

      <section className="team-section">
        <div className="team-background">
          <div className="team-overlay">
            <h2 className="team-title">Meet our team</h2>
            <p className="team-description">
            We promote groups and individuals working together as a team: encourage the spirit of collective responsibility, sharing knowledge and resources for the common good.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
