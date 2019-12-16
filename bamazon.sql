-- Drops the bamazon_db if it exists currentlty --
DROP DATABASE IF EXISTS bamazon_db;

-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes so that all the code will affect bamazon_db --
USE bamazon_db;
-- Creates the table "products" within animals_db
CREATE TABLE products(
    item_id INT() NOT NULL,
    product_Name VARCHAR, 
    department_name VARCHAR,
    price
    stock_quantity
    PRIMARY KEY(item_id)
);

SELECT * FROM products

INSERT INTO products (product_Name,department_name,price,stock_quantity)
VALUES 