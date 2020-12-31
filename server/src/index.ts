import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import shortid from 'shortid';

const app = express();
app.use(bodyParser);
mongoose.connect('mongodb: //localhost/shopping-cart-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const Product = mongoose.model(
    'products',
    new mongoose.Schema({
        id: { type: shortid.generate },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    }),
);

app.get('/api/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete('api/products/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening to http://localhost${port}`);
});
