use meme_airlines;
drop table if exists Possiede, FaParteDel, Effettua, Usa, Prodotto, Dipendente, InterventoDiManutenzione, DatiDiAcquisto, Biglietto, Menu, ServizioDiCatering, Volo, Aeromobile, Fornitore, Cliente;

create table Cliente (
    ID int primary key auto_increment,
    Nome char(50) not null,
    Cognome char(50) not null,
    Data_di_nascita date not null,
    Genere char(1) not null,
    Telefono char(10) not null,
    Email char(50) not null
);

create table Fornitore(
    Partita_IVA char(11) primary key,
    Denominazione char(50) not null,
    Nome char(50) not null,
    Cognome char(50) not null,
    Email char(50) not null,
    Telefono char(10) not null
);

create table Aeromobile(
    ID int primary key auto_increment,
    Modello char(50) not null,
    Capacita int not null,
    Costo float not null,
    Data_di_acquisto datetime not null,
    Fornitore char(11) not null,
    foreign key(Fornitore) references Fornitore(Partita_IVA),
    check(Costo >= 0),
    check(Capacita > 0)
);

create table Volo (
    ID int primary key auto_increment,
    Origine char(50) not null,
    Destinazione char(50) not null,
    Partenza_prevista datetime not null,
    Arrivo_previsto datetime not null,
    Partenza_effettiva datetime,
    Arrivo_effettivo datetime,
    Stato char(50) not null,
    Aeromobile int not null,
    foreign key(Aeromobile) references Aeromobile(ID),
    check(Stato in ('pianificato', 'in volo', 'completato', 'cancellato')),
    check(Partenza_prevista < Arrivo_previsto),
    check(Partenza_effettiva < Arrivo_effettivo),
    check(Destinazione != Origine)
);

create table ServizioDiCatering(
    ID int primary key auto_increment,
    Nome char(50) not null,
    Fornitore char(11) not null,
    foreign key(Fornitore) references Fornitore(Partita_IVA)
);

create table Menu(
    Nome char(50) not null,
    ServizioDiCatering int not null,
    Prezzo float not null,
    Descrizione text not null,
    Tipo_di_cucina char(50) not null,
    Allergeni char(50) not null,
    Carboidrati float not null,
    Sale float not null,
    Proteine float not null,
    Grassi float not null,
    Fibre float not null,
    foreign key(ServizioDiCatering) references ServizioDiCatering(ID),
    primary key(Nome, ServizioDiCatering),
    check(Prezzo >= 0)
);

create table Biglietto(
    ID int primary key auto_increment,
    Stato char(50) not null,
    Posto char(50) not null,
    Classe char(50) not null,
    Orario_check_in datetime not null,
    Cliente int not null,
    Volo int not null,
    Menu char(50),
    ServizioDiCatering int,
    foreign key(Cliente) references Cliente(ID),
    foreign key(Volo) references Volo(ID),
    foreign key(Menu,ServizioDiCatering) references Menu(Nome,ServizioDiCatering),
    check(Stato in ('pianificato', 'attivo', 'cancellato', 'rimborsato'))
);

create table DatiDiAcquisto(
    Biglietto int primary key,
    Prezzo_pagato float not null,
    Data_di_acquisto datetime not null,
    Coordinate_di_pagamento char(50) not null,
    Rimborsato boolean not null,
    foreign key(Biglietto) references Biglietto(ID),
    check(Prezzo_pagato >= 0)
);

create table InterventoDiManutenzione(
    ID int primary key auto_increment,
    Tipo char(50) not null,
    Data datetime not null,
    Durata int not null,
    Aeromobile int not null,
    foreign key(Aeromobile) references Aeromobile(ID),
    check(Durata > 0)
);

create table Dipendente(
    ID int primary key auto_increment,
    Nome char(50) not null,
    Cognome char(50) not null,
    Ruolo char(50) not null,
    Compenso_orario float not null,
    Ore_annuali_previste int
);

create table Prodotto(
    Nome char(50) not null ,
    Fornitore char(11) not null,
    Numero float not null,
    Unita_di_misura char(20) not null,
    foreign key(Fornitore) references Fornitore(Partita_IVA),
    primary key(Nome, Fornitore),
    check(Numero >= 0)
);

create table Usa(
    InterventoDiManutenzione int,
    Fornitore char(11),
    Prodotto char(50),
    Quantita float not null,
    foreign key(InterventoDiManutenzione) references InterventoDiManutenzione(ID),
    foreign key(Fornitore,Prodotto) references Prodotto(Fornitore,Nome),
    primary key(InterventoDiManutenzione, Fornitore, Prodotto),
    check(Quantita > 0)
);

create table Effettua(
    InterventoDiManutenzione int,
    Dipendente int,
    foreign key(InterventoDiManutenzione) references InterventoDiManutenzione(ID),
    foreign key(Dipendente) references Dipendente(ID),
    primary key(InterventoDiManutenzione, Dipendente)
);

create table FaParteDel(
    Volo int,
    Dipendente int,
    foreign key(Volo) references Volo(ID),
    foreign key(Dipendente) references Dipendente(ID),
    primary key(Volo, Dipendente)
);

create table Possiede(
    Volo int,
    ServizioDiCatering int,
    Tempi_di_carico int not null,
    Orario_di_carico datetime not null,
    Specifiche_di_conservazione text not null,
    foreign key(Volo) references Volo(ID),
    foreign key(ServizioDiCatering) references ServizioDiCatering(ID),
    primary key(Volo, ServizioDiCatering),
    check(Tempi_di_carico > 0)
);





-- Inserimenti per la tabella Cliente
INSERT INTO Cliente (Nome, Cognome, Data_di_nascita, Genere, Telefono, Email) VALUES
('Mario', 'Rossi', '1985-05-15', 'M', '1234567890', 'mario.rossi@example.com'),
('Anna', 'Bianchi', '1990-08-22', 'F', '0987654321', 'anna.bianchi@example.com'),
('Luca', 'Verdi', '1988-03-12', 'M', '2345678901', 'luca.verdi@example.com'),
('Giulia', 'Neri', '1995-07-10', 'F', '3456789012', 'giulia.neri@example.com'),
('Marco', 'Blu', '1982-11-23', 'M', '4567890123', 'marco.blu@example.com'),
('Sara', 'Rossi', '1993-05-05', 'F', '5678901234', 'sara.rossi@example.com'),
('Francesco', 'Bianchi', '1980-09-14', 'M', '6789012345', 'francesco.bianchi@example.com'),
('Elena', 'Verdi', '1996-02-28', 'F', '7890123456', 'elena.verdi@example.com'),
('Andrea', 'Gialli', '1991-04-18', 'M', '8901234567', 'andrea.gialli@example.com'),
('Martina', 'Viola', '1989-12-30', 'F', '9012345678', 'martina.viola@example.com');

-- Inserimenti per la tabella Fornitore
INSERT INTO Fornitore (Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono) VALUES
('12345678901', 'Forniture Aeree S.p.A.', 'Giuseppe', 'Verdi', 'giuseppe.verdi@fornitureaeree.com', '1122334455'),
('09876543210', 'Catering Pro S.r.l.', 'Lucia', 'Neri', 'lucia.neri@cateringpro.com', '5566778899'),
('11112222333', 'Ricambi Volanti S.p.A.', 'Alberto', 'Bianchi', 'alberto.bianchi@ricambivolanti.com', '6677889900'),
('44445555666', 'Sky Supplies S.r.l.', 'Franco', 'Blu', 'franco.blu@skysupplies.com', '7788990011'),
('77778888999', 'Tech Air S.r.l.', 'Claudio', 'Verdi', 'claudio.verdi@techair.com', '8899001122'),
('22223333444', 'Catering & Co.', 'Laura', 'Rossi', 'laura.rossi@cateringco.com', '9900112233'),
('33334444555', 'Air Tech Group', 'Paolo', 'Gialli', 'paolo.gialli@airtechgroup.com', '1011121314'),
('66667777888', 'Volare S.r.l.', 'Mario', 'Neri', 'mario.neri@volaresrl.com', '1415161718'),
('88889999000', 'Fly High S.p.A.', 'Stefano', 'Blu', 'stefano.blu@flyhigh.com', '1516171819'),
('99990000111', 'Aero Supplies S.p.A.', 'Luigi', 'Bianchi', 'luigi.bianchi@aerosupplies.com', '1718192021');

-- Inserimenti per la tabella Aeromobile
INSERT INTO Aeromobile (Modello, Capacita, Costo, Data_di_acquisto, Fornitore) VALUES
('Boeing 737', 200, 80000000.00, '2020-01-15 10:30:00', '12345678901'),
('Airbus A320', 180, 75000000.00, '2019-06-10 14:00:00', '12345678901'),
('Embraer E190', 100, 40000000.00, '2021-03-12 11:45:00', '09876543210'),
('Boeing 747', 400, 150000000.00, '2018-09-25 08:00:00', '11112222333'),
('Airbus A380', 500, 250000000.00, '2017-07-18 09:30:00', '44445555666'),
('Cessna 172', 4, 300000.00, '2022-11-15 12:00:00', '77778888999'),
('Bombardier CRJ700', 78, 37000000.00, '2020-05-22 16:00:00', '22223333444'),
('Dassault Falcon 8X', 14, 58000000.00, '2021-08-11 10:30:00', '33334444555'),
('Gulfstream G650', 18, 65000000.00, '2019-12-05 14:00:00', '66667777888'),
('Piper PA-28', 4, 250000.00, '2023-01-01 09:00:00', '88889999000');

-- Inserimenti per la tabella Volo
INSERT INTO Volo (Origine, Destinazione, Partenza_prevista, Arrivo_previsto, Stato, Aeromobile) VALUES
('Roma', 'Milano', '2025-01-15 08:00:00', '2025-01-15 09:30:00', 'pianificato', 1),
('Napoli', 'Torino', '2025-01-16 10:00:00', '2025-01-16 11:45:00', 'pianificato', 2),
('Venezia', 'Firenze', '2025-01-17 13:00:00', '2025-01-17 14:15:00', 'pianificato', 3),
('Palermo', 'Bologna', '2025-01-18 07:30:00', '2025-01-18 09:00:00', 'pianificato', 4),
('Cagliari', 'Verona', '2025-01-19 12:00:00', '2025-01-19 13:30:00', 'pianificato', 5),
('Genova', 'Trieste', '2025-01-20 15:00:00', '2025-01-20 16:30:00', 'pianificato', 6),
('Pisa', 'Bari', '2025-01-21 09:00:00', '2025-01-21 10:45:00', 'pianificato', 7),
('Perugia', 'Catania', '2025-01-22 16:00:00', '2025-01-22 18:00:00', 'pianificato', 8),
('Reggio Calabria', 'Ancona', '2025-01-23 11:00:00', '2025-01-23 12:45:00', 'pianificato', 9),
('Lamezia Terme', 'Parma', '2025-01-24 14:00:00', '2025-01-24 15:30:00', 'pianificato', 10);
INSERT INTO Volo (Origine, Destinazione, Partenza_prevista, Arrivo_previsto, Stato, Aeromobile, Partenza_effettiva, Arrivo_effettivo) VALUES
('Roma', 'Milano', '2025-01-15 08:00:00', '2025-01-15 09:30:00', 'completato', 1, '2025-01-15 08:00:00', '2025-01-15 09:30:00');


-- Inserimenti per la tabella ServizioDiCatering
INSERT INTO ServizioDiCatering (Nome, Fornitore) VALUES
('Catering Premium', '09876543210'),
('Catering Standard', '09876543210'),
('Deluxe Service', '22223333444'),
('Eco Catering', '33334444555'),
('Luxury Bites', '66667777888'),
('Budget Meals', '88889999000'),
('Organic Foods', '77778888999'),
('Regional Delights', '12345678901'),
('Sky Snacks', '11112222333'),
('First Class Dining', '44445555666');

-- Inserimenti per la tabella Menu
INSERT INTO Menu (Nome, ServizioDiCatering, Prezzo, Descrizione, Tipo_di_cucina, Allergeni, Carboidrati, Sale, Proteine, Grassi, Fibre) VALUES
('Menu Vegano', 1, 15.00, 'Menu vegano con ingredienti biologici', 'Vegano', 'Nessuno', 50.0, 2.0, 10.0, 5.0, 8.0),
('Menu Classico', 2, 12.00, 'Menu classico con opzioni tradizionali', 'Tradizionale', 'Glutine', 60.0, 3.0, 15.0, 10.0, 5.0),
('Menu Gluten Free', 3, 18.00, 'Menu senza glutine', 'Senza Glutine', 'Nessuno', 55.0, 2.5, 12.0, 6.0, 7.0),
('Menu Gourmet', 4, 25.00, 'Menu gourmet di alta qualità', 'Gourmet', 'Lattosio', 40.0, 1.5, 20.0, 8.0, 6.0),
('Menu Light', 5, 10.00, 'Menu leggero e salutare', 'Leggero', 'Nessuno', 30.0, 1.0, 8.0, 4.0, 5.0),
('Menu Bio', 6, 20.00, 'Menu biologico certificato', 'Biologico', 'Nessuno', 45.0, 2.0, 11.0, 5.0, 7.0),
('Menu Regionale', 7, 16.00, 'Piatti regionali tradizionali', 'Tradizionale', 'Glutine', 65.0, 3.5, 13.0, 9.0, 4.0),
('Menu Internazionale', 8, 22.00, 'Specialità internazionali', 'Internazionale', 'Frutta a guscio', 50.0, 2.5, 15.0, 6.0, 6.0),
('Menu Marino', 9, 19.00, 'Piatti a base di pesce', 'Marino', 'Pesce', 40.0, 2.0, 18.0, 7.0, 5.0),
('Menu Kids', 10, 8.00, 'Menu per bambini', 'Kids', 'Glutine', 70.0, 3.0, 10.0, 5.0, 6.0);

-- Inserimenti per la tabella Biglietto
INSERT INTO Biglietto (Stato, Posto, Classe, Orario_check_in, Cliente, Volo, Menu, ServizioDiCatering) VALUES
('pianificato', '12A', 'Economy', '2025-01-15 06:00:00', 1, 1, 'Menu Vegano', 1),
('pianificato', '14B', 'Business', '2025-01-16 08:00:00', 2, 2, 'Menu Classico', 2),
('pianificato', '15C', 'Economy', '2025-01-17 11:00:00', 3, 3, 'Menu Gluten Free', 3),
('pianificato', '16D', 'First Class', '2025-01-18 05:30:00', 4, 4, 'Menu Gourmet', 4),
('pianificato', '18E', 'Economy', '2025-01-19 09:00:00', 5, 5, 'Menu Light', 5),
('pianificato', '19F', 'Business', '2025-01-20 12:30:00', 6, 6, 'Menu Bio', 6),
('pianificato', '21G', 'First Class', '2025-01-21 07:00:00', 7, 7, 'Menu Regionale', 7),
('pianificato', '22H', 'Economy', '2025-01-22 14:00:00', 8, 8, 'Menu Internazionale', 8),
('pianificato', '24I', 'Business', '2025-01-23 10:30:00', 9, 9, 'Menu Marino', 9),
('pianificato', '25J', 'First Class', '2025-01-24 13:00:00', 10, 10, 'Menu Kids', 10);

-- Inserimenti per la tabella DatiDiAcquisto
INSERT INTO DatiDiAcquisto (Biglietto, Prezzo_pagato, Data_di_acquisto, Coordinate_di_pagamento, Rimborsato) VALUES
(1, 100.00, '2025-01-10 15:00:00', 'VISA1234', false),
(2, 200.00, '2025-01-11 16:00:00', 'MC5678', false),
(3, 150.00, '2025-01-12 14:00:00', 'VISA9012', false),
(4, 300.00, '2025-01-13 18:00:00', 'MC3456', false),
(5, 90.00, '2025-01-14 13:00:00', 'AMEX7890', false),
(6, 220.00, '2025-01-15 17:00:00', 'VISA5678', false),
(7, 350.00, '2025-01-16 11:00:00', 'MC1234', false),
(8, 180.00, '2025-01-17 12:00:00', 'AMEX3456', false),
(9, 250.00, '2025-01-18 14:00:00', 'VISA7890', false),
(10, 50.00, '2025-01-19 10:00:00', 'MC9012', false);

-- Inserimenti per la tabella InterventoDiManutenzione
INSERT INTO InterventoDiManutenzione (Tipo, Data, Durata, Aeromobile) VALUES
('Ispezione di Routine', '2025-01-10 09:00:00', 3, 1),
('Riparazione Motore', '2025-01-15 14:00:00', 8, 2),
('Sostituzione Componenti', '2025-01-20 10:30:00', 5, 3),
('Pulizia Profonda', '2025-01-25 11:00:00', 4, 4),
('Aggiornamento Software', '2025-02-01 13:00:00', 2, 5),
('Controllo Freni', '2025-02-05 15:00:00', 3, 6),
('Ispezione Elettrica', '2025-02-10 09:00:00', 6, 7),
('Sostituzione Pneumatici', '2025-02-15 08:00:00', 2, 8),
('Controllo Cablaggi', '2025-02-20 16:00:00', 5, 9),
('Riparazione Ala', '2025-02-25 14:30:00', 10, 10);

-- Inserimenti per la tabella Dipendente
INSERT INTO Dipendente (Nome, Cognome, Ruolo, Compenso_orario, Ore_annuali_previste) VALUES
('Giovanni', 'Rossi', 'Pilota', 50.00, NULL),
('Elisa', 'Bianchi', 'Assistente di Volo', 20.00, NULL),
('Marco', 'Verdi', 'Tecnico di Manutenzione', 30.00, NULL),
('Anna', 'Neri', 'Personale di Terra', 55.00, 2000),
('Luca', 'Blu', 'Assistente di Volo', 18.00, NULL),
('Francesca', 'Gialli', 'Tecnico di Manutenzione', 28.00, NULL),
('Paolo', 'Viola', 'Pilota', 60.00, NULL),
('Sara', 'Rosa', 'Assistente di Volo', 22.00, NULL),
('Giorgio', 'Marrone', 'Tecnico di Manutenzione', 35.00, NULL),
('Clara', 'Celeste', 'Pilota', 65.00, NULL);

-- Inserimenti per la tabella Prodotto
INSERT INTO Prodotto (Nome, Fornitore, Numero, Unita_di_misura) VALUES
('Olio per Motori', '12345678901', 500, 'litri'),
('Pneumatici', '09876543210', 100, 'unità'),
('Viti e Bulloni', '11112222333', 2000, 'pezzi'),
('Liquido Freni', '44445555666', 300, 'litri'),
('Cavi Elettrici', '77778888999', 1000, 'metri'),
('Filtri Aria', '22223333444', 150, 'unità'),
('Lubrificante', '33334444555', 600, 'litri'),
('Componenti Ala', '66667777888', 50, 'pezzi'),
('Sensori di Volo', '88889999000', 20, 'unità'),
('Software di Navigazione', '99990000111', 10, 'licenze');

-- Inserimenti per la tabella Usa
INSERT INTO Usa (InterventoDiManutenzione, Fornitore, Prodotto, Quantita) VALUES
(1, '12345678901', 'Olio per Motori', 50),
(2, '09876543210', 'Pneumatici', 4),
(3, '11112222333', 'Viti e Bulloni', 300),
(4, '44445555666', 'Liquido Freni', 20),
(5, '77778888999', 'Cavi Elettrici', 200),
(6, '22223333444', 'Filtri Aria', 10),
(7, '33334444555', 'Lubrificante', 30),
(8, '66667777888', 'Componenti Ala', 5),
(9, '88889999000', 'Sensori di Volo', 2),
(10, '99990000111', 'Software di Navigazione', 1);

-- Inserimenti per la tabella Effettua
INSERT INTO Effettua (InterventoDiManutenzione, Dipendente) VALUES
(1, 3),
(2, 3),
(3, 6),
(4, 6),
(5, 9),
(6, 9),
(7, 3),
(8, 6),
(9, 9),
(10, 3);

-- Inserimenti per la tabella FaParteDel
INSERT INTO FaParteDel (Volo, Dipendente) VALUES
(1, 1),
(1, 2),
(2, 4),
(2, 5),
(3, 1),
(3, 6),
(4, 4),
(4, 8),
(5, 7),
(5, 9);

-- 1. Inserire un nuovo volo disponibile
INSERT INTO Volo (Origine, Destinazione, Partenza_prevista, Arrivo_previsto, Stato, Aeromobile)
VALUES ();

-- 2. Inserire un nuovo cliente
INSERT INTO Cliente (Nome, Cognome, Data_di_nascita, Genere, Telefono, Email)
VALUES ();

-- 3. Vendere un biglietto
INSERT INTO Biglietto (Stato, Posto, Classe, Orario_check_in, Cliente, Volo, Menu, ServizioDiCatering)
VALUES ();

INSERT INTO DatiDiAcquisto (Biglietto, Prezzo_pagato, Data_di_acquisto, Coordinate_di_pagamento, Rimborsato)
VALUES ();

-- 4. Inserire un nuovo aeromobile acquistato
INSERT INTO Aeromobile (Modello, Capacita, Costo, Data_di_acquisto, Fornitore)
VALUES ();

-- 5. Inserire un nuovo dipendente
INSERT INTO Dipendente (Nome, Cognome, Ruolo, Compenso_orario, Ore_annuali_previste)
VALUES ();

-- 6. Inserire una nuova manutenzione
INSERT INTO InterventoDiManutenzione (Tipo, Data, Durata, Aeromobile)
VALUES ();

-- 7. Inserire un nuovo fornitore
INSERT INTO Fornitore (Partita_IVA, Denominazione, Nome, Cognome, Email, Telefono)
VALUES ();

-- 8. Assegnare un membro dell’equipaggio ad un volo
INSERT INTO FaParteDel (Volo, Dipendente)
VALUES ();

-- 9. Assegnare a un dipendente una manutenzione
INSERT INTO Effettua (InterventoDiManutenzione, Dipendente)
VALUES ();

-- 10. Visualizzare l’elenco dei passeggeri a bordo
SELECT Cliente.Nome, Cliente.Cognome
FROM Cliente
INNER JOIN Biglietto ON Cliente.ID = Biglietto.Cliente
WHERE Biglietto.Volo = 1 AND Biglietto.Stato IN ('pianificato', 'attivo');

-- 11. Visualizzare i biglietti acquistati da un utente e il relativo stato
SELECT Biglietto.Stato, Biglietto.Posto, Biglietto.Classe, DatiDiAcquisto.Prezzo_pagato
FROM Biglietto
INNER JOIN DatiDiAcquisto ON Biglietto.ID = DatiDiAcquisto.Biglietto
WHERE Biglietto.Cliente = 1;

-- 12. Calcolare il numero di ore di volo di un aeromobile


-- 13. Calcolare per il mese corrente il totale dell'incasso dei biglietti venduti
SELECT SUM(DatiDiAcquisto.Prezzo_pagato) AS Totale_Incasso
FROM DatiDiAcquisto
WHERE MONTH(DatiDiAcquisto.Data_di_acquisto) = MONTH(CURDATE()) AND YEAR(DatiDiAcquisto.Data_di_acquisto) = YEAR(CURDATE());

-- 14. Calcolare la paga per il mese corrente per un dipendente


-- 15. Visualizzare i menu disponibili per un volo



-- 16. Visualizzare la lista dei fornitori
SELECT * FROM Fornitore;

-- 17. Aggiornare lo stato del volo a cancellato
UPDATE Volo
SET Stato = 'cancellato'
WHERE ID = 1;
