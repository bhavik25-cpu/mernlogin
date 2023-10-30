import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/SignUp';
import Navbar from './components/Navbar';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserDashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
