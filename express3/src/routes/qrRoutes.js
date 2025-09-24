const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.get('/', qrController.showForm);
router.post('/generate', qrController.generateQr);

module.exports = router;
