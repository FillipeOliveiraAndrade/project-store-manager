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

const insert = async (products) => {
  if (products.some(({ quantity }) => !quantity || quantity === 0)) {
    return { errorStatus: 'QUANTITY_IS_REQUIRED', message: '"quantity" is required' };
  }

  const saleId = await salesModels.insertSale();

  await Promise.all(products.map(({ productId, quantity }) => salesModels
    .insert(productId, quantity, saleId)));

  const newSale = {
    id: saleId,
    itemsSold: products,
  };

  return { result: newSale };
};

const updateSale = async (id, products) => {
  if (products.some(({ quantity }) => !quantity || quantity === 0)) {
    return { errorStatus: 'QUANTITY_IS_REQUIRED', message: '"quantity" is required' };
  }

  const saleId = await salesModels.findSaleById(id);
  if (!saleId) return { errorStatus: 'SALES_NOT_FOUND', message: 'Sale not found' };

  await products.forEach(({ productId, quantity }) => salesModels
    .updateSale(productId, quantity, id));

  const updatedSale = {
    saleId: id,
    itemsUpdated: products,
  };

  return { result: updatedSale };
};

/* const updateSale = async ({ saleId, info }) => {
  const sale = await salesModels.findById(saleId);
  if (sale === [] || sale.length === 0) {
    return { type: 'SALES_NOT_FOUND', message: 'Sale not found' };
  }

  const saleProductsId = sale.map((product) => product.productId);
  const allProductsIsValid = info.every((product) => saleProductsId.includes(product.productId));
  if (!allProductsIsValid) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  await salesModels.updateSale({ saleId, info });

  const result = {
    saleId,
    itemsUpdated: info,
  };

  return { type: null, message: result };
}; */

module.exports = {
  findAll,
  findById,
  deleteSale,
  insert,
  updateSale,
};