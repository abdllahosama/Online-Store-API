import { Pool } from 'pg'
import config from './Config'

// log environment
console.log('your environment:' + config.ENV)

// init database client
let client: Pool = new Pool()

// connect for devoloping
if (config.ENV === 'dev') {
    client = new Pool({
        host: config.dbHost,
        database: config.dbName,
        user: config.dbUser,
        password: config.dbPassword,
    })
}

// connect for testing
if (config.ENV === 'test') {
    client = new Pool({
        host: config.dbHost,
        database: config.dbTest,
        user: config.dbUser,
        password: config.dbPassword,
    })
}

//export db client
export default client
