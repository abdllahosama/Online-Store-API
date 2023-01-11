import { Router } from 'express'
import UsersController from '../Controllers/UsersController'

const router = Router()

// get all users
router.get('/', UsersController.index)
// get single user
router.get('/:id', UsersController.show)
// create new user
router.post('/', UsersController.create)
// auth user
router.post('/auth', UsersController.auth)

export default router
