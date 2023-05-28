import path from 'path'
import fs from 'fs'
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'

// Load environment variables
const envFileContent = fs.readFileSync(
  path.join(__dirname, `../../env/.env.${process.env.NODE_ENV}`),
  'utf8'
)
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = dotenv.parse(envFileContent)

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: DB_DATABASE || 'test',
  username: DB_USER || 'root',
  password: DB_PASSWORD || 'root',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 3306,
  models: [path.join(__dirname, '../services')],
})

// mutiple to mutiple relationship: Post <-> Tag
sequelize.models.Post.belongsToMany(sequelize.models.Tag, { through: sequelize.models.PostTag })
sequelize.models.Tag.belongsToMany(sequelize.models.Post, { through: sequelize.models.PostTag })

export default sequelize
