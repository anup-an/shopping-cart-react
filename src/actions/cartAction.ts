/* eslint-disable no-underscore-dangle */
import { Dispatch } from 'redux';
import { ADD_PRODUCTS_CART, AppActions, ICart, IProduct, REMOVE_PRODUCTS_CART, REMOVE_CART } from '../ActionTypes';

export const removeProductsFromCart = (cart: ICart[], product: IProduct) => {
    const newCart: ICart[] = [];

    for (let i = 0; i < cart.length; i++) {
        if (cart[i]._id === product._id) {
            if (cart[i].count && cart[i].count > 1) {
                cart[i].count -= 1;
                newCart.push(cart[i]);
            }
        } else {
            newCart.push(cart[i]);
        }
    }
    return newCart;
};

export const addProductsToCart = (cart: ICart[], product: IProduct) => {
    const cartArr = [...cart];
    if (cartArr.length === 0) {
        cartArr.unshift({ ...product, count: 1 });
    } else {
        let searching = true;
        let i = 0;
        while (searching && i < cartArr.length) {
            if (cartArr[i]._id === product._id) {
                cartArr[i].count ? (cartArr[i].count = cartArr[i].count + 1) : '';
                searching = false;
            } else {
                i += 1;
            }
        }
        searching ? cartArr.unshift({ ...product, count: 1 }) : '';
    }
    return cartArr;
};

export const addToCart =
    (items: ICart[], product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const cartItems = addProductsToCart(items, product);
        dispatch({
            type: ADD_PRODUCTS_CART,
            payload: {
                items: [...cartItems],
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

export const removeItemsFromCart =
    (items: ICart[], product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const cartItems = removeProductsFromCart(items, product);
        dispatch({
            type: REMOVE_PRODUCTS_CART,
            payload: {
                items: [...cartItems],
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

export const removeFromCart =
    (items: ICart[], item: ICart) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const cartItems = [...items].filter((element) => element._id !== item._id);

        dispatch({
            type: REMOVE_CART,
            payload: {
                items: [...cartItems],
            },
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    };

export const removeAllFromCart =
    () =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        dispatch({
            type: REMOVE_CART,
            payload: {
                items: [],
            },
        });
        localStorage.setItem('cartItems', JSON.stringify([]));
    };
