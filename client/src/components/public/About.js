import React from 'react';
import './Section.css';

const About = ({ profile }) => {
  return (
    <section id="about" className="section">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>{profile?.bio || 'No bio available yet.'}</p>
          <div className="about-details">
            {profile?.location && <p><strong>Location:</strong> {profile.location}</p>}
            {profile?.email && <p><strong>Email:</strong> {profile.email}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
