const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/all", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    res.json({ success: true, orders: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    product_name,
    price,
    quantity,
    order_date,
  } = req.body;
  try {
    const [customer] = await db.execute(
      "SELECT id, purchase_history FROM customers WHERE email = ?",
      [email]
    );
    let customer_id;
    let purchase_history;
    if (customer.length > 0) {
      // Customer exists, use their ID
      customer_id = customer[0].id;
      purchase_history = customer[0].purchase_history;
    } else {
      // Step 2: Insert new customer and get the ID
      const [newCustomer] = await db.execute(
        "INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)",
        [name, email, phone, address]
      );
      customer_id = newCustomer.insertId;
      purchase_history = ""; // New customer has no purchase history yet
    }
    //order process
    const [order] = await db.execute(
      "INSERT INTO orders (customer_id, name, email, phone, address, product_name, price, quantity, order_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [customer_id, name, email, phone, address, product_name, price, quantity, order_date || new Date()]
    );
    const order_id = order.insertId;
    // Update purchase history
    const updatedPurchaseHistory = purchase_history
      ? `${purchase_history},${order_id}`
      : `${order_id}`;
    
      await db.execute(
        "UPDATE customers SET purchase_history = ? WHERE id = ?",
        [updatedPurchaseHistory, customer_id]
      );
      res.status(201).json({ success: true, message: "Order placed successfully!"});
      
    
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  } 
  
});
router.get("/:orderId/invoice", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await db.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [orderId]
    );

    if (!order.length) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json({ success: true, order: order[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
