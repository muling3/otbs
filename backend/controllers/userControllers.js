const User = require("../models/userModel");

const allUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  //juouhoy
  try {
    if (!username && !password) {
      res
        .status(400)
        .json({ message: "Please make sure all the fileds are filled" });
    }
    const users = await User.find({ username, password });

    //confirm whether user exists by that username
    if (users.length > 0) {
      console.log(users);

      //generate token function will be here
      res.status(200).json({ user: users });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const registerUser = async (req, res) => {
  try {
    //search user with the username
    const users = await User.find({ username: req.body.username });
    if (users.length > 0) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};
module.exports = { loginUser, registerUser, allUsers };
