const saleValidation = (req, res, next) => {
  const sale = req.body;

  const hasProductId = sale.every((product) => typeof product.productId === 'number');
  const hasQuantity = sale.every((product) => typeof product.quantity === 'number');

  const quantityIsValid = sale.every((product) => product.quantity >= 1);

  if (!hasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (!hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!quantityIsValid) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  return next();
};

module.exports = saleValidation;