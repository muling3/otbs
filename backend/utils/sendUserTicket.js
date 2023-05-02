const User = require("../models/userModel");
const Placeholder = require("../models/placeholderModel");

const nodeMailer = require("nodemailer");
const TicketDoc = require("pdfkit");

//constants
const constants = require("../utils/constants/constants")

//load env variables
require("dotenv").config();

module.exports = async (username, bookingId) => {
  //booking person mail address
  const user = await User.findOne(
    { username },
    { firstname: 1, lastname: 1, email: 1 }
  );

  //booking details
  const booking = await Placeholder.findById(bookingId);

  //passenger names
  let passengerNames = [];
  for (let i = 0; i < booking.passengers.length; i++) {
    passengerNames.push(booking.passengers[i].pass_name);
  }

  // db.placeholders.updateOne({"_id" : ObjectId("644e85450f0a9779c672eacb")}, { $set: {admin_confirmed: false}})
  // create ticket
  let ticket = new TicketDoc({
    size: "A5",
    layout: "landscape",
    compress: true,
  });

  ticket
    .fontSize(8)
    .fillColor("black")
    .text(`Online Train Booking System`, { underline: true });
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Booking Details`, { underline: true });
  ticket.moveDown();

  const names = `${user.firstname} ${user.lastname}`;
  const fullName = names
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");

  ticket.fontSize(6).fillColor("black").text(`Booked By:   ${fullName}`);
  ticket.moveDown();
  ticket.fontSize(6).fillColor("black").text(`Booking email:   ${user.email}`);
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Booking phone:   ${booking.contact}`);
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Travel Date:   ${booking.travel_date}`);
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Travel Time:   ${booking.travel_time}`);
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Total Fare Paid:   ${booking.fare * passengerNames.length}`);
  ticket.moveDown();
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Passenger Details`, { underline: true });
  ticket.moveDown();
  ticket.fontSize(6).fillColor("black").list(passengerNames);
  ticket.moveDown();
  ticket
    .fontSize(6)
    .fillColor("black")
    .text(`Produced on   ${new Date().toLocaleString()}`);

      //otbs image
  ticket.image(
    "/home/mulinge/Programming/web/angular-apps/train-booking/backend/utils/sgrw.png",
    250, 66, { scale: 1 }
  );
  ticket.end();

  //create email details
  const details = {
    from: {
      name: "Online Train Booking System",
      address: process.env.EMAIL_USERNAME,
    },
    to: user.email,
    subject: `Approval of OTBS Booking`,
    text: constants.SENDING_TICKET_MSG,
    replyTo: process.env.EMAIL_USERNAME,
    attachments: [
      {
        filename: `OTBS-Receipt.pdf`,
        content: ticket,
        contentType: "application/pdf",
      },
    ],
  };

  //creating an email transporter
  // const mailTransporter = nodeMailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });
  var mailTransporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1267e36e8149c2",
      pass: "81ec2be39682ad",
    },
  });

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      next(new CustomError(err.message, 500));
      return;
    }
  });
};
