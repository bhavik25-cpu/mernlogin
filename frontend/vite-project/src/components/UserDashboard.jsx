// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import axiosWC from '../utils';

function UserDashboard() {
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const response = axiosWC.get("http://127.0.0.1:3000/api/user")
      .then((response) => {
        setUserName(response.data.user.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axiosWC.get('http://127.0.0.1:3000/api/is-login')
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="user-dashboard">
      {loggedIn && <h2>Hello {userName}</h2>}
    </div>
  );
  
}

export default UserDashboard;
