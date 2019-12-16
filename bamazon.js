const inquirer = require("inquirer");
const mysql = require("mysql");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "Localhost",

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
  console.log("Connection successful");
  start();
});

function start() {
  connection.query("Select * FROM products", function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          " || " +
          res[i].product_Name +
          " || " +
          res[i].department_Name +
          " || " +
          res[i].price +
          " || " +
          res[i].stock_Quantity +
          "\n"
      );
    }
  });
}
