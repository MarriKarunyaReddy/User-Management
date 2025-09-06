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
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required />
      <input type="text" name="company" placeholder="Company" value={user.company} onChange={handleChange} />
      <input type="text" name="address.street" placeholder="Street" value={user.address.street} onChange={handleChange} />
      <input type="text" name="address.city" placeholder="City" value={user.address.city} onChange={handleChange} />
      <input type="text" name="address.zipcode" placeholder="Zipcode" value={user.address.zipcode} onChange={handleChange} />
      <input type="text" name="geo.lat" placeholder="Latitude" value={user.address.geo.lat} onChange={handleChange} />
      <input type="text" name="geo.lng" placeholder="Longitude" value={user.address.geo.lng} onChange={handleChange} />
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default UserForm;
