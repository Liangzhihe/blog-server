import express from 'express'
import { tagController } from '../controllers/tagController'
import { authMiddleware } from '../utils/authmiddleware'

const router = express.Router()

router.get('/', tagController.getAllTags)

router.post('/', authMiddleware, tagController.createTag)

router.delete('/:id', authMiddleware, tagController.deleteTag)

export default router
