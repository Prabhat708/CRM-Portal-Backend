const express = require('express');
const router = express.Router();
const XLSX = require("xlsx");
const db = require('../config/database'); // Database connection
// Get all leads
router.get('/all', async (req, res) => {
  try {
      const [all] = await db.query("SHOW CREATE TABLE leads");
      console.log(all)
      const [rows] = await db.query('SELECT * FROM leads'); 
      res.json({ success: true, leads: rows });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
      const { name, email, phone, whatsapp, college, degree, year_of_study, interested_domain, assigned, response } = req.body;
      //check that if same email present or not in db
      const [check] = await db.query("SELECT * FROM leads WHERE email = ?", [email])
      if (check.length > 0) {
        console.log('alredy exist')
        return res.status(400).json({success:false, message: "Email already exists" });
        }
      const query = "INSERT INTO leads (name, email, phone, whatsapp, college, degree, year_of_study, interested_domain, assigned, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const values = [name, email, phone, whatsapp, college, degree, year_of_study, interested_domain, assigned, response];
      const [result] = await db.query(query, values);
      res.json({ success: true, message: "Lead added successfully!" });
  } catch (err) {
      res.status(500).json({ success: false, error: err.message });
  }
});
router.put('/updateRes/:id', async (req, res) => {
  const leadId = req.params.id;
  const { response } = req.body;
  try{
    const query = "UPDATE leads SET response = ? WHERE id = ?";
    const [result] = await db.query(query,[response, leadId] );
    res.json({ success: true, message: "Response updated successfully!" });
  }
  catch(err){
    res.status(500).json({ success: false, error: err.message });
    }
});

router.put('/updateAss/:id', async (req, res) => {
  const leadId = req.params.id;
  const { assigned } = req.body;
  try{
    const query = "UPDATE leads SET assigned = ? WHERE id = ?";
    const [result] = await db.query(query,[assigned, leadId] );
    res.json({ success: true, message: "Successfully Updated!" });
  }
  catch(err){
    res.status(500).json({ success: false, error: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
  const leadId = req.params.id;
  try{
    const query = "DELETE FROM leads WHERE id = ?";
    const [result] = await db.query(query,[leadId] );
    res.json({ success: true, message: "Lead deleted successfully!" });
  }
  catch(err){
    res.status(500).json({ success: false, error: err.message });
  }
});
router.post("/upload", async (req, res) => {
  try {
    const { leads } = req.body;
    if (!leads || !Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or empty leads data" });
    }
    const newLeads = [];

    // Loop through each row
    for (const row of leads) {
      const {
        name = "-",
        email = "",
        phone = "-",
        whatsapp = "-",
        college = "-",
        degree = "-",
        year_of_study = "-",
        interested_domain = "-",
        assigned = "-",
        response = "-"
      } = row;
      
      if (!email.trim()) {
        continue;
      }
      // Check if the lead already exists (by email or phone)
      const [existingLead] = await db.query(
        "SELECT id FROM leads WHERE email = ? OR phone = ?", 
        [email, phone]
      );

      if (existingLead.length === 0) {
        // Insert new lead
        await db.query(
          "INSERT INTO leads (name, email, phone, whatsapp, college, degree, year_of_study, interested_domain, assigned, response) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [name, email, phone, whatsapp, college, degree, year_of_study, interested_domain, assigned, response]
        );
      }
    }

    res.json({ success: true, message: "File processed successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
