import React from "react";
import nations from '../assets/nations.jpg';
import training from '../assets/training.JPG';



const AchievementsAndStories = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      color: "#333",
    },
   

    hero: {
        background: "linear-gradient(135deg, #2F0147, #3BA8B6)",
        textAlign: "center",
        color: "#fff",
        padding: "60px 20px",
        borderRadius: "8px",
      },
      
    heroTitle: {
      fontSize: "2.8rem",
      marginBottom: "15px",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    },
    heroText: {
      fontSize: "1.3rem",
      lineHeight: "1.6",
    },
    section: {
      margin: "50px 0",
    },
    sectionTitle: {
      fontSize: "2.2rem",
      marginBottom: "25px",
      textAlign: "center",
      color: "#E8871E",
      fontWeight: "bold",
    },
    grid: {
      display: "grid",
      gap: "25px",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    },
    card: {
      background: "#f1f1f1",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "25px",
      textAlign: "center",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    cardTitle: {
      fontSize: "1.6rem",
      color: "#333",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "1.1rem",
      lineHeight: "1.5",
    },
    img: {
      width: "100%",
      height: "auto",
      borderRadius: "10px 10px 0 0",
    },
    link: {
      color: "orange",
      textDecoration: "none",
      fontWeight: "bold",
    },
    linkHover: {
      textDecoration: "underline",
    },
    cta: {
      textAlign: "center",
      background: "black",
      color: "white",
      padding: "50px 20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    ctaButton: {
      background: "orange",
      color: "white",
      padding: "12px 25px",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Free Indeed Ministries</h1>
        <p style={styles.heroText}>
          Celebrating the achievements of Free Indeed Ministries.
        </p>
      </section>

      {/* Achievements Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Milestones of Excellence</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>60+ Member churchess</h3>
            <p style={styles.cardText}>
            Free Indeed Ministries unites over 60 member churches , fostering collaboration in spreading the gospel, serving communities, and nurturing spiritual growth with impactful outreach and discipleship.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>120+ Church leaders</h3>
            <p style={styles.cardText}>
            Free Indeed Ministries empowers 120+ church leaders, fostering unity, equipping them for impactful ministry, and strengthening the collective mission to spread the gospel and transform lives.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>10,000+ souls received Christ</h3>
            <p style={styles.cardText}>
           over 10,000 souls have received Christ through Free Indeed Ministries, reflecting unwavering dedication to spreading the gospel and transforming lives for the Kingdom of God.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Inspiring Journeys</h2>
        <div style={styles.grid}>
          <div style={styles.card}>
            {/* <img src="https://via.placeholder.com/400x300" alt="Java Meetup" style={styles.img} /> */}
            <img src={nations} alt="nations" style={styles.img} />


            <h3 style={styles.cardTitle}>From all over the world</h3>
            <p style={styles.cardText}>
              "An inspiring journey unfolds as people from diverse nations join us, united by faith and a shared purpose, celebrating the transformative power of Christ across cultures and borders.
            </p>
            <a href="/stories/ada" style={styles.link}>
              Read More
            </a>
          </div>
          <div style={styles.card}>
            {/* <img src="https://via.placeholder.com/400x300" alt="Women Meetup" style={styles.img} /> */}
            <img src={training} alt="training" style={styles.img} />


            <h3 style={styles.cardTitle}>Mentorship Sessions</h3>
            <p style={styles.cardText}>
            Our mentorship sessions are an inspiring journey of growth and transformation, empowering individuals with wisdom, guidance, and faith-based principles to lead purposeful lives and impact their communities positively.
            </p>
            <a href="/stories/Isaac" style={styles.link}>
              Read More
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={styles.cta}>
        <h2 style={styles.sectionTitle}>Be a Part of the Change</h2>
        <p>
          Your support can amplify the impact of the gospel worldwide, creating opportunities for all to receive Christ.
        </p>
        <button style={styles.ctaButton} onClick={() => alert("Thank you for your support!")}>
          Get Involved
        </button>
      </section>
    </div>
  );
};

export default AchievementsAndStories;
