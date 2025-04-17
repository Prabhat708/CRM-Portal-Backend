// controllers/authController.js
const User = require("../models/User");
const { generateToken, verifyToken } = require("../config/jwtConfig");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required",
      });
    }

    // Find user in the database
    const user = await User.findByEmail(email);
    if (!user || !(await User.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    // Update last login
    await User.updateLastLogin(user.id);

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    // Set HTTP-Only Cookie

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Change to true in production (HTTPS)
      sameSite: "lax",
      path: "/", // Ensure it's accessible everywhere
      maxAge: 3600000, // 1 hour expiration
    });
    
    res.json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token:token,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Login error",
    });
  }
};

// Logout function
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: "error", message: "Unauthorized" });
    }
    // Verify the token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({ status: "error", message: "Invalid Token" });
    }

    // Find user by ID and ensure role is included
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    req.user = { ...user, role: decoded.role }; // Ensure role is passed
    res.json({ status: "success", user: req.user });
  } catch (error) {
    res.json({ status: "error", message: " You're Unauthorized" });
  }
};

module.exports = { login, logout, verifyUser };
