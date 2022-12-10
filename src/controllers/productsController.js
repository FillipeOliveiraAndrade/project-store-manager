const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();
  return res.status(200).json(message);
};

const getProductById = async (req, res) => { 
  const { id } = req.params;
  
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;

  const { message } = await productsService.createNewProduct(name);

  return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProductById(name, id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

module.exports = {
  listProducts,
  getProductById,
  createNewProduct,
  updateProductById,
  deleteProduct,
};