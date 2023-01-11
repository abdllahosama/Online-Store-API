import client from '../Database'
import config from '../Config'
import bcrypt from 'bcrypt'
import UserUtilities from '../Utilities/User'
// user type
export type user = {
    id?: number
    first_name: string
    last_name: string
    email: string
    user_name: string
    password: string
}

// user class
export class userStore {
    /**
     * this method returns all users
     * @returns users
     */
    public index = async (): Promise<user[]> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql =
                'SELECT id, first_name, last_name, email, user_name FROM users'
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return users data
            return result.rows
        } catch (error) {
            throw new Error(`can't get users: ${error}`)
        }
    }

    /**
     * this method insert new user to database
     * @param user
     * @returns user
     */
    public insert = async (user: user): Promise<user> => {
        try {
            // connect to database
            const connection = await client.connect()
            // hash password
            const hashedPassword = UserUtilities.hashPassword(user.password)
            // connection query
            const sql = `INSERT INTO users (first_name, last_name, email, user_name, password) VALUES ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.user_name}', '${hashedPassword}') RETURNING id, first_name, last_name, email, user_name`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return user data
            return result.rows[0]
        } catch (error) {
            throw new Error(`can't inser user: ${error}`)
        }
    }

    /**
     * this method show single user
     * @param id
     * @returns user
     */
    public show = async (id: number): Promise<user> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT id, first_name, last_name, email, user_name FROM users WHERE id = '${id}'`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return user data
            return result.rows[0]
        } catch (error) {
            throw new Error(`cant't get user: ${error}`)
        }
    }

    /**
     * this method auth user
     * @param user_name
     * @param password
     * @returns user | boolean
     */
    public auth = async (
        user_name: string,
        password: string
    ): Promise<user | boolean> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT id, password FROM users WHERE user_name='${user_name}'`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // check if user is exist
            if (result.rowCount) {
                // check if matching password
                const passwordValidate = bcrypt.compareSync(
                    password + config.encriptPassword,
                    result.rows[0].password
                )
                if (passwordValidate) {
                    // return user data
                    return this.show(result.rows[0].id)
                }
            }
            // if no user validate
            return false
        } catch (error) {
            throw new Error(`cant't auth user: ${error}`)
        }
    }
}
