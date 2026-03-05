import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Section.css';

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <h2 className="section-title">Projects</h2>
        {projects.length === 0 ? (
          <p className="empty-message">No projects added yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project._id} className="project-card">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="project-image" />
                )}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><FaGithub /> Code</a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt /> Live</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
