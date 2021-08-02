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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
/* app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}); */

mongoose.connect(
    'mongodb+srv://anup-an:IvNT46LZr37Vz0IN@cluster0.f4upd.mongodb.net/shopping-cart-db?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },
);

app.use(passport.initialize());
passport.use(strategy);
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
