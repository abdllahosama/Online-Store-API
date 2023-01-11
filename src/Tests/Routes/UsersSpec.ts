import app from '../../Server'
import supertest from 'supertest'
import { user, userStore } from '../../Models/Users'
import config from '../../Config'
import Jwt from 'jsonwebtoken'
const store = new userStore()
const request = supertest(app)

let user: user = {
    first_name: 'abdallah',
    last_name: 'osama',
    email: 'usersUser',
    user_name: 'usersUser',
    password: '123456',
}

let token = ''

describe('Test users api response', (): void => {
    // int auth token
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        user = await userModel.insert(user)
        token = 'bearer ' + Jwt.sign({ user }, config.jwtPassword as string)
    })

    // check all users end point
    it('check all users endpoint', async (): Promise<void> => {
        const responce = await request
            .get('/api/users')
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check single user end point
    it('check single user endpoint', async (): Promise<void> => {
        const user: user = {
            first_name: 'abdallah',
            last_name: 'osama',
            email: 'endpoint@gmail.com',
            user_name: 'endpoint',
            password: '123456',
        }
        const result = await store.insert(user)
        const responce = await request
            .get(`/api/users/${result.id}`)
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check add user end point
    it('check add user endpoint', async (): Promise<void> => {
        const user: user = {
            first_name: 'abdallah',
            last_name: 'osama',
            email: 'endpointadd@gmail.com',
            user_name: 'endpointadd',
            password: '123456',
        }
        const responce = await request
            .post('/api/users')
            .send(user)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(responce.status).toBe(200)
    })
})
