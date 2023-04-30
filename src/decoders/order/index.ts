import { object, array, number, string } from 'superstruct';
import { CartDecoder } from '../user';

export const Order = object({
    _id: string(),
    name: string(),
    user_id: string(),
    email: string(),
    address: string(),
    postcode: number(),
    city: string(),
    country: string(),
    cart: array(CartDecoder),
});

export const OrderDecoder = object({
    data: Order,
});

export const OrdersListDecoder = object({ data: array(Order) });
