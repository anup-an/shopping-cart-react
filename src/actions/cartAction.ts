/* eslint-disable no-underscore-dangle */
import { Dispatch } from 'redux';
import { ADD_PRODUCTS_CART, AppActions, ICart, IProduct, REMOVE_PRODUCTS_CART } from '../ActionTypes';

export const addToCart = (items: ICart[], product: IProduct) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const cartItems = items.slice();
    if (cartItems.length === 0) {
        cartItems.push({ ...product, count: 1 });
    } else if (cartItems.length !== 0) {
        const cart = cartItems.find((item) => item._id === product._id);
        if (cart && cart.count) {
            cartItems[cartItems.indexOf(cart)].count = cart.count + 1;
        } else if (!cart) {
            cartItems.push({ ...product, count: 1 });
        }
    }
    dispatch({
        type: ADD_PRODUCTS_CART,
        payload: {
            items: cartItems,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeFromCart = (items: ICart[], item: ICart) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {

    const cartItems = [...items].slice().filter((element) => element._id !== item._id);

    dispatch({
        type: REMOVE_PRODUCTS_CART,
        payload: {
            items: cartItems,
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
