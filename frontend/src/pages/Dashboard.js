import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import UserList from "../components/UserList";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>User Dashboard</h1>
        <Link to="/add-user" className="btn btn-primary">
          Add New User
        </Link>
      </div>
      
      <div className="page-content">
        <UserList 
          users={users} 
          onDelete={handleDelete} 
          loading={loading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
