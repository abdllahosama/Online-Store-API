import { Router } from 'express'
import UsersController from '../Controllers/UsersController'

const router = Router()

router.get('/', UsersController.index)
router.get('/:id', UsersController.show)
router.post('/', UsersController.create)
router.post('/auth', UsersController.auth)

export default router
