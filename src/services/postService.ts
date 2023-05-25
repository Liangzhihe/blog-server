import { DataTypes, FindOptions } from 'sequelize'
import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  UpdatedAt,
  CreatedAt,
  DeletedAt,
} from 'sequelize-typescript'
import { Tag } from './tagService'


export interface IPostFilterOptions {
  tagIds?: string[]
  title?: string
  page?: number
  pageSize?: number
}

@Table({ tableName: 'posts' })
export class Post extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string

  @Column({ type: DataType.STRING })
  title!: string

  @Column({ type: DataType.TEXT })
  content!: string

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt!: Date

  static getAllPosts = async (): Promise<Post[]> => {
    return await Post.findAll()
  }

  static getPostCount = async (): Promise<number> => {
    return await Post.count()
  }

  static getPostById = async (id: string): Promise<Post | null> => {
    return await Post.findByPk(id)
  }

  static getPostList = async (options: IPostFilterOptions): Promise<Post[]> => {
    const { tagIds, title, page, pageSize } = options
    const queryOptions: FindOptions = {
      attributes: ['id', 'title', 'updatedAt'],
      where: {},
    }
    if (tagIds) {
      queryOptions.include = [
        {
          model: Tag,
          where: { id: tagIds },
          through: { attributes: [] }, // exclude join table
        },
      ]
    }
    if (title) {
      queryOptions.where = { ...queryOptions.where, title }
    }
    if (page && pageSize) {
      queryOptions.offset = (page - 1) * pageSize
      queryOptions.limit = pageSize
    }
    return await Post.findAll(queryOptions)
  }

  static createPost = async (title: string, content: string): Promise<Post> => {
    return await Post.create({ title, content })
  }

  static updatePost = async (
    id: string,
    title: string,
    content: string
  ): Promise<Post | null> => {
    const [affectedRows] = await Post.update(
      {
        title,
        content,
      },
      {
        where: { id },
      }
    )
    if (affectedRows > 0) {
      return await Post.findByPk(id)
    }
    return null
  }

  static deletePost = async (id: string): Promise<boolean> => {
    const affectedRows = await Post.destroy({ where: { id } })
    return affectedRows > 0
  }
}
