import { Request, Response, NextFunction } from 'express'
import config from '../Config'
import Jwt from 'jsonwebtoken'

/**
 * this middleware Authorization request
 * @param request
 * @param response
 */
const Authorization = (
    request: Request,
    _response: Response,
    next: NextFunction
): void => {
    const tokent = request.get('Authorization')
    if (tokent) {
        const tokentParams = tokent.split(' ')[0].toLowerCase()
        const tokenData = tokent.split(' ')[1]
        if (tokenData && tokentParams === 'bearer') {
            const verfyToken = Jwt.verify(
                tokenData,
                config.jwtPassword as string
            )
            if (verfyToken) {
                return next()
            }
        }
    }

    throw new Error('please login first')
}

export default Authorization
