import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './Component/Auth/AdminLogin';
import Dashboard from './Home/Dashboard';
import CreatePosition from "./Component/Recruiter/CreatePosition";
import RecruiterLogin from "./Component/Auth/RecruiterLogin";

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROutes for users when he isn't logged in */}
        <Route path="/" element={<PublicRoute><AdminLogin /></PublicRoute>} />
        <Route path="/recruiter-login" element={<PublicRoute><RecruiterLogin /></PublicRoute>} />

        {/* Routes for user when logged in */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create-position" element={<PrivateRoute><CreatePosition /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
