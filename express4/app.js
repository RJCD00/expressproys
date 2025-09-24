 
// app.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // Carga .env

const entryController = require('./controllers/entryController');

const app = express();
const port = process.env.PORT || 3000; // Uso de env var para puerto

// Middleware
app.use(express.urlencoded({ extended: true })); // Para parsear forms
app.use(express.static(path.join(__dirname, 'public'))); // Servir estáticos con path

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Uso de path para vistas

// Rutas (usando controlador)
app.get('/', entryController.index);
app.get('/new', entryController.newEntryForm);
app.post('/create', entryController.create);
app.get('/view/:id', entryController.view);
app.get('/edit/:id', entryController.editEntryForm);
app.post('/update/:id', entryController.update);
app.get('/delete/:id', entryController.remove); // Nota: En prod, usa POST para delete

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});