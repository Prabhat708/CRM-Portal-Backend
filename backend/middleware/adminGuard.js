const User = require("../models/User");

const adminGuard = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ status: "error", message: "Access denied" });
        }
        next();
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server error" });
    }
};

module.exports = adminGuard;
