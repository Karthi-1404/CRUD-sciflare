import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css'
import { useAuthContext } from '../../context/AuthContext';

const UserDetailsTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {authUser  } = useAuthContext()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const limit = 10; // Set the limit per page
        const response = await axios(`/api/admin/user?page=${currentPage}&limit=${limit}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (!response) {
          throw new Error('Failed to fetch users');
        }

        setUsers(response.data.users);
        setTotalPages(response.data.totalPage);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile">
      <h2>User Details</h2>
      <div className="profile-details">
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.fullName}{user._id == authUser._id?'(me)':''}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.role}</td>
                <td>{user.organization ? user.organization.orgName:''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default UserDetailsTable;
