import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

const OrganizationDetailsTable = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const limit = 10; // Set the limit per page
        const response = await axios(`/api/admin/organizations?page=${currentPage}&limit=${limit}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        if (!response) {
          throw new Error('Failed to fetch organizations');
        }

        setOrganizations(response.data.organizations);
        setTotalPages(response.data.totalPage);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrganizations();
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
      <h2>Organization Details</h2>
      <div className="profile-details">
        <table className="table">
          <thead>
            <tr>
              <th>Organization Name</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map(org => (
              <tr key={org._id}>
                <td>{org.orgName}</td>
                <td>{org.description}</td>
                <td>{formatDate(org.createdAt)}</td>
                <td>{formatDate(org.updatedAt)}</td>
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

export default OrganizationDetailsTable;
