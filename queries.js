const Pool = require("pg").Pool;
require("dotenv").config();
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

const getAllCities = (request, response) => {
  pool.query("SELECT DISTINCT city FROM restaurants", (error, results) => {
    if (error) {
      throw error;
    }
    response
      .status(200)
      .json({ total_items_count: results.rows.length, value: results.rows });
  });
};
const getAllRestaurants = (request, response) => {
  pool.query(
    `SELECT COUNT(*) FROM restaurants;
     SELECT * FROM restaurants ORDER BY average_rating DESC LIMIT 50;`,
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(200).json({
        total_items_count: results[0].rows[0].count,
        value: results[1].rows,
      });
    }
  );
};

const getRestaurantById = (request, response) => {
  const { id } = request.params;
  pool.query(
    "SELECT * FROM restaurants WHERE id=$1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(200)
        .json({ total_items_count: results.rows.length, value: results.rows });
    }
  );
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getAllCities,
};
