import React, { useState,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from 'primereact/toast';

function Register() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [toastMessage, setToastMessage] = useState(null);

  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.name.length < 4) {
      showToastMessage('Name must be at least 4 characters long', 'error');
      return false;
    }

    if (!isValidEmail(formData.email)) {
      showToastMessage('Invalid email address', 'error');
      return false;
    }

    if (!isAlphanumericPassword(formData.password)) {
      showToastMessage('Password should be alphanumeric', 'error');
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    // Add your email validation logic here
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  const isAlphanumericPassword = (password) => {
    // Password should contain at least one letter and one digit
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    return passwordRegex.test(password);
  };
  
  const showToastMessage = (message, severity) => {
    setToastMessage({ message, severity });
    toast.current.show({ severity, summary: message });
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
  
      const data = res.data;
      return data;
    } catch (error) {
      // Handle registration failure here
      showToastMessage('Registration failed. Email already exists.', 'error');
      throw error; // Re-throw the error for further handling if needed
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      sendRequest()
        .then(() => {
          showToastMessage('Registration successful', 'success');
          history("/login");
        });
    }
  };

  return (
    <div className='register'>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
      <Toast ref={toast} />
    </div>
  );
}

export default Register;
