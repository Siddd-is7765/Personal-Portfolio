import React from 'react';
import './Section.css';

const Education = ({ education }) => {
  return (
    <section id="education" className="section">
      <div className="section-container">
        <h2 className="section-title">Education</h2>
        {education.length === 0 ? (
          <p className="empty-message">No education added yet.</p>
        ) : (
          <div className="timeline">
            {education.map(edu => (
              <div key={edu._id} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <h4>{edu.institution}</h4>
                  <p className="timeline-date">{edu.startDate} — {edu.current ? 'Present' : edu.endDate}</p>
                  {edu.description && <p className="timeline-desc">{edu.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
