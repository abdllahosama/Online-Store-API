import { Request, Response } from 'express'
import { userStore } from '../Models/Users'
import jwt from 'jsonwebtoken'
import config from '../Config'

class UsersController {
    /**
     * this method get all users
     * @param request
     * @param response
     */
    public static index = async (
        _request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const data = await store.index()
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't get users: ${error}`)
        }
    }

    /**
     * this method show user
     * @param request
     * @param response
     */
    public static show = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const data = await store.show(parseInt(request.params.id))
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't show user: ${error}`)
        }
    }

    /**
     * this method create new user
     * @param request
     * @param response
     */
    public static create = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const data = await store.insert(request.body)

            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't create user: ${error}`)
        }
    }

    public static auth = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const { user_name, password } = request.body
            const user = await store.auth(user_name, password)

            if (user) {
                const token = jwt.sign({ user }, config.jwtPassword as string)
                response.status(200).json({
                    status: 'success',
                    data: {
                        user: user,
                        token: token,
                    },
                })
            } else {
                response.status(401).json({
                    status: 'error',
                    data: 'error in user name or password',
                })
            }
        } catch (error) {
            throw new Error(`cant't auth: ${error}`)
        }
    }
}

export default UsersController
