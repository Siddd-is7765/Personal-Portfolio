import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Use the PUBLIC_URL set by Create React App at build time for GitHub Pages.
  // Fall back to '/' during local development or when PUBLIC_URL is empty.
  const basename = process.env.PUBLIC_URL || '/';

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
