export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_PRODUCTS_SIZE = 'FILTER_PRODUCTS_SIZE';
export const SORT_PRODUCTS_PRICE = 'SORT_PRODUCTS_PRICE';

export interface IProduct {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

export interface FetchProductsAction {
    type: typeof FETCH_PRODUCTS;
    payload: {
        items: IProduct[];
    };
}

export interface FilterProductsAction {
    type: typeof FILTER_PRODUCTS_SIZE;
    payload: {
        items: IProduct[];
        size: string;
    };
}

export interface SortProductsAction {
    type: typeof SORT_PRODUCTS_PRICE;
    payload: {
        items: IProduct[];
        sort: string;
    };
}

export type ProductsActionTypes = FetchProductsAction | FilterProductsAction | SortProductsAction;

export type AppActions = ProductsActionTypes;
