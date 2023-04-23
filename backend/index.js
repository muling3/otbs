const express = require("express");
const connection = require("./config/db");
const cors = require("cors");

const app = express();
connection();

//cors middleware
app.use(cors());
//json middleware
app.use(express.json());

//form data middleware
app.use(express.urlencoded({ extended: false }));

//rgister user routes
app.use("/users", require("./routes/userRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.stack });
});
app.listen(8000, () => console.log("Server started on port 8000"));
