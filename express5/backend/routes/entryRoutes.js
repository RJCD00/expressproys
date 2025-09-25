 // routes/entryRoutes.js
const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/entryController');

const router = express.Router();

router.get('/api/entries', getAll);
router.get('/api/entries/:id', getOne);
router.post('/api/entries', create);
router.put('/api/entries/:id', update);
router.delete('/api/entries/:id', remove);

module.exports = router;
