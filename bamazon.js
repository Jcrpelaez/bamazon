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
  display();
});

// function that prompts the user and displays the table
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
      head: ["Item", "Product", "Department", "Price", "stock"],
      colWidths: [12, 30, 30, 8, 8],
      colAligns: ["center", "left", "left", "right", "right"],
      style: {
        compact: true
      }
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_Name,
        res[i].department_Name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("");
    promptCustomer(res);
  });
};
// Customer function to prompt customer purchases
var promptCustomer = function(res) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter the item id you would like to purchase"
      }
    ])
    .then(function(answer) {
      var correct = false;
      for (var i = 0; i < res.length; i++) {
        if (res[i].item_id == answer.choice) {
          correct = true;
          var product = answer.choice;
          var id = i;
          inquirer
            .prompt({
              type: "input",
              name: "quantity",
              message: "How many would you like to buy?",
              validate: function(value) {
                if (isNaN(value) == false) {
                  return true;
                } else {
                  return false;
                }
              }
            })
            .then(function(answer) {
              if (res[id].stock_quantity - answer.quantity > 0) {
                connection.query("UPDATE products SET stock_quantity='") +
                  (res[id].stock_quantity - answer.quantity) +
                  "'WHERE item_id='" +
                  product +
                  "'",
                  function(err, res) {
                    console.log("Product Bought");
                    display();
                  };
              } else {
                console.log("Not a valid selection");
                promptCustomer(res);
              }
            });
        }
      }
      if (i == res.length && correct == false) {
        console.log("Not a valid selection");
        display();
      }
    });
};
