import express from 'express'
import { postController } from '../controllers/postController'
import { authMiddleware } from '../utils/authmiddleware'

const router = express.Router()

router.get('/', postController.getAllPosts)

router.get('/list', postController.getPostList)

router.get('/:id', postController.getPostById)

router.post('/', authMiddleware, postController.createPost)

router.put('/:id', authMiddleware, postController.updatePost)

router.delete('/:id', authMiddleware, postController.deletePost)

// add tag to post
router.post('/posts/:id/tags/:tagId', authMiddleware, postController.addTag)

// remove tag from post
router.delete('/posts/:id/tags/:tagId', authMiddleware, postController.removeTag)

export default router
