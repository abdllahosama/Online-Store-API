import client from "../Database"
import {user} from "./Users"
import {product} from "./Products"

// status enum
enum orderStatus {
    active = 'active',
    complete = 'complete'
}

//order product type
export type orderProduct = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number,
    product: product
}

// order type
export type order = {
    id?: number,
    userId: number,
    status: orderStatus,
    user?: user,
    orderProducts?: orderProduct[]
}

// order class
export class orderStore {

    /**
     * this method returns all orders
     * @returns orders
     */
    public index = async (): Promise<order[]> => {
        try {
        // connect to database
        const connection = await client.connect()
        // connection query
        const sql = 'SELECT orders.id, orders.status, users.user_name as user FROM orders JOIN users ON orders.user_id = users.id'
        // send query to database
        const result = await connection.query(sql)
        // close database
        connection.release()
        // return order data
        return  result.rows
        } catch (error) {
            throw new Error(`can't get orders: ${error}`)
        }
    }


    /**
     * this method insert new order to database
     * @param order 
     * @returns order
     */
    public insert = async (order: order): Promise<order> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `INSERT INTO orders (user_id, status) VALUES ('${order.userId}', '${order.status}') RETURNING *`
            // send query to database
            let data = await connection.query(sql)
            // init new order
            let newOrder: order = data.rows[0]

            //check if is set order products
            if(order.orderProducts && order.orderProducts.length > 0) {
                // init query
                let productsSql:string = `INSERT INTO order_products (order_id, product_id, quantity) VALUES`
                // build query by order products
                order.orderProducts?.forEach((orderProduct, key) => {
                    productsSql += `(${newOrder.id}, ${orderProduct.product_id}, ${orderProduct.quantity})`
                    if (order.orderProducts && order.orderProducts?.length != key + 1){
                        productsSql += ','
                    } else {
                        productsSql += ' RETURNING *'
                    }
                })
                // send query to database
                let orderProducts = await connection.query(productsSql)
                //put order products to order
                newOrder.orderProducts = orderProducts.rows
            }

            // close database
            connection.release()
            // return order data
            return newOrder;
        } catch (error) {
            throw new Error(`can't inser order: ${error}`)
        }
    }

    /**
     * this method get single order from database
     * @param id 
     * @returns order
     */
    public show = async (id: number): Promise<order> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT orders.id, orders.status, users.user_name, users.email FROM orders JOIN users ON orders.user_id = users.id WHERE orders.id='${id}'`
            // send query to database
            const result = await connection.query(sql)
            // get order products
            const productsSql = `SELECT order_products.id, products.name, products.description, products.price, order_products.quantity FROM order_products JOIN products ON order_products.product_id = products.id WHERE order_products.order_id='${id}'`
            // send query to database
            const orderProducts = await connection.query(productsSql)
            // close database
            connection.release()
            // return order data
            let order: order = result.rows[0];
            // add order products to order
            order.orderProducts = orderProducts.rows;
            // return order data
            return order;
        } catch (error) {
            throw new Error(`cant't get order: ${error}`)
        }
    }

    /**
     * this methoud update order in database
     * @param id 
     * @param order 
     * @returns void
     */
    public update = async (id: number, order: order): Promise<void> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `UPDATE orders SET user_id='${order.userId}' WHERE id='${id}'`
            // send query to database
            const newOrder = await connection.query(sql)
            //update order products
            order.orderProducts?.forEach(async (orderProduct) => {
                const productsSql = `UPDATE order_products SET product_id='${orderProduct.product_id}', quantity='${orderProduct.quantity}' WHERE id='${orderProduct.id}'`
                await connection.query(productsSql)
            })
            // close database
            connection.release()
        } catch (error) {
            throw new Error(`cant't update order: ${error}`)
        }
    }

    /**
     * thes method delete order from database
     * @param id 
     * @returns void
     */
    public delete = async (id: number): Promise<void> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `DELETE FROM order_products WHERE order_id='${id}';DELETE FROM orders WHERE id='${id}';`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
        } catch (error) {
            throw new Error(`cant't delete order: ${error}`)
        }
    }
}