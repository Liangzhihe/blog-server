import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../services/userService'

export const userController = {
  createSuperAdmin: async () => {
    try {
      await User.createSuperAdmin()
    } catch (error) {
      console.error('Error creating super admin:', error)
    }
  },

  updateSuperAdminPassword: async (req: Request, res: Response) => {
    try {
      const { password, newPassword } = req.body
      const existingUser = await User.findOne({ where: { name: 'admin' } })
      if (!existingUser) {
        res.status(404).json({ message: 'Super admin not found' })
        return
      } else {
        const isPasswordCorrect = await existingUser.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
          res.status(401).json({ message: 'Password incorrect' })
          return
        } else {
          const user = await User.updateSuperAdminPassword(newPassword)
          res.json(user)
        }
      }
    } catch (error) {
      console.error('Error updating super admin password:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body
      const user = await User.findOne({ where: { name } })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      } else {
        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
          res.status(401).json({ message: 'Password incorrect' })
          return
        } else {
          const accessToken = user.generateAccessToken()
          const refreshToken = user.generateRefreshToken()
          res.json({ accessToken, refreshToken })
        }
      }
    } catch (error) {
      console.error('Error logging in:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'secret'
      jwt.verify(refreshToken, refreshTokenSecret, async (err: unknown, user: unknown) => {
        if (err) {
          res.status(403).json({ message: 'Invalid refresh token' })
          return
        } else {
          const typedUser = user as User
          const accessToken = typedUser.generateAccessToken()
          res.json({ accessToken })
        }
      })
    } catch (error) {
      console.error('Error refreshing token:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
