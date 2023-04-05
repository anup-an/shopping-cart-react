import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';

import strategy from './middlewares/passport';
import { connectServer } from './connect';
import routes from './routes/index';

dotenv.config();

const app = express();

app.use(
    cors({
        credentials: true,
        origin: 'https://lucid-lewin-704e07.netlify.app',
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

export const server = connectServer(app);

export default app;
