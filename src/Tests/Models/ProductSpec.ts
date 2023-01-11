import {product, productStore} from '../../Models/Products'

const store = new productStore();
describe('Test product model', (): void => {
    // check index product
    it('should have index method', (): void => {
        expect(store.index).toBeDefined();
    })

    // index method returns object
    it('index method should return list of products', async (): Promise<void> => {
        const result = await store.index()
        expect(typeof result == 'object').toBeTrue();
    })

    // check insert product
    it('should have insert method', (): void => {
        expect(store.insert).toBeDefined();
    })

    // single product return object
    it('insert method should return single product', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20
        }
        const result = await store.insert(product)
        expect(typeof result == 'object').toBeTrue();
    })

    // check show product
    it('should have show method', (): void => {
        expect(store.show).toBeDefined();
    })

    // show product return exact product
    it('show method should return single product', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20
        }
        const result = await store.insert(product)
        const prod = await store.show(result.id as number)
        expect(prod).toEqual(result);
    })

    // check update product
    it('should have update method', (): void => {
        expect(store.update).toBeDefined();
    })

    // update product return true status
    it('update method should return success message', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20
        }
        const result = await store.insert(product)
        const deleteStatus = await store.update(result.id as number, result)
        expect(deleteStatus).toBeTrue();
    })


    // check delete product
    it('should have delete method', (): void => {
        expect(store.delete).toBeDefined();
    })

    //delete product return true status
    it('delete method should return success message', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20
        }
        const result = await store.insert(product)
        const deleteStatus = await store.delete(result.id as number)
        expect(deleteStatus).toBeTrue();
    })
    
})