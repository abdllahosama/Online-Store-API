import dotenv from 'dotenv'

// configrate env file
dotenv.config()

// get data from file
const {
    ENV,
    port,
    dbHost,
    dbName,
    dbUser,
    dbPassword,
    dbPort,
    dbTest,
    encriptPassword,
    slatRounds,
    jwtPassword,
} = process.env

// return data as js varibels
export default {
    ENV,
    port,
    dbHost,
    dbName,
    dbUser,
    dbPassword,
    dbPort,
    dbTest,
    encriptPassword,
    slatRounds,
    jwtPassword,
}
