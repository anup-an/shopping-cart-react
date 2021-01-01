import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';
import routes from './routes';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose.connect('mongodb://localhost/shopping-cart-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

export const Product = mongoose.model(
    'products',
    new mongoose.Schema({
        _id: { type: String, default: uuid },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    }),
);

app.get('/', (req: Request, res: Response) => res.send('This is the server homepage'));
app.use(routes());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});
