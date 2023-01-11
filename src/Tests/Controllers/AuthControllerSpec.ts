import AuthController from '../../Controllers/AuthController'

describe('Test auth controller', (): void => {
    // check auth method
    it('should have auth method', (): void => {
        expect(AuthController.auth).toBeDefined()
    })
})
