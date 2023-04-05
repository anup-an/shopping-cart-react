import mongoose from 'mongoose';
import config from './config';
import { server } from '../src';
import { products } from './testData';

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || `mongodb://${config.IP}:${config.Port}`);
});

afterAll(async () => {
    const connectedServer = await server;
    await mongoose.disconnect();
    if (connectedServer) {
        connectedServer.close();
    }
});
