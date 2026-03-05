const Education = require('../models/Education');

const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEducation, createEducation, updateEducation, deleteEducation };
