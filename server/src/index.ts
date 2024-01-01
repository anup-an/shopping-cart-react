import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

import strategy from './middlewares/passport';
import errorHandler from './middlewares/errorHandler';
import { connectServer } from './connect';
import routes from './routes/index';

dotenv.config();

const app = express();

app.use(
    cors({
        credentials: true,
        origin: ['https://lucid-lewin-704e07.netlify.app', 'http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Origin',
            'X-Requested-With',
            'Accept',
            'x-client-key',
            'x-client-token',
            'x-client-secret',
            'Authorization',
        ],
    }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
passport.use(strategy);
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());
app.use(errorHandler)

export const server = connectServer(app);

export default app;
