import { Router } from 'express'
import UsersController from '../Controllers/UsersController'
import Authorization from '../Middlewares/Authorization'

// configrate routes
const router = Router()

// get all users
router.get('/', Authorization, UsersController.index)
// get single user
router.get('/:id', Authorization, UsersController.show)
// create new user
router.post('/', UsersController.create)

export default router
