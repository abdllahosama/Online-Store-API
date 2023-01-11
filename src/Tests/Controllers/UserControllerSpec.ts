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

    // check update user
    it('should have update method', (): void => {
        expect(UsersController.update).toBeDefined()
    })

    // check destroy user
    it('should have destroy method', (): void => {
        expect(UsersController.destroy).toBeDefined()
    })
})
