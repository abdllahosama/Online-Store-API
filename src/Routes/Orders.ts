import { Router } from 'express'
import OrdersController from '../Controllers/OrdersController'

const router = Router()

// select product
router.post('/selectProduct', OrdersController.selectProduct)
// // complete crunt order
router.get('/completeOrder', OrdersController.completeOrder)
// // get current order
router.get('/currentOrder', OrdersController.currentOrder)
// // get completed  orders
router.get('/completedorders', OrdersController.completedOrders)
// get singel complete order
router.get('/completedOrders', OrdersController.completedOrders)
// show singel order
router.get('/showOrder/:id',  OrdersController.showOrder)

export default router
