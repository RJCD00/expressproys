const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const qrRoutes = require('./routes/qrRoutes');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Middleware para analizar el cuerpo de las solicitudes (formularios)
app.use(express.urlencoded({ extended: false }));

// Usar las rutas definidas en qrRoutes
app.use('/', qrRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
