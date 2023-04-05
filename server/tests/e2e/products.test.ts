import request from 'supertest';
import app from '../../src';
import mongoose from 'mongoose';
import { products } from '../testData';

describe('GET /api/products', () => {
    let db: mongoose.Connection

    beforeAll(async() => {
        db = mongoose.connection
        await db.collections.products.insertMany(products)
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
});
