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

describe('Login Wrong Password tests', () => {
  it('should return 401', async () => {
    const response = await request(app).post('/users/login').send({
      name: 'admin',
      password: 'admin'
    })

    expect(response.status).toBe(401)
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
  it('should return 200 and post title was change', async () => {
    const response = await request(app).put(`/posts/${postId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      title: 'test3',
      content: 'test update'
    })

    expect(response.status).toBe(200)
    expect(response.body.title).toEqual('test3')
  })
})

describe('Get All Posts tests', () => {
  it('should return all list', async () => {
    const response = await request(app).get('/posts')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('posts')
    expect(response.body).toHaveProperty('count')
    expect(response.body.count).toEqual(1)
  })
})

describe('Get Post By Id tests', () => {
  it('should return the post', async () => {
    const response = await request(app).get(`/posts/${postId}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('content')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
    expect(response.body.title).toEqual('test3')
    expect(response.body.id).toEqual(postId)
  })
})
