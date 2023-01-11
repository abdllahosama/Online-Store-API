import Jwt from 'jsonwebtoken'
import { user } from '../Models/Users'
import bcrypt from 'bcrypt'
import config from '../Config'

/**
 * this methd return user from jwt
 * @param token
 * @returns user user
 */
const getUserData = (token: string): user => {
    try {
        const tokenData = token.split(' ')[1]
        const userData = Jwt.decode(tokenData)
        if (typeof userData === 'object') {
            return userData?.user
        }
        throw new Error('pleas login first')
    } catch {
        throw new Error('pleas login first')
    }
}

/**
 * this methd just hash password
 * @param password
 * @returns hashed password
 */
const hashPassword = (password: string): string => {
    return bcrypt.hashSync(
        password + config.encriptPassword,
        parseInt(config.slatRounds as string)
    )
}

export default { getUserData, hashPassword }
