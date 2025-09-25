const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';

// Configuración de EJS y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Ruta para la lista de entradas
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${backendUrl}/api/entries`);
    res.render('index', { entries: response.data, error: null });
  } catch (err) {
    console.error(err);
    res.render('index', { entries: [], error: 'Error al cargar las entradas' });
  }
});

// Ruta para nueva entrada
app.get('/new', (req, res) => {
  res.render('new', { error: null });
});

// Ruta para guardar nueva entrada
app.post('/new', async (req, res) => {
  const { title, content } = req.body;
  try {
    await axios.post(`${backendUrl}/api/entries`, { title, content });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('new', { error: 'Error al guardar la entrada' });
  }
});

// Ruta para ver una entrada
app.get('/view/:id', async (req, res) => {
  try {
    const response = await axios.get(`${backendUrl}/api/entries/${req.params.id}`);
    res.render('view', { entry: response.data, error: null });
  } catch (err) {
    console.error(err);
    res.render('view', { entry: null, error: 'Entrada no encontrada' });
  }
});

// Ruta para editar una entrada
app.get('/edit/:id', async (req, res) => {
  try {
    const response = await axios.get(`${backendUrl}/api/entries/${req.params.id}`);
    console.log('Entry cargada:', response.data); // Depuración
    res.render('edit', { entry: response.data, error: null });
  } catch (err) {
    console.error(err);
    res.render('edit', { entry: null, error: 'Entrada no encontrada' });
  }
});

// Ruta para actualizar una entrada
app.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    await axios.put(`${backendUrl}/api/entries/${req.params.id}`, { title, content });
    res.redirect(`/view/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.render('edit', { entry: { id: req.params.id, title, content }, error: 'Error al actualizar la entrada' });
  }
});

// Ruta para eliminar una entrada
app.post('/delete/:id', async (req, res) => {
  try {
    await axios.delete(`${backendUrl}/api/entries/${req.params.id}`);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Frontend EJS corriendo en http://localhost:${port}`);
});