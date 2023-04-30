const Bookings = require("../models/bookingsModel");
const Placeholder = require("../models/placeholderModel");

const confirmedBookings = async (req, res, next) => {
  try {
    const bookings = await Bookings.find({ admin_confirmed: true }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    next(error);
  }
};

const pendingBookings = async (req, res, next) => {
  try {
    const bookings = await Placeholder.find({
      user_confirmed: true,
      admin_confirmed: false,
    }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    next(error);
  }
};

const confirmedUserBookngs = async (req, res, next) => {
  const booked_by = req.params.username;
  try {
    const bookings = await Bookings.find({
      booked_by,
      admin_confirmed: true,
    }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    next(error);
  }
};

//pending user bookings
const pendingUserBookngs = async (req, res, next) => {
  try {
    const booked_by = req.params.username;
    const bookings = await Placeholder.find({
      booked_by,
      user_confirmed: true,
      admin_confirmed: false,
    }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    next(error);
  }
};

const bookTrip = async (req, res, next) => {
  try {
    const booking = await Bookings.create(req.body);
    res.status(201).json({ ...booking._doc });
  } catch (error) {
    next(error);
  }
};

//delete reservation
const deleteReservation = async (req, res) => {
  const deleted = await Bookings.findByIdAndDelete(req.params.id);
  res.status(200).send(deleted);
};

//delete reservation
const confirmReservation = async (req, res, next) => {
  try {
    const updated = await Placeholder.findByIdAndUpdate(
      req.params.id,
      {
        $set: { admin_confirmed: true },
      },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
};

//PLACEHOLDER ENDPOINTS
const createPlaceholder = async (req, res, next) => {
  try {
    const placeholder = await Placeholder.create(req.body);
    res.status(200).json({ _id: placeholder._id });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

//getPlaceholder
const getPlaceholder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const placeholder = await Placeholder.findById(id);
    res.status(201).json({ ...placeholder._doc });
  } catch (error) {
    next(error);
  }
};

//update
const updatePlaceholder = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Placeholder.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
};

//update
const updatePlaceholderAddPassengers = async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await Placeholder.findByIdAndUpdate(
      id,
      {
        $push: { passengers: { $each: req.body } },
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
};

//clear
const clearPlaceholder = async (req, res) => {
  const id = req.params.id;
  try {
    const cleared = await Placeholder.findByIdAndDelete(id);
    res.status(200).send(cleared);
  } catch (error) {
    next("Error occurred while clearing");
  }
};

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
};
