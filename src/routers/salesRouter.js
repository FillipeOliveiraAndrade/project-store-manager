const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSale);
router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;