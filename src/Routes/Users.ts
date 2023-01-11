import { Router } from 'express'
import UsersController from '../Controllers/UsersController'
import Authorization from '../Middlewares/Authorization'

const router = Router()

// get all users
router.get('/', Authorization, UsersController.index)
// get single user
router.get('/:id', Authorization, UsersController.show)
// create new user
router.post('/', UsersController.create)
// auth user
router.post('/auth', UsersController.auth)

export default router
