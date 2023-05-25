import express from 'express'
import { postController } from '../controllers/postController'

const router = express.Router()

router.get('/', postController.getAllPosts)

router.get('/:id', postController.getPostById)

router.get('/list', postController.getPostList)

router.post('/', postController.createPost)

router.put('/:id', postController.updatePost)

router.delete('/:id', postController.deletePost)