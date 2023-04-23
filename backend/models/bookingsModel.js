const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema(
  {
    booked_by: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    pass_name: { type: String, required: true },
    pass_age: { type: String, required: true },
    pass_gender: { type: String, required: true },
    accomodation: { type: String, required: true },
    fare: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    travel_date: { type: String, required: true },
    travel_time: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", bookingsSchema);
