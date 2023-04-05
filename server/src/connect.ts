import mongoose from 'mongoose';
import http, { Server } from 'http';

// TODO : Add proper typing to function parameters
export const connectServer = async (app: any): Promise<Server|undefined> => {
    try {
        const uri = process.env.MONGO_URI;
        if (uri) {
            await mongoose.connect(uri);
            return startServer(app);
        }
        throw new Error('Failed to connect. Please set environment variable for MongoDB uri');
    } catch (error) {
        console.log(error);
    }
};

export const startServer = (app: any): Server => {
    const server = http.createServer(app);
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
        console.log(`Listening to http://localhost:${port}`);
    });
    return server;
};
