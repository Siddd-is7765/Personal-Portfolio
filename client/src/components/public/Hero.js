import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ profile }) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">{profile?.name || 'Your Name'}</h1>
        <h2 className="hero-title">{profile?.title || 'Full Stack Developer'}</h2>
        <p className="hero-bio">{profile?.bio || 'Passionate developer building amazing things.'}</p>
        <div className="hero-social">
          {profile?.socialLinks?.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          )}
          {profile?.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          )}
          {profile?.socialLinks?.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          )}
        </div>
        {profile?.resumeUrl && (
          <a href={profile.resumeUrl} className="hero-cta" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
