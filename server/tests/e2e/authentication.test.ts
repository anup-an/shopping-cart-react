import mongoose from 'mongoose';
import request from 'supertest';
import _ from 'lodash';

import app from '../../src';
import User from '../../src/models/user';
import { registerPayload } from '../testData';

export const parseCookie = (cookie: string): { [x: string]: string } => {
    const formattedString = cookie
        .replace('token=j:', '')
        .replace(/[\{\}']+/g, '')
        .split(';');
    const token = formattedString[0].split(',').map((item) => item.replace(/[\"]+/g, '').split(':'));

    const cookieConfig = formattedString.slice(1, -1).map((item) => item.split('='));
    return [...token, ...cookieConfig].reduce((acc, [k, v]) => ({ ...acc, [_.camelCase(k)]: v || true }), {});
};

describe('authentication', () => {
    let db: mongoose.Connection;
    let cookie: any;
    let loggedUser: any;

    beforeAll(() => {
        db = mongoose.connection;
    });

    afterAll(async () => {
        await db.dropCollection('users');
    });

    it('can register user: /api/signup', async () => {
        const response = await request(app).post('/api/signup').send(registerPayload);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Signup successful!');

        const foundUser = await User.findOne({ email: registerPayload.email });

        expect(foundUser).toBeTruthy();
    });

    it('cannot register existing user again: /api/signup', async () => {
        const response = await request(app).post('/api/signup').send(registerPayload);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Email already in use');

        const foundUser = await User.find({ email: registerPayload.email });

        expect(foundUser).toHaveLength(1);
    });

    it('can login user: /api/login', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: registerPayload.email, password: registerPayload.password });
        expect(response.status).toBe(200);

        const foundUser = await User.findOne({ email: registerPayload.email });
        cookie = response.get('Set-Cookie');
        loggedUser = response.body.data;

        expect(foundUser?.refreshToken).not.toBe('');
        expect({ ...response.body.data, _id: new mongoose.Types.ObjectId(response.body.data._id) }).toStrictEqual(
            foundUser?.toObject({ versionKey: false }),
        );
        expect(response.get('Set-Cookie')[0]).toBeDefined();
    });

    it('does not log in with false credentials: /api/login', async () => {
        const response = await request(app).post('/api/login').send({ email: 'test', password: 'pass' });
        expect(response.status).toBe(401);
        expect(response.body.data).toBe('User not found. Please enter correct email.');
    });

    it('can log out user: /api/logout', async () => {
        const response = await request(app).post('/api/logout').set('Cookie', cookie);
        expect(response.status).toBe(200);
        const loggedOutUser = await User.findOne({ email: loggedUser.email }).select('refreshToken');
        expect(loggedOutUser?.refreshToken).toBe('');
    });

    it('reissue tokens for authenticated user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: registerPayload.email, password: registerPayload.password });
        cookie = response.get('Set-Cookie');

        // Wait for two seconds before reissuing token
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const reissueResponse = await request(app).get('/api/reissue-token').set('Cookie', cookie);
        const reissuedCookie = reissueResponse.get('Set-Cookie');
        expect(reissuedCookie).not.toEqual(cookie);

        const user = await User.findOne({ email: loggedUser.email }).select('refreshToken');
        const reissuedCookieObject = parseCookie(decodeURIComponent(reissuedCookie[0]));
        expect(reissuedCookieObject.refreshToken).toEqual(user?.refreshToken);
    });

    it('does not reissue tokens for unauthenticated user', async () => {
        const reissueResponse = await request(app).get('/api/reissue-token');
        expect(reissueResponse.status).toBe(401);
        expect(reissueResponse.get('Set-Cookie')).toBeFalsy();
    });
});
