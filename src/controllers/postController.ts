import { Request, Response } from 'express'
import Post, { IPostFilterOptions } from '../services/postService'

export const postController = {
  // get all posts
  getAllPosts: async (req: Request, res: Response) => {
    try {
      const [posts, count] = await Promise.all([
        Post.getAllPosts(),
        Post.getPostCount(),
      ])
      res.json({ posts, count })
    } catch (error) {
      console.error('Error retrieving posts:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getPostById: async (req: Request, res: Response) => {
    try {
      const post = await Post.getPostById(req.params.id)
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      console.error('Error retrieving post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  getPostList: async (req: Request, res: Response) => {
    try {
      const options = req.params as IPostFilterOptions
      const [posts, count] = await Promise.all([
        Post.getPostList(options),
        Post.getPostCount()
      ])
      if (options.page && options.pageSize) {
        res.json({ posts, count, page: options.page, pageSize: options.pageSize })
      } else {
        res.json({posts, count})
      }
    } catch (error) {
      console.error('Error retrieving post list:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  createPost: async (req: Request, res: Response) => {
    try {
      const { title, content }: { title: string, content: string } = req.body
      const post = await Post.createPost(title, content)
      res.json(post)
    } catch (error) {
      console.error('Error creating post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  updatePost: async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body
      const post = await Post.updatePost(req.params.id, title, content)
      if (post) {
        res.json(post)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      console.error('Error updating post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  deletePost: async (req: Request, res: Response) => {
    try {
      const result = await Post.deletePost(req.params.id)
      if (result) {
        res.json({ message: 'Post deleted' })
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  addTag: async (req: Request, res: Response) => {
    try {
      console.log(req, req.params)
      const result = await Post.addTag(req.params.id, req.params.tagId)
      if (result) {
        res.json({ message: 'Tag added to post' })
      } else {
        res.status(404).json({ message: 'Post or tag not found' })
      }
    } catch (error) {
      console.error('Error adding tag to post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  removeTag: async (req: Request, res: Response) => {
    try {
      const result = await Post.removeTag(req.params.id, req.params.tagId)
      if (result) {
        res.json({ message: 'Tag removed from post' })
      } else {
        res.status(404).json({ message: 'Post or tag not found' })
      }
    } catch (error) {
      console.error('Error removing tag from post:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
