DROP DATABASE IF EXISTS bamazon;


CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45),
  department_name VARCHAR(50),
  price INT(50),
  stock_quantity INT(50),
  PRIMARY KEY (id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Pie", "Food", 20, 100), (2, "Cake", "Food", 30, 100), (3, "ToolBox", "Tools", 30, 200), (4, "David Blaine Costume", "Clothes", 40, 4), (5, "40' Rope", "Tools", 15, 100)

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Blue Cheese", "Food", 5, 100), (7, "FL Studios", "DAW", 400, 100), (8, "Ableton", "DAW", 326, 100), (9, "BootCut Jeans", "Clothes", 40, 30), (10, "Table", "Furniture", 150, 50)