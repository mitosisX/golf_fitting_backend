import mysql2 from "mysql2";
import config from "../db/config.js";

const pool = mysql2.createPool(config);

export const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // resolve(results.length ? results[0] : null);
        resolve(results.length ? results : null);
      }
    });
  });
};

export const executeRawSQL = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        // resolve(results.length ? results[0] : null);
        resolve(results.length ? results : null);
      }
    });
  });
};

export const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateRecord = (tableName, updates, column, value) => {
  return new Promise((resolve, reject) => {
    const columnValues = Object.keys(updates)
      .map((column) => `${column} = ?`)
      .join(", ");
    const query = `UPDATE ${tableName} SET ${columnValues} WHERE ${column} = ?`;

    pool.query(query, [...Object.values(updates), value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
