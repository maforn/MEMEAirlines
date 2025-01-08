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

router.get('/customers', (req, res) => {
  db.query('SELECT * FROM Cliente ORDER BY ID DESC', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching customers from database');
      return;
    }
    res.json(results);
  });
});

router.post('/customers', (req, res) => {
  const { nome, cognome, data_di_nascita, genere, telefono, email } = req.body;

  const query = `
    INSERT INTO Cliente (Nome, Cognome, Data_di_nascita, Genere, Telefono, Email)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, cognome, data_di_nascita, genere, telefono, email], (err, _) => {
    if (err) {
      res.status(500).send('Error adding customer to database');
      return;
    }
    res.status(201).send('Customer added successfully');
  });
});

router.get('/maintenances', (req, res) => {
  db.query('SELECT * FROM InterventoDiManutenzione ORDER BY ID DESC', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching maintenance records from database');
      return;
    }
    res.json(results);
  });
});

router.post('/maintenances', (req, res) => {
  const { tipo, data, durata, aeromobile } = req.body;

  const query = `
    INSERT INTO InterventoDiManutenzione (Tipo, Data, Durata, Aeromobile)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [tipo, data, durata, aeromobile], (err, _) => {
    if (err) {
      res.status(500).send('Error adding maintenance record to database');
      return;
    }
    res.status(201).send('Maintenance record added successfully');
  });
});

router.get('/passengers', (req, res) => {
  const { flightId } = req.query;

  const query = `
    SELECT Cliente.Nome, Cliente.Cognome
    FROM Cliente
    INNER JOIN Biglietto ON Cliente.ID = Biglietto.Cliente
    WHERE Biglietto.Volo = ? AND Biglietto.Stato IN ('pianificato', 'attivo')
  `;

  db.query(query, [flightId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching passengers from database');
      return;
    }
    res.json(results);
  });
});

router.get('/flighthours', (req, res) => {
  const { aircraftId } = req.query;

  const query = `
    SELECT SUM(TIMESTAMPDIFF(Minute, Partenza_effettiva, Arrivo_effettivo)) AS flightMinutes
    FROM Volo
    WHERE Aeromobile = ? AND Stato = 'completato'
  `;

  db.query(query, [aircraftId], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching flight hours from database');
      return;
    }
    const flightMinutes = results[0]['flightMinutes'];
    const hours = (flightMinutes / 60).toFixed(2);
    res.json({ hours });
  });
});

module.exports = router;