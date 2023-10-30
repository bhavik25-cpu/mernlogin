import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Define the initial state for the form data and a toast message
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Create a ref for the Toast component
  const toast = useRef(null);

  useEffect(() => {
    // Check if the user is already authenticated (token exists) when the page loads.
    const token = localStorage.getItem("token");
    if (token) {
      // Redirect to the user page if the token exists.
      navigate("/user");
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Show a toast message with the specified message and severity
  const showToastMessage = (message, severity) => {
    setToastMessage({ message, severity });
    toast.current.show({ severity, summary: message });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to the login API
    axios.post("http://localhost:3000/api/login", formData)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("token", data.token);

        if (data.message === "Login successful") {
          showToastMessage("Login successful", "success");

          // Redirect to the user page after a successful login
          navigate("/user");
        } else {
          // Handle login failure, show an error message, etc.
          console.log("Login failed");
        }
      })
      .catch((error) => {
        showToastMessage("Login failed. Incorrect email or password.", "error");
        console.error(error);
      });
  };

  // Render the login form and the Toast component
  return (
    <div className='register'>
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
