import { Request, Response } from 'express'
import { userStore } from '../Models/Users'

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
            // init user model
            const store = new userStore()
            // get all users
            const data = await store.index()
            // return success users
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
            // init user model
            const store = new userStore()
            // get single user
            const data = await store.show(parseInt(request.params.id))
            // success get uder
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
            // init user model
            const store = new userStore()
            // create new user
            const data = await store.insert(request.body)
            // return success user
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't create user: ${error}`)
        }
    }
}

export default UsersController
