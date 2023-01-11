import client from '../Database'
import config from '../Config'
import bcrypt from 'bcrypt'
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
            const sql = 'SELECT id, first_name, last_name, email, user_name FROM users'
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
            const hashedPassword = userStore.hashPassword(user.password)
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
     * this methoud update user in database
     * @param id
     * @param user
     * @returns users
     */
    public update = async (id: number, user: user): Promise<boolean> => {
        try {
            // connect to database
            const connection = await client.connect()
            // hash password
            const hashedPassword = userStore.hashPassword(user.password)
            // connection query
            const sql = `UPDATE users SET first_name='${user.first_name}', last_name='${user.last_name}', user_name='${user.user_name}', email='${user.email}', password='${hashedPassword}' WHERE id='${id}'`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
            // return true status
            return true
        } catch (error) {
            throw new Error(`cant't update user: ${error}`)
        }
    }

    /**
     * thes method delete user from database
     * @param id
     */
    public delete = async (id: number): Promise<boolean> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `DELETE FROM users WHERE id='${id}'`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
            // return status
            return true
        } catch (error) {
            throw new Error(`cant't delete user: ${error}`)
        }
    }

    public auth = async (
        user_name: string,
        password: string
    ): Promise<user | null> => {
        try {
            console.log(user_name)
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT id, password FROM users WHERE user_name='${user_name}'`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            console.group(result)
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
            return null
        } catch (error) {
            throw new Error(`cant't auth user: ${error}`)
        }
    }
    /**
     * this static methd just hash password
     * @param password
     * @returns hashed password
     */
    public static hashPassword = (password: string): string => {
        return bcrypt.hashSync(
            password + config.encriptPassword,
            parseInt(config.slatRounds as string)
        )
    }
}
