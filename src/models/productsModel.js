const connection = require('./database/connection');

const findAll = async () => {
  const query = 'SELECT * FROM products ORDER BY id';
  const [result] = await connection.execute(query);

  return result;
};

const findById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);

  return result;
};

const createNewProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  createNewProduct,
};