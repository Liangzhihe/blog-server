import express from 'express'
import { tagController } from '../controllers/tagController'

const router = express.Router()

router.get('/', tagController.getAllTags)

router.post('/', tagController.createTag)

router.delete('/:id', tagController.deleteTag)

export default router