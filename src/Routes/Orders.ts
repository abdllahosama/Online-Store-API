import { Router } from 'express'
import OrdersController from '../Controllers/OrdersController'

const router = Router()

router.get('/', OrdersController.index)
router.get('/:id', OrdersController.show)
router.post('/', OrdersController.create)
router.put('/:id', OrdersController.update)
router.delete('/:id', OrdersController.destroy)

export default router
