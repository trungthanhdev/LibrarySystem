import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "trungthanh0111",
  database: "LibraryManagement",
});

export default db;
