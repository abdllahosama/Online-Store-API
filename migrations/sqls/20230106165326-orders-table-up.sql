CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER references users(id) NOT NULL,
    status ORDER_STATUS
);