import express from 'express'
import { userController } from '../controllers/userController'
import { authMiddleware } from '../utils/authmiddleware'

const router = express.Router()

router.post('/login', userController.login)

router.post('/update-super-admin-password', authMiddleware, userController.updateSuperAdminPassword)

router.post('/refresh-token', userController.refreshToken)

export default router
