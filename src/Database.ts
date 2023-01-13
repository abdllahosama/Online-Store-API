import { Pool } from 'pg'
import config from './Config'

// init database client
let client: Pool = new Pool()

// connect for devoloping
if (config.ENV === 'dev') {
    client = new Pool({
        host: config.dbHost,
        database: config.dbName,
        user: config.dbUser,
        password: config.dbPassword,
        port: parseInt(config.dbPort as string),
    })

// connect for testing
} else {
    client = new Pool({
        host: config.dbHost,
        database: config.dbTest,
        user: config.dbUser,
        password: config.dbPassword,
        port: parseInt(config.dbPort as string),
    })
}

//export db client
export default client
