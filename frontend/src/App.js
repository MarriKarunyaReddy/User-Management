import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
