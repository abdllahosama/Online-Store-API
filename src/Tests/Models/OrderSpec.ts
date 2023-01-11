import { orderStore } from '../../Models/Orders'
import { productStore } from '../../Models/Products'
import { user, userStore } from '../../Models/Users'

const store = new orderStore()
const productModel = new productStore()
let orderUser: user = {
    first_name: 'abdallah',
    last_name: 'osama',
    email: 'order@gmail.com',
    user_name: 'order',
    password: '123456',
}
describe('Test order model', (): void => {
    beforeAll(async (): Promise<void> => {
        const userModel = new userStore()
        orderUser = await userModel.insert(orderUser)
    })

    // check addProductToOrder order
    it('should have addProductToOrder method', (): void => {
        expect(store.addProductToOrder).toBeDefined()
    })

    // check currntOrder order
    it('should currntOrder insert method', (): void => {
        expect(store.currntOrder).toBeDefined()
    })

    // check openOrder order
    it('should have openOrder method', (): void => {
        expect(store.openOrder).toBeDefined()
    })

    // check completeOrder order
    it('should have completeOrder method', (): void => {
        expect(store.completeOrder).toBeDefined()
    })

    // check completedOrders order
    it('should have completedOrders method', (): void => {
        expect(store.completedOrders).toBeDefined()
    })

    // check showOrder order
    it('should have showOrder method', (): void => {
        expect(store.showOrder).toBeDefined()
    })

    // addProductToOrder method returns success
    it('addProductToOrder method should return success', async (): Promise<void> => {
        const order = await store.openOrder(orderUser.id as number)
        const product = await productModel.insert({
            name: 'new product',
            description: 'new description',
            price: 20,
        })
        const result = await store.addProductToOrder({
            order_id: order.id as number,
            product_id: product.id as number,
            quantity: 3,
        })
        expect(result).toBeTrue()
    })

    // openOrder method returns new order
    it('openOrder method should return new order', async (): Promise<void> => {
        const result = await store.openOrder(orderUser.id as number)
        expect(typeof result == 'object').toBeTrue()
    })

    // currentOrder method returns order
    it('currntOrder method should return new order', async (): Promise<void> => {
        const openOrder = await store.openOrder(orderUser.id as number)
        const currentOrder = await store.currntOrder(orderUser.id as number)
        expect(typeof currentOrder == 'object').toBeTrue()
    })

    // completeOrderr method returns true
    it('completeOrder method should return true', async (): Promise<void> => {
        await store.openOrder(orderUser.id as number)
        await store.currntOrder(orderUser.id as number)
        const completeOrder = await store.completeOrder(orderUser.id as number)
        expect(completeOrder).toBeTrue()
    })

    // completedOrders order method returns array of orders
    it('openOrder method should return array of ordera', async (): Promise<void> => {
        const completedOrders = await store.completedOrders(
            orderUser.id as number
        )
        expect(typeof completedOrders == 'object').toBeTrue()
    })

    // showOrder order method returns order
    it('showOrder method should return  order', async (): Promise<void> => {
        const openOrder = await store.openOrder(orderUser.id as number)
        const completedOrders = await store.showOrder(openOrder.id as number)
        expect(typeof completedOrders == 'object').toBeTrue()
    })
})
