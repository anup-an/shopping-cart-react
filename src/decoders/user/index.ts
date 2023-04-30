import { object, assign, array, number, string } from 'superstruct';
import { ProductDecoder } from '../products';

export const CartDecoder = assign(ProductDecoder, object({ count: number() }));

export const UserDecoder = object({
    data: object({
        _id: string(),
        email: string(),
        firstName: string(),
        lastName: string(),
        address: string(),
        postcode: string(),
        phone: string(),
        city: string(),
        country: string(),
        wishList: array(ProductDecoder),
        cart: array(CartDecoder),
        role: string(),
    }),
});
