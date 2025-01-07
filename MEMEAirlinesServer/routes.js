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

router.get('/flights', (req, res) => {
  db.query('SELECT * FROM Volo ORDER BY Partenza_prevista DESC LIMIT 25', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching flights from database');
      return;
    }
    res.json(results);
  });
});

router.post('/flights', (req, res) => {
  const { aircraftId, origine, destinazione, partenzaPrevista, arrivoPrevisto } = req.body;
  const stato = 'pianificato';

  const query = `
    INSERT INTO Volo (Origine, Destinazione, Partenza_prevista, Arrivo_previsto, Stato, Aeromobile)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [origine, destinazione, partenzaPrevista, arrivoPrevisto, stato, aircraftId], (err, _) => {
    if (err) {
      res.status(500).send('Error adding flight to database');
      return;
    }
    res.status(201).send('Flight added successfully');
  });
});

module.exports = router;