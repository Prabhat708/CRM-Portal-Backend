const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const ordersRouters=require('./routes/ordersRoutes');
const customersRoutes=require('./routes/customersRoutes');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// 🔹 Fix CORS issues
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend origin
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow JWT in headers
}));



// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/orders',ordersRouters);
app.use('/api/customers',customersRoutes);

app.get("/check-cookie", (req, res) => {
    console.log("🔍 Raw Cookies:", req.headers.cookie);
    console.log("✅ Parsed Cookies:", req.cookies);
    console.log("✅ Parsed Cookies token:", req.cookies.token);
    res.json({ token: req.cookies.token || "No token received" });
  });  
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));