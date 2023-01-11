import { Request, Response } from 'express'
import { order, orderStore } from '../Models/Orders'
import { user } from '../Models/Users'
import UserUtilities from './../Utilities/User'

class OrdersController {
    /**
     * this method add product to active order
     * @param request
     * @param response
     */
    public static selectProduct = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            // init order model
            const store = new orderStore()
            // get current user order
            let currentOrder: order = await store.currntOrder(1)
            // if not current create new one
            if (!currentOrder) {
                currentOrder = await store.openOrder(1)
            }
            // add product to current order
            await store.addProductToOrder({
                order_id: currentOrder.id as number,
                product_id: request.body.product_id as number,
                quantity: request.body.quantity as number,
            })
            // return message to client
            response.status(200).json({
                status: 'success',
                message: 'product added successfully',
            })
        } catch (error) {
            throw new Error(`cant't add product to order: ${error}`)
        }
    }

    /**
     * this method get current order
     * @param request
     * @param response
     */
    public static currentOrder = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const token = request.get('Authorization') as string
            const autUser = UserUtilities.getUserData(token) as user
            // init order model
            const store = new orderStore()
            // get current user order
            const currentOrder: order = await store.currntOrder(
                autUser.id as number
            )
            // if not current create new one
            if (currentOrder) {
                // return order to client
                response
                    .status(200)
                    .json({ status: 'success', data: currentOrder })
            } else {
                // return no order message to client
                response.status(200).json({
                    status: 'faild',
                    message: 'there is no current order',
                })
            }
        } catch (error) {
            throw new Error(`cant't get current order: ${error}`)
        }
    }

    /**
     * this method complete order
     * @param request
     * @param response
     */
    public static completeOrder = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const token = request.get('Authorization') as string
            const autUser = UserUtilities.getUserData(token) as user
            // init order model
            const store = new orderStore()
            // get current user order
            const currentOrder: order = await store.currntOrder(
                autUser.id as number
            )
            // if not current create new one
            if (!currentOrder) {
                // return message no order found
                response.status(200).json({
                    status: 'success',
                    message: 'no current order founded',
                })
            } else {
                await store.completeOrder(currentOrder.id as number)
                response.status(200).json({
                    status: 'success',
                    message: 'order completed successfully',
                })
            }
        } catch (error) {
            throw new Error(`cant't complete order: ${error}`)
        }
    }

    /**
     * this method get all complete orders
     * @param request
     * @param response
     */
    public static completedOrders = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const token = request.get('Authorization') as string
            const autUser = UserUtilities.getUserData(token) as user
            const store = new orderStore()
            const data = await store.completedOrders(autUser.id as number)
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't get order: ${error}`)
        }
    }

    /**
     * this method show order
     * @param request
     * @param response
     */
    public static showOrder = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const data = await store.showOrder(parseInt(request.params.id))
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't show order: ${error}`)
        }
    }
}

export default OrdersController
