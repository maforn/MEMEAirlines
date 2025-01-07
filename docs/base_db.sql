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
    Menu char(50) not null,
    ServizioDiCatering int not null,
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
    Ore_annuali_previste int not null
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
    foreign key(Fornitore,Prodotto) references Prodotto(Nome,Fornitore),
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
