import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${id}`);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user details");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading user details...</p>
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
        <h1>User Details</h1>
        <Link to="/" className="btn btn-outline">
          Back to Dashboard
        </Link>
      </div>
      
      <div className="user-details">
        <div className="detail-row">
          <div className="detail-label">Name:</div>
          <div className="detail-value">{user.name}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Email:</div>
          <div className="detail-value">{user.email}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Phone:</div>
          <div className="detail-value">{user.phone}</div>
        </div>
        
        {user.company && (
          <div className="detail-row">
            <div className="detail-label">Company:</div>
            <div className="detail-value">{user.company}</div>
          </div>
        )}
        
        {user.address && (user.address.street || user.address.city || user.address.zipcode) && (
          <div className="address-section">
            <h3>Address</h3>
            {user.address.street && (
              <div className="detail-row">
                <div className="detail-label">Street:</div>
                <div className="detail-value">{user.address.street}</div>
              </div>
            )}
            {(user.address.city || user.address.zipcode) && (
              <div className="detail-row">
                <div className="detail-label">City:</div>
                <div className="detail-value">
                  {user.address.city && user.address.zipcode 
                    ? `${user.address.city}, ${user.address.zipcode}`
                    : user.address.city || user.address.zipcode
                  }
                </div>
              </div>
            )}
            {user.address.geo && (user.address.geo.lat || user.address.geo.lng) && (
              <div className="detail-row">
                <div className="detail-label">Coordinates:</div>
                <div className="detail-value">
                  {user.address.geo.lat && user.address.geo.lng 
                    ? `Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`
                    : user.address.geo.lat || user.address.geo.lng
                  }
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
