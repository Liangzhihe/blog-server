import type { Express } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

function useSwagger(app: Express) {

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'], // 替换为你的 API 文件的路径模式
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

// 提供 Swagger UI 页面
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

}

export default useSwagger