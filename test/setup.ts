import sequelize from '../src/utils/database'
import { userController } from '../src/controllers/userController'

beforeAll(async () => {
  await sequelize.sync({ force: true })
  await userController.createSuperAdmin()
})

afterAll(async () => {
  // 关闭数据库连接
  await sequelize.close()
})
