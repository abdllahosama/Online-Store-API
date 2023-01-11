import { Request, Response } from 'express'
import { order, orderStore } from '../Models/Orders'

class OrdersController {
    /**
     * this method get all order
     * @param request
     * @param response
     */
    public static index = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const data = await store.index()
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't get order: ${error}`)
        }
    }

    /**
     * this method show product
     * @param request
     * @param response
     */
    public static show = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const data = await store.show(parseInt(request.params.id))
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't show order: ${error}`)
        }
    }

    /**
     * this method create new order
     * @param request
     * @param response
     */
    public static create = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const order: order = {
                user_id: request.body.userId,
                status: request.body.status,
                orderProducts: request.body.orderProducts,
            }
            const data = await store.insert(order)

            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't create order: ${error}`)
        }
    }

    /**
     * this method update order
     * @param request
     * @param response
     */
    public static update = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const order: order = {
                user_id: request.body.userId,
                status: request.body.status,
                orderProducts: request.body.orderProducts,
            }

            await store.update(parseInt(request.params.id), order)

            response.status(200).json({
                status: 'success',
                message: 'order updated successfully',
            })
        } catch (error) {
            throw new Error(`cant't update order: ${error}`)
        }
    }

    /**
     * this method delete order
     * @param request
     * @param response
     */
    public static destroy = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            await store.delete(parseInt(request.params.id))
            response.status(200).json({
                status: 'success',
                message: 'order deleted successfuly',
            })
        } catch (error) {
            throw new Error(`cant't delete order: ${error}`)
        }
    }
}

export default OrdersController
