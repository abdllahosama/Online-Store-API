import client from "../database"
import config from "../Config"
import bcrypt from 'bcrypt'
// user type
export type user = {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
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
        const sql = 'SELECT * FROM users'
        // send query to database
        const result = await connection.query(sql)
        // close database
        connection.release()
        // return users data
        return  result.rows
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
            const sql = `INSERT INTO users (first_name, last_name, email, user_name, password) VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.userName}', '${hashedPassword}') RETURNING id, first_name, last_name, email, user_name`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            // return user data
            return result.rows[0];
        } catch (error) {
            throw new Error(`can't inser user: ${error}`)
        }
    }

    public show = async (id: number): Promise<user> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT * FROM users WHERE id = ${id}`
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
    public update = async (id: number, user: user): Promise<user> => {
        try {
            // connect to database
            const connection = await client.connect()
            // hash password
            const hashedPassword = userStore.hashPassword(user.password)
            // connection query
            const sql = `UPDATE users SET first_name=${user.firstName}, last_name=${user.lastName}, user_name=${user.userName}, email=${user.email}, password=${hashedPassword} WHERE id=${id}`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
            // return user data
            return user
        } catch (error) {
            throw new Error(`cant't update user: ${error}`)
        }
    }

    /**
     * thes method delete user from database
     * @param id 
     */
    public delete = async (id: number): Promise<void> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `DELETE FROM users WHERE id=${id}`
            // send query to database
            await connection.query(sql)
            // close database
            connection.release()
        } catch (error) {
            throw new Error(`cant't delete user: ${error}`)
        }
    }

    public auth = async (userName: string, password: string): Promise<user | null> => {
        try {
            // connect to database
            const connection = await client.connect()
            // connection query
            const sql = `SELECT id, password FROM users WHERE user_name='${userName}'`
            // send query to database
            const result = await connection.query(sql)
            // close database
            connection.release()
            
            // check if user is exist
            if (result.rowCount) {
                // check if matching password
                const passwordValidate = bcrypt.compareSync(password + config.encriptPassword , result.rows[0].password)
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
        return bcrypt.hashSync(password + config.encriptPassword, parseInt(config.slatRounds as string))
    }
}