import { DataTypes } from "sequelize"
import { Column, CreatedAt, DataType, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript"

@Table({ tableName: 'tags' })
export class Tag extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataTypes.UUIDV4 })
  id!: string

  @Column({ type: DataType.STRING })
  name!: string

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt!: Date

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt!: Date

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt!: Date

  static getAllTags = async (): Promise<Tag[]> => {
    return await Tag.findAll()
  }

  static createTag = async (name: string): Promise<Tag> => {
    return await Tag.create({ name })
  }

  static updateTag = async (id: string, name: string): Promise<Tag | null> => {
    const [affectedRows] = await Tag.update({ name }, { where: { id } })
    if (affectedRows > 0) {
      return await Tag.findByPk(id)
    }
    return null
  }

  static deleteTag = async (id: string): Promise<boolean> => {
    const affectedRows = await Tag.destroy({ where: { id } })
    return affectedRows > 0
  }
}