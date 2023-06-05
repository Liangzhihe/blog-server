import { DataTypes } from 'sequelize'
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import PostTag from './postTagService'

@Table({ tableName: 'tags', underscored: true, updatedAt: false })
export default class Tag extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string

  @Column({ type: DataType.STRING })
  name!: string

  @CreatedAt
  createdAt!: Date

  static getAllTags = async (): Promise<Tag[]> => {
    return await Tag.findAll()
  }

  static getTagCount = async (): Promise<number> => {
    return await Tag.count()
  }

  static getTagsByPostId = async (postId: string): Promise<Tag[]> => {
    return await Tag.findAll({
      include: [
        {
          model: PostTag,
          where: { postId },
          attributes: [],
        },
      ],
    })
  }

  static createTag = async (name: string): Promise<Tag> => {
    // check if tag already exists
    const tag = await Tag.findOne({ where: { name } })
    if (tag) {
      return tag
    }
    return await Tag.create({ name })
  }

  static deleteTag = async (id: string): Promise<boolean> => {
    const affectedRows = await Tag.destroy({ where: { id } })
    return affectedRows > 0
  }
}
