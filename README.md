# MEMEAirlines
MEMEAirlines, a simple Vue, Nodejs and MySQL demonstration project.

## Project setup
Do the following to setup the project
```
cd MEMEAirlinesClient
npm install
```

```
cd MEMEAirlinesServer
npm install
```
And setup the mysql database, rember to import the relevant sql code from base_db.sql.
Then copy the **`.env.example`** to an **`.env`** file in the server directory and fill in the required fields.

Start the server by running
```
cd MEMEAirlinesServer
npm run dev
```
and the client by running
```
cd MEMEAirlinesClient
npm run dev
```

## Production server
Start the production server by switching to the deploy branch
```
git checkout deploy
```
building the client
```
cd MEMEAirlinesClient
npm run build
```
and running the server
```
cd MEMEAirlinesServer
npm run start
```