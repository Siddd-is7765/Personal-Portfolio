import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getProfile, updateProfile,
  getProjects, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getEducation, createEducation, updateEducation, deleteEducation,
  getSkills, createSkill, updateSkill, deleteSkill,
  getAchievements, createAchievement, updateAchievement, deleteAchievement,
} from '../services/api';
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './Admin.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState({
    profile: null,
    projects: [],
    experiences: [],
    education: [],
    skills: [],
    achievements: [],
  });
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      const [profileRes, projectsRes, expRes, eduRes, skillsRes, achRes] = await Promise.allSettled([
        getProfile(),
        getProjects(),
        getExperiences(),
        getEducation(),
        getSkills(),
        getAchievements(),
      ]);
      setData({
        profile: profileRes.status === 'fulfilled' ? profileRes.value.data : null,
        projects: projectsRes.status === 'fulfilled' ? projectsRes.value.data : [],
        experiences: expRes.status === 'fulfilled' ? expRes.value.data : [],
        education: eduRes.status === 'fulfilled' ? eduRes.value.data : [],
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data : [],
        achievements: achRes.status === 'fulfilled' ? achRes.value.data : [],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const openCreateForm = () => {
    setEditItem(null);
    setFormData(getDefaultForm(activeTab));
    setShowForm(true);
  };

  const openEditForm = (item) => {
    setEditItem(item);
    setFormData({ ...item });
    setShowForm(true);
  };

  const getDefaultForm = (tab) => {
    switch (tab) {
      case 'profile':
        return { name: '', title: '', bio: '', email: '', phone: '', location: '', avatarUrl: '', resumeUrl: '', socialLinks: { github: '', linkedin: '', twitter: '', website: '' } };
      case 'projects':
        return { title: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '', featured: false, order: 0 };
      case 'experiences':
        return { company: '', position: '', description: '', startDate: '', endDate: '', current: false, order: 0 };
      case 'education':
        return { institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, description: '', order: 0 };
      case 'skills':
        return { name: '', category: '', proficiency: 50, order: 0 };
      case 'achievements':
        return { title: '', description: '', date: '', url: '', order: 0 };
      default:
        return {};
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let submitData = { ...formData };
      if (activeTab === 'projects' && typeof submitData.technologies === 'string') {
        submitData.technologies = submitData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      }

      switch (activeTab) {
        case 'profile':
          await updateProfile(submitData);
          break;
        case 'projects':
          editItem ? await updateProject(editItem._id, submitData) : await createProject(submitData);
          break;
        case 'experiences':
          editItem ? await updateExperience(editItem._id, submitData) : await createExperience(submitData);
          break;
        case 'education':
          editItem ? await updateEducation(editItem._id, submitData) : await createEducation(submitData);
          break;
        case 'skills':
          editItem ? await updateSkill(editItem._id, submitData) : await createSkill(submitData);
          break;
        case 'achievements':
          editItem ? await updateAchievement(editItem._id, submitData) : await createAchievement(submitData);
          break;
        default:
          break;
      }
      showMsg(editItem ? 'Updated successfully!' : 'Created successfully!');
      setShowForm(false);
      fetchAll();
    } catch (error) {
      showMsg('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (tab, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      switch (tab) {
        case 'projects': await deleteProject(id); break;
        case 'experiences': await deleteExperience(id); break;
        case 'education': await deleteEducation(id); break;
        case 'skills': await deleteSkill(id); break;
        case 'achievements': await deleteAchievement(id); break;
        default: break;
      }
      showMsg('Deleted successfully!');
      fetchAll();
    } catch (error) {
      showMsg('Error deleting item');
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <>
            <div className="form-group"><label>Name</label><input name="name" value={formData.name || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Title</label><input name="title" value={formData.title || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Bio</label><textarea name="bio" value={formData.bio || ''} onChange={handleChange} rows="4" /></div>
            <div className="form-group"><label>Email</label><input name="email" value={formData.email || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Phone</label><input name="phone" value={formData.phone || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Location</label><input name="location" value={formData.location || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Avatar URL</label><input name="avatarUrl" value={formData.avatarUrl || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Resume URL</label><input name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>GitHub URL</label><input name="socialLinks.github" value={formData.socialLinks?.github || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>LinkedIn URL</label><input name="socialLinks.linkedin" value={formData.socialLinks?.linkedin || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Twitter URL</label><input name="socialLinks.twitter" value={formData.socialLinks?.twitter || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Website URL</label><input name="socialLinks.website" value={formData.socialLinks?.website || ''} onChange={handleChange} /></div>
          </>
        );
      case 'projects':
        return (
          <>
            <div className="form-group"><label>Title</label><input name="title" value={formData.title || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Description</label><textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" required /></div>
            <div className="form-group"><label>Technologies (comma separated)</label><input name="technologies" value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>GitHub URL</label><input name="githubUrl" value={formData.githubUrl || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Live URL</label><input name="liveUrl" value={formData.liveUrl || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Image URL</label><input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} /></div>
            <div className="form-group checkbox-group"><label><input type="checkbox" name="featured" checked={formData.featured || false} onChange={handleChange} /> Featured</label></div>
            <div className="form-group"><label>Order</label><input type="number" name="order" value={formData.order || 0} onChange={handleChange} /></div>
          </>
        );
      case 'experiences':
        return (
          <>
            <div className="form-group"><label>Company</label><input name="company" value={formData.company || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Position</label><input name="position" value={formData.position || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Description</label><textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" /></div>
            <div className="form-group"><label>Start Date</label><input name="startDate" value={formData.startDate || ''} onChange={handleChange} placeholder="e.g. Jan 2023" required /></div>
            <div className="form-group"><label>End Date</label><input name="endDate" value={formData.endDate || ''} onChange={handleChange} placeholder="e.g. Dec 2023" /></div>
            <div className="form-group checkbox-group"><label><input type="checkbox" name="current" checked={formData.current || false} onChange={handleChange} /> Currently working here</label></div>
            <div className="form-group"><label>Order</label><input type="number" name="order" value={formData.order || 0} onChange={handleChange} /></div>
          </>
        );
      case 'education':
        return (
          <>
            <div className="form-group"><label>Institution</label><input name="institution" value={formData.institution || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Degree</label><input name="degree" value={formData.degree || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Field of Study</label><input name="field" value={formData.field || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Start Date</label><input name="startDate" value={formData.startDate || ''} onChange={handleChange} placeholder="e.g. 2019" required /></div>
            <div className="form-group"><label>End Date</label><input name="endDate" value={formData.endDate || ''} onChange={handleChange} placeholder="e.g. 2023" /></div>
            <div className="form-group checkbox-group"><label><input type="checkbox" name="current" checked={formData.current || false} onChange={handleChange} /> Currently studying here</label></div>
            <div className="form-group"><label>Description</label><textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" /></div>
            <div className="form-group"><label>Order</label><input type="number" name="order" value={formData.order || 0} onChange={handleChange} /></div>
          </>
        );
      case 'skills':
        return (
          <>
            <div className="form-group"><label>Name</label><input name="name" value={formData.name || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Category</label><input name="category" value={formData.category || ''} onChange={handleChange} placeholder="e.g. Frontend, Backend" required /></div>
            <div className="form-group"><label>Proficiency ({formData.proficiency || 50}%)</label><input type="range" name="proficiency" min="0" max="100" value={formData.proficiency || 50} onChange={handleChange} /></div>
            <div className="form-group"><label>Order</label><input type="number" name="order" value={formData.order || 0} onChange={handleChange} /></div>
          </>
        );
      case 'achievements':
        return (
          <>
            <div className="form-group"><label>Title</label><input name="title" value={formData.title || ''} onChange={handleChange} required /></div>
            <div className="form-group"><label>Description</label><textarea name="description" value={formData.description || ''} onChange={handleChange} rows="3" /></div>
            <div className="form-group"><label>Date</label><input name="date" value={formData.date || ''} onChange={handleChange} placeholder="e.g. March 2024" /></div>
            <div className="form-group"><label>URL</label><input name="url" value={formData.url || ''} onChange={handleChange} /></div>
            <div className="form-group"><label>Order</label><input type="number" name="order" value={formData.order || 0} onChange={handleChange} /></div>
          </>
        );
      default:
        return null;
    }
  };

  const renderList = () => {
    const items = data[activeTab] || [];
    if (activeTab === 'profile') {
      return data.profile ? (
        <div className="item-card">
          <div className="item-info">
            <h3>{data.profile.name}</h3>
            <p>{data.profile.title}</p>
          </div>
          <div className="item-actions">
            <button className="btn-icon" onClick={() => openEditForm(data.profile)}><FaEdit /></button>
          </div>
        </div>
      ) : (
        <p className="empty-text">No profile set up yet.</p>
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return <p className="empty-text">No items yet. Click "Add New" to create one.</p>;
    }

    return items.map(item => (
      <div key={item._id} className="item-card">
        <div className="item-info">
          <h3>{item.title || item.name || item.company || item.institution || item.degree}</h3>
          <p>{item.description || item.position || item.field || item.category || ''}</p>
        </div>
        <div className="item-actions">
          <button className="btn-icon" onClick={() => openEditForm(item)}><FaEdit /></button>
          <button className="btn-icon btn-danger" onClick={() => handleDelete(activeTab, item._id)}><FaTrash /></button>
        </div>
      </div>
    ));
  };

  const tabs = ['profile', 'projects', 'experiences', 'education', 'skills', 'achievements'];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="btn-logout" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </header>
      {message && <div className="admin-message">{message}</div>}
      <div className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab); setShowForm(false); }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="admin-content">
        <div className="content-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
          {activeTab !== 'profile' && (
            <button className="btn-add" onClick={openCreateForm}><FaPlus /> Add New</button>
          )}
          {activeTab === 'profile' && !data.profile && (
            <button className="btn-add" onClick={openCreateForm}><FaPlus /> Set Up Profile</button>
          )}
        </div>
        {showForm ? (
          <form className="admin-form" onSubmit={handleSubmit}>
            {renderForm()}
            <div className="form-actions">
              <button type="submit" className="btn-primary">{editItem ? 'Update' : 'Create'}</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="items-list">
            {renderList()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
