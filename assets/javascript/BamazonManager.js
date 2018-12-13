// table.push(
//     [res[0].item_id, res[0].product_name, res[0].department_name, res[0].price, res[0].stock_quantity],
//     [res[1].item_id, res[1].product_name, res[1].department_name, res[1].price, res[1].stock_quantity],
//     [res[2].item_id, res[2].product_name, res[2].department_name, res[2].price, res[2].stock_quantity],
//     [res[3].item_id, res[3].product_name, res[3].department_name, res[3].price, res[3].stock_quantity],
//     [res[4].item_id, res[4].product_name, res[4].department_name, res[4].price, res[4].stock_quantity],
//     [res[5].item_id, res[5].product_name, res[5].department_name, res[5].price, res[5].stock_quantity],
//     [res[6].item_id, res[6].product_name, res[6].department_name, res[6].price, res[6].stock_quantity],
//     [res[7].item_id, res[7].product_name, res[7].department_name, res[7].price, res[7].stock_quantity],
//     [res[8].item_id, res[8].product_name, res[8].department_name, res[8].price, res[8].stock_quantity],
//     [res[9].item_id, res[9].product_name, res[9].department_name, res[9].price, res[9].stock_quantity]
// );
//Right now, this works, but theres gotta be a way to put this in a for loop so that way when I add new items, it can be done faster.


var mysql = require("mysql");
var Table = require('cli-table');
var colors = require('colors');
var inquirer = require("inquirer");

var table = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [20, 40, 20, 20, 20]
});

var totalitems = 0;

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",
    database: "bamazon"
});

connection.connect(function (err) { //this portion simply establishes the connection to MAMP
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProducts();
});



function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("============================================================================================================".blue);
        console.log("------------------------------------------------------------------------------------------------------------".red);
        console.log("------------------------------------->That Louis-Pierre Bamazon Store<--------------------------------------".underline.white.bgBlue);
        console.log("------------------------------------------------------------------------------------------------------------".red);
        console.log("============================================================================================================".blue);

        var inititalArray = [];

        var dataArray = [];

        for (i = 0; i < res.length; i++) {
            inititalArray.push(res[i].item_id);
            inititalArray.push(res[i].product_name);
            inititalArray.push(res[i].department_name);
            inititalArray.push(res[i].price);
            inititalArray.push(res[i].stock_quantity);
            dataArray.push(inititalArray);
            totalitems += 1;
            inititalArray = [];
            table.push(dataArray[i]);
        };
        var theTable = table.toString();
        console.log(theTable);
    });
}