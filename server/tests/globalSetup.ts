import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import config from './config';

const globalSetup = async () => {
    if (config.Memory) {
        const instance = await MongoMemoryServer.create();
        const uri = instance.getUri();
        (global as any).__MONGOINSTANCE = instance;
        process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
    } else {
        process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
    }

    // Make sure the database is clean before an test starts
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.disconnect();
};

export default globalSetup;
