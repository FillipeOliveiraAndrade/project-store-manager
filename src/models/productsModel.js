const connection = require('./database/connection');

const findAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id';
  const [result] = await connection.execute(query);

  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  findAll,
  findById,
};