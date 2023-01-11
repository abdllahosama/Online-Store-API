import UserUtilities from '../../Utilities/User'

describe('Test user utilities', (): void => {
    // check getUserData
    it('should have getUserData method', (): void => {
        expect(UserUtilities.getUserData).toBeDefined()
    })

    // check hashPassword
    it('should have hashPassword method', (): void => {
        expect(UserUtilities.hashPassword).toBeDefined()
    })

    // check getUserData return object
    it('getUserData method should return object on success', async (): Promise<void> => {
        const result = UserUtilities.getUserData(
            'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiYWJkYWxsYWgiLCJsYXN0X25hbWUiOiJvc2FtYSIsImVtYWlsIjoiYS5hbGxob3NhbWFAZ21haWwuY29tIiwidXNlcl9uYW1lIjoiYS5hbGxhaCJ9LCJpYXQiOjE2NzM0NjY3MDR9.EZcAGP0X_LiaZw_6HjzU_vXtomcopIVU4l042NCeT-I'
        )
        expect(typeof result == 'object').toBeTrue()
    })

    // check hasing result
    it('hashPassword method should return string', (): void => {
        const hashedPassword = UserUtilities.hashPassword('123456789')
        expect(typeof hashedPassword == 'string').toBeTrue()
    })
})
