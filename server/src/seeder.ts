import _ from 'lodash';

import { IModel } from './models/model';
import Product from './models/product';
import { ProductSeed, products } from '../tests/testData';
import { IProduct } from './schemas/product';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const seedDatabase = async <T, K>(model: IModel<T>, data: K[]): Promise<void> => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '');
        await model.deleteMany({});
        const seed = await model.insertMany(data);
        console.log(
            `Seeding complete. ${seed.length} out of ${data.length} ${model.collection.collectionName} added to the database`,
        );
        db.disconnect();
    } catch (error) {
        console.log('Failed to seed the database');
    }
};

seedDatabase<IProduct, ProductSeed>(Product, products);
