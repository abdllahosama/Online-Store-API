import { Request,  Response } from 'express'
import { product, productStore} from '../Models/Products'

class ProductsController {

    /**
     * this method get all products
     * @param request 
     * @param response 
     */
    public static index = async (request: Request, response: Response): Promise<void> => {
        try {
            const store = new productStore();
            const data = await store.index()
            response.status(200).json({status: 'success', 'data': data})
        } catch (error) {
            throw new Error(`cant't get products: ${error}`)
        }
    }

    /**
     * this method show product
     * @param request 
     * @param response 
     */
    public static show = async (request: Request, response: Response): Promise<void> => {
        try {
            const store = new productStore();
            const data = await store.show(parseInt(request.params.id))
            response.status(200).json({status: 'success', 'data': data})
        } catch (error) {
            throw new Error(`cant't show product: ${error}`)
        }
    }

    /**
     * this method create new product
     * @param request 
     * @param response 
     */
    public static create = async (request: Request, response: Response): Promise<void> => {
        try {
            const store = new productStore();
            const product: product = {
                name: request.body.name,
                description: request.body.description,
                price: request.body.price
            }

            const data = await store.insert(product)

            response.status(200).json({status: 'success', 'data': data})
        } catch (error) {
            throw new Error(`cant't create product: ${error}`)
        }
    }

    /**
     * this method update product
     * @param request 
     * @param response 
     */
    public static update = async (request: Request, response: Response): Promise<void> => {
        try {
            const store = new productStore();
            const product: product = {
                name: request.body.name,
                description: request.body.description,
                price: request.body.price
            }

            const data = await store.update(parseInt(request.params.id) , product)

            response.status(200).json({status: 'success', 'data': data})
        } catch (error) {
            throw new Error(`cant't update product: ${error}`)
        }
    }

    /**
     * this method delete product
     * @param request 
     * @param response 
     */
    public static destroy = async (request: Request, response: Response): Promise<void> => {
        try{
            const store = new productStore();
            await store.delete(parseInt(request.params.id))
            response.status(200).json({status: 'success', 'data': "product deleted successfuly"})
        } catch (error) {
            throw new Error(`cant't delete product: ${error}`) 
        }
    }
}

export default ProductsController;