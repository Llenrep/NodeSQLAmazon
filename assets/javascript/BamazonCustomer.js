var mysql = require("mysql");
var Table = require('cli-table');
var colors = require('colors'); //simply to give a little bit of color to the terminal
var inquirer = require("inquirer");

var table = new Table({ //the table for every single item
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [20, 40, 20, 20, 20]
});

var purchaseTable = new Table({ //for the new table being made when you select the actual item you are looking for
    head: ['Item ID', 'Product', 'Department', 'Price', 'Stock'],
    colWidths: [20, 40, 20, 20, 20]
})

// will be updated when the table is formed, Basically counts how many times the for loop loops through the database data
var totalitems = 0;

//Identifies the product you are trying to purchase as a string
var productToPurchase = "";

//the necessary items for creating the connection
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
        //pushed all the items in the database into a table
        
        for (i = 0; i < res.length; i++) {
            inititalArray.push(res[i].item_id);
            inititalArray.push(res[i].product_name);
            inititalArray.push(res[i].department_name);
            inititalArray.push(res[i].price);
            inititalArray.push(res[i].stock_quantity);
            dataArray.push(inititalArray);
            totalitems += 1; //this is necessary to prompt the total amount of items
            inititalArray = [];
            table.push(dataArray[i]);
        };
        var theTable = table.toString();
        console.log(theTable);
        buyItem();
    });
}
//setting the buyItem in its own function separate from the table.
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

                //This does the same thing as the last one execept I only want the item selected in a table of its own
                inititalArray.push(res[0].item_id);
                //going to need this located item for choosing which object gets updated in the database
                var locatedItem = res[0].item_id;
                inititalArray.push(res[0].product_name);
                inititalArray.push(res[0].department_name);
                inititalArray.push(res[0].price);
                inititalArray.push(res[0].stock_quantity);

                //The product that you're interested in equal to the product name within the database as well as the product, 
                // the whole point is to grab the number out of the database, subtract, and then put the updated number back in the database
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
                        //takes the oriinal stock
                        newStockOfProduct = stockOfProduct;

                        //subtracts the amount the user wanted from the actual stock which is necessary to replace the number in the database
                        newStockOfProduct -= answers.stock_quantity;

                        //the code that actually updates the item of interest, 
                        var query = "UPDATE products SET stock_quantity = "+ newStockOfProduct + " WHERE item_id = " + locatedItem; 

                        connection.query(query, function(err, res) {

                            if (err) throw err;

                            // if (answers.stock_quantity > locatedItem.stock_quantity) {
                            //     console.log("than")
                            // }

                            //Verify that the user has successfully purchased the product of interest
                            console.log("Purchase Complete: You purchased "+answers.stock_quantity+" of "+productToPurchase);
                        })   

                        connection.end(); //ends the connection
                    });                         
            });
        });
}