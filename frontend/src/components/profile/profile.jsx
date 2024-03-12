import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css'; // Importing CSS file for styling
import { useAuthContext } from '../../context/AuthContext';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {authUser  } = useAuthContext()

  useEffect(() => {
    // Fetch user data based on userId
    async function fetchUser() {
      try {
        const response = await axios("/api/users", {
            method: "GET",
            headers: { "Content-Type": "application/json", 
              "Authorization":`Bearer ${JSON.parse(localStorage.getItem('token'))}`}
        })
        console.log('response.data.user',response.data.user);
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }

    fetchUser();

    // Cleanup function
    return () => {
      // Any cleanup logic can go here
    };
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div className="error">User not found.</div>;
  }

  return (
    <div className="profile">
  <h2>User Profile</h2>
   {/* Static space */}
  <div className="profile-details">
    <p><strong>Full Name:</strong> &nbsp;&nbsp;&nbsp;{user.fullName}</p>
    <p><strong>Email:</strong>&nbsp;&nbsp;&nbsp; {user.email}</p>
    <p><strong>Gender:</strong>&nbsp;&nbsp;&nbsp;{user.gender}</p>
    <p><strong>Role:</strong>&nbsp;&nbsp;&nbsp; {user.role}</p>
    <p><strong>Organization:</strong>&nbsp;&nbsp;&nbsp;{user.orgName}</p>
    {/* Add more user details here */}
  </div>
</div>

  );
}

export default UserProfile;
