import CreateModel from './model';
import OrderSchema, { IOrder } from '../schemas/order';

const Order = new CreateModel<IOrder>('orders', OrderSchema).create();

export default Order;
