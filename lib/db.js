import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "LibraryManagement",
});

export default db;
