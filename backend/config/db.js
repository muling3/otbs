const mongoose = require("mongoose");

//establish a connection
const connection = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/otbs");
    console.log("Successfully connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connection;
