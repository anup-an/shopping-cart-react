export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_PRODUCTS_SIZE = 'FILTER_PRODUCTS_SIZE';
export const SORT_PRODUCTS_PRICE = 'SORT_PRODUCTS_PRICE';
export const ADD_PRODUCTS_CART = 'ADD_PRODUCTS_CART';
export const REMOVE_PRODUCTS_CART = 'REMOVE_PRODUCTS_CART';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

export type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
};

export type AddToCartAction = {
    type: typeof ADD_PRODUCTS_CART;
    payload: {
        items: ICart[];
    };
};

export type RemoveFromCartAction = {
    type: typeof REMOVE_PRODUCTS_CART;
    payload: {
        items: ICart[];
    };
};

export type FetchProductsAction = {
    type: typeof FETCH_PRODUCTS;
    payload: {
        items: IProduct[];
    };
};

export type FilterProductsAction = {
    type: typeof FILTER_PRODUCTS_SIZE;
    payload: {
        items: IProduct[];
        size: string;
    };
};

export type SortProductsAction = {
    type: typeof SORT_PRODUCTS_PRICE;
    payload: {
        items: IProduct[];
        sort: string;
    };
};

export type SearchProductsAction = {
    type: typeof SEARCH_PRODUCTS;
    payload: {
        items: IProduct[];
    }
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

export type ProductsActionTypes = FetchProductsAction | FilterProductsAction | SortProductsAction | SearchProductsAction;

export type AppActions = ProductsActionTypes | CartActionTypes;
