const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const CustomError = require("../utils/CustomError");
const asyncErrorHander = require("../utils/asyncErrorHandler");

const allUsers = asyncErrorHander(async (req, res, next) => {
  const users = await User.find(
    {},
    { firstname: 1, lastname: 1, username: 1, email: 1 }
  ).sort({ _id: -1 });
  res.status(200).json({ users });
});

const getUser = asyncErrorHander(async (req, res, next) => {
  let username = req.params.username;
  const user = await User.findOne(
    { username },
    { firstname: 1, lastname: 1, username: 1, email: 1 }
  );
  res.status(200).send(user);
});

const loginAdmin = asyncErrorHander(async (req, res, next) => {
  // destrcucturing body object
  const { email, password } = req.body;
  //juouhoy
  if (!email && !password) {
    next(new CustomError("Please make sure all the fields are filled", 400));
  }

  //check whether username exists
  const user = await User.findOne({ email }, { email: 1, password: 1 });
  if (!user) {
    next(new CustomError("Username does not exist", 404));
  }

  //comparing password
  let success = await bcrypt.compare(password, user.password);

  //checking password
  if (!success) {
    next(new CustomError("Invalid credentials", 400));
  }

  ///sending back the user
  res.status(200).json({ user: user.username });
});

const loginUser = asyncErrorHander(async (req, res, next) => {
  // destructuring body object
  const { username, password } = req.body;
  //juouhoy
  if (!username && !password) {
    next(new CustomError("Please make sure all the fields are filled", 400));
  }

  //check whether username exists
  const user = await User.findOne({ username }, { username: 1, password: 1 });
  if (!user) {
    next(new CustomError("Username does not exist", 404));
  }

  //comparing password
  let success = await bcrypt.compare(password, user.password);

  //checking password
  if (!success) {
    next(new CustomError("Invalid credentials", 400));
  }

  //generate token function will be here
  res.status(200).json({ user: user.username });
});

const registerUser = asyncErrorHander(async (req, res, next) => {
  //ensure fields have been provided
  if (
    !req.body.firstname &&
    !req.body.lastname &&
    !req.body.username &&
    !req.body.email &&
    !req.body.password
  ) {
    next(new CustomError("Please make sure all the fields are filled", 400));
  }

  //search user with the username
  const users = await User.findOne({ username: req.body.username });
  if (users) {
    next(new CustomError("Username already taken", 409));
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
});
module.exports = { loginAdmin, loginUser, registerUser, allUsers, getUser };
