const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    zipcode: { type: String },
    geo: {
      lat: { type: String },
      lng: { type: String }
    }
  }
});

module.exports = mongoose.model("User", userSchema);
