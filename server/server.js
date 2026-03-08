const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Trust proxy (required for Render / reverse proxy deployments)
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: [
    'https://siddd-is7765.github.io',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);
app.use('/api/admin', authLimiter);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/admin', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/experience', require('./routes/experienceRoutes'));
app.use('/api/education', require('./routes/educationRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/achievements', require('./routes/achievementRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
