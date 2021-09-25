import { Dispatch } from 'redux';
import axios from 'axios';
import { removeFromCart } from './cartAction';
import { EDIT_PROFILE_USER, GET_ORDERS_BY_USER_ID, LOG_IN_USER, ADD_TO_CART_USER, REMOVE_PRODUCTS_CART_USER, ADD_TO_WISHLIST_USER, GET_USER_FROM_TOKEN, IUser, IProduct, AppActions, REMOVE_FROM_CART_USER } from '../ActionTypes';
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

export const logInUser = (email: string, password: string, cartItems: ICart[]) => async (
    dispatch: Dispatch<AppActions>): Promise<string> => {
    
    const responseObject = await (await axios.post(
        'https://shopping-cart-app-react.herokuapp.com/api/login', { email, password }, { withCredentials: true })).data;
    if (responseObject.status === 'success') {
        
        dispatch({
            type: LOG_IN_USER,
            payload: {
                user: responseObject.data,
            }
        })
        return '' 
    } else if (responseObject.status === 'error') {
        return responseObject.data;
    }
    return ''
    
    

    /* if (cartItems.length > 0) {
        const items = loggedUser.cart;
        for (let j = 0; j < cartItems.length; j++){
            for (let i = 0; i < cartItems[j].count; i++){
                let product: IProduct = {
                    "_id": cartItems[j]._id,
                    "title": cartItems[j].title,
                    "image": cartItems[j].image,
                    "description": cartItems[j].description,
                    "price": cartItems[j].price,
                    "availableSizes": cartItems[j].availableSizes,
                }
                if (items.length === 0) {
                    items.unshift({...product, count: 1})
                } else {
                    for (let i = 0; i < items.length; i++){
                        if (product._id === items[i]._id) {
                            items[i].count += 1
                        } else {
                            items.unshift({ ...product, count: 1 })
                        }
                    }
                }
            }            
        }
        localStorage.setItem('cartItems', JSON.stringify([]));
        loggedUser.cart = [...items];
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
    } */
    
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
            "address": '',
            "postcode": '',
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
    const id = loggedUser._id;
    const user = loggedUser;
    await axios.post(`https://shopping-cart-app-react.herokuapp.com/api/users/${id}`, { user });
    dispatch({
        type: EDIT_PROFILE_USER,
        payload: {
            user: loggedUser
        }
    })
}

export const getOrdersByUserId = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    const id = loggedUser._id;
    const orders = await (await axios.get(`https://shopping-cart-app-react.herokuapp.com/api/orders/${id}/get-orders`)).data.data;
    dispatch({
        type: GET_ORDERS_BY_USER_ID,
        payload: {
            orders: orders
        }
    })
}