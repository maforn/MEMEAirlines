require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(express.static(path.join(__dirname, '../MEMEAirlinesClient/dist')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});