import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function getBasename() {
  // During development / tunnels we want '/'
  if (process.env.NODE_ENV !== 'production') return '/';

  // In production, PUBLIC_URL may be an absolute URL (e.g. https://user.github.io/repo)
  // or a pathname (e.g. /repo). Extract a safe pathname basename.
  const publicUrl = process.env.PUBLIC_URL || '';
  try {
    const parsed = new URL(publicUrl, window.location.origin);
    const path = parsed.pathname || '/';
    return path.replace(/\/$/, '') || '/';
  } catch {
    // If PUBLIC_URL is not a full URL, treat it as a pathname
    return (publicUrl || '/').replace(/\/$/, '') || '/';
  }
}

function App() {
  const basename = getBasename();

  return (
    <AuthProvider>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
