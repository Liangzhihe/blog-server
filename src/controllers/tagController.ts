import { Request, Response } from 'express'
import Tag from '../services/tagService'

export const tagController = {
  // get all tags
  getAllTags: async (req: Request, res: Response) => {
    try {
      const [tags, count] = await Promise.all([
        Tag.getAllTags(),
        Tag.getTagCount(),
      ])
      res.json({ tags, count })
    } catch (error) {
      console.error('Error retrieving tags:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  createTag: async (req: Request, res: Response) => {
    try {
      const { name }: { name: string } = req.body
      const tag = await Tag.createTag(name)
      res.json(tag)
    } catch (error) {
      console.error('Error creating tag:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },

  deleteTag: async (req: Request, res: Response) => {
    try {
      const result = await Tag.deleteTag(req.params.id)
      if (result) {
        res.json({ message: 'Tag deleted' })
      } else {
        res.status(404).json({ message: 'Tag not found' })
      }
    } catch (error) {
      console.error('Error deleting tag:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
}
