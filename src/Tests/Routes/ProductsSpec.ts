import app from '../../Server'
import supertest from 'supertest'
import { product, productStore } from '../../Models/Products'
import { user, userStore } from '../../Models/Users'
import config from '../../Config'
import Jwt from 'jsonwebtoken'

const store = new productStore()
const request = supertest(app)

let user: user = {
    first_name: 'abdallah',
    last_name: 'osama',
    email: 'productsUser',
    user_name: 'productsUser',
    password: '123456',
}

let token = ''

describe('Test products api response', (): void => {
    // int auth token
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        user = await userModel.insert(user)
        token = 'bearer ' + Jwt.sign({ user }, config.jwtPassword as string)
    })

    // check all products end point
    it('check all products endpoint', async (): Promise<void> => {
        const responce = await request.get('/api/products')
        expect(responce.status).toBe(200)
    })

    // check single product end point
    it('check single product endpoint', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20,
        }
        const result = await store.insert(product)
        const responce = await request.get(`/api/products/${result.id}`)
        expect(responce.status).toBe(200)
    })

    // check add product end point
    it('check add product endpoint', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20,
        }
        const responce = await request
            .post('/api/products')
            .send(product)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })
})
