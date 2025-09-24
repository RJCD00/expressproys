const express = require('express');
const app = express();
const port = 3001;

// Ruta principal (GET /)
app.get('/', (req, res) => {
   var nombre="hola soy juan";
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>pagina web</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
        </head>
    <body>
        ${nombre}, esta es una pagina web
    </body>
    </html>`);
});

// Ruta para obtener información de un producto por su ID (GET /productos/:id)
// Los parámetros de la ruta (como ':id') se acceden mediante req.params
app.get('/productos/:id', (req, res) => {
  const productId = req.params.id;
  console.log("request: ", req.params.id);
  // Aquí podrías buscar la información del producto en una base de datos
  // o en algún otro origen de datos basado en el ID.
  const producto = {
    id: productId,
    nombre: `Producto ${productId}`,
    descripcion: `Esta es la descripción del producto con ID ${productId}.`,
    precio: 19.99
  };
  res.json(producto); // Envía la respuesta como JSON
});

// Ruta para mostrar un mensaje de contacto (GET /contacto)
app.get('/contacto', (req, res) => {
  res.send('Puedes contactarnos a través de correo electrónico a info@ejemplo.com.');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
