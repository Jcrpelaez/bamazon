// Uses required depedencies
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
    promptCustomer(res);
  });
}

promptCustomer = function(res){
  inquirer.prompt([{
    type:"input",
    name:'choice',
    message:"What would you like to purchase?"
  }]).then(function(answer){
    let correct = false;
    for(let i=0;i<res.length;i++){
      if(res[i].product_Name==answer.choice){
        correct=true;
        let product_Name=answer.choice;
        let id = i;
        inquirer.prompt({
          type:"input",
          name:"qty",
          message:'How many would you like to buy?',
          validate:function(value){
            if(isNAN(value)==false){
              return true;
            } else {
              return false;
            }
          }
        }).then(function(answer){
          if((res[id]).stock_Quantity
        }
      }
    }
  })
} 