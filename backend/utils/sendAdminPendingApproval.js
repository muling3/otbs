const nodeMailer = require("nodemailer");

// loading config
require("dotenv").config();

//constants
const constants = require("../utils/constants/constants");

module.exports = async () => {
  console.log("endpoint hit");
  //create email details
  const details = {
    from: {
      name: "Online Train Booking System",
      address: process.env.EMAIL_USERNAME,
    },
    to: "alexandermuli234@gmail.com",
    subject: `New OTBS Booking`,
    html: constants.ADMIN_TO_APPROVE_MSG,
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
  console.log("mail send");
};
