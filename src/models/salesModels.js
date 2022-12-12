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

module.exports = {
  findAll,
  findById,
  deleteSale,
};