import {user, userStore} from '../../Models/Users'

const store = new userStore();
describe('Test user model', (): void => {
    // check index user
    it('should have index method', (): void => {
        expect(store.index).toBeDefined();
    })

    // index method returns object
    it('index method should return list of users', async (): Promise<void> => {
        const result = await store.index()
        expect(typeof result == 'object').toBeTrue();
    })

    // check insert user
    it('should have insert method', (): void => {
        expect(store.insert).toBeDefined();
    })

    // single user return object
    it('insert method should return single user', async (): Promise<void> => {
        const user: user = {
            firstName: 'abdallah',
            lastName: 'osama',
            email: 'a.allhosama@gmail.com',
            userName: 'a.allh',
            password: '123456'
        }
        const result = await store.insert(user)
        await store.delete(user?.id as number)
        expect(typeof result == 'object').toBeTrue();
    })

    // check show user
    it('should have show method', (): void => {
        expect(store.show).toBeDefined();
    })

    // show user return exact user
    it('show method should return single user', async (): Promise<void> => {
        const user: user = {
            firstName: 'abdallah',
            lastName: 'osama',
            email: 'a.allhosama@gmail.com',
            userName: 'a.allh',
            password: '123456'
        }
        const result = await store.insert(user)
        const prod = await store.show(result.id as number)
        await store.delete(user?.id as number)
        expect(prod).toEqual(result);
    })

    // check update user
    it('should have update method', (): void => {
        expect(store.update).toBeDefined();
    })

    // update user return true status
    it('update method should return success message', async (): Promise<void> => {
        const user: user = {
            firstName: 'abdallah',
            lastName: 'osama',
            email: 'a.allhosama@gmail.com',
            userName: 'a.allh',
            password: '123456'
        }
        const result = await store.insert(user)
        const deleteStatus = await store.update(result.id as number, result)
        await store.delete(user?.id as number)
        expect(deleteStatus).toBeTrue();
    })


    // check delete user
    it('should have delete method', (): void => {
        expect(store.delete).toBeDefined();
    })

    //delete user return true status
    it('delete method should return success message', async (): Promise<void> => {
        const user: user = {
            firstName: 'abdallah',
            lastName: 'osama',
            email: 'a.allhosama@gmail.com',
            userName: 'a.allh',
            password: '123456'
        }
        const result = await store.insert(user)
        const deleteStatus = await store.delete(result.id as number)
        await store.delete(user?.id as number)
        expect(deleteStatus).toBeTrue();
    })
    
})