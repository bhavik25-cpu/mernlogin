import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link, useLocation } from 'react-router-dom';
import axiosWC from '../utils'


function Navbar() {
  const location = useLocation();

  const showLogoutButton = location.pathname === '/user';

  const handleLogout = async () => {
    try {
      await axiosWC.post("http://127.0.0.1:3000/api/logout");
      console.log("Logout successful");
    } catch (error) {
      console.log("Logout error");
    }
  }
  
  return (
    <div className="container">
      <Menubar className="menu" start={
        showLogoutButton ? ( 
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
