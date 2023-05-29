import { expressjwt } from 'express-jwt'

const getJwtSecret = () => process.env.JWT_SECRET || 'access_secret'

export const authMiddleware = expressjwt({
  secret: getJwtSecret,
  algorithms: ['HS256']
})
