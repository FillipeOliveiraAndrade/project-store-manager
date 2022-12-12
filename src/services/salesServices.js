const { salesModels } = require('../models');

const findAll = async () => {
  const sales = await salesModels.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModels.findById(id);
  if (sale === [] || sale.length === 0) {
    return { type: 'SALES_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const sale = await salesModels.findById(id);
  if (sale === [] || sale.length === 0) {
    return { type: 'SALES_NOT_FOUND', message: 'Sale not found' };
  }

  await salesModels.deleteSale(id);
  return { type: null, message: 'success' };
};

module.exports = {
  findAll,
  findById,
  deleteSale,
};