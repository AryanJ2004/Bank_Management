import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Users/Dashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
