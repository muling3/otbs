const express = require("express");
const connection = require("./config/db");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware")

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

app.use(errorMiddleware);
app.listen(8000, () => console.log("Server started on port 8000"));
