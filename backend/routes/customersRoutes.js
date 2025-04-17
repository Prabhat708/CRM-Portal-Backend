const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/all', async (req, res) => {
  try {
      const [rows] = await db.query('SELECT * FROM customers'); 
      res.json({ success: true, customers: rows });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
router.get("/:customerId/orders", async (req, res) => {
  const customerId = req.params.customerId;

  try {
      const customerQuery = `SELECT * FROM customers WHERE id = ?`;
      const [customerRows] = await db.query(customerQuery, [customerId]);

      if (customerRows.length === 0) {
          return res.status(404).json({ success: false, error: "Customer not found" });
      }
      const ordersQuery = `SELECT * FROM orders WHERE customer_id = ?`;
      const [orderRows] = await db.query(ordersQuery, [customerId]);

      res.json({ success: true, customer: customerRows[0], orders: orderRows });
  } catch (error) {
      res.status(500).json({ success: false, error: "Server error" });
  }
});


module.exports = router;
