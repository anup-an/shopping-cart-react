/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import strategy from './middlewares/passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();
app.use(cors({ credentials: true, origin: ['https://lucid-lewin-704e07.netlify.app', 'http://localhost:3000'] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

const connectDatabase = async () => {
    const mongoUri =
        process.env.username && process.env.password
            ? `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.f4upd.mongodb.net/shopping-cart-db?retryWrites=true&w=majority`
            : '';
    await mongoose.connect(mongoUri);
};

const startServer = async () => {
    try {
        const port = process.env.PORT;
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Listening to http://localhost:${port}`);
        });
    } catch (error) {
        console.log('Failed to connect to the database or server is not running.');
    }
};

app.use(passport.initialize());
passport.use(strategy);
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());

startServer();
