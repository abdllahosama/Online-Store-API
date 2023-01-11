import { user, userStore } from '../../Models/Users'

const store = new userStore()
describe('Test user model', (): void => {
    // check index user
    it('should have index method', (): void => {
        expect(store.index).toBeDefined()
    })

    // check insert user
    it('should have insert method', (): void => {
        expect(store.insert).toBeDefined()
    })

    // check show user
    it('should have show method', (): void => {
        expect(store.show).toBeDefined()
    })

    // check auth user
    it('should have auth method', (): void => {
        expect(store.auth).toBeDefined()
    })

    // index method returns object
    it('index method should return list of users', async (): Promise<void> => {
        const result = await store.index()
        expect(typeof result == 'object').toBeTrue()
    })

    // insert user return object
    it('insert method should return single user', async (): Promise<void> => {
        const user: user = {
            first_name: 'abdallah',
            last_name: 'osama',
            email: 'insert@gmail.com',
            user_name: 'insert',
            password: '123456',
        }
        const result = await store.insert(user)
        expect(typeof result == 'object').toBeTrue()
    })

    // show user return exact user
    it('show method should return single user', async (): Promise<void> => {
        const user: user = {
            first_name: 'abdallah',
            last_name: 'osama',
            email: 'show@gmail.com',
            user_name: 'show',
            password: '123456',
        }
        const result = await store.insert(user)
        const prod = await store.show(result.id as number)
        expect(prod).toEqual(result)
    })

    // success auth user return object
    it('auth method should return object on success', async (): Promise<void> => {
        const user: user = {
            first_name: 'abdallah',
            last_name: 'osama',
            email: 'auth@gmail.com',
            user_name: 'auth',
            password: '123456',
        }
        await store.insert(user)
        const auth = await store.auth(user.user_name, user.password)
        expect(typeof auth == 'object').toBeTrue()
    })

    // faid auth user return false
    it('auth method should return false', async (): Promise<void> => {
        const auth = await store.auth('bad username', 'bad password')
        expect(auth).toBeFalse()
    })
})
