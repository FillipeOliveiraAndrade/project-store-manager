const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product }; 

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const createNewProduct = async (name) => {
  const productId = await productsModel.createNewProduct(name);
  const getNewProduct = await productsModel.findById(productId);

  return { type: null, message: getNewProduct };
};

const updateProductById = async (name, id) => {
  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateProductById(name, id);
  
  const productAltered = await productsModel.findById(id);
  return { type: null, message: productAltered };
};

const deleteProduct = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.deleteProduct(id);
  return { type: null, message: 'success' };
};

module.exports = {
  findAll,
  findById,
  createNewProduct,
  updateProductById,
  deleteProduct,
};