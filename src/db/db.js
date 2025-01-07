import mysql2 from "mysql2";
import config from "./config.js";

const connectDB = () => {
  console.log("Attempting to connect");

  const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "",
    database: "golf_fitting",
    // debug: true,
  });

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:");
      return;
    }

    console.log("Connected to MySQL database");

    // Use the connection for queries here

    // Release the connection back to the pool
    connection.release();
  });

  // Optional: Handle pool errors
  pool.on("error", (err) => {
    console.error("MySQL Pool Error:", err);
  });

  // const pool = mysql2.createPool(config);

  // pool.getConnection((err, connection) => {
  //   if (err) {
  //     console.error("Error connecting to MySQL database:", err.message);
  //     return;
  //   }

  //   console.log("Connected to MySQL database");
  //   if (connection) connection.release();
  // });

  return pool; // Return the pool instance for further use
};

export default connectDB;
