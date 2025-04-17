const express = require("express");
const { login, logout, verifyUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyUser, (req, res) => {
  res.json({ status: "success", user: req.user });
});

module.exports = router;
