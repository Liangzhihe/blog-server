import express from 'express'
import { userController } from '../controllers/userController'
import { authMiddleware } from '../utils/authmiddleware'

const router = express.Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 用户登录
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: 访问令牌
 *                 refreshToken:
 *                   type: string
 *                   description: 刷新令牌
 *       401:
 *         description: 未经授权的访问
 *       400:
 *         description: 请求参数错误
 *       404:
 *         description: 用户不存在
 */
router.post('/login', userController.login)

router.post('/update-super-admin-password', authMiddleware, userController.updateSuperAdminPassword)

router.post('/refresh-token', userController.refreshToken)

export default router
