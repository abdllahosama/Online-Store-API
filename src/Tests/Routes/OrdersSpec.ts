import app from '../../Server'
import supertest from 'supertest'
import { order, orderStore } from '../../Models/Orders'

const store = new orderStore()
const request = supertest(app)

describe('Test orders api response', (): void => {
    // check currentOrder end point 
    it('check currentOrder endpoint', async (): Promise<void> => {
        const responce = await request.get('/api/orders/currentOrder')
        expect(responce.status).toBe(200)
    })

    // // check single product end point 
    // it('check single product endpoint', async (): Promise<void> => {
    //     const product: product = {
    //         name: 'product',
    //         description: 'product description',
    //         price: 20,
    //     }
    //     const result = await store.insert(product)
    //     const responce = await request.get(`/api/products/${result.id}`)
    //     expect(responce.status).toBe(200)
    // })

    // // check add product end point 
    // it('check add product endpoint', async (): Promise<void> => {
    //     const product: product = {
    //         name: 'product',
    //         description: 'product description',
    //         price: 20,
    //     }
    //     const responce = await request.post(`/api/products`).send(product)
    //     .set('Content-Type', 'application/json')
    //     .set('Accept', 'application/json')
    //     expect(responce.status).toBe(200)
    // })
})