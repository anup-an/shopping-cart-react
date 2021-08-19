import { Dispatch } from 'redux';
import axios from 'axios';
import { EDIT_PROFILE_USER, LOG_IN_USER, ADD_TO_CART_USER, REMOVE_PRODUCTS_CART_USER, ADD_TO_WISHLIST_USER, GET_USER_FROM_TOKEN, IUser, IProduct, AppActions, REMOVE_FROM_CART_USER } from '../ActionTypes';
axios.defaults.withCredentials = true;

export type ICart = {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count: number;
};

const reIssueAccessToken = async () => {
    await axios.get('https://shopping-cart-app-react.herokuapp.com/api/reissue-token');
    runInLoop();
}

const runInLoop = () => {
    setTimeout(() => {
        reIssueAccessToken();
    }, 5000)
}

export const logInUser = (email: string, password: string) => async (
    dispatch: Dispatch<AppActions>): Promise<void> => {
    
    const loggedUser: IUser = await (await axios.post(
        'https://shopping-cart-app-react.herokuapp.com/api/login', { email, password }, { withCredentials: true })).data.data;
    dispatch({
        type: LOG_IN_USER,
        payload: {
            user: loggedUser
        }
    })
    setTimeout(() => {
        reIssueAccessToken();
    }, 5000)
}

export const logOutUser = () => async(dispatch: Dispatch<AppActions>): Promise<void> => {
    const status: string = await (await axios.post('https://shopping-cart-app-react.herokuapp.com/api/logout')).data.status;
    if (status == "success") {
        const loggedUser: IUser = {
            "_id": '',
            "email": '',
            "password": '',
            "firstName": '',
            "lastName": '',
            "phone": '',
            "city": '',
            "country": '',
            "refreshToken": '',
            "wishList": [],
            "cart": [],
        }
        dispatch({
            type: LOG_IN_USER,
            payload: {
                user: loggedUser
            }
        })
    }
    
}

export const addToUserCart = (loggedUser: IUser, product: IProduct) => async (
    dispatch: Dispatch<AppActions>): Promise<void> => {
    const cartItems: ICart[] = loggedUser.cart;
    if (cartItems.length === 0) {
        cartItems.unshift({ ...product, count: 1 });
    } else {
        let searching = true;
        let i = 0;
        while (searching && i < cartItems.length) {    
            if (cartItems[i]._id === product._id) {
                    cartItems[i].count ? cartItems[i].count = cartItems[i].count + 1:''
        
                searching = false;
            } else {
                i += 1;
            }
        }
        searching ? cartItems.unshift({ ...product, count: 1 }) : '';
        
    }
    
    loggedUser = { ...loggedUser, cart: [...cartItems] };
    const id = loggedUser._id;
    const cart = loggedUser.cart; 
    await axios.post(
        `https://shopping-cart-app-react.herokuapp.com/api/users/${id}/update-cart`, { id, cart });
        dispatch({
            type: ADD_TO_CART_USER,
            payload: {
                user: loggedUser
            }
        })
}

export const removeItemsFromUserCart = (loggedUser: IUser, product: IProduct) => async (
    dispatch: Dispatch<AppActions>): Promise<void> => {
    const cartItems: ICart[] = loggedUser.cart;
    const userCartItems = []
    
    for (let i=0; i < cartItems.length; i++ ){
        if (cartItems[i]._id === product._id) {
            if (cartItems[i].count && cartItems[i].count > 1){
                cartItems[i].count -= 1;
                userCartItems.push(cartItems[i]);
            }
        } else {
            userCartItems.push(cartItems[i]);
        }
    }        
    
    loggedUser = { ...loggedUser, cart: [...userCartItems] };
    const id = loggedUser._id;
    const cart = loggedUser.cart; 
    await axios.post(
        `https://shopping-cart-app-react.herokuapp.com/api/users/${id}/update-cart`, { id, cart });
        dispatch({
            type: REMOVE_PRODUCTS_CART_USER,
            payload: {
                user: loggedUser
            }
        })
}

export const removeFromUserCart = (loggedUser: IUser, selectedCart: ICart) => async (
    dispatch: Dispatch<AppActions>) => {
    const cartItems = loggedUser ? [...loggedUser.cart].filter((element) => element._id !== selectedCart._id): [];
    loggedUser = { ...loggedUser, cart: [...cartItems] };
    const id = loggedUser._id;
    const cart = loggedUser.cart; 

    await axios.post(
        `https://shopping-cart-app-react.herokuapp.com/api/users/${id}/update-cart`, { id, cart });
    dispatch({
        type: REMOVE_FROM_CART_USER,
        payload: {
            user: loggedUser
        }
    })
}

export const getUserFromToken = () => async (dispatch: Dispatch<AppActions>) => {
    const loggedUser: IUser = await (await axios.get('https://shopping-cart-app-react.herokuapp.com/api/users/')).data.data;
    dispatch({
        type: GET_USER_FROM_TOKEN,
        payload: {
            user: loggedUser
        }
    })
    setTimeout(() => {
        reIssueAccessToken();
    }, 5000)
}

export const editUserProfile = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    dispatch({
        type: EDIT_PROFILE_USER,
        payload: {
            user: loggedUser
        }
    })
}