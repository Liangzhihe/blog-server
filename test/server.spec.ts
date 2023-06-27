import request from 'supertest'
import { app } from '../src/server'

let accessToken: string
let postId: string

describe('API Service Starting tests', () => {
  it('should return "Hello API!"', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.text).toEqual('Hello API!')
  })
})

describe('Login tests', () => {
  it('should return 200 and accessToken,refreshToken', async () => {
    const response = await request(app).post('/users/login').send({
      name: 'admin',
      password: 'superadmin@password'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
    expect(response.body).toHaveProperty('refreshToken')
    accessToken = response.body.accessToken
  })
})

describe('Create Post tests', () => {
  it('should return 200', async () => {
    const response = await request(app).post('/posts')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title: 'test2',
      content: 'test'
    })

    expect(response.status).toBe(200)
    postId = response.body.id
  })
})

describe('Update Post tests', () => {
  it('should return 200', async () => {
    const response = await request(app).put(`/posts/${postId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title: 'test3',
      content: 'test update'
    })

    expect(response.status).toBe(200)
  })
})

describe('Get All Posts tests', () => {
  it('should return List', async () => {
    const response = await request(app).get('/posts')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('posts')
    expect(response.body).toHaveProperty('count')
  })
})
