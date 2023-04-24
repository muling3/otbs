const {
  pendingBookings,
  confirmedBookings,
  confirmedUserBookngs,
  pendingUserBookngs,
  bookTrip,
  confirmReservation,
  deleteReservation,
  createPlaceholder,
  getPlaceholder,
  updatePlaceholder,
  clearPlaceholder,
} = require("../controllers/bookingController");

const router = require("express").Router();

//placeholder endpoints
router.post("/placeholder", createPlaceholder);
router.get("/placeholder/:id", getPlaceholder);
router.put("/placeholder/:id", updatePlaceholder);
router.delete("/placeholder/:id", clearPlaceholder);

//other end points
router.post("/", bookTrip);

router.get("/pending", pendingBookings);
router.get("/confirmed", confirmedBookings);
router.get("/:username/pending", pendingUserBookngs);
router.get("/:username/confirmed", confirmedUserBookngs);
router.put("/:id", confirmReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
