const connection = require('./database/connection');

const findAll = async () => { 
  const query = `
    SELECT
    a.sale_id AS saleId,
    b.date,
    a.product_id AS productId,
    a.quantity
    FROM
    sales_products AS a
    INNER JOIN
    sales AS b ON a.sale_id = b.id
    ORDER BY saleId ASC , productId ASC`;
  const [result] = await connection.execute(query);

  return result;
};

const findById = async (id) => {
  const query = `
    SELECT b.date, a.product_id AS productId, a.quantity
    FROM
    sales_products AS a
    INNER JOIN
    sales AS b ON a.sale_id = b.id
    WHERE a.sale_id = (?)
    ORDER BY a.sale_id ASC , productId ASC`;
  const [result] = await connection.execute(query, [id]);
  
  return result;
};

const deleteSale = async (id) => { 
  const query = 'DELETE FROM sales WHERE id = ?';
  const result = await connection.execute(query, [id]);

  return result;
};

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales(date) VALUES (default)',
  );
  return insertId;
};

const insert = async (productId, quantity, saleId) => {
  const query = `
    INSERT INTO sales_products (product_id, quantity, sale_id)
    VALUES(?, ?, ?)
  `;
  const products = await connection.execute(query, [productId, quantity, saleId]);
  
  return products;
};

const updateSale = async (productId, quantity, saleId) => {
  const query = `
    UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ? WHERE sale_id = ? AND product_id = ?
  `;
  connection.execute(query, [productId, quantity, saleId, productId]);
  console.log(productId, quantity, saleId, productId);
  // return products;
};

const findSaleById = async (id) => {
  const query = `
    SELECT * FROM StoreManager.sales
    WHERE id = (?)
  `;
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

/* const updateSale = async ({ saleId, info }) => {
  const query = `
    UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?
  `;

  const result = await Promise.all(info.map(async (product) => {
    const { productId, quantity } = product;
    await connection.execute(query, [quantity, saleId, productId]);
  }));

  return result;
}; */

module.exports = {
  findAll,
  findById,
  deleteSale,
  insertSale,
  insert,
  updateSale,
  findSaleById,
};