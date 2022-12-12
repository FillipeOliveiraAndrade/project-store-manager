const validateProducId = async (req, res, next) => {
  const products = req.body;

  if (products.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};
module.exports = validateProducId;