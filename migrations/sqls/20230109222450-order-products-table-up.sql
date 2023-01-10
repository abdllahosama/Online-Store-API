CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER references orders(id) NOT NULL,
    product_id INTEGER references products(id) NOT NULL,
    quantity INTEGER NOT NULL
);