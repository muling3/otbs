const nodeMailer = require("nodemailer");

// loading config
require("dotenv").config();

//constants
const constants = require("../utils/constants/constants");

module.exports = async (mail_to, new_password) => {
  //create email details
  const details = {
    from: {
      name: "Online Train Booking System",
      address: process.env.EMAIL_USERNAME,
    },
    to: mail_to,
    subject: `OTBS Reset Account Request`,
    html: constants.PASSWORD_RESET_MSG.replace("[[new_password]]", new_password),
    replyTo: process.env.EMAIL_USERNAME,
  };

  //creating an email transporter
  const mailTransporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      next(new CustomError(err.message, 500));
      return;
    }
  });
};