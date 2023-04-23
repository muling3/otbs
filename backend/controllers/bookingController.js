const Bookings = require("../models/bookingsModel");
const Placeholder = require("../models/placeholderModel");

const confirmedBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ confirmed: true }).sort({ _id: -1 });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};
const pendingBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ confirmed: false }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const confirmedUserBookngs = async (req, res) => {
  const booked_by = req.params.username;
  try {
    const bookings = await Bookings.find({ booked_by, confirmed: true }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

//pending user bookings
const pendingUserBookngs = async (req, res) => {
  try {
    const booked_by = req.params.username;
    const bookings = await Bookings.find({ booked_by, confirmed: false }).sort({
      _id: -1,
    });
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error occurred" });
  }
};

const bookTrip = async (req, res) => {
  try {
    const booking = await Bookings.create({
      booked_by: req.body.booked_by,
      contact: req.body.contact,
      address: req.body.address,
      pass_name: req.body.pass_name,
      pass_age: req.body.pass_age,
      pass_gender: req.body.pass_gender,
      accomodation: req.body.accomodation,
      fare: req.body.fare,
      departure: req.body.departure,
      destination: req.body.destination,
      travel_date: req.body.travel_date,
      travel_time: req.body.travel_time,
    });
    res.status(201).json({ booking });
  } catch (error) {
    es.status(500).json({ message: "Error occurred" });
  }
};

//delete reservation
const deleteReservation = async (req, res) => {
  const deleted = await Bookings.findByIdAndDelete(req.params.id);
  res.status(200).send(deleted);
  // res.status(200).json({ params: req.params });
};

//delete reservation
const confirmReservation = async (req, res) => {
  const updated = await Bookings.findByIdAndUpdate(
    req.params.id,
    {
      $set: { confirmed: true },
    },
    { new: true }
  );
  res.status(200).send(updated);
  // res.status(200).json({ params: req.params });
};

//PLACEHOLDER ENDPOINTS
const createPlaceholder = async (req, res) => {
  try {
    const placeholder = await Placeholder.create(req.body);
    res.status(200).send(placeholder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while getting placeholder" });
  }
};

//getPlaceholder
const getPlaceholder = async (req, res) => {
  const booked_by = req.params.username;
  try {
    const placeholder = await Placeholder.findOne({ booked_by });
    res.status(200).send(placeholder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while getting placeholder" });
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
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while updating" });
  }
};

//clear
const clearPlaceholder = async (req, res) => {
  const id = req.params.id;
  try {
    const cleared = await Placeholder.findByIdAndDelete(id);
    res.status(200).send(cleared);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while clearing" });
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
  clearPlaceholder,
};
