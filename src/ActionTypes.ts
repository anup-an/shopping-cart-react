import { ProductsActionTypes } from './types/products/ActionTypes';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_PRODUCTS_SIZE = 'FILTER_PRODUCTS_SIZE';
export const SORT_PRODUCTS_PRICE = 'SORT_PRODUCTS_PRICE';
export const ADD_PRODUCTS_CART = 'ADD_PRODUCTS_CART';
export const REMOVE_PRODUCTS_CART = 'REMOVE_PRODUCTS_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const EDIT_PROFILE_USER = 'EDIT_PROFILE_USER';
export const ADD_TO_WISHLIST_USER = 'ADD_TO_WISHLIST_USER';
export const LOG_IN_USER = 'LOG_IN_USER';
export const GET_USER_FROM_TOKEN = 'GET_USER_FROM_TOKEN';
export const GET_ORDERS = 'GET_ORDERS';
export const UPDATE_LOGGED_USER_CART = 'UPDATE_LOGGED_USER_CART';

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count: number;
};

export type IProduct = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
};

export type IUser = {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    postcode: string;
    phone: string;
    city: string;
    country: string;
    wishList: IProduct[];
    cart: ICart[];
};

export type IOrder = {
    _id: string;
    name: string;
    user_id: string;
    email: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    cart: ICart[];
};

export type SortState<T> = { [key in keyof T]?: 'asc' | 'desc' };
export type FilterState<T> = { [key in keyof T]?: any };

export type LoggedUserCartAction = {
    type: typeof UPDATE_LOGGED_USER_CART;
    payload: {
        user: IUser;
    };
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

export type RemoveCartAction = {
    type: typeof REMOVE_CART;
    payload: {
        items: ICart[];
    };
};

export type SearchProductsAction = {
    type: typeof SEARCH_PRODUCTS;
    payload: {
        items: IProduct[];
    };
};

export type EditProfileUserAction = {
    type: typeof EDIT_PROFILE_USER;
    payload: {
        user: IUser;
    };
};

export type AddToWishlistUserAction = {
    type: typeof ADD_TO_WISHLIST_USER;
    payload: {
        user: IUser;
    };
};

export type LogInUserAction = {
    type: typeof LOG_IN_USER;
    payload: {
        user: IUser;
    };
};

export type getUserFromTokenAction = {
    type: typeof GET_USER_FROM_TOKEN;
    payload: {
        user: IUser;
    };
};
export type getOrdersByUserIdAction = {
    type: typeof GET_ORDERS;
    payload: {
        orders: IOrder[];
    };
};

export type CartActionTypes = AddToCartAction | RemoveFromCartAction | RemoveCartAction;

export type UserActionTypes =
    | LoggedUserCartAction
    | EditProfileUserAction
    | AddToWishlistUserAction
    | LogInUserAction
    | getUserFromTokenAction
    | getOrdersByUserIdAction;

export type AppActions = ProductsActionTypes | CartActionTypes | UserActionTypes;
