const express = require('express');
const app = express();
const port = 3002;
const path = require('path');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
// Especificar la carpeta donde se encuentran las vistas
app.set('views', path.join(__dirname, 'views'));

// Rutas para renderizar las páginas
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista 'index.ejs'
});

app.get('/productos', (req, res) => {
  res.render('productos'); // Renderiza la vista 'productos.ejs'
});

app.get('/contacto', (req, res) => {
  res.render('contacto'); // Renderiza la vista 'contacto.ejs'
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
