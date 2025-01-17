const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate db.js file for database connection

router.get('/aircrafts', (req, res) => {
  db.query('SELECT * FROM Aeromobile', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching aeromobiles from database');
      return;
    }
    res.json(results);
  });
});


router.get('/flightCrewAssignments', (req, res) => {
  db.query('SELECT * FROM FaParteDel', (err, results) => {
  if (err) {
      res.status(500).send('Error fetching flight crew employees from database');
      return;
    }
    res.json(results);
  });
});

router.get('/flights', (req, res) => {
  db.query('SELECT * FROM Volo ORDER BY Partenza_prevista DESC', (err, results) => {
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

// Fetch all employees
router.get('/employees', (req, res) => {
  db.query('SELECT * FROM Dipendente', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching employees from database');
      return;
    }
    res.json(results);
  });
});

router.post('/customers', (req, res) => {
  const { nome, cognome, data_di_nascita, genere, documento_identificativo, telefono, email } = req.body;

  const query = `
    INSERT INTO Cliente (Nome, Cognome, Data_di_nascita, Genere, Documento_identificativo, Telefono, Email)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, cognome, data_di_nascita, genere, documento_identificativo, telefono, email], (err, _) => {
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

router.get('/flightCrewEmployees', (req, res) => {
  db.query('SELECT * FROM Dipendente WHERE Ruolo = "Pilota" or Ruolo = "Assistente di Volo"', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching flight crew employees from database');
      return;
    }
    res.json(results);
  });
});

// Add a new assignment
router.post('/flightCrewAssignments', (req, res) => {
  const { flightId, employeeId } = req.body;

  const query = `
    INSERT INTO FaParteDel (Volo, Dipendente)
    VALUES (?, ?)
  `;

  db.query(query, [flightId, employeeId], (err, _) => {
    if (err) {
      res.status(500).send('Error adding assignment to database');
      return;
    }
    res.status(201).send('Assignment added successfully');
  });
});

router.get('/passengers', (req, res) => {
  const { flightId } = req.query;

  const query = `
    SELECT Cliente.Nome, Cliente.Cognome, Biglietto.Posto, Biglietto.Classe
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

// Add a new employee
router.post('/employees', (req, res) => {
  const { nome, cognome, ruolo, compensoOrario, oreAnnualiPreviste } = req.body;

  const query = `
    INSERT INTO Dipendente (Nome, Cognome, Ruolo, Compenso_orario, Ore_annuali_previste)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [nome, cognome, ruolo, compensoOrario, oreAnnualiPreviste || null], (err, _) => {
    if (err) {
      res.status(500).send('Error adding employee to database');
      return;
    }
    res.status(201).send('Employee added successfully');
  });
});

router.get('/monthlyPay/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  const query = `
  WITH OreVoli AS (
    SELECT
        partecipazioniVoli.Dipendente,
        SUM(TIMESTAMPDIFF(HOUR, v.Partenza_effettiva, v.Arrivo_effettivo)) AS ore_voli
    FROM
        FaParteDel partecipazioniVoli
    JOIN
        Volo v ON partecipazioniVoli.Volo = v.ID
    WHERE
        v.stato = 'completato'
        AND MONTH(v.Partenza_effettiva) = MONTH(CURRENT_DATE)
        AND YEAR(v.Partenza_effettiva) = YEAR(CURRENT_DATE)
    GROUP BY
        partecipazioniVoli.Dipendente,v.Partenza_effettiva,v.Arrivo_effettivo
  ),
  OreManutenzioni AS (
    SELECT
        effettuaManutenzioni.Dipendente,
        SUM(interventi.durata) AS ore_manutenzione
    FROM
        Effettua effettuaManutenzioni
    JOIN
        InterventoDiManutenzione interventi ON effettuaManutenzioni.InterventoDiManutenzione = interventi.ID
    WHERE
        MONTH(interventi.Data) = MONTH(CURRENT_DATE)
        AND YEAR(interventi.Data) = YEAR(CURRENT_DATE)
    GROUP BY
        effettuaManutenzioni.Dipendente
  )
  SELECT
    d.ID,
    d.Ruolo,
    d.Nome,
    d.Cognome,
    CASE
        WHEN d.Ruolo = 'Personale di Terra' THEN d.Ore_annuali_previste / 12 * d.Compenso_orario
        WHEN d.Ruolo = 'Pilota' or d.Ruolo = 'Assistente di Volo' THEN COALESCE(ov.ore_voli, 0) * d.Compenso_orario
        WHEN d.Ruolo = 'Tecnico di Manutenzione' THEN COALESCE(om.ore_manutenzione, 0) * d.Compenso_orario
        ELSE 0
    END AS Paga_mensile
  FROM
    Dipendente d
  LEFT JOIN
    OreVoli ov ON d.ID = ov.Dipendente
  LEFT JOIN
    OreManutenzioni om ON d.ID = om.Dipendente
  WHERE
    d.ID = ?
  `

  db.query(query, [employeeId], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving employee\'s monthly pay');
      return;
    }
    res.json(results);
  });
});

// Fetch all maintainers
router.get('/maintenteers', (req, res) => {
  db.query('SELECT * FROM Dipendente WHERE Ruolo = "Tecnico di Manutenzione"', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching maintainers from database');
      return;
    }
    res.json(results);
  });
});

// Fetch all maintenance tasks
router.get('/maintenances', (req, res) => {
  db.query('SELECT * FROM InterventoDiManutenzione', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching maintenance tasks from database');
      return;
    }
    res.json(results);
  });
});

// Fetch all assignments
router.get('/assignments', (req, res) => {
  db.query('SELECT * FROM Effettua', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching assignments from database');
      return;
    }
    res.json(results);
  });
});

// Add a new assignment
router.post('/assignments', (req, res) => {
  const { maintenanceId, employeeId } = req.body;

  const query = `
    INSERT INTO Effettua (InterventoDiManutenzione, Dipendente)
    VALUES (?, ?)
  `;

  db.query(query, [maintenanceId, employeeId], (err, _) => {
    if (err) {
      res.status(500).send('Error adding assignment to database');
      return;
    }
    res.status(201).send('Assignment added successfully');
  });
});

// Fetch menus by flight ID
router.get('/flights/:flightId/menus', (req, res) => {
  const flightId = req.params.flightId;
  const query = `
    SELECT Menu.Nome, Menu.Descrizione, Menu.Prezzo
    FROM Menu JOIN Possiede ON Possiede.ServizioDiCatering = Menu.ServizioDiCatering
    WHERE Possiede.Volo = ?
  `;

  db.query(query, [flightId], (err, results) => {
    if (err) {
      res.status(500).send(['Error fetching menus for flight from database', err]);
      return;
    }
    res.json(results);
  });
});



router.post('/flights/:flightId/cancel', (req, res) => {
  const flightId = req.params.flightId;
  const cancelFlightQuery = `
    UPDATE Volo
    SET Stato = 'cancellato'
    WHERE ID = ?;
  `;
  const cancelTicketsQuery = `
    UPDATE Biglietto
    SET Stato = 'cancellato'
    WHERE Volo = ?;
  `;

  db.beginTransaction(err => {
    if (err) {
      res.status(500).send('Error starting transaction');
      return;
    }

    db.query(cancelFlightQuery, [flightId], (err, _) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).send('Error cancelling flight');
        });
      }

      db.query(cancelTicketsQuery, [flightId], (err, _) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).send('Error cancelling tickets');
          });
        }

        db.commit(err => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send('Error committing transaction');
            });
          }
          res.send('Flight and tickets cancelled successfully');
        });
      });
    });
  });
});

// Fetch all tickets by flight ID
router.get('/flights/:flightId/tickets', (req, res) => {
  const flightId = req.params.flightId;
  const query = `
    SELECT Biglietto.ID, Biglietto.Stato, Biglietto.Posto, Biglietto.Classe, Biglietto.Orario_check_in, Cliente.Nome, Cliente.Cognome
    FROM Biglietto
    INNER JOIN Cliente ON Biglietto.Cliente = Cliente.ID
    WHERE Biglietto.Volo = ?
  `;

  db.query(query, [flightId], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching tickets for flight from database');
      return;
    }
    res.json(results);
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

router.get('/suppliers', (req, res) => {
  db.query('SELECT * FROM Fornitore', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching suppliers from database');
            return;
        }
        res.json(results);
    });
});

router.get('/suppliers/:tipo', (req, res) => {
    const { tipo } = req.params;
    const query = 'SELECT * FROM Fornitore WHERE Tipo = ?';
    db.query(query, [tipo], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching suppliers from database');
            return;
        }
        res.json(results);
    });
});

router.post('/supplier', (req, res) => {
    const {Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono, Tipo} = req.body;
    const queryFornitore = `INSERT INTO Fornitore (Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono, Tipo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(queryFornitore, [Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono, Tipo], (err, _) => {
        if (err) {
            res.status(500).send(['Error adding supplier to database', err]);
            return;
        }
        res.status(201).send('Supplier added successfully');
    });
});

router.get('/user-tickets', (req, res) => {

    const query = `SELECT Biglietto.Stato, Biglietto.Posto, Biglietto.Classe, DatiDiAcquisto.Prezzo_pagato, Volo.Origine, Volo.Destinazione, Volo.Partenza_prevista, Volo.Arrivo_previsto
                   FROM Biglietto
                            INNER JOIN DatiDiAcquisto ON Biglietto.ID = DatiDiAcquisto.Biglietto
                            INNER JOIN Volo ON Biglietto.Volo = Volo.ID
                   WHERE Biglietto.Cliente = ?;`;

    db.query(query, [req.query.cliente], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching user tickets from database');
            return;
        }
        res.json(results);
    });
});

router.get('/monthly-revenue', (req, res) => {
    const query = `SELECT SUM(DatiDiAcquisto.Prezzo_pagato) AS Totale_Incasso
                   FROM DatiDiAcquisto
                   WHERE MONTH(DatiDiAcquisto.Data_di_acquisto) = MONTH(CURDATE()) AND YEAR(DatiDiAcquisto.Data_di_acquisto) = YEAR(CURDATE());`;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching monthly revenue from database');
            return;
        }
        res.json(results);
    });
});
module.exports = router;