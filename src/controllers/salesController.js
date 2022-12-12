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

  return res.status(204).end();
};

module.exports = {
  listSale,
  getSaleById,
  deleteSaleById,
};
