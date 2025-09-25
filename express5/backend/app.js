 // app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const entryRoutes = require('./routes/entryRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Permitir requests desde frontend
app.use(express.json()); // Para parsear JSON en body

app.use('/', entryRoutes); // Usar rutas de entradas

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
