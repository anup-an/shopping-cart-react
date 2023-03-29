import ProductSchema, { IProduct } from '../schemas/product';
import CreateModel from './model';

const Product = new CreateModel<IProduct>('products', ProductSchema).create();

export default Product;
