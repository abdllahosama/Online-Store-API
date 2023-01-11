import app from '../../Server'
import supertest from 'supertest'
import { user, userStore } from '../../Models/Users'
const request = supertest(app)

let user: user = {
    first_name: 'abdallah',
    last_name: 'osama',
    email: 'author',
    user_name: 'author',
    password: '123456',
}

describe('Test users api response', (): void => {
    // int auth token
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        user = await userModel.insert(user)
    })

    // check login end point
    it('check login endpoint', async (): Promise<void> => {
        const responce = await request
            .post('/api/auth/login')
            .send({ user_name: user.user_name, password: 123456 })
        expect(responce.status).toBe(200)
    })
})
