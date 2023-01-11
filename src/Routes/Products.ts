import { Router } from 'express'
import ProductsController from '../Controllers/ProductsController'

const router = Router()

router.get('/', ProductsController.index)
router.get('/:id', ProductsController.show)
router.post('/', ProductsController.create)
router.put('/:id', ProductsController.update)
router.delete('/:id', ProductsController.destroy)

export default router
