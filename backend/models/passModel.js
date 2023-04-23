const mongoose = require("mongoose");

const PassSchema = mongoose.Schema({
  booked_by: String,
  contact: String,
  address: String,
  pass_name: String,
  pass_age: String,
  pass_gender: String,
});

module.exports = mongoose.model("Pass", PassSchema);
