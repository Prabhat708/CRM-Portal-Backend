// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const protectRoute = require('../middleware/authGuard');
const adminGuard = require("../middleware/adminGuard");
const router = express.Router();

router.post("/add", protectRoute, adminGuard, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }
        const newUser = new User({ name, email, password, role: role || "user" });
        await newUser.save();
        res.json({ status: "success", message: "User added successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

module.exports = router;