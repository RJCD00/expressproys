 
// controllers/entryController.js
const { getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry } = require('../models/entryModel');

// Mostrar lista de entradas (index)
const index = async (req, res) => {
  try {
    const entries = await getAllEntries();
    res.render('index', { entries });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener entradas');
  }
};

// Mostrar formulario para nueva entrada
const newEntryForm = (req, res) => {
  res.render('new');
};

// Crear nueva entrada
const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    await createEntry(title, content);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al crear entrada');
  }
};

// Ver una entrada
const view = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await getEntryById(id);
    if (!entry) return res.status(404).send('Entrada no encontrada');
    res.render('view', { entry });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al ver entrada');
  }
};

// Mostrar formulario para editar
const editEntryForm = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await getEntryById(id);
    if (!entry) return res.status(404).send('Entrada no encontrada');
    res.render('edit', { entry });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al editar entrada');
  }
};

// Actualizar entrada
const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await updateEntry(id, title, content);
    res.redirect(`/view/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar entrada');
  }
};

// Eliminar entrada
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteEntry(id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar entrada');
  }
};

module.exports = { index, newEntryForm, create, view, editEntryForm, update, remove };