import { Request, Response } from 'express'
import { productStore } from '../Models/Products'

class ProductsController {
    /**
     * this method get all products
     * @param request
     * @param response
     */
    public static index = async (
        _request: Request,
        response: Response
    ): Promise<void> => {
        try {
            // init product model
            const store = new productStore()
            // get product
            const data = await store.index()
            // success get products
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't get products: ${error}`)
        }
    }

    /**
     * this method show single product
     * @param request
     * @param response
     */
    public static show = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            // init product model
            const store = new productStore()
            // get single product
            const data = await store.show(parseInt(request.params.id))
            // success return product
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't show product: ${error}`)
        }
    }

    /**
     * this method create new product
     * @param request
     * @param response
     */
    public static create = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            // init product model
            const store = new productStore()
            // create product
            const data = await store.insert(request.body)
            // succsess product
            response.status(200).json({ status: 'success', data: data })
        } catch (error) {
            throw new Error(`cant't create product: ${error}`)
        }
    }
}

export default ProductsController
