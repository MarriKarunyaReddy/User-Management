import React, { useState } from "react";

const UserForm = ({ initialUser, onSubmit, submitText }) => {
  const [user, setUser] = useState(initialUser || {
    name: "",
    email: "",
    phone: "",
    company: "",
    address: { street: "", city: "", zipcode: "", geo: { lat: "", lng: "" } }
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.includes("geo.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, geo: { ...prev.address.geo, [key]: value } }
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!user.name || !user.email || !user.phone) {
      setError("Name, Email, and Phone are required");
      return;
    }

    onSubmit(user);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            className="form-input"
            placeholder="Enter full name" 
            value={user.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            className="form-input"
            placeholder="Enter email address" 
            value={user.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input 
            type="text" 
            id="phone"
            name="phone" 
            className="form-input"
            placeholder="Enter phone number" 
            value={user.phone} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input 
            type="text" 
            id="company"
            name="company" 
            className="form-input"
            placeholder="Enter company name" 
            value={user.company} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="address.street">Street Address</label>
          <input 
            type="text" 
            id="address.street"
            name="address.street" 
            className="form-input"
            placeholder="Enter street address" 
            value={user.address.street} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="address.city">City</label>
          <input 
            type="text" 
            id="address.city"
            name="address.city" 
            className="form-input"
            placeholder="Enter city" 
            value={user.address.city} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="address.zipcode">Zip Code</label>
          <input 
            type="text" 
            id="address.zipcode"
            name="address.zipcode" 
            className="form-input"
            placeholder="Enter zip code" 
            value={user.address.zipcode} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="geo.lat">Latitude</label>
          <input 
            type="text" 
            id="geo.lat"
            name="geo.lat" 
            className="form-input"
            placeholder="Enter latitude" 
            value={user.address.geo.lat} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="geo.lng">Longitude</label>
          <input 
            type="text" 
            id="geo.lng"
            name="geo.lng" 
            className="form-input"
            placeholder="Enter longitude" 
            value={user.address.geo.lng} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
