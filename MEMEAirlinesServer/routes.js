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

router.post('/sellTicket', (req, res) => {

  const queryBiglietto = `
    INSERT INTO Biglietto (Stato, Posto, Classe, Orario_check_in, Cliente, Volo, Menu, ServizioDiCatering)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const queryDatiAcquisto = `
    INSERT INTO DatiDiAcquisto (Biglietto, Prezzo_pagato, Data_di_acquisto, Coordinate_di_pagamento, Rimborsato)
    VALUES (?, ?, ?, ?, ?);
  `;

  const { posto, classe, cliente, volo, menu, servizioDiCatering, prezzoPagato,  coordinateDiPagamento } = req.body;

  const stato = 'pianificato';
  const orarioCheckIn = (new Date());
  const dataDiAcquisto = new Date();
  const rimborsato = false;
  db.query(queryBiglietto, [stato, posto, classe, orarioCheckIn, cliente, volo, menu, servizioDiCatering], (err, results) => {
      if (err) {
          console.log(err);

        res.status(500).send('Error adding ticket to database');
        return;
      }
      db.query(queryDatiAcquisto, [results.insertId, prezzoPagato, dataDiAcquisto, coordinateDiPagamento, rimborsato], (err, _) => {
        if (err) {
          res.status(500).send('Error adding purchase data to database');
          return;
        }
        res.status(201).send('Ticket added successfully');
      });
    });
});

router.get('/menu', (req, res) => {
    db.query('select  Menu.Nome,Menu.ServizioDiCatering from Menu,Possiede,ServizioDiCatering where Possiede.Volo=? and Possiede.ServizioDiCatering=ServizioDiCatering.ID and ServizioDiCatering.ID=Menu.ServizioDiCatering;',[req.query.volo], (err, results) => {
        if (err) {
        res.status(500).send('Error fetching menu from database');
        return;
        }
        res.json(results);
    });
});

router.get('/customers', (req, res) => {
    db.query('SELECT * FROM Cliente', (err, results) => {
        if (err) {
        res.status(500).send('Error fetching customers from database');
        return;
        }
        res.json(results);
    });
});

router.get('/suppliers', (req, res) => {
    db.query('SELECT * FROM Fornitore', (err, results) => {
        if (err) {
        res.status(500).send('Error fetching suppliers from database');
        return;
        }
        res.json(results);
    });
});

router.post('/supplier', (req, res) => {
    const {Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono} = req.body;
    console.log(req.body);
    const queryFornitore = `INSERT INTO Fornitore (Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(queryFornitore, [Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono], (err, _) => {
        if (err) {
            res.status(500).send('Error adding supplier to database');
            return;
        }
        res.status(201).send('Supplier added successfully');
    });
});

module.exports = router;