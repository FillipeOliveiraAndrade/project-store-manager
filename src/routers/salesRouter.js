const express = require('express');

const { salesController } = require('../controllers');
const { validateQuantity,
  validateProductId,
  validateFoundProductId,
  saleValidation,
} = require('../middlewares');

const router = express.Router();

router.get('/', salesController.listSale);
router.get('/:id', salesController.getSaleById);

router.put('/:id',
  validateQuantity,
  validateProductId,
  validateFoundProductId,
  salesController.updateSaleById);

router.post('/',
  validateQuantity,
  validateProductId,
  validateFoundProductId,
  salesController.insert);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;