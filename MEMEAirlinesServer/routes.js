const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate db.js file for database connection

router.get('/aircrafts', (req, res) => {
  db.query('SELECT ID, MODELLO FROM Aeromobile', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching aeromobiles from database');
      return;
    }
    res.json(results);
  });
});

module.exports = router;