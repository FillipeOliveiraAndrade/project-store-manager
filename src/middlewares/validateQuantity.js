const validateQuantity = (req, res, next) => {
  const products = req.body;
  if (products.some(({ quantity }) => quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (products.some(({ quantity }) => quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};

module.exports = validateQuantity;