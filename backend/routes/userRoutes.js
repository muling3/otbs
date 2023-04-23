const router = require("express").Router();
const {
  loginUser,
  registerUser,
  allUsers,
} = require("../controllers/userControllers");

router.get("/", allUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
