const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  // Object.values(JSON.parse(JSON.stringify(product)));
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product }; 

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

module.exports = {
  findAll,
  findById,
};