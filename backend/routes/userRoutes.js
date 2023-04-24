const router = require("express").Router();
const {
  loginAdmin,
  loginUser,
  registerUser,
  allUsers,
  getUser,
} = require("../controllers/userControllers");

router.get("/", allUsers);
router.get("/:username", getUser);
router.post("/login", loginUser);
router.post("/admin", loginAdmin)
router.post("/register", registerUser);

module.exports = router;
