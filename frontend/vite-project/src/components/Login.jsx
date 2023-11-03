import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import axiosWC from '../utils';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showToastMessage = (message, severity) => {
    toast.current.show({ severity, summary: message });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWC
      .post('http://127.0.0.1:3000/api/login', formData)
      .then((response) => {
        const data = response.data;

        if (data.message === 'Login successful') {
          showToastMessage('Login successful', 'success');
          const token = data.token;
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate('/user');
        } else {
          showToastMessage('Login failed', 'error');
        }
      })
      .catch((error) => {
        showToastMessage('Login failed. Incorrect email or password.', 'error');
        console.error(error);
      });
  };
  return (
    <div className='Login'>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Toast ref={toast} />
    </div>
  );
}

export default Login;
