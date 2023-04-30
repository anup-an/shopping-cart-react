import { object, array, number, string } from 'superstruct';
import { CartDecoder } from '../user';

export const OrderDecoder = object({
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

export const OrdersListDecoder = object({ data: array(OrderDecoder) });
