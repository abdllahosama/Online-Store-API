import client from '../Database'

// product type
export type product = {
    id?: number
    name: string
    description: string
    price: number
}

// product class
export class productStore {
    /**
     * this method returns all products
     * @returns products
     */
    public index = async (): Promise<product[]> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = 'SELECT * FROM products'
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return product data
            return result.rows
        } catch (error) {
            throw new Error(`can't get products: ${error}`)
        }
    }

    /**
     * this method insert new product to database
     * @param product
     * @returns product
     */
    public insert = async (product: product): Promise<product> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `INSERT INTO products (name, description, price) VALUES ('${product.name}', '${product.description}', '${product.price}')  RETURNING *`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return product data
            return result.rows[0]
        } catch (error) {
            throw new Error(`can't inser product: ${error}`)
        }
    }

    /**
     * this method show single product
     * @param int id
     * @returns product
     */
    public show = async (id: number): Promise<product> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT * FROM products WHERE id = ${id}`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return product data
            return result.rows[0]
        } catch (error) {
            throw new Error(`cant't get product: ${error}`)
        }
    }
}
