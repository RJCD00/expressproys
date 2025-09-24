 
// models/entryModel.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config(); // Carga .env para DB_PATH

const dbPath = path.resolve(__dirname, '..', process.env.DB_PATH); // Uso de path para ruta absoluta segura

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la DB:', err.message);
  } else {
    console.log('Conectado a SQLite en:', dbPath);
    // Crea la tabla si no existe (id, title, content, createdAt)
    db.run(`
      CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// Función para obtener todas las entradas
const getAllEntries = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM entries ORDER BY createdAt DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Función para obtener una entrada por ID
const getEntryById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM entries WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

// Función para crear una nueva entrada
const createEntry = (title, content) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO entries (title, content) VALUES (?, ?)', [title, content], function (err) {
      if (err) reject(err);
      else resolve(this.lastID); // Devuelve el ID insertado
    });
  });
};

// Función para actualizar una entrada
const updateEntry = (id, title, content) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE entries SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

// Función para eliminar una entrada
const deleteEntry = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM entries WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = { getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry };