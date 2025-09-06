import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialUser, setInitialUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setInitialUser(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user data");
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

  if (!initialUser) return <p>Loading user data...</p>;

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm initialUser={initialUser} onSubmit={handleUpdate} submitText="Update User" />
    </div>
  );
};

export default EditUser;
