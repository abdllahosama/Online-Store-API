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
-  id integer not null primary key 
- name character varyong(100)
- description text
- price integer

#### Users
- id integer not null primary key 
- first_name character varying(100) not null
- last_name character varying(100) not null
- email character varying(50) not null
- user_name character varying(50) not null
- password character varying(255) not null

#### Orders
- id integer not null primary key 
- user_id integer not null FOREIGN KEY REFERENCES users(id)
- status enum (active, complete)

### Order_products
- id integer not null primary key 
- order_id integer not null FOREIGN KEY REFERENCES orders(id)
- product_id integer not null  FOREIGN KEY REFERENCES products(id)
- quantity integer not null
