const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "bamazon",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "utsabootcamp1",
  database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
});
