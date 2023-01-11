import { Request, Response } from 'express'
import { user, userStore } from '../Models/Users'
import jwt from 'jsonwebtoken'
import config from '../Config'

class UsersController {
    /**
     * this method get all users
     * @param request
     * @param response
     */
    public static index = async (
        request: Request,
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
            const user: user = {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                userName: request.body.userName,
                password: request.body.password,
            }

            const data = await store.insert(user)

            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't create user: ${error}`)
        }
    }

    /**
     * this method update user
     * @param request
     * @param response
     */
    public static update = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const user: user = {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                email: request.body.email,
                userName: request.body.userName,
                password: request.body.password,
            }

            const data = await store.update(parseInt(request.params.id), user)

            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't update user: ${error}`)
        }
    }

    /**
     * this method delete user
     * @param request
     * @param response
     */
    public static destroy = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            await store.delete(parseInt(request.params.id))
            response
                .status(200)
                .json({ status: 'success', data: 'user deleted successfuly' })
        } catch (error) {
            throw new Error(`cant't delete user: ${error}`)
        }
    }

    public static auth = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new userStore()
            const { userName, password } = request.body
            const user = await store.auth(userName, password)

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
                    data: 'error in email or password',
                })
            }
        } catch (error) {
            throw new Error(`cant't auth: ${error}`)
        }
    }
}

export default UsersController
