# CRM Backend Structure

📂 crm-backend
├── 📂 config
│   ├── database.js           # MongoDB Connection
│   ├── jwtConfig.js          # JWT Configuration & Utils
│
├── 📂 models
│   ├── User.js               # User Schema & Model
│
├── 📂 routes
│   ├── authRoutes.js         # Authentication Routes
│   ├── userRoutes.js         # Protected User Routes
│
├── 📂 middleware
│   ├── authGuard.js          # Route Protection Middleware
│
├── 📂 controllers
│   ├── authController.js     # Authentication Controllers
│
├── .env                      # Environment Variables
├── server.js                 # Main Server Entry
├── package.json              # Dependencies
├── README.md                 # Documentation