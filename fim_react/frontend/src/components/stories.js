import React from "react";
import "./stories.css";
import AchievementsAndStories from "./achievements";

// Import images from assets
import outreachImage from "../assets/natete.jpg";
import prayerImage from "../assets/surrender.jpg";
import HCImage from "../assets/Holyspirit.jpg";


const StoriesPage = () => {
  // Static array of stories with imported images
  const stories = [
    {
      id: 1,
      title: "Community Outreach: Last Saturday of Every Month",
      description:
        "Every last Saturday of the month, Free Indeed Ministries holds an outreach in different churches and areas. We evangelize, pray with, and support the needy, sharing the gospel and providing food, essentials, and prayers. Thousands of people receive Christ as their personal Lord and Savior during these outreaches. The outreach concludes with a communal meal, bringing together thousands for fellowship and care. Each month, we visit a new church to extend our reach and impact.",
      image: outreachImage,
      videoUrl: null,
    },
    {
      id: 2,
      title: "Transformational Annual Prayer Camps",
      description:
        "Every year, Free Indeed Ministries hosts the Rebuilding the Walls Prayer Camp, where believers from across Uganda and East Africa come together for a week of fasting, prayer, and devotion. The event is not only a spiritual renewal but also an opportunity to reach local communities through evangelism. Our 2024 Prayer Camp in Namilyango Seeta was attended by over 2,700 people, with participants experiencing profound spiritual growth and testimonies of healing and restoration.",
      image: prayerImage, 
      videoUrl: null,
    },
    {
      id: 3,
      title: "End of year Holyspirit Conference",
      description:
        "This is an international conference where leaders from various countries are hosted in Uganda Mbarara District in the western part of the country. During this conference, training in leadership, evangelism and administration is conducted as a way of preparing ourselves for the new year. This conference in the presence of the Holy spirit involves deep prayer and worship sessions from 8 am to late in the night. It is characterized by massive testimonies for the congregants.",
      image: HCImage, 
      videoUrl: null,
    },
  ];

  return (
    <div className="stories-page">
      <div className="stories-heading">
        <h2>Our Stories</h2>
      </div>

      {/* Stories Section */}
      <div className="stories-section">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story-item"
            style={{
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            {/* Left Column: Story Text and Background */}
            <div className="story-text">
              <div className="story-background">
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                {/* Conditional rendering for button */}
                {story.videoUrl && (
                  <a
                    href={story.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Story Image or Video */}
            <div className="story-video">
              {story.videoUrl ? (
                // Display YouTube video if URL is provided
                <iframe
                  width="100%"
                  height="315"
                  src={story.videoUrl}
                  title={story.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                // Display static image if no video URL
                <img
                  src={story.image}
                  alt={story.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Achievements Section */}
      <div className="achievements-section">
        <AchievementsAndStories />
      </div>
    </div>
  );

};

export default StoriesPage;










