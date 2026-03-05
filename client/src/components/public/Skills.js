import React from 'react';
import './Section.css';

const Skills = ({ skills }) => {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section id="skills" className="section">
      <div className="section-container">
        <h2 className="section-title">Skills</h2>
        {skills.length === 0 ? (
          <p className="empty-message">No skills added yet.</p>
        ) : (
          categories.map(cat => (
            <div key={cat} className="skill-category">
              <h3 className="category-title">{cat}</h3>
              <div className="skills-grid">
                {skills.filter(s => s.category === cat).map(skill => (
                  <div key={skill._id} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.proficiency}%</span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-fill" style={{ width: `${skill.proficiency}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Skills;
