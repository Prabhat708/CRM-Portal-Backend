// models/User.js
const db = require("../config/database");
const bcrypt = require("bcryptjs");

class User {
  constructor({ name, email, password, role = "user" }) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async save() {
    try {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(this.password, 10);
      const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
      
      const [result] = await db.execute(query, [this.name, this.email, hashedPassword, this.role]);
      return result.insertId; // Return newly created user ID
    } catch (error) {
      throw error;
    }
  }
  static async findByEmail(email) {
    try {
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await db.execute(query, [email]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        throw error;
    }
}



  static async findById(id) {
    try {
      const [rows] = await db.execute("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      throw error;
    }
}


  static async comparePassword(plainPassword, hashedPassword) {

    return await bcrypt.compare(plainPassword,hashedPassword)
  }

  static async updateLastLogin(id) {
    try {
      await db.execute("UPDATE users SET lastLogin = NOW() WHERE id = ?", [id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
