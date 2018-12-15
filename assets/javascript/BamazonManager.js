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
})
function introduction() {
    inquirer
        .prompt({
            name: "decision",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product\n"]
        })
        .then(function (answers) {

            if (answers.decision == "View Products for Sale") {
                console.log("View Products.....")
                displayProducts();
            }
            else if (answers.decision == "View Low Inventory") {
                console.log("Viewing Lower Inventory")
                connection.end();
            }
            else if (answers.decision == "Add to Inventory") {
                console.log("Adding To Inventory")
                addProduct();
            }
            else if (answers.decision == "Add New Product") {
                console.log("Add New Product")
                connection.end();
            }
        });
}
introduction();

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
    introduction();
}

function addProduct() {
    var questions = ["Whats The Name Of The Product?: ", "Give It A Section: ", "How Much Does It Cost?: ", "How Many Of This Do We Got?: "];
    inquirer.prompt(questions, function (answers) {
        connection.query("INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES (" + (totalItems+1),+","+answers[0],+","+answers[1],+","+answers[2],+","+
        answers[3] + ")");
        console.log("so what");
    });
    //     inquirer
    //   .prompt({
    //     name: "Fill Out The Form",
    //     type: "input",

    //     })
    //   .then(answers => {
    //     // Use user feedback for... whatever!!
    //   }); 
}