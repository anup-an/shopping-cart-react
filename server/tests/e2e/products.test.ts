import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src';
import { products, registerPayload, testProduct } from '../testData';

describe('GET /api/products', () => {
    let db: mongoose.Connection
    let cookie: string[]

    beforeAll(async() => {
        db = mongoose.connection
        await db.collections.products.insertMany(products)
        await request(app).post('/api/signup').send(registerPayload);
        const loginResponse = await request(app).post('/api/login').send({ email: 'anup.poudel@ambine.com', password: 'anup' });
        cookie = loginResponse.get('Set-Cookie')
    })

    afterAll(async () => {
        await db.dropCollection('products')
    })

    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return filtered results if query parameters are present', async () => {
        const queryParam = 'title'
        const queryValue = 'nike'
        const regex = new RegExp(queryValue, "i")
        const count = await db.collections.products.countDocuments({ [queryParam]: { $regex: regex } })
        const res = await request(app).get(`/api/products?${queryParam}=${queryValue}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.data).toHaveLength(count);
    });

    it('should create a product', async () => {
        const response = await request(app).post('/api/products').set("Cookie", cookie).send(testProduct);
        expect(response.status).toBe(200);
        const createdProduct = await db.collections.products.findOne({ ...testProduct });
        expect(createdProduct).toBeTruthy();
    })

});
