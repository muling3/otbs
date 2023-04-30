const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const allUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      { firstname: 1, lastname: 1, username: 1, email: 1 }
    ).sort({ _id: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const getUser = async (req, res, next) => {
  try {
    let username = req.params.username;
    const user = await User.findOne(
      { username },
      { firstname: 1, lastname: 1, username: 1, email: 1 }
    );
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

    //check whether username exists
    const user = await User.findOne({ email }, { email: 1, password: 1 });
    if (!user) {
      res.status(404);
      throw new Error("Username does not exist");
    }
    
    //comparing password
    let success = await bcrypt.compare(password, user.password);

    //checking password
    if (!success) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    ///sending back the user
    res.status(200).json({ user: user.username });
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

    //check whether username exists
    const user = await User.findOne({ username }, { username: 1, password: 1 });
    if (!user) {
      res.status(404);
      throw new Error("Username does not exist");
    }

    //comparing password
    let success = await bcrypt.compare(password, user.password);

    //checking password
    if (!success) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    //generate token function will be here
    res.status(200).json({ user: user.username });
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
    const users = await User.findOne({ username: req.body.username });
    if (users) {
      res.status(409);
      throw new Error("Username already taken");
    }

    //encrypting the user password
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });

    res.status(201).json({ user: user });
  } catch (error) {
    next(error);
  }
};
module.exports = { loginAdmin, loginUser, registerUser, allUsers, getUser };
