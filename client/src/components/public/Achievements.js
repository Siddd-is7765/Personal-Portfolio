import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Section.css';

const Achievements = ({ achievements }) => {
  return (
    <section id="achievements" className="section">
      <div className="section-container">
        <h2 className="section-title">Achievements</h2>
        {achievements.length === 0 ? (
          <p className="empty-message">No achievements added yet.</p>
        ) : (
          <div className="achievements-grid">
            {achievements.map(ach => (
              <div key={ach._id} className="achievement-card">
                <h3>{ach.title}</h3>
                {ach.date && <p className="achievement-date">{ach.date}</p>}
                {ach.description && <p>{ach.description}</p>}
                {ach.url && (
                  <a href={ach.url} target="_blank" rel="noopener noreferrer" className="achievement-link">
                    <FaExternalLinkAlt /> View
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
