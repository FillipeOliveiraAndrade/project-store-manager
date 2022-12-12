const express = require('express');

const { salesController } = require('../controllers');
const { validateQuantity,
  validateProductId,
  validateFoundProductId,
} = require('../middlewares');

const router = express.Router();

router.post('/',
  validateQuantity,
  validateProductId,
  validateFoundProductId,
  salesController.insert);

router.get('/', salesController.listSale);
router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;