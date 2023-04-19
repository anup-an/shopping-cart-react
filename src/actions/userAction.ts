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
    REMOVE_PRODUCTS_CART_USER,
} from '../ActionTypes';
import { addProductsToCart, removeProductsFromCart } from './cartAction';
import { baseUrl } from '../constants';
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
    try {
        const response = await axios.get(`${baseUrl}/api/reissue-token`);
        if (response.status === 200) {
            runInLoop();
        }
    } catch (error) {
        console.log(error);
    }
};

const runInLoop = () => {
    setTimeout(() => {
        reIssueAccessToken();
    }, 60000);
};

const mergeCart = (cart1: ICart[], cart2: ICart[]) => {
    const ids = [...cart1, ...cart2].map((item) => item._id);
    const uniqIds = ids.filter((x, i, a) => a.indexOf(x) === i);
    let mergedCart: ICart[] = [];
    for (let i = 0; i < uniqIds.length; i++) {
        const items = [...cart1, ...cart2].filter((item) => item._id === uniqIds[i]);
        const count = items.map((item) => item.count).reduce((acc, value) => acc + value);
        mergedCart = [...mergedCart, { ...items[0], count: count }];
    }
    return mergedCart;
};

export const logInUser =
    (email: string, password: string, cartItems: ICart[]) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const response = await axios.post(
                `${baseUrl}/api/login`,
                { email, password },
                { withCredentials: true },
            );
            const user = response.data.data;
            const updatedUser = cartItems.length ? { ...user, cart: mergeCart(user.cart, cartItems) } : user;
            if (response.status === 200) {
                dispatch({
                    type: LOG_IN_USER,
                    payload: {
                        user: updatedUser,
                    },
                });
                setTimeout(() => {
                    reIssueAccessToken();
                }, 60000);
            }
        } catch (error) {
            console.log(error);
        }
    };

export const logOutUser =
    () =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const response = await axios.post(`${baseUrl}/api/logout`);
            if (response.status == 200) {
                const user: IUser = {
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
                        user,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const addToUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const cartItems: ICart[] = loggedUser.cart || [];
            const updatedCart = addProductsToCart(cartItems, product);
            const user = (
                await axios.post<{ data: IUser }>(`${baseUrl}/api/users/`, { cart: updatedCart })
            ).data.data;
            dispatch({
                type: ADD_TO_CART_USER,
                payload: {
                    user,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

export const removeItemsFromUserCart =
    (loggedUser: IUser, product: IProduct) =>
    async (dispatch: Dispatch<AppActions>): Promise<void> => {
        try {
            const cartItems: ICart[] = loggedUser.cart || [];
            const updatedCart = removeProductsFromCart(cartItems, product);
            const user = (
                await axios.post<{ data: IUser }>(`${baseUrl}/api/users/`, { cart: updatedCart })
            ).data.data;
            dispatch({
                type: REMOVE_PRODUCTS_CART_USER,
                payload: {
                    user,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

export const removeFromUserCart =
    (loggedUser: IUser, selectedCart: ICart) => async (dispatch: Dispatch<AppActions>) => {
        try {
            const cartItems = [...loggedUser.cart].filter((item) => item._id !== selectedCart._id);
            const user = (
                await axios.post<{ data: IUser }>(`${baseUrl}/api/users/`, { cart: cartItems })
            ).data.data;
            dispatch({
                type: REMOVE_FROM_CART_USER,
                payload: {
                    user,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

export const removeAllFromUserCart = () => async (dispatch: Dispatch<AppActions>) => {
    try {
        const user = (await axios.post<{ data: IUser }>(`${baseUrl}/api/users/`, { cart: [] })).data
            .data;
        dispatch({
            type: REMOVE_FROM_CART_USER,
            payload: {
                user,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUserFromToken = () => async (dispatch: Dispatch<AppActions>) => {
    try {
        const response = await axios.get(`${baseUrl}/api/users/`);
        const user: IUser = response.data.data;
        dispatch({
            type: GET_USER_FROM_TOKEN,
            payload: {
                user,
            },
        });
        if (user._id) {
            setTimeout(() => {
                reIssueAccessToken();
            }, 60000);
        }
    } catch (error) {
        console.log(error);
    }
};

export const editUserProfile = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    try {
        const user = (await axios.post<{ data: IUser }>(`${baseUrl}/api/users`, { ...loggedUser }))
            .data.data;
        dispatch({
            type: EDIT_PROFILE_USER,
            payload: {
                user,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

export const getOrdersByUserId = (loggedUser: IUser) => async (dispatch: Dispatch<AppActions>) => {
    try {
        const orders = await (await axios.get(`${baseUrl}/api/orders`)).data.data;
        dispatch({
            type: GET_ORDERS_BY_USER_ID,
            payload: {
                orders: orders,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
