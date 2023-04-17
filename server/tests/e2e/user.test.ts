import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../src';
import { registerPayload } from '../testData';
import User, { guestUser } from '../../src/models/user';
import { ErrorCode } from '../../src/utils';

describe('/api/users', () => {
    let db: mongoose.Connection;
    let cookie: string[];
    let loggedUser: any;

    beforeAll(async () => {
        db = mongoose.connection;
        await request(app).post('/api/signup').send(registerPayload);
        const loginResponse = await request(app)
            .post('/api/login')
            .send({ email: 'anup.poudel@ambine.com', password: registerPayload.password });
        cookie = loginResponse.get('Set-Cookie');
    });

    afterAll(async () => {
        await db.dropCollection('users');
    });

    it('should return logged in user details', async () => {
        const res = await request(app).get('/api/users').set('Cookie', cookie);
        expect(res.status).toBe(200);
        loggedUser = res.body.data;
    });

    it('should update the logged in user details', async () => {
        const response = await request(app)
            .post(`/api/users`)
            .set('Cookie', cookie)
            .send({ lastName: 'Test last name' });
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(loggedUser._id) });
        expect(response.status).toBe(200);
        expect(user?.lastName).toBe('Test last name');
    });

    it('should not update a weak password', async () => {
        const response = await request(app)
            .post(`/api/users`)
            .set('Cookie', cookie)
            .send({ password: 'test' });
        expect(response.status).toBe(422);
        expect(response.body.title).toBe(ErrorCode.ValidationError);
    });

    it('returns guest user when not logged in', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(guestUser);
    });

    it('cannot update user details when unauthenticated', async () => {
        const response = await request(app).post(`/api/users`).send({ lastName: 'Test last name' });
        expect(response.status).toBe(401);
        expect(response.text).toBe('Unauthorized');
    });
});
