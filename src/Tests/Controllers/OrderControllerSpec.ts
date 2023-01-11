import OrdersController from '../../Controllers/OrdersController'


describe('Test order controller', (): void => {
    // check index order
    it('should have index method', (): void => {
        expect(OrdersController.index).toBeDefined()
    })

    // check create order
    it('should have create method', (): void => {
        expect(OrdersController.create).toBeDefined()
    })

    // check show order
    it('should have show method', (): void => {
        expect(OrdersController.show).toBeDefined()
    })

    // check update order
    it('should have update method', (): void => {
        expect(OrdersController.update).toBeDefined()
    })

    // check destroy order
    it('should have destroy method', (): void => {
        expect(OrdersController.destroy).toBeDefined()
    })
})