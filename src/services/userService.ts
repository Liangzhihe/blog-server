import { DataTypes } from 'sequelize'
import jwt from 'jsonwebtoken'
import {
  Model,
  Table,
  Column,
  DataType,
  UpdatedAt,
  CreatedAt,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript'
import bcrypt from 'bcrypt'

@Table({ tableName: 'users', underscored: true })
export default class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataTypes.UUIDV4,
  })
  id!: string

  @Column({ type: DataType.STRING })
  name!: string

  @Column({ type: DataType.STRING })
  password!: string

  @CreatedAt
  createdAt!: Date

  @UpdatedAt
  updatedAt!: Date

  @BeforeCreate
  static async hashPasswordHook(instance: User) {
    const saltRounds = 10
    instance.password = await bcrypt.hash(instance.password, saltRounds)
  }

  @BeforeUpdate
  static async hashPasswordUpdateHook(instance: User) {
    if (instance.changed('password')) {
      const saltRounds = 10
      instance.password = await bcrypt.hash(instance.password, saltRounds)
    }
  }

  static createSuperAdmin = async (): Promise<User> => {
    const superAdmin = await User.findOne({ where: { name: 'admin' } })
    if (superAdmin) {
      return superAdmin
    } else {
      // Load environment variables
      const password = process.env.SUPER_ADMIN_PASSWORD || 'admin'
      return await User.create({
        name: 'admin',
        password,
      })
    }
  }

  static updateSuperAdminPassword = async (password: string): Promise<User> => {
    const superAdmin = await User.findOne({ where: { name: 'admin' } })
    if (superAdmin) {
      superAdmin.password = password
      return await superAdmin.save()
    } else {
      throw new Error('Super admin not found')
    }
  }

  isPasswordCorrect = async (password: string): Promise<boolean> => {
    const superAdmin = await User.findOne({ where: { name: 'admin' } })
    if (superAdmin) {
      return await bcrypt.compare(password, superAdmin.password)
    }
    return false
  }

  generateAccessToken = (): string => {
    const payload = {
      id: this.id,
      name: this.name,
    }
    const accessTokenSecret = process.env.JWT_SECRET || 'access_secret'
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: '3h',
      algorithm: 'HS256',
    })
    return accessToken
  }

  generateRefreshToken = (): string => {
    const payload = {
      id: this.id,
      name: this.name,
    }
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'refresh_secret'
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: '14d',
      algorithm: 'HS256',
    })
    return refreshToken
  }
}
