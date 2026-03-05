import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Section.css';

const Contact = ({ profile }) => {
  return (
    <section id="contact" className="section">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <p className="contact-text">
            I'm always open to new opportunities and collaborations.
            Feel free to reach out!
          </p>
          <div className="contact-info">
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="contact-item">
                <FaEnvelope /> {profile.email}
              </a>
            )}
            {profile?.location && (
              <p className="contact-item">
                <FaMapMarkerAlt /> {profile.location}
              </p>
            )}
          </div>
          <div className="contact-social">
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
