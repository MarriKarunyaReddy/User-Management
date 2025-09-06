import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import UserForm from "../components/UserForm";

const AddUser = () => {
  const navigate = useNavigate();

  const handleAdd = async (user) => {
    try {
      await axios.post("/users", user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Add New User</h1>
      </div>
      
      <div className="page-content">
        <UserForm onSubmit={handleAdd} submitText="Add User" />
      </div>
    </div>
  );
};

export default AddUser;
