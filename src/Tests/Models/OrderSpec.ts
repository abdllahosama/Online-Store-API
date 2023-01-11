import { order, orderStore, orderStatus } from '../../Models/Orders'
import { user, userStore } from '../../Models/Users'

const store = new orderStore()
let orderUser: user = {
    firstName: 'abdallah',
    lastName: 'osama',
    email: 'order@gmail.com',
    userName: 'order',
    password: '123456',
}
describe('Test order model', (): void => {
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        orderUser  = await userModel.insert(orderUser)
    })

    // check index order
    it('should have index method', (): void => {
        expect(store.index).toBeDefined()
    })

    // check insert order
    it('should have insert method', (): void => {
        expect(store.insert).toBeDefined()
    })

    // check show order
    it('should have show method', (): void => {
        expect(store.show).toBeDefined()
    })

    // check update order
    it('should have update method', (): void => {
        expect(store.update).toBeDefined()
    })

    // check delete order
    it('should have delete method', (): void => {
        expect(store.delete).toBeDefined()
    })

    // index method returns object
    it('index method should return list of orders', async (): Promise<void> => {
        const result = await store.index()
        expect(typeof result == 'object').toBeTrue()
    })
    // single user return object
    it('insert method should return single order', async (): Promise<void> => {
        const data: order = {
            userId: orderUser.id as number,
            status: orderStatus.active
        }
        const result = await store.insert(data)
        expect(typeof result == 'object').toBeTrue()
    })

    // show order return exact order
    it('show method should return single order', async (): Promise<void> => {
        const data: order = {
            userId: orderUser.id as number,
            status: orderStatus.active,
            orderProducts: []
        }
        const result = await store.insert(data)
        const prod = await store.show(result.id as number)
        expect(prod).toEqual(result)
    })

    // update order return true status
    it('update method should return success message', async (): Promise<void> => {
        const data: order = {
            userId: orderUser.id as number,
            status: orderStatus.active,
            orderProducts: []
        }
        const result = await store.insert(data)
        const updateStatus = await store.update(result.id as number, result)
        expect(updateStatus).toBeTrue()
    })

    //delete order return true status
    it('delete method should return success message', async (): Promise<void> => {
        const data: order = {
            userId: orderUser.id as number,
            status: orderStatus.active,
            orderProducts: []
        }
        const result = await store.insert(data)
        const deleteStatus = await store.delete(result.id as number)
        expect(deleteStatus).toBeTrue()
    })
})
