const User = require("../models/userModel");

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const getUser = async (req, res, next) => {
  try {
    let username = req.params.username
    const user = await User.findOne({username});
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  //juouhoy
  try {
    if (!email && !password) {
      res.status(400);
      throw new Error("Please make sure all the fields are filled");
    }
    const users = await User.find({email, password, roles: { $all: ["ROLE_ADMIN", "ROLE_USER"] } } , {username: 1, email: 1})

    //confirm whether user exists by that username
    if (users.length > 0) {
      //generate token function will be here
      res.status(200).send({ user: users });
    } else {
      res.status(404);
      throw new Error("Username does not exist");
    }
  } catch (error) {
    next(error);
  }
};


const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  //juouhoy
  try {
    if (!username && !password) {
      res.status(400);
      throw new Error("Please make sure all the fields are filled");
    }
    const users = await User.find({ username, password });

    //confirm whether user exists by that username
    if (users.length > 0) {
      //generate token function will be here
      res.status(200).json({ user: users });
    } else {
      res.status(404);
      throw new Error("Username does not exist");
    }
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    //ensure fields have been provided
    if (
      !req.body.firstname &&
      !req.body.lastname &&
      !req.body.username &&
      !req.body.email &&
      !req.body.password
    ) {
      res.status(400);
      throw new Error("Please make sure all the fields are filled");
    }

    //search user with the username
    const users = await User.find({ username: req.body.username });
    if (users.length > 0) {
      res.status(409);
      throw new Error("Username already exists");
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
    next(error);
  }
};
module.exports = { loginAdmin, loginUser, registerUser, allUsers, getUser };
