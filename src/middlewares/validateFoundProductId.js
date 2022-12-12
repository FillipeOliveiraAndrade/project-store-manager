const productsModel = require('../models/productsModel');

const validateFoundProductId = async (req, res, next) => {
  const products = req.body;

  if (products.some(({ productId }) => productId === undefined)) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const productsList = await Promise.all(products.map(async ({ productId }) => {
    const product = await productsModel.findById(productId);

    return product;
  }));
  const result = productsList.every((item) => item);

  if (!result) {
    return res.status(404)
      .json({ message: 'Product not found' });
  }
  next();
};

module.exports = validateFoundProductId;