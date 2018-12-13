var mysql = require("mysql");
var Table = require('cli-table');
var colors = require('colors');
var inquirer = require("inquirer");

var table = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [20, 40, 20, 20, 20]
});

var purchaseTable = new Table({
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [20, 40, 20, 20, 20]
})

var totalitems = 0;
var productToPurchase = "";

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
        buyItem();
    });
}
//item_id, product_name, department_name, price, stock_quantity
function buyItem() {
    inquirer.prompt({
        name: "item_id",
        type: "input",
        message: "------------------------------------->That Louis-Pierre Bamazon Store<--------------------------------------".underline.white.bgBlue + "\nEnter the ID of the Product You Would Like (Select 1 - " + totalitems + "): "
    })
        .then(function (answers) {
            
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answers.item_id }, function (err, res) {
                if (err) throw err;

                inititalArray = [];

                inititalArray.push(res[0].item_id);
                var locatedItem = res[0].item_id;
                inititalArray.push(res[0].product_name);
                inititalArray.push(res[0].department_name);
                inititalArray.push(res[0].price);
                inititalArray.push(res[0].stock_quantity);

                productToPurchase = res[0].product_name;
                stockOfProduct = res[0].stock_quantity;

                purchaseTable.push(inititalArray);

                console.log(purchaseTable.toString());

                inquirer
                    .prompt({
                        name: "stock_quantity",
                        type: "input",
                        message: "------------------------------------->That Louis-Pierre Bamazon Store<--------------------------------------".underline.white.bgBlue + "\nHow Many of this (" + productToPurchase + ") Would You Like?: "
                    })
                    .then(function (answers) {

                        newStockOfProduct = stockOfProduct;

                        newStockOfProduct -= answers.stock_quantity;

                        var query = "UPDATE products SET stock_quantity = "+ newStockOfProduct + " WHERE item_id = " + locatedItem; 

                        connection.query(query, function(err, res){

                            if (err) throw err;

                            console.log(answers.stock_quantity);
                            console.log(locatedItem)

                            // if (answers.stock_quantity > locatedItem.stock_quantity) {
                            //     console.log("than")
                            // }

                            console.log("Purchase Complete: You purchased "+answers.stock_quantity+" of "+productToPurchase);
                        })   

                        connection.end(); //
                    });                   
                // Got the number necessary post-subtraction, now I am having trouble updating firebase.       
            });
        });
}