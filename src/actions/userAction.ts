import axios from 'axios';
import { Dispatch } from 'redux';

import {
    ADD_TO_CART_USER,
    AppActions,
    EDIT_PROFILE_USER,
    GET_ORDERS_BY_USER_ID,
    GET_USER_FROM_TOKEN,
    IProduct,
    IUser,
    LOG_IN_USER,
    REMOVE_FROM_CART_USER,
    REMOVE_PRODUCTS_CART_USER
} from '../ActionTypes';
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
    await axios.get('https://my-eshop.onrender.com/api/reissue-token');
    runInLoop();
};

const runInLoop = () => {
    setTimeout(() => {
        reIssueAccessToken();
    }, 5000);
};

export const logInUser =
    (email: string, password: string, cartItems: ICart[]) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const responseObject = await (
            await axios.post('https://my-eshop.onrender.com/api/login', { email, password }, { withCredentials: true })
        ).data;

        if (responseObject.status === 'success') {
            dispatch({
                type: LOG_IN_USER,
                payload: {
                    user: responseObject.data,
                },
            });
        }

        setTimeout(() => {
            reIssueAccessToken();
        }, 60000);
    };

export const logOutUser =
    () =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const status: string = await (await axios.post('https://my-eshop.onrender.com/api/logout')).data.status;
        if (status == 'success') {
            const loggedUser: IUser = {
                _id: '',
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                postcode: '',
                phone: '',
                city: '',
                country: '',
                wishList: [],
                cart: [],
            };
            dispatch({
                type: LOG_IN_USER,
                payload: {
                    user: loggedUser,
                },
            });
        }
    };

export const addToUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const cartItems: ICart[] = loggedUser.cart || [];

        if (cartItems.length === 0) {
            cartItems.unshift({ ...product, count: 1 });
        } else {
            let searching = true;
            let i = 0;
            while (searching && i < cartItems.length) {
                if (cartItems[i]._id === product._id) {
                    cartItems[i].count ? (cartItems[i].count = cartItems[i].count + 1) : '';

                    searching = false;
                } else {
                    i += 1;
                }
            }
            searching ? cartItems.unshift({ ...product, count: 1 }) : '';
        }

        const user = (await axios.post<{ data: IUser }>(`https://my-eshop.onrender.com/api/users/`, { cart: cartItems })).data
            .data;
        dispatch({
            type: ADD_TO_CART_USER,
            payload: {
                user,
            },
        });
    };

export const removeItemsFromUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        const cartItems: ICart[] = loggedUser.cart || [];
        const userCartItems = [];

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]._id === product._id) {
                if (cartItems[i].count && cartItems[i].count > 1) {
                    cartItems[i].count -= 1;
                    userCartItems.push(cartItems[i]);
                }
            } else {
                userCartItems.push(cartItems[i]);
            }
        }

        const user = (await axios.post<{ data: IUser }>(`https://my-eshop.onrender.com/api/users/`, { cart: userCartItems }))
            .data.data;
        dispatch({
            type: REMOVE_PRODUCTS_CART_USER,
            payload: {
                user,
            },
        });
    };

export const removeFromUserCart =
    (loggedUser: IUser, selectedCart: ICart) => async (dispatch: Dispatch<AppActions>) => {
        const cartItems = [...loggedUser.cart].filter((item) => item._id !== selectedCart._id);
        const user = (await axios.post<{ data: IUser }>(`https://my-eshop.onrender.com/api/users/`, { cart: cartItems })).data
            .data;
        dispatch({
            type: REMOVE_FROM_CART_USER,
            payload: {
                user,
            },
        });
    };

export const removeAllFromUserCart = () => async (dispatch: Dispatch<AppActions>) => {
    const user = (await axios.post<{ data: IUser }>(`https://my-eshop.onrender.com/api/users/`, { cart: [] })).data.data;
    dispatch({
        type: REMOVE_FROM_CART_USER,
        payload: {
            user: user,
        },
    });
};

export const getUserFromToken = () => async (dispatch: Dispatch<AppActions>) => {
    const loggedUser: IUser = await (await axios.get('https://my-eshop.onrender.com/api/users/')).data.data;
    dispatch({
        type: GET_USER_FROM_TOKEN,
        payload: {
            user: loggedUser,
        },
    });
    setTimeout(() => {
        reIssueAccessToken();
    }, 5000);
};

export const editUserProfile = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    const user = (await axios.post<{ data: IUser }>(`https://my-eshop.onrender.com/api/users`, { ...loggedUser })).data.data;
    dispatch({
        type: EDIT_PROFILE_USER,
        payload: {
            user,
        },
    });
};

export const getOrdersByUserId = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    const orders = await (await axios.get(`https://my-eshop.onrender.com/api/orders`)).data.data;
    dispatch({
        type: GET_ORDERS_BY_USER_ID,
        payload: {
            orders: orders,
        },
    });
};
