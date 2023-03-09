/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import strategy from './middlewares/passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const mongoUri =
    process.env.username && process.env.password
        ? `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.f4upd.mongodb.net/shopping-cart-db?retryWrites=true&w=majority`
        : '';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.use(passport.initialize());

passport.use(strategy);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://lucid-lewin-704e07.netlify.app'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
