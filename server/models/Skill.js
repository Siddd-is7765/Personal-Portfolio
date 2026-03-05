const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, min: 0, max: 100, default: 50 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
