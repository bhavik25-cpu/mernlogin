import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

function Navbar() {
  const location = useLocation();

  // Determine whether to show the "Logout" button based on the current route
  const showLogoutButton = location.pathname === '/user'; // Show the Logout button only on the '/user' route

  // Function to handle the logout button click
  const handleLogout = async () => {
    localStorage.clear(); // Clear the localStorage to log the user out
    axios.get("http://localhost:3000/api/logout", {
    });
  }

  return (
    <div className="container">
      <Menubar className="menu" start={
        showLogoutButton ? ( // Show only the "Logout" button if the user is on the '/user' route
          <div className="right-logout">
            <Link to="/login">
              <button className="p-link" onClick={handleLogout}>
                <span className="pi pi-power-off"></span>
                Logout
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Show "Register" and "Login" buttons if the user is not on the '/user' route */}
            <Link to="/register">
              <button className="p-link">
                <span className="pi pi-user-plus"></span>
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="p-link">
                <span className="pi pi-user"></span>
                Login
              </button>
            </Link>
          </>
        )
      } />
    </div>
  );
}

export default Navbar;
