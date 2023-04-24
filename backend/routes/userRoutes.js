const router = require("express").Router();
const {
  loginUser,
  registerUser,
  allUsers,
  getUser,
} = require("../controllers/userControllers");

router.get("/", allUsers);
router.get("/:username", getUser);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
