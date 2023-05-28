import express from 'express'
import { postController } from '../controllers/postController'

const router = express.Router()

router.get('/', postController.getAllPosts)

router.get('/list', postController.getPostList)

router.get('/:id', postController.getPostById)

router.post('/', postController.createPost)

router.put('/:id', postController.updatePost)

router.delete('/:id', postController.deletePost)

// add tag to post
router.post('/posts/:id/tags/:tagId', postController.addTag)

// remove tag from post
router.delete('/posts/:id/tags/:tagId', postController.removeTag)

export default router
