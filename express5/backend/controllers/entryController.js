 // controllers/entryController.js
const { getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry } = require('../models/entryModel');

// Obtener todas las entradas
const getAll = async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener entradas' });
  }
};

// Obtener una entrada por ID
const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await getEntryById(id);
    if (!entry) return res.status(404).json({ error: 'Entrada no encontrada' });
    console.log("contenido: ",entry);
    res.json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener entrada' });
  }
};

// Crear nueva entrada
const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const id = await createEntry(title, content);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear entrada' });
  }
};

// Actualizar entrada
const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await updateEntry(id, title, content);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar entrada' });
  }
};

// Eliminar entrada
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEntry(id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar entrada' });
  }
};

module.exports = { getAll, getOne, create, update, remove };
