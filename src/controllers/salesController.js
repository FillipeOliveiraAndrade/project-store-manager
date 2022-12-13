const { salesServices } = require('../services');
const errorMap = require('../utils/errorMap');

const listSale = async (_req, res) => {
  const { message } = await salesServices.findAll();
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesServices.deleteSale(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).json();
};

const insert = async (req, res) => {
  const products = req.body;
  const { errorStatus, message, result } = await salesServices.insert(products);
  if (!result) return res.status(errorMap.mapError(errorStatus)).json({ message });

  return res.status(201).json(result);
};

const updateSaleById = async (req, res) => {
  const products = req.body;
  const { id } = req.params;
  const { errorStatus, message, result } = await salesServices.updateSale(Number(id), products);

  if (errorStatus) return res.status(errorMap.mapError(errorStatus)).json({ message });

  res.status(200).json(result);
};

/* const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const info = req.body;

  const { type, message } = await salesServices.updateSale(id, info);
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
}; */

module.exports = {
  listSale,
  getSaleById,
  deleteSaleById,
  insert,
  updateSaleById,
};
