const { salesModels } = require('../models');

const findAll = async () => {
  const sales = await salesModels.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const sale = await salesModels.findById(id);
  return { type: null, message: sale };
};

module.exports = {
  findAll,
  findById,
};