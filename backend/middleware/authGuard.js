const { verifyToken } = require("../config/jwtConfig");
const User = require("../models/User");



const authGuard = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: "error", message: "Unauthorized: No Token" });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ status: "error", message: "Unauthorized: Invalid Token" });
    }

    // Find user in database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: "error", message: "Unauthorized: User Not Found" });
    }

    // Attach user details to request object
    req.user = user;
    next(); // Continue to the next middleware or route handler

  } catch (error) {
    res.status(401).json({ status: "error", message: "Unauthorized: Access Denied" });
  }
};

module.exports = authGuard;
