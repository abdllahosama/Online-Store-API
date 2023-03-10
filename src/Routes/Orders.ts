import { Router } from 'express'
import OrdersController from '../Controllers/OrdersController'
import Authorization from '../Middlewares/Authorization'

// configrate routes
const router = Router()

// select product
router.post('/selectProduct', Authorization, OrdersController.selectProduct)
// // complete crunt order
router.get('/completeOrder', Authorization, OrdersController.completeOrder)
// // get current order
router.get('/currentOrder', Authorization, OrdersController.currentOrder)
// // get completed  orders
router.get('/completedorders', Authorization, OrdersController.completedOrders)
// show singel order
router.get('/showOrder/:id', Authorization, OrdersController.showOrder)

export default router
