import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'post_tags',
  underscored: true,
  updatedAt: false,
  createdAt: false,
})
export default class PostTag extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id!: number

  @Column({ type: DataType.UUID })
  postId!: string

  @Column({ type: DataType.UUID })
  tagId!: string
}
