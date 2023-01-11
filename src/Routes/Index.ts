import { Router } from 'express'
import products from './Products'
import users from './Users'
import orders from './Orders'
import Auth from './Auth'

// configrate routes
const routes = Router()

//append routs that comes from products
routes.use('/products', products)

//append routs that comes from users
routes.use('/users', users)

//append routs that comes from orders
routes.use('/orders', orders)

//append routs that comes from Auth
routes.use('/auth', Auth)

// return routs data
export default routes
