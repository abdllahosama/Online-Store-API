import { Router } from 'express'
import AuthController from '../Controllers/AuthController'

// configrate routes
const router = Router()

// auth user
router.post('/login', AuthController.auth)

export default router
