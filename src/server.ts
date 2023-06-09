import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import sequelize from './utils/database'
import useSwagger from './utils/swaggerConfig'
import postRoutes from './routes/postRoutes'
import tagRoutes from './routes/tagRoutes'
import userRoutes from './routes/userRoutes'
import { userController } from './controllers/userController'


dotenv.config({ path: path.join(__dirname, `../env/.env.${process.env.NODE_ENV}`) })

export const app = express()
const port = 3000

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/posts', postRoutes)
app.use('/tags', tagRoutes)
app.use('/users', userRoutes)

useSwagger(app)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello API!')
})

// Create super admin
userController.createSuperAdmin()

// Start the server and sync the database
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })
}).catch((error) => {
  console.error('Error syncing database:', error)
})
