const mongoose = require("mongoose");

const PlaceholderSchema = mongoose.Schema({
  booked_by: { type: String, required: true },
  contact: { type: String, default: "" },
  address: { type: String, default: "" },
  pass_name: { type: String, default: "" },
  pass_age: { type: Number, default: 0 },
  pass_gender: { type: String, default: "" },
  accomodation: { type: String, default: "" },
  fare: { type: Number, default: 0 },
  departure: { type: String, default: "" },
  destination: { type: String, default: "" },
  travel_date: { type: String, default: "" },
  travel_time: { type: String, default: "" },
});

module.exports = mongoose.model("Placeholder", PlaceholderSchema);
