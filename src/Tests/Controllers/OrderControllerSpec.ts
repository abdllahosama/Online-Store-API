import OrdersController from '../../Controllers/OrdersController'

describe('Test order controller', (): void => {
    // check selectProduct method
    it('should have selectProduct method', (): void => {
        expect(OrdersController.selectProduct).toBeDefined()
    })

    // check completeOrder method
    it('should have currentOrder method', (): void => {
        expect(OrdersController.currentOrder).toBeDefined()
    })

    // check completeOrder method
    it('should have completeOrder method', (): void => {
        expect(OrdersController.completeOrder).toBeDefined()
    })

    // check completedOrders method
    it('should have completedOrders method', (): void => {
        expect(OrdersController.completedOrders).toBeDefined()
    })

    // check showOrder method
    it('should have showOrder method', (): void => {
        expect(OrdersController.showOrder).toBeDefined()
    })
})
