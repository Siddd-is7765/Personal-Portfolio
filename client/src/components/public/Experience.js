import React from 'react';
import './Section.css';

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <h2 className="section-title">Experience</h2>
        {experiences.length === 0 ? (
          <p className="empty-message">No experience added yet.</p>
        ) : (
          <div className="timeline">
            {experiences.map(exp => (
              <div key={exp._id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <p className="timeline-date">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.description && <p className="timeline-desc">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
