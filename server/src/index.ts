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
app.use(cors({ credentials: true, origin: 'https://lucid-lewin-704e07.netlify.app' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

mongoose.connect(
    process.env.MONGO_URI,
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
