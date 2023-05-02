const Bookings = require("../models/bookingsModel");
const Placeholder = require("../models/placeholderModel");
const PassengerTicketting = require("../models/passengerTicketting");

const CustomError = require("../utils/CustomError");
const asyncErrorHander = require("../utils/asyncErrorHandler");

const sendUserTicket = require("../utils/sendUserTicket");
const sendAdminPendingApproval = require("../utils/sendAdminPendingApproval");


const getRemainingSlots = asyncErrorHander(async (req, res, next) => {
  const slots = await PassengerTicketting.find({ ...req.query }).count();
  res.status(200).send(slots);
});

const confirmedBookings = asyncErrorHander(async (req, res, next) => {
  const bookings = await Bookings.find({ admin_confirmed: true }).sort({
    _id: -1,
  });
  res.status(200).send(bookings);
});

const pendingBookings = asyncErrorHander(async (req, res, next) => {
  const bookings = await Placeholder.find({
    user_confirmed: true,
    admin_confirmed: false,
  }).sort({
    _id: -1,
  });
  res.status(200).send(bookings);
});

const confirmedUserBookngs = asyncErrorHander(async (req, res, next) => {
  if (!req.params.username) {
    next(new CustomError("Please provide username", 400));
  }

  const booked_by = req.params.username;

  const bookings = await Bookings.find({
    booked_by,
    admin_confirmed: true,
  }).sort({
    _id: -1,
  });
  res.status(200).send(bookings);
});

//pending user bookings
const pendingUserBookngs = asyncErrorHander(async (req, res, next) => {
  if (!req.params.username) {
    next(new CustomError("Please provide username", 400));
  }

  const booked_by = req.params.username;

  const bookings = await Placeholder.find({
    booked_by,
    user_confirmed: true,
    admin_confirmed: false,
  }).sort({
    _id: -1,
  });
  res.status(200).send(bookings);
});

const bookTrip = asyncErrorHander(async (req, res, next) => {
  const booking = await Bookings.create(req.body);
  res.status(201).json({ ...booking._doc });
});

//delete reservation
const deleteReservation = asyncErrorHander(async (req, res) => {
  if (!req.params.id) {
    next(new CustomError("Please provide booking ID", 400));
  }

  const deleted = await Bookings.findByIdAndDelete(req.params.id);
  res.status(200).send(deleted);
});

//delete reservation
const confirmReservation = asyncErrorHander(async (req, res, next) => {
  if (!req.params.id) {
    next(new CustomError("Please provide booking ID", 400));
  }

  const updated = await Placeholder.findByIdAndUpdate(
    req.params.id,
    {
      $set: { admin_confirmed: true },
    },
    { new: true }
  );

  // creating instance in the ticketting schema
  // getting last seat_number inserted
  let seat = await PassengerTicketting.find({}).count()

  let entries = [];
  for (let i = 0; i < updated.passengers.length; i++) {
    entries.push({
      travel_date: updated.travel_date,
      travel_time: updated.travel_time,
      accomodation: updated.accomodation,
      departure: updated.departure,
      destination: updated.destination,
      fare: updated.fare,
      booked_by: updated.booked_by,
      passenger_name: updated.passengers[i].pass_name,
      seat_number: ++seat,
    });
  }

  let insertIds = await PassengerTicketting.insertMany(entries);

  //notify user thru email that there reservation was approved and send ticket
  await sendUserTicket(updated.booked_by, req.params.id);

  res.status(200).send(updated);
});

//PLACEHOLDER ENDPOINTS
const createPlaceholder = asyncErrorHander(async (req, res, next) => {
  const placeholder = await Placeholder.create(req.body);
  res.status(200).json({ _id: placeholder._id });
});

//getPlaceholder
const getPlaceholder = asyncErrorHander(async (req, res, next) => {
  if (!req.params.id) {
    next(new CustomError("Please provide placeholder ID", 400));
  }

  const id = req.params.id;

  const placeholder = await Placeholder.findById(id);
  res.status(201).json({ ...placeholder._doc });
});

//update
const updatePlaceholder = asyncErrorHander(async (req, res) => {
  if (!req.params.id) {
    next(new CustomError("Please provide placeholder ID", 400));
  }

  const id = req.params.id;

  const updated = await Placeholder.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true }
  );

  // check if the update involves updating user confirmed to true
  // then send email to admin to inform there is a booking pending approval
  if (req.body.user_confirmed) {
    console.log("userconfimed true");
    //send email to admin
    await sendAdminPendingApproval();
  }

  res.status(201).json({ message: "Updated successfully" });
});

//update
const updatePlaceholderAddPassengers = asyncErrorHander(async (req, res) => {
  if (!req.params.id) {
    next(new CustomError("Please provide pakeholder ID", 400));
  }

  const id = req.params.id;

  const updated = await Placeholder.findByIdAndUpdate(
    id,
    {
      $push: { passengers: { $each: req.body } },
    },
    { new: true }
  );
  res.status(200).json({ message: "Updated successfully" });
});

//clear
const clearPlaceholder = asyncErrorHander(async (req, res) => {
  if (!req.params.id) {
    next(new CustomError("Please provide placeholder ID", 400));
  }

  const id = req.params.id;

  const cleared = await Placeholder.findByIdAndDelete(id);
  res.status(200).send(cleared);
});

module.exports = {
  confirmedBookings,
  pendingBookings,
  confirmedUserBookngs,
  pendingUserBookngs,
  bookTrip,
  confirmReservation,
  deleteReservation,
  createPlaceholder,
  getPlaceholder,
  updatePlaceholder,
  updatePlaceholder,
  updatePlaceholderAddPassengers,
  clearPlaceholder,
  getRemainingSlots,
};
