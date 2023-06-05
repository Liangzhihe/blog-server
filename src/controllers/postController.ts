import { Request, Response } from 'express'
import Post, { IPostFilterOptions } from '../services/postService'
import Tag from '../services/tagService'

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
      const tagIds = req.query.tagIds as string[] || undefined
      const title = req.query.title as string || undefined
      const page = parseInt(req.query.page as string) || undefined
      const pageSize = parseInt(req.query.pageSize as string) || undefined

      const [ posts, postsWithoutLimit ] = await Promise.all([
        Post.getPostList({ tagIds, title, page, pageSize }),
        Post.getPostList({ tagIds, title }),
      ])
      const count = postsWithoutLimit.length
      if (page && pageSize) {
        res.json({ posts, count, page: page, pageSize: pageSize })
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
  },

  getPostTags: async (req: Request, res: Response) => {
    try {
      const tags = await Tag.getTagsByPostId(req.params.id)
      if (tags) {
        res.json(tags)
      } else {
        res.status(404).json({ message: 'Post not found' })
      }
    } catch (error) {
      console.error('Error retrieving post tags:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
