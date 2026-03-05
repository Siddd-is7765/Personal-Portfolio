import React, { useState, useEffect } from 'react';
import Navbar from '../components/public/Navbar';
import Hero from '../components/public/Hero';
import About from '../components/public/About';
import Skills from '../components/public/Skills';
import Projects from '../components/public/Projects';
import Experience from '../components/public/Experience';
import Education from '../components/public/Education';
import Achievements from '../components/public/Achievements';
import Contact from '../components/public/Contact';
import Footer from '../components/public/Footer';
import { getProfile, getProjects, getExperiences, getEducation, getSkills, getAchievements } from '../services/api';

const Portfolio = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, expRes, eduRes, skillsRes, achRes] = await Promise.allSettled([
          getProfile(),
          getProjects(),
          getExperiences(),
          getEducation(),
          getSkills(),
          getAchievements(),
        ]);
        if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
        if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
        if (expRes.status === 'fulfilled') setExperiences(expRes.value.data);
        if (eduRes.status === 'fulfilled') setEducation(eduRes.value.data);
        if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
        if (achRes.status === 'fulfilled') setAchievements(achRes.value.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#64ffda' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Education education={education} />
      <Achievements achievements={achievements} />
      <Contact profile={profile} />
      <Footer />
    </>
  );
};

export default Portfolio;
