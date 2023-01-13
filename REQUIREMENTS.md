# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]


## Data Shapes

#### Products
- <strong>id</strong> integer not null primary key 
- <strong>name</strong> character varyong(100)
- <strong>description</strong> text
- <strong>price</strong> integer

#### Users
- <strong>id</strong> integer not null primary key 
- <strong>first_name</strong> character varying(100) not null
- <strong>last_name</strong> character varying(100) not null
- <strong>email</strong> character varying(50) not null
- <strong>user_name</strong> character varying(50) not null
- <strong>password</strong> character varying(255) not null

#### Orders
- <strong>id</strong> integer not null primary key 
- <strong>user_id</strong> integer not null FOREIGN KEY REFERENCES users(id)
- <strong>status</strong> enum (active, complete)

### Order_products
- <strong>id</strong> integer not null primary key 
- <strong>order_id</strong> integer not null FOREIGN KEY REFERENCES orders(id)
- <strong>product_id</strong> integer not null  FOREIGN KEY REFERENCES products(id)
- <strong>quantity</strong> integer not null
