const express = require('express');

const { productsController } = require('../controllers'); 
const { validateName } = require('../middlewares');

const router = express.Router();

router.get('/search', productsController.getProductByName);
router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProductById);

router.post('/', validateName, productsController.createNewProduct);

router.put('/:id', validateName, productsController.updateProductById);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;