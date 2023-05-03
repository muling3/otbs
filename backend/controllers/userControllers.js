const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

const CustomError = require("../utils/CustomError");
const asyncErrorHander = require("../utils/asyncErrorHandler");

const sendResetPassword = require("../utils/sendResetPassword");

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

const resetPassword = asyncErrorHander(async (req, res, next) => {
  // ensure email has been provided
  if (!req.body.email) {
    next(new CustomError("Email address is required", 400));
  }

  //check if email exists in db
  const exists = await User.findOne({ email: req.body.email });

  if (!exists) {
    next(new CustomError("Invalid email address", 404));
  }

  // send password reset email
  // 1. generate new password
  let password = "*pass1234*";

  // 2. encrypt with bcryptjs
  let encryptedPassword = await bcrypt.hash(password, 10);

  // 3. update existing user password in the db
  await User.updateOne(
    { email: req.body.email },
    { $set: { password: encryptedPassword } }
  );

  // 4. send actual email
  await sendResetPassword(req.body.email, password, next);

  res.status(200).json({ status: true, message: "Reset password send" });
});

const updateAccountDetails = asyncErrorHander(async (req, res, next) => {

  // check if its a password reset request
  if (req.body.new_password && req.body.old_password && req.query.email) {
    const checkUser = await User.findOne({ email: req.query.email });
    if (!checkUser) {
      next(new CustomError("Invalid email address", 400));
    }

    //get the password from the checkUser and compare
    const matches = await bcrypt.compare(
      req.body.old_password,
      checkUser.password
    );
    if (!matches) {
      next(
        new CustomError(
          "Invalid request password. Ensure you use the one send to your email",
          400
        )
      );
    }

    //encrypting the new password
    let encryptedPassword = await bcrypt.hash(req.body.new_password, 10);

    //updating the db instance
    const updated = await User.updateOne(
      { email: req.query.email },
      { $set: { password: encryptedPassword } }
    );
    
    res
      .status(200)
      .json({ status: true, message: "Password reset successfully" });
    return;
  } else {
    //updating the db instance
    const updated = await User.updateOne(
      { email: req.query.email },
      { $set: req.body }
    );

    res
      .status(200)
      .json({ status: true, message: "Account updated successfully" });
    return;
  }
});

module.exports = {
  loginAdmin,
  loginUser,
  registerUser,
  allUsers,
  getUser,
  resetPassword,
  updateAccountDetails,
};
