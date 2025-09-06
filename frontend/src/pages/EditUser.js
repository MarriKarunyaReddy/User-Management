import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialUser, setInitialUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setInitialUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (user) => {
    try {
      await axios.put(`/users/${id}`, user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Edit User</h1>
      </div>
      
      <div className="page-content">
        <UserForm initialUser={initialUser} onSubmit={handleUpdate} submitText="Update User" />
      </div>
    </div>
  );
};

export default EditUser;
