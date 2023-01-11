import { Request, Response } from 'express'
import { order, orderStore } from '../Models/Orders'

class OrdersController {
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
            response.status(200).json({ status: 'success', message: 'product added successfully' })
        } catch (error) {
            throw new Error(`cant't add product to order: ${error}`)
        }
    }

    public static currentOrder = async (
        _request: Request,
        response: Response
    ): Promise<void> => {
        try {
            // init order model
            const store = new orderStore()
            // get current user order
            let currentOrder: order = await store.currntOrder(1)
            // if not current create new one
            if (currentOrder) {
                // return order to client
                response.status(200).json({ status: 'success', data: currentOrder })
            } else {
                // return no order message to client
                response.status(200).json({ status: 'faild', message : 'there is no current order' })
            }
        } catch (error) {
            throw new Error(`cant't get current order: ${error}`)
        }
    }

    public static completeOrder = async (
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
                // return message no order found
                response.status(200).json({ status: 'success', message: 'no current order founded' })
            } else {
                await store.completeOrder(currentOrder.id as number)
                response.status(200).json({ status: 'success', message: 'order completed successfully' })
            }
        } catch (error) {
            throw new Error(`cant't complete order: ${error}`)
        }
    }


    /**
     * this method get all order
     * @param request
     * @param response
     */
    public static completedOrders = async (
        _request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const store = new orderStore()
            const data = await store.completedOrders(1)
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
