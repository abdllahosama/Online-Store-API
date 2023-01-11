import Jwt from "jsonwebtoken"
import { user } from "../Models/Users"
const getUserData = (token: string): user => {
    try {
        const tokentParams = token.split(' ')[0].toLowerCase()
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
export default getUserData