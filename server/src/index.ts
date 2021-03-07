/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import routes from './routes';
import strategy from './middlewares/passport';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect('mongodb://localhost/shopping-cart-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.use(passport.initialize());
passport.use(strategy);
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
