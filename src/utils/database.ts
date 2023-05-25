import { Sequelize } from "sequelize-typescript"

const sequelize = new Sequelize({
  dialect: 'mysql', // 是否可省略？
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
})

export default sequelize
