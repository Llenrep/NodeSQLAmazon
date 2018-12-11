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
VALUES (1, "Pie", "Food", 20, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Cake", "Food", 30, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "ToolBox", "Tools", 30, 200);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "David Blaine Costume", "Clothes", 40, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "40' Rope", "Tools", 15, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Blue Cheese", "Food", 5, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "FL Studios", "DAW", 400, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Ableton", "DAW", 326, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "BootCut Jeans", "Clothes", 40, 30);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Table", "Furniture", 150, 50);