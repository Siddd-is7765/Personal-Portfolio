const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  email: { type: String },
  phone: { type: String },
  location: { type: String },
  avatarUrl: { type: String },
  resumeUrl: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
