// UserDashboard.jsx

// Import necessary components
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let tokenheader = localStorage.getItem("token")
    console.log(tokenheader, "tokenheadertokenheader")
    axios.get("http://localhost:3000/api/user", {
      "headers": { "token": tokenheader }
    })
      .then((response) => {
        setUserName(response.data.user.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="user-dashboard">
      <h2>Hello {userName}</h2>
    </div>
  );
}

export default UserDashboard;
