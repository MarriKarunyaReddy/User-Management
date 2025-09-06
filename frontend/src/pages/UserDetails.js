import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
      }
    };
    fetchUser();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      {user.company && <p><strong>Company:</strong> {user.company}</p>}
      {user.address && (
        <div>
          <h3>Address:</h3>
          <p>{user.address.street}</p>
          <p>{user.address.city} - {user.address.zipcode}</p>
          {user.address.geo && (
            <p>Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
          )}
        </div>
      )}
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default UserDetails;
