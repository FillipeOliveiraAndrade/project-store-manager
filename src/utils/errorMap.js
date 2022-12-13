const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SALES_NOT_FOUND: 404,
  QUANTITY_IS_REQUIRED: 400,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};