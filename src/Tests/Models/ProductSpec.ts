import { product, productStore } from '../../Models/Products'

const store = new productStore()
describe('Test product model', (): void => {
    // check index product
    it('should have index method', (): void => {
        expect(store.index).toBeDefined()
    })

    // check show product
    it('should have show method', (): void => {
        expect(store.show).toBeDefined()
    })

    // check insert product
    it('should have insert method', (): void => {
        expect(store.insert).toBeDefined()
    })

    // index method returns object
    it('index method should return list of products', async (): Promise<void> => {
        const result = await store.index()
        expect(typeof result == 'object').toBeTrue()
    })

    // single product return object
    it('insert method should return single product', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20,
        }
        const result = await store.insert(product)
        expect(typeof result == 'object').toBeTrue()
    })

    // show product return exact product
    it('show method should return single product', async (): Promise<void> => {
        const product: product = {
            name: 'product',
            description: 'product description',
            price: 20,
        }
        const result = await store.insert(product)
        const prod = await store.show(result.id as number)
        expect(prod).toEqual(result)
    })
})
