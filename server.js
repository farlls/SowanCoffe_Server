const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
// Endpoints untuk API
app.get("/menu/:value", (req, res) => {
  const value = req.params.value;
  // Mengirimkan data sebagai respons
  // console.log(`value: http://localhost:3001/menu/${value}`);
  db.query(
    "SELECT * FROM data_menu WHERE jenis = ?",
    [value],
    (error, result) => {
      res.json(result);
    }
  );
});
app.get("/menu/Burger", (req, res) => {
  db.query(
    "SELECT * FROM data_menu WHERE jenis = 'Burger'",
    (error, result) => {
      res.json(result);
    }
  );
});
app.get("/menu/Main Course", (req, res) => {
  db.query(
    "SELECT * FROM data_menu WHERE jenis = 'Main Course'",
    (error, result) => {
      res.json(result);
    }
  );
});
app.get("/menu/Coffee", (req, res) => {
  db.query(
    "SELECT * FROM data_menu WHERE jenis = 'Coffee'",
    (error, result) => {
      res.json(result);
    }
  );
});
app.get("/menu/Dessert", (req, res) => {
  db.query(
    "SELECT * FROM data_menu WHERE jenis = 'Dessert'",
    (error, result) => {
      res.json(result);
    }
  );
});
db.connect((error) => {
  if (error) {
    console.error(
      "Terjadi kesalahan saat menyambungkan ke server MySQL: ",
      error
    );
  } else {
    console.log("Berhasil terhubung ke server MySQL");
  }
});

// Menggunakan build dari proyek React sebagai sumber statis
app.use(express.static("build"));

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});