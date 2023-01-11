import UsersController from '../../Controllers/UsersController'

describe('Test users controller', (): void => {
    // check index user
    it('should have index method', (): void => {
        expect(UsersController.index).toBeDefined()
    })

    // check create user
    it('should have create method', (): void => {
        expect(UsersController.create).toBeDefined()
    })

    // check show user
    it('should have show method', (): void => {
        expect(UsersController.show).toBeDefined()
    })

    // check show user
    it('should have show method', (): void => {
        expect(UsersController.show).toBeDefined()
    })

})
