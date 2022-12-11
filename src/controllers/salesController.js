const { salesServices } = require('../services');

const listSale = async (_req, res) => {
  const { message } = await salesServices.findAll();
  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { message } = await salesServices.findById(id);
  if (message === [] || message.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(message);
};

module.exports = {
  listSale,
  getSaleById,
};
