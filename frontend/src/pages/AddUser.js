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
    <div>
      <h1>Add New User</h1>
      <UserForm onSubmit={handleAdd} submitText="Add User" />
    </div>
  );
};

export default AddUser;
