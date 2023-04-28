import { object, array, number, string } from 'superstruct';

const ProductDecoder = object({
    _id: string(),
    id: string(),
    title: string(),
    image: string(),
    description: string(),
    price: number(),
    availableSizes: array(string()),
});

export const ProductsListDecoder = object({ data: array(ProductDecoder) });
