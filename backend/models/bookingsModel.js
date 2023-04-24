const mongoose = require("mongoose");

const bookingsSchema = mongoose.Schema(
  {
    booked_by: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    passengers: [
      {
        pass_name: { type: String, default: "" },
        pass_age: { type: Number, default: 0 },
        pass_gender: { type: String, default: "" },
      },
    ],
    accomodation: { type: String, required: true },
    fare: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    travel_date: { type: String, required: true },
    travel_time: { type: String, required: true },
    user_confirmed: { type: Boolean, default: false },
    admin_confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bookings", bookingsSchema);
