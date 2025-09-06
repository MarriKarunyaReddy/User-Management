import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, onDelete, loading, error }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No users found</h3>
        <p>Get started by adding your first user.</p>
        <Link to="/add-user" className="btn btn-primary">
          Add New User
        </Link>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="user-row">
                <td className="user-name">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="user-email">{user.email}</td>
                <td className="user-phone">{user.phone}</td>
                <td className="user-company">{user.company || "—"}</td>
                <td className="user-actions">
                  <Link to={`/users/${user._id}`} className="btn btn-sm btn-outline">
                    View
                  </Link>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm btn-secondary">
                    Edit
                  </Link>
                  <button 
                    onClick={() => onDelete(user._id)} 
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;

