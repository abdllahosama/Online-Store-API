import { Router } from 'express'
import ProductsController from '../Controllers/ProductsController'
import Authorization from '../Middlewares/Authorization'

// configrate routes
const router = Router()

// get all products
router.get('/', ProductsController.index)
// show single product
router.get('/:id', ProductsController.show)
// add new product
router.post('/', Authorization, ProductsController.create)

export default router
