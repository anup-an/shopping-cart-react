import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src';
import { products, registerPayload, testProduct } from '../testData';

describe('GET /api/products', () => {
    let db: mongoose.Connection;
    let cookie: string[];

    beforeAll(async () => {
        db = mongoose.connection;
        await db.collections.products.insertMany(products);
        await request(app).post('/api/signup').send(registerPayload);
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ email: 'anup.poudel@ambine.com', password: 'anup' });
        cookie = loginResponse.get('Set-Cookie');
    });

    afterAll(async () => {
        await db.dropCollection('products');
    });

    it('should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return filtered results if query parameters are present', async () => {
        const queryParam = 'title';
        const queryValue = 'nike';
        const regex = new RegExp(queryValue, 'i');
        const count = await db.collections.products.countDocuments({ [queryParam]: { $regex: regex } });
        const res = await request(app).get(`/api/products?${queryParam}=${queryValue}`);
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        expect(res.body.data).toHaveLength(count);
    });

    it('should create a product', async () => {
        const response = await request(app).post('/api/products').set('Cookie', cookie).send(testProduct);
        expect(response.status).toBe(200);
        const createdProduct = await db.collections.products.findOne({ ...testProduct });
        expect(createdProduct).toBeTruthy();
    });

    it('should find a product', async () => {
        const product = await db.collections.products.findOne();
        if (product) {
            const response = await request(app).get(`/api/products/${product._id.toString()}`);
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual({ ...product, _id: product._id.toString() });
        } else {
            throw new Error('Test data for product not found');
        }
    });

    it('should delete a product', async () => {
        const product = await db.collections.products.findOne();
        if (product) {
            const response = await request(app).delete(`/api/products/${product._id.toString()}`).set('Cookie', cookie);
            expect(response.status).toBe(200);
            const foundProduct = await db.collections.products.findOne({ _id: product._id });
            expect(response.body.data).toEqual({ ...product, _id: product._id.toString() });
            expect(foundProduct).toBeFalsy();
        } else {
            throw new Error('Test data for product not found');
        }
    });

    it('should update a product', async () => {
        const product = await db.collections.products.findOne();
        if (product) {
            const response = await request(app).patch(`/api/products/${product._id.toString()}`).set('Cookie', cookie).send({title: 'Test title'});
            expect(response.status).toBe(200);
            const foundProduct = await db.collections.products.findOne({ _id: product._id });
            expect(foundProduct?.title).toEqual('Test title');
        } else {
            throw new Error('Test data for product not found');
        }
    });
});
