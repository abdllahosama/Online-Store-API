import ProductsController from '../../Controllers/ProductsController'


describe('Test products controller', (): void => {
    // check index product
    it('should have index method', (): void => {
        expect(ProductsController.index).toBeDefined()
    })

    // check create product
    it('should have create method', (): void => {
        expect(ProductsController.create).toBeDefined()
    })

    // check show product
    it('should have show method', (): void => {
        expect(ProductsController.show).toBeDefined()
    })

    // check update product
    it('should have update method', (): void => {
        expect(ProductsController.update).toBeDefined()
    })

    // check destroy product
    it('should have destroy method', (): void => {
        expect(ProductsController.destroy).toBeDefined()
    })
})