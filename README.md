# Personal Portfolio — MERN Stack

A fully dynamic personal portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Features a public portfolio interface and a secure admin dashboard for managing all content without code changes.

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React context (Auth)
│   │   ├── pages/        # Page components
│   │   └── services/     # API service layer
│   └── public/
├── server/          # Express.js backend API
│   ├── config/      # Database configuration
│   ├── controllers/ # Route handlers
│   ├── middleware/   # Auth middleware
│   ├── models/      # Mongoose schemas
│   └── routes/      # API routes
└── README.md
```

## Features

### Public Portfolio
- Hero / Introduction section
- About Me
- Skills (with proficiency bars, grouped by category)
- Projects (with links to GitHub and live demos)
- Work Experience / Internships (timeline view)
- Education (timeline view)
- Achievements / Certifications
- Contact section
- Responsive design (mobile + desktop)

### Admin Dashboard
- Secure login with JWT authentication
- Full CRUD for all portfolio sections
- Content management without code changes
- Hidden route (`/admin-login`) — not linked in navigation

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env    # Edit with your MongoDB URI and JWT secret
npm start               # Starts on port 5000
```

### Frontend Setup

```bash
cd client
npm install
npm start               # Starts on port 3000
```

### Environment Variables

**Server** (`server/.env`):
```
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

**Client** (optional `client/.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | No | Admin login |
| POST | `/api/admin/register` | No | Register admin |
| GET | `/api/profile` | No | Get profile |
| PUT | `/api/profile` | Yes | Update profile |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
| GET | `/api/experience` | No | List experiences |
| POST | `/api/experience` | Yes | Create experience |
| PUT | `/api/experience/:id` | Yes | Update experience |
| DELETE | `/api/experience/:id` | Yes | Delete experience |
| GET | `/api/education` | No | List education |
| POST | `/api/education` | Yes | Create education |
| PUT | `/api/education/:id` | Yes | Update education |
| DELETE | `/api/education/:id` | Yes | Delete education |
| GET | `/api/skills` | No | List skills |
| POST | `/api/skills` | Yes | Create skill |
| PUT | `/api/skills/:id` | Yes | Update skill |
| DELETE | `/api/skills/:id` | Yes | Delete skill |
| GET | `/api/achievements` | No | List achievements |
| POST | `/api/achievements` | Yes | Create achievement |
| PUT | `/api/achievements/:id` | Yes | Update achievement |
| DELETE | `/api/achievements/:id` | Yes | Delete achievement |

## Deployment

- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas

## Tech Stack

- **Frontend**: React.js, React Router, Axios, React Icons
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Auth**: JWT, bcryptjs