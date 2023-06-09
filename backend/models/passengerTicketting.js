const mongoose = require("mongoose");

const TickettingSchema = new mongoose.Schema(
  {
    accomodation: { type: String, default: "" },
    fare: { type: Number, default: 0 },
    departure: { type: String, default: "" },
    destination: { type: String, default: "" },
    travel_date: { type: String, default: "" },
    travel_time: { type: String, default: "" },
    passenger_name: { type: String, default: "" },
    booked_by: { type: String, default: "" },
    seat_number: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ticketting", TickettingSchema)
