const validateQuantity = (req, res, next) => {
  const products = req.body;

  if (products.some(({ quantity }) => quantity < 1)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  next();
};

module.exports = validateQuantity;