import client from '../Database'
import { user } from './Users'
import { product } from './Products'

// status enum
export enum orderStatus {
    active = 'active',
    complete = 'complete',
}

//order product type
export type orderProduct = {
    id?: number
    order_id: number
    product_id: number
    quantity: number
    product?: product
}

// order type
export type order = {
    id?: number
    user_id: number
    status: orderStatus
    user?: user
    orderProducts?: orderProduct[]
}

// order class
export class orderStore {
    /**
     * this method insert product to order
     * @param orderProduct orderProduct
     * @returns boolean
     */
    public addProductToOrder = async (
        orderProduct: orderProduct
    ): Promise<boolean> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES ('${orderProduct.order_id}', '${orderProduct.product_id}', '${orderProduct.quantity}')`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
            // return order data
            return true
        } catch (error) {
            throw new Error(`can't inser order product: ${error}`)
        }
    }

    /**
     * this method get currnt order
     * @param order
     * @returns order
     */
    public currntOrder = async (user_id: number): Promise<order> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT * FROM orders WHERE user_id='${user_id}' AND status='active' ORDER BY id DESC LIMIT 1`
            // send query to database
            let data = await connection.query(sql)
            // get order productas
            let currentOrder: order = data.rows[0]
            if (currentOrder) {
                const orderProductssql = `SELECT order_products.id, order_products.order_id, order_products.product_id, order_products.quantity, products.name as product_name FROM order_products JOIN products ON order_products.product_id = products.id Where order_products.order_id='${currentOrder.id}'`
                const result = await connection.query(orderProductssql)
                currentOrder.orderProducts = result.rows
            }
            // close database
            connection.release()
            // return currnt order data
            return currentOrder
        } catch (error) {
            throw new Error(`can't get currnt order: ${error}`)
        }
    }

    /**
     * this method insert new order to database
     * @param order
     * @returns order
     */
    public openOrder = async (user_id: number): Promise<order> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `INSERT INTO orders (user_id, status) VALUES ('${user_id}', 'active') RETURNING *`
            // send query to database
            let data = await connection.query(sql)
            // init new order
            let newOrder: order = data.rows[0]
            // close database
            connection.release()
            // return order data
            return newOrder
        } catch (error) {
            throw new Error(`can't inser order: ${error}`)
        }
    }

    /**
     * this method complete order
     * @returns boolean
     */
    public completeOrder = async (id: number): Promise<boolean> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `UPDATE orders SET status='complete' WHERE id='${id}'`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return order data
            return true
        } catch (error) {
            throw new Error(`can't get orders: ${error}`)
        }
    }

    /**
     * this method returns completed orders of user
     * @returns orders
     */
    public completedOrders = async (id: number): Promise<order[]> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT * FROM orders Where user_id=${id} AND status='complete' ORDER BY id DESC`
            // send query to database
            const result = await connection.query(sql)
            // get each order products
            result.rows.forEach(async (order: order): Promise<void> => {
                const sql = `SELECT id, order_products.order_id, order_products.product_id, order_products.quantity, products.name as product_name FROM order_products JOIN products ON order_products.product_id = products.id Where order_products.order_id='${order.id}'`
                const result = await connection.query(sql)
                order.orderProducts = result.rows
            })
            // close database
            connection.release()
            // return order data
            return result.rows
        } catch (error) {
            throw new Error(`can't get orders: ${error}`)
        }
    }

    /**
     * this method get single order from database
     * @param id
     * @returns order
     */
    public showOrder = async (id: number): Promise<order> => {
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
            let order: order = result.rows[0]
            // add order products to order
            order.orderProducts = orderProducts.rows
            // return order data
            return order
        } catch (error) {
            throw new Error(`cant't get order: ${error}`)
        }
    }
}
