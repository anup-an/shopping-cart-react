import _ from 'lodash';
import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src';
import { registerPayload, testOrderPayload } from '../testData';

describe('/api/orders', () => {
    let db: mongoose.Connection;
    let cookie: string[];
    let loggedUser: any;

    beforeAll(async () => {
        db = mongoose.connection;
        await request(app).post('/api/signup').send(registerPayload);
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ email: 'anup.poudel@ambine.com', password: 'anup' });
        cookie = loginResponse.get('Set-Cookie');
        loggedUser = (await request(app).get('/api/users').set('Cookie', cookie)).body.data
    });
    it('should create an order for authenticated user', async () => {
        const response = await request(app).post('/api/orders').set('Cookie', cookie).send(testOrderPayload);
        expect(response.status).toBe(200);
        const createdOrder = await db.collections.orders.findOne({ ...testOrderPayload, user_id : loggedUser._id });
        expect(createdOrder).toBeTruthy();
    });

    it('should not allow unauthenticated user to create an order', async () => {
        const response = await request(app).post('/api/orders').send(testOrderPayload);
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized')
    });

    it('should return all orders of authenticated user', async () => {
        const response = await request(app).get('/api/orders').set('Cookie', cookie);
        expect(response.status).toBe(200);
        const orders = await db.collections.orders.find({ user_id: loggedUser._id }).toArray();
        expect(response.body.data).toEqual(orders.map(order => ({...order, _id: order._id.toString()})))
    });

    it('should not allow unauthenticated user get orgers', async () => {
        const response = await request(app).post('/api/orders');
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized')
    });
    
});
