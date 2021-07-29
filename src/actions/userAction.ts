import { Dispatch } from 'redux';
import axios from 'axios';
import { EDIT_PROFILE_USER, LOG_IN_USER, ADD_TO_CART_USER, ADD_TO_WISHLIST_USER, IUser, IProduct, AppActions, REMOVE_FROM_CART_USER } from '../ActionTypes';

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
};

export const logInUser = (email: string, password: string) => async (
    dispatch: Dispatch<AppActions>): Promise<void> => {
    
    const loggedUser: IUser = await (await axios.post('https://shopping-cart-app-react.herokuapp.com/api/login', { email, password })).data.data;
    console.log(loggedUser);
    dispatch({
        type: LOG_IN_USER,
        payload: {
            user: loggedUser
        }
    })
    
}

export const addToUserCart = (loggedUser: IUser, product: IProduct) => async (
    dispatch: Dispatch<AppActions>): Promise<void> => {
    const cartItems = [...loggedUser.cart];
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
    loggedUser.cart = [...cartItems];
    console.log(loggedUser);
        dispatch({
            type: ADD_TO_CART_USER,
            payload: {
                user: loggedUser
            }
        })
    }

export const removeFromUserCart = (loggedUser: IUser, cart: ICart) => async (
    dispatch: Dispatch<AppActions>) => {
    const cartItems = loggedUser ? [...loggedUser.cart].filter((element) => element._id !== cart._id): [];
    loggedUser ? loggedUser.cart = [...cartItems]: '';
    dispatch({
        type: REMOVE_FROM_CART_USER,
        payload: {
            user: loggedUser
        }
    })
}

export const editUserProfile = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    dispatch({
        type: EDIT_PROFILE_USER,
        payload: {
            user: loggedUser
        }
    })
}