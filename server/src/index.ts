/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import routes from './routes';
import strategy from './middlewares/passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/shopping-cart-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

app.use(passport.initialize());
passport.use(strategy);
app.get('/', (req, res) => res.send('This is the server homepage'));
app.use(routes());

/* if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/build'));
} */
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
