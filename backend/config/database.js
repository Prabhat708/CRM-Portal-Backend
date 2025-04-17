const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost", 
  user: "root", 
  password: "Prabhat@2003", 
  database: "crm_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Database Connected Successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:", err);
  }
})();

module.exports = db;
