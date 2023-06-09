const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: {type: [String], default: ["ROLE_USER"]}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
