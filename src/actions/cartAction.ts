/* eslint-disable no-underscore-dangle */
import { Dispatch } from 'redux';
import { ADD_PRODUCTS_CART, AppActions, ICart, IProduct, REMOVE_PRODUCTS_CART, REMOVE_CART } from '../ActionTypes';

export const addToCart = (items: ICart[], product: IProduct) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const cartItems = [...items];
    if (cartItems.length === 0) {
        cartItems.unshift({ ...product, count: 1 });
    } else if (cartItems.length !== 0) {
        const cart = cartItems.find((item) => item._id === product._id);
        if (cart && cart.count) {
            cartItems[cartItems.indexOf(cart)].count = cart.count + 1;
        } else if (!cart) {
            cartItems.unshift({ ...product, count: 1 });
        }
    }
    dispatch({
        type: ADD_PRODUCTS_CART,
        payload: {
            items: [...cartItems],
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeItemsFromCart = (items: ICart[], product: IProduct) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const cartItems = [];
    for (let i = 0; i < items.length; i++){
        if (items[i]._id === product._id){
            if (items[i].count > 1){
                items[i].count -= 1;
                cartItems.push(items[i]);
            }
        }else{
            cartItems.push(items[i]);
        }
    } 
    dispatch({
        type: REMOVE_PRODUCTS_CART,
        payload: {
            items: [...cartItems],
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};



export const removeFromCart = (items: ICart[], item: ICart) => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {
    const cartItems = [...items].filter((element) => element._id !== item._id);

    dispatch({
        type: REMOVE_CART,
        payload: {
            items: [...cartItems],
        },
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const removeAllFromCart = () => async (
    dispatch: Dispatch<AppActions>,
): Promise<void> => {

    dispatch({
        type: REMOVE_CART,
        payload: {
            items: [],
        },
    });
    localStorage.setItem('cartItems', JSON.stringify([]));
};

