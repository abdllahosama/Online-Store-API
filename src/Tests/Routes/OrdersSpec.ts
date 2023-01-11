import app from '../../Server'
import supertest from 'supertest'
import { orderStore } from '../../Models/Orders'
import { productStore } from '../../Models/Products'
import { user, userStore } from '../../Models/Users'
import config from '../../Config'
import Jwt from 'jsonwebtoken'

const store = new orderStore()
const request = supertest(app)

let user: user = {
    first_name: 'abdallah',
    last_name: 'osama',
    email: 'ordersUser',
    user_name: 'ordersUser',
    password: '123456',
}

let token = ''

describe('Test orders api response', (): void => {
    // int auth token
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        user = await userModel.insert(user)
        token = 'bearer ' + Jwt.sign({ user }, config.jwtPassword as string)
    })

    // check currentOrder end point
    it('check currentOrder endpoint', async (): Promise<void> => {
        const responce = await request
            .get('/api/orders/currentOrder')
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check completedorders end point
    it('check completedorders endpoint', async (): Promise<void> => {
        const responce = await request
            .get('/api/orders/completedorders')
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check selectProduct end point
    it('check selectProduct endpoint', async (): Promise<void> => {
        const productModel = new productStore()
        const product = await productModel.insert({
            name: 'new product',
            description: 'new description',
            price: 20,
        })
        const responce = await request
            .post('/api/orders/selectProduct')
            .send({ product_id: product.id, quantity: 3 })
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check completeOrder end point
    it('check completeOrder endpoint', async (): Promise<void> => {
        const productModel = new productStore()
        await productModel.insert({
            name: 'new product',
            description: 'new description',
            price: 20,
        })
        const responce = await request
            .get('/api/orders/completeOrder')
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })

    // check showOrder end point
    it('check showOrder endpoint', async (): Promise<void> => {
        const openOrder = await store.openOrder(user.id as number)
        const responce = await request
            .get('/api/orders/showOrder/' + openOrder.id)
            .set('Authorization', token)
        expect(responce.status).toBe(200)
    })
})
