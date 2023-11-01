// UserDashboard.jsx

// Import necessary components
import React, { useState, useEffect } from 'react';
import axiosWC from '../utils'


function UserDashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const response = axiosWC.get("http://127.0.0.1:3000/api/user")
      .then((response) => {
        setUserName(response.data.user.name);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  useEffect(()=>{
    fetch('http://127.0.0.1:3000/api/is-login',{credentials: 'include'}).then(res=>console.log('Is login',res))
  })

  return (
    <div className="user-dashboard">
      <h2>Hello {userName}</h2>
    </div>
  );
}

export default UserDashboard;
