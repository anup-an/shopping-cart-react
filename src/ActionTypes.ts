export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FILTER_PRODUCTS_SIZE = 'FILTER_PRODUCTS_SIZE';
export const SORT_PRODUCTS_PRICE = 'SORT_PRODUCTS_PRICE';
export const ADD_PRODUCTS_CART = 'ADD_PRODUCTS_CART';
export const REMOVE_PRODUCTS_CART = 'REMOVE_PRODUCTS_CART';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const EDIT_PROFILE_USER = 'EDIT_PROFILE_USER';
export const ADD_TO_CART_USER = 'ADD_TO_CART_USER';
export const REMOVE_FROM_CART_USER = 'REMOVE_FROM_CART_USER';
export const ADD_TO_WISHLIST_USER = 'ADD_TO_WISHLIST_USER';
export const LOG_IN_USER = 'LOG_IN_USER';


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

export type IUser = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    country: string;
    refreshToken: string;
    wishList: IProduct[];
    cart: ICart[];
}

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
        isLoading: boolean;
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
    };
};

export type EditProfileUserAction = {
    type: typeof EDIT_PROFILE_USER;
    payload: {
        user: IUser;
    }
}

export type AddToCartUserAction = {
    type: typeof ADD_TO_CART_USER;
    payload: {
        user: IUser;
    }
}

export type RemoveFromCartUserAction = {
    type: typeof REMOVE_FROM_CART_USER;
    payload: {
        user: IUser;
    }
}

export type AddToWishlistUserAction = {
    type: typeof ADD_TO_WISHLIST_USER;
    payload: {
        user: IUser;
    }
}

export type LogInUserAction = {
    type: typeof LOG_IN_USER;
    payload: {
        user: IUser;
    }
}

export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

export type ProductsActionTypes =
    | FetchProductsAction
    | FilterProductsAction
    | SortProductsAction
    | SearchProductsAction;

export type UserActionTypes = EditProfileUserAction | AddToCartUserAction | AddToWishlistUserAction | RemoveFromCartUserAction | LogInUserAction;

export type AppActions = ProductsActionTypes | CartActionTypes | UserActionTypes;
