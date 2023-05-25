import express, { Request, Response } from 'express'
import sequelize from './utils/database'
import postRoutes from './routes/postRoutes'

const app = express()
const port = 3000

// Basic middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/posts', postRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello API!')
})

// Start the server and sync the database
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  })
}).catch((error) => {
  console.error('Error syncing database:', error)
})
