// loads the NPM package for inquirer and mysql
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2");
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "Localhost",

  // connect the correct port
  port: 3306,

  // Your username
  user: "root",

  // Your password and database
  password: "utsabootcamp1",
  database: "bamazon_db"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection successful");
});

// function that prompts the user
var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("-----------------------------");
    console.log("      Welcome To Bamazon    ");
    console.log("-----------------------------");
    console.log("");
    console.log("What would you like to buy?");
    console.log("");
    var table = new Table({
      head: ["Item", "Product","Department", "Price"],
      colWidths: [12, 30, 30, 8],
      colAligns: ["center", "left","left", "right"],
      style: {
        head: ["aqua"],
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_Name,
        res[i].department_Name,
        res[i].price
      ]);
    }
    console.log(table.toString());
    console.log("");
    shopping();
  }); 
};
display();
