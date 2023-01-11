import { Router } from 'express'
import ProductsController from '../Controllers/ProductsController'
import Authorization from '../Middlewares/Authorization'

const router = Router()

// get all products
router.get('/', Authorization, ProductsController.index)
// show single product
router.get('/:id', ProductsController.show)
// add new product
router.post('/', Authorization, ProductsController.create)

export default router
